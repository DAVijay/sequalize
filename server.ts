// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Initialize the app
let app = express();

/// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const db = require('./config/database.config.js');

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
});

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Sequelize Rest API'));

// Require Author routes
require('./routes/author.routes.js')(app);
require('./routes/post.routes.js')(app);

// Launch app to listen to specified port
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)
})
