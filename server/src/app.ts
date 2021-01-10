import 'module-alias/register';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import path from 'path';
import logger from 'morgan';
import { Error } from '@/types';
import createError from 'http-errors';
import apiRouter from '@/routes/api';
import passport from 'passport';
import passportConfig from '@/config/passport';
import config from '@/config';

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.set('port', port);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
passportConfig();

app.use(express.static(path.join(__dirname, './src/public')));
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use('/api', apiRouter);

app.all('*', (req, res) => {
  if (process.env.MODE === 'dev') {
    res.redirect(config.clientHost);
    return;
  }
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const { message, status = 500 } = err;
  res.status(status).json({ message, status });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
