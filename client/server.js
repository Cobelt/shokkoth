const express = require('express');
// import bodyParser from 'body-parser';
const path = require('path');
// import cors from 'cors';

// import { PORT, ALLOWED_ORIGINS } from './env';

const DIST_DIR = path.join(__dirname, 'dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const hostname = 'localhost';
const port = 3052;

const app = express();


// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin (like mobile apps or curl requests)
//     if (origin && !ALLOWED_ORIGINS.includes(origin.replace(/https?:\/\//, ''))){
//       return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
//     }
//     console.log('Accepted origin =', origin, 'for request');
//     return callback(null, true);
//   },
//   header: '*'
// }));
//
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(express.static(DIST_DIR))


app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})

app.listen(port, hostname, () => console.log(`Shokkoth-Server started on http://${hostname}:${port}`));
