const jsonServer = require('json-server');
const path = require('path');

// Point to your data file. (Make sure src/data.json is committed so it’s available at deploy time.)
const dataFile = path.join(process.cwd(), 'src', 'data.json');

// Create the json-server router and middlewares
const router = jsonServer.router(dataFile);
const middlewares = jsonServer.defaults();

module.exports = (req, res) => {
  // Run the default middlewares and then hand off to json-server’s router.
  middlewares(req, res, () => {
    router(req, res);
  });
};
