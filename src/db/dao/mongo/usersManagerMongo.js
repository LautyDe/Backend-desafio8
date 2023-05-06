import { usersModel } from "../../models/users.model.js";

export default class UsersManager {
  async createUser(user) {
    try {
      const { email } = user;
      const alreadyExist = await usersModel.findOne({ email });
      if (!alreadyExist) {
        const newUser = await usersModel.create(user);
        return newUser;
      } else {
        throw new Error(`Usuario ya existente`);
      }
    } catch (error) {
      console.log(`Error creando el usuario: ${error.message}`);
    }
  }

  async loginUser(email, password) {
    try {
      const userOk = await usersModel.findOne({ email, password });
      const user = { ...email, password };
      if (userOk) {
        return user;
      } else {
        throw new Error(`Usuario o contraseña invalidos.`);
      }
    } catch (error) {
      console.log(`Error en el login: ${error.message}`);
    }
  }
}
