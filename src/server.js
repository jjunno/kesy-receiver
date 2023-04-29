const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const nocache = require('nocache');

const app = express();
const port = process.env.PORT;

/**
 * CORS
 */
app.use(cors());
app.use(bodyParser.json());

/**
 * CACHE
 */
app.use(nocache());

/**
 * MIDDLEWARE
 */
const { errorHandler } = require('./middleware/error');
app.use(errorHandler);

/**
 * ROUTES
 */
app.use((req, res, next) => {
  const d = new Date().toLocaleString('fi-FI');
  console.log(`Request at ${d} from IP ${req.socket.remoteAddress}`);
  next();
});

const trashRoute = require('./routes/trashRoute');
app.use('/api/v1/trash', trashRoute);

// Invalid route, 404. should always be the last route
app.get('*', function (req, res) {
  return res
    .status(404)
    .json({ message: `Route ${req.originalUrl} does not exist` });
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
