var db = require('./db');
var template = require('./template');
exports.home = function(req, res){
	db.query('SELECT * FROM topic', function(err, topics){
		if(err){
			throw err;
		}
		db.query('SELECT * FROM author', function(err2, authors){
			if(err2){
				throw err2;
			}
			var title = "AUTHOR";
			var list = template.list(topics);
			var tag = template.authorTable(authors);		
			var html = template.HTML(title, list,
				`${tag}
		<style>
			table{
				border-collapse: collapse;
			}
			td{
				border:1px solid black;
			}
		</style>
 <form action="/author/create_process" method="post">
				 <p>
					<input type="text" name="name" placeholder="type here">
				 </p>
				 <p>
					<textarea name="profile" placeholder="description"></textarea>
				 </p>
				<p>
				 <input type="submit" value="create">
				</p>
			   </form>

		`,
				``
			);
			res.send(html);
		});
	});
}

exports.sort_by_id = function(req, res){
    console.log("In Sort By Id");
    db.query(`SELECT * FROM author`, function(err, authors){
        console.log(`authors = ${authors}`);
    });
}
exports.sort_by_name = function(req, res){
    console.log("In Sort By Name");
    db.query(``, function(err, authors){
        console.log(`authors = ${authors}`);
    });
}


exports.create_process = function(req, res){
	var post = req.body;
	db.query(`
			INSERT INTO author (name, profile) 
			  VALUES(?, ?)`,
		[post.name, post.profile], 
		function(err, result){
			if(err){
				throw err;
			}
			res.redirect(302, `/author/table`);
		}
	)
}

exports.update = function(req, res){
	var page_id = req.params.pageId;
	db.query(`SELECT * FROM topic`, function(err,topics){
		db.query(`SELECT * FROM author`, function(err2,authors){
			db.query(`SELECT * FROM author WHERE id=?`,[page_id], function(err3,author){
				var title = 'author';
				var list = template.list(topics);
				var html = template.HTML(title, list,
					`
				${template.authorTable(authors)}
				<style>
					table{
						border-collapse: collapse;
					}
					td{
						border:1px solid black;
					}
				</style>
				<form action="/author/update_process" method="post">
					<p>
						<input type="hidden" name="id" value="${page_id}">
					</p>
					<p>
						<input type="text" name="name" value="${author[0].name}" placeholder="name">
					</p>
					<p>
						<textarea name="profile" placeholder="description">${author[0].profile}</textarea>
					</p>
					<p>
						<input type="submit" value="update">
					</p>
				</form>
				`,
					``
				);
				res.send(html);
			});

		});
	});
}

exports.update_process = function(req, res){
	var post = req.body;
	db.query(`
			UPDATE author SET name=?, profile=? WHERE id=?`,
		[post.name, post.profile, post.id], 
		function(err, result){
			if(err){
				throw err;
			}
			res.redirect(302, `/author/table`);
		}
	)
}


exports.delete_process = function(req, res){
	var post = req.body;
	db.query(
		`DELETE FROM topic WHERE author_id=?`,
		[post.id], 
		function(err1, result1){
			if(err1){
				throw err1;
			}
			db.query(`
					DELETE FROM author WHERE id=?`,
				[post.id], 
				function(err2, result2){
					if(err2){
						throw err2;
					}
					res.redirect(302, `/author/table`);
				}
			)
		}
	);
}
