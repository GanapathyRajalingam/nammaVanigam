var oeApp = require('oe-cloud');
var path = require('path');
var loopback = oeApp.loopback;
var app = loopback();
var options = oeApp.options;



// apphome is used by oe-cloud to know application server directory
// as of now it used for picking providers.json
app.locals.apphome = __dirname;

options.bootDirs.push(path.join(__dirname, 'boot'));
options.clientAppRootDir = __dirname;
oeApp.boot(app, options, function () {
  console.log('boot finished');
  var context = loopback.getCurrentContext();
  if (context) {
    context.set('callContext', {});
  }
  app.start();
});

console.log('user ', require("os").userInfo().username);

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../client/') });
});


app.get("/:page([A-Za-z0-9]+)", function(req, res, next) {
  if (req.params.page == "explorer") {
    return next();
  }
  if (req.params.page == "red") {
    return next();
  }
  if (req.params.page == "redapi") {
    return next();
  }
  res.sendFile("index.html", { root: path.join(__dirname, "../client/") });
});

app.get("/:page([A-Za-z0-9]+)/:id([A-Za-z0-9]+)", function(req, res, next) {
  if (req.params.page == "api") {
    return next();
  }
  if (req.params.page == "redapi") {
    return next();
  }
  console.log(req.params.page);
  res.sendFile("index.html", { root: path.join(__dirname, "../client/") });
});

app.on('started', function() {
  console.log('app started');
});