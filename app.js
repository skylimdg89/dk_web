var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var topicRouter = require('./routes/topicRoute');
var authorRouter = require('./routes/authorRoute');

var canvasRouter = require('./routes/canvasRoute');
var zabbixtoolRouter = require('./routes/zabbixtool');
var jumpgameRouter = require('./routes/jumpgame');
var towerdefenseRouter = require('./routes/towerdefenseRoute');

var bodyParser = require('body-parser');
var compression = require('compression');

var helmet = require('helmet');
var session = require('express-session');
var FileStore = require('session-file-store')(session)
var flash = require('connect-flash');
var app = express();

app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.use(session({
	secret: 'asadlkdjdjdi@@#@$!!@djdj',
	resave: false,
	saveUninitialized: true,
		store:new FileStore()
}))
app.use(flash());

var passport = require('./lib/passport')(app);
var authRouter = require('./routes/authRoute')(passport);
app.use('/', indexRouter);
app.use('/author', authorRouter);
app.use('/users', usersRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);
app.use('/canvas', canvasRouter);
app.use('/zabbixtool', zabbixtoolRouter);
app.use('/jumpgame', jumpgameRouter);
app.use('/towerdefense', towerdefenseRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
app.listen(3000, function(){
	console.log('Listening on port 3000!');
})
module.exports = app;
