import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { createHash } from '../utils';
import { validate } from '../validator';

class UserController {
  static getAll = async (req: Request, res: Response) => {
    //Get users from database
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.send(users);
  };

  static getOne = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;
    //Get the user from database
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id);
      res.send(user);
    } catch (error) {
      res.status(404).send('User not found');
    }
  };

  static createOne = async (req: Request, res: Response) => {
    const { body: data } = req;
    const valid = validate(data);
    if (!valid)
      res.status(400).json({ success: false, errors: validate.errors });
    //Get the user from database
    const userRepository = getRepository(User);
    try {
      const { rut } = data;
      const password = createHash(data.password);
      const _user = await userRepository.findOne({
        where: {
          rut,
          password,
        },
      });
      if (_user)
        return res.status(400).json({
          success: false,
          errors: ['user already exists'],
        });

      const user = new User();
      user.rut = rut;
      user.password = password;
      await userRepository.save(user);
      res.send(user);
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  };
}

export default UserController;
