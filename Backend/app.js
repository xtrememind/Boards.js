var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var activitiesInterceptor = require('./middlewares/activitiesInterceptor');
var userService = require('./services/user.service');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var activityRouter = require('./routes/activities');
var teamsRouter = require('./routes/teams');
var membersRouter = require('./routes/members');
var boardsRouter = require('./routes/boards');
var listsRouter = require('./routes/lists');
var cardsRouter = require('./routes/cards');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(activitiesInterceptor);
app.use('/', indexRouter);

//middleware for Authentication
function verifyTocken(req, res, next) {
  if (req.headers && req.headers.authorization) {
    userService.getByJWT(req.headers.authorization.replace(/^Bearer\s/, ''))
      .then(function (user) {
        if (user) {
          return next();
        } else {
          next(createError(403));
        }
      })
      .catch(function (err) {
        next(createError(403));
      });
  } else {
    next(createError(403));
  }

}


app.use('/users', usersRouter);
app.use('/activity', activityRouter);
app.use('/teams', verifyTocken, teamsRouter);
app.use('/members',verifyTocken, membersRouter);
app.use('/boards', verifyTocken,boardsRouter);
app.use('/lists', verifyTocken,listsRouter);
app.use('/cards', verifyTocken,cardsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3001);

module.exports = app;
