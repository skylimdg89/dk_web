var db = require('./db');
var template = require('./template');
var auth = require('./auth');
//var lowdb = require('./lowdb');
var shortid = require('shortid');

exports.board= function(req, res){
	var fmsg = req.flash();
	var feedback = '';
	if(fmsg.success){
		feedback = fmsg.success[0];
	}
	db.query('SELECT * FROM topic', function(err, topics){
		if(err){
			throw err;
		}
		var list = template.list(topics);
		var title = "Welcome to Dongqoo";
		var description = topics[0].description;
		var html = template.HTML(title, list,
			`
			<div style="color:blue;">${feedback}</div>
			<h2>${title}</h2>${description}
			<img src="/images/hello.jpg" style="width:300px; display:block;">
			`,
			`<a href="/topic/create">create</a>`,
			auth.status.statusUI(req, res)
		);
		//console.log(`statusUI in topic board = ${auth.status.statusUI(req,res)}`);
		//console.log(`request ########### ${req.user.displayname}`);
		res.send(html);
	});
}

exports.create = function(req, res){
	if(!auth.status.isOwner(req, res)){
		res.redirect(302, '/topic/board');
		return false;
	}
	db.query(`SELECT * FROM topic`, function(err, topics){
		if(err){
			throw err;
		}
		db.query(`SELECT * FROM author`, function(err2, authors){
			if(err2){
				throw err2;
			}
			var title = topics[0].title;
			var description = topics[0].description;
			var list = template.list(topics);
			var html = template.HTML(title, list, `
		  <form action="http://localhost:3000/topic/create_process" method="post">
			<p>
				<label for="exampleFormControlInput1" class="form-label">Title</label>
				<input type="text" name ="title" class="form-control" placeholder="Title...">
			</p>
			<p>
				<label for="exampleFormControlInput1" class="form-label">Description</label>
				<textarea name="description" class="form-control" placeholder="Desc..."></textarea>
			</p>
			</p>
			<p>
			  <input type="submit">
			</p>
		  </form>
		`, '', auth.status.statusUI(req, res))
			res.send(html);
		});
	});

}

exports.create_process = function(req, res){
	if(!auth.status.isOwner(req, res)){
		res.redirect(302, '/topic/board');
		return false;
	}
	var post = req.body;
	var title = post.title;
	var description = post.description
    var id = shortid.generate();
	/*
    lowdb.get('topics').push({
       id:id,
       title:title,
       description:description,
       user_id:request.user.id
    }).write();
    res.redirect(`/topic/${id}`);
	*/
	db.query(`INSERT INTO topic (title, description, created, author_id) VALUES (?, ?, NOW(), ?)`, [post.title, post.description, post.author], function(err, result){
		if(err){
			throw err;
		}
		res.redirect(302, `/topic/${result.insertId}`);
	});
}
exports.update = function(req, res){
	if(!auth.status.isOwner(req, res)){
		res.redirect(302, '/topic/board');
		return false;
	}
	var page_id = req.params.pageId;
	db.query(`SELECT * FROM topic`, function(err, topics){
		if(err){
			throw err;
		}
		db.query('SELECT * FROM topic WHERE id=?',[page_id], function(err2, topic){
			if(err2){
				throw err2;
			}
			db.query(`SELECT * FROM author`, function(err3, authors){
				if(err3){
					throw err3;
				}
				var tag = '';
				var i = 0;
				while(i < authors.length){
					var selected = '';
					if(authors[i].id === topic[0].author_id){
						selected = ' selected';
					}
					tag += `<option value="${authors[i].id}">${authors[i].name}</option>`
					i++;
				}
				var title = topic[0].title;
				var description = topic[0].description;
				var list = template.list(topics);
				var html = template.HTML(topic[0].title, list,
					`
			  <form action="/topic/update_process" method="post">
				<input type="hidden" name="id" value="${topic[0].id}">
				<p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
				<p>
				  <textarea name="description" placeholder="description">${topic[0].description}</textarea>
				</p>
			<p>
			<select name="author">
				<p>${tag}</p>
			</select>
				<p>
				  <input type="submit">
				</p>
			  </form>
			  `,
					`<a href="/topic/create">create</a> <a href="/topic/update/${topic[0].id}">update</a>`,
					auth.status.statusUI(req, res)
				);	
				res.send(html);
			});
		});
	});
}
exports.update_process = function(req, res){
	if(!auth.status.isOwner(req, res)){
		res.redirect(302, '/topic/board');
		return false;
	}
	var post = req.body;
	var page_id = req.params.pageId;
	var title = post.title;
	var description = post.description;
	db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`, [post.title, post.description, post.author, post.id], function(err, result){
		if(err){
			throw err;
		}
		res.redirect(302, `/topic/${post.id}`);
	});
}

exports.delete_process = function(req, res){
	if(!auth.status.isOwner(req, res)){
		res.redirect(302, '/topic/board');
		return false;
	}
	var post = req.body; 
	db.query('DELETE FROM topic WHERE id = ?', [post.id], function(err, result){
		if(err){
			throw err;
		}
		res.redirect(302, '/topic/board');
	});
}
exports.page = function(req, res, next){
	var page_id = req.params.pageId;
	db.query(`SELECT * FROM topic`, function(err1,topics){
		if(err1){
			throw err1;
		}
		db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`,[page_id], function(err2, topic){
			try{
				if(err2){
					throw err2;
				}
				var title = topic[0].title;
				var description = topic[0].description;
				var list = template.list(topics);
				var html = template.HTML(title, list,
					`
		   <h2>Title ${title}</h2>
		   ${description}
		   <p>by ${topic[0].name}</p>
		   `,
					`<a href="/topic/create">create</a>
			   <a href="/topic/update/${page_id}">update</a>
			   <form action="/topic/delete_process" method="post">
				 <input type="hidden" name="id" value="${page_id}">
				 <input type="submit" value="delete">	 
			   </form>
			`,
					auth.status.statusUI(req, res)
				);
				res.send(html);

			}catch(err3){
				if(topic.length === 0){
				}
				next(err3);
			}
		})
	});
}

