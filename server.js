const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(cors());

app.use('/api/', require('./server/routes/test'));
app.use('/api/', require('./server/routes/question'));
app.use('/api/user', require('./server/routes/user'));

const db = process.env.mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('mongo connected'))
    .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
  }

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
