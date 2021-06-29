import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import routes from './routes';
import * as amqp from 'amqplib/callback_api';
import { pull } from './services/queue-service';

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//Set all routes from routes folder
app.use('/', routes);

// start the express server
app.listen(port, () => {
  createConnection()
    .then(async (connection) => {
      console.log('Loading users from the database...');
      const totalUsers = await connection.manager.count(User);
      console.log('Loaded total users: ', totalUsers);
      pull(async (message) => {
        console.log(message.content.toString());
      });
    })
    .catch((error) => console.log(error));

  console.log(`server started at http://localhost:${port}`);
});
