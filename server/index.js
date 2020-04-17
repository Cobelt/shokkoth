import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';

// import { PORT, ALLOWED_ORIGINS } from './env';


const hostname = 'localhost';
const port = PORT || 5013;

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
app.use(express.static(''));

app.listen(port, hostname, () => console.log(`Shokkoth-Server started on http://${hostname}:${port}`));
