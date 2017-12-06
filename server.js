// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');

//Package to allow local development with ENV variables
require('dotenv').config();


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3050;

// Requiring our models for syncing
const db = require('./models');

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//Handlebars Templating
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Static directory
app.use(express.static(path.resolve(__dirname + '/public')));

// Routes
// =============================================================
require('./routes/html-routes.js')(app);
require('./routes/api-routes.js')(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(() => {
  app.listen(PORT,() => {
    console.log(`App listening on PORT: ${PORT} and available at http://localhost:${PORT}`);
  });
});

// sync({force: true})
