import express from 'express';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY
import mongoose from 'mongoose';
import session from 'express-session';
import api from './routes';


const app = express();
const port = 3000;
const devPort = 4000;

/*
    Express Codes
*/
app.use(morgan('dev'));
//HTTP 요청을 로그하는 미들웨어
app.use(bodyParser.json());
//요청에서 JSON을 파싱할때 사용되는 미들웨어
/* mongodb connection */
//mongodb 데이터 모델링 툴;
//MongoDB 에 있는 데이터를 Application에서 JavaScript 객체로 사용 할 수 있도록 해줍니다.
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/codelab');

/* use session */
//express 에서 세션을 다룰 때 사용되는 미들웨어
app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));


app.use('/', express.static(path.join(__dirname, './../public')));
app.use('/api', api);
/* support client-side routing */
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});
/* handle error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});



if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}
