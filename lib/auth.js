var db = require('./db');
var template = require('./template');
var shortid = require('shortid');
//var lowdb = require('../lib/lowdb');

exports.status= {
    isOwner:function(req, res){
        if(req.user){
            return true;
        } else {
            return false;
        }
    },
    statusUI:function(req, res){
        var authStatusUI = '<a href="/auth/login">login</a> | <a href="/auth/register">register</a>'
        if(this.isOwner(req, res)){
            authStatusUI = `${req.user.displayname} | <a href="/auth/logout">logout</a>`;
        }
		//console.log(`authStatusUI = ${authStatusUI}`);
        return authStatusUI;
    }
}

exports.login= function(req, res){
    var fmsg = req.flash();
    var feedback = '';
    if(fmsg.error){
        feedback = fmsg.error[0];
    }
    db.query(`SELECT * FROM topic`, function(err, topics){
        if(err){
            throw err;
        }
        db.query(`SELECT * FROM author`, function(err2, authors){
            if(err2){
                throw err2;
            }
            var title = 'login';
            var list = template.list(topics);

            var html = template.HTML(title, list, `
            <div style="color:red;">${feedback}</div>
    <form action="/auth/login_process" method="post">
      <p><input type="text" name="email" placeholder="email"></p>
      <p><input type="password" name="pwd" placeholder="password"></p>
      <p>
        <input type="submit" value="login">
      </p>
    </form>
  `, '');
            res.send(html);
        });
    });
}

exports.register= function(req, res){
    var fmsg = req.flash();
    var feedback = '';
    if(fmsg.error){
        feedback = fmsg.error[0];
    }
    db.query(`SELECT * FROM topic`, function(err, topics){
        if(err){
            throw err;
        }
        db.query(`SELECT * FROM author`, function(err2, authors){
            if(err2){
                throw err2;
            }
            var title = 'login';
            var list = template.list(topics);

            var html = template.HTML(title, '', `
            <div style="color:red;">${feedback}</div>
    <form action="/auth/register_process" method="post">
      <p><input type="text" name="email" placeholder="email"></p>
      <p><input type="password" name="pwd" placeholder="password"></p>
      <p><input type="password" name="pwdchk" placeholder="password"></p>
      <p><input type="text" name="displayName" placeholder="Display Name"></p>
      <p>
        <input type="submit" value="submit">
      </p>
    </form>
  `, '');
            res.send(html);
        });
    });
}

exports.logout = function(req, res){
    console.log('hit log out button ');
    req.logout();
	/*
    req.session.destroy(function(err){
        console.log('err 1?');
        res.redirect('/topic/board');
    });
	*/
    req.session.save(function(){
        console.log('err 2?');
        res.redirect('/topic/board');
    })
}

exports.register_process = function(req, res){
    var post = req.body;
    var email= post.email;
    var pwd = post.pwd;
    var pwdchk = post.pwdchk;
    var displayname = post.displayName;
    if(pwd != pwdchk){
        req.flash('error', 'Password must be the same');
        res.redirect('/auth/register');
    } else{
        var user = {
            id:shortid.generate(),
            email:email,
            password:pwd,
            displayName:displayname
        }

		/*	
        lowdb.get('users').push(user).write();
        req.login(user, function(err){
            console.log('redirect');
            return res.redirect('/topic/board');
        })
		*/
		//
		db.query(`INSERT INTO users (id, email, password, displayname) VALUES (?, ?, ?, ?)`, [user.id, user.email, user.password, user.displayName], function(err, result){
			if(err){
				throw err;
			}
			res.redirect('/topic/board');
		});
		
		//
        //res.redirect('/topic/board');
    }
};
