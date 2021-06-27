import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { createConnection } from 'typeorm';
import { User } from './entity/User';

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Configure routesroutes.register(app);
// start the express server
app.listen(port, () => {
  createConnection()
    .then(async (connection) => {
      console.log('Inserting a new user into the database...');
      const user = new User();
      user.firstName = 'Timber';
      user.lastName = 'Saw';
      user.age = 25;
      await connection.manager.save(user);
      console.log('Saved a new user with id: ' + user.id);

      console.log('Loading users from the database...');
      const users = await connection.manager.find(User);
      console.log('Loaded users: ', users);

      console.log(
        'Here you can setup and run express/koa/any other framework.',
      );
    })
    .catch((error) => console.log(error));
  console.log(`server started at http://localhost:${port}`);
});
