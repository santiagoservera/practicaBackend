import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import IUser from "../interfaces/user.interface";


export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};


//CREATE
export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { nombre, email, contraseña, rol } = req.body;
  
  
      const user: IUser = new User({
        nombre,
        email,
        contraseña,
        rol,
      });
  
  
      await user.save();
  
  
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  };
  
  //SHOW
  export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  };
  
  //DESTROY
  export const destroy = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) return res.status(404).json("Not existe");
      await user.deleteOne();
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  };
 

  //UPDATE 
  export const update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { nombre, email, contraseña, rol } = req.body;
  
      // Verificar si el usuario con el ID proporcionado existe en la base de datos
      const userExists = await User.findById(id);
      if (!userExists) {
        return res.status(404).json("Usuario no encontrado");
      }
  
      // Actualizar los campos del usuario
      userExists.nombre = nombre;
      userExists.email = email;
      userExists.contraseña = contraseña;
      userExists.rol = rol;
  
      // Guardar los cambios en la base de datos
      await userExists.save();
  
      return res.status(200).json(userExists);
    } catch (error) {
      return next(error);
    }
  };
  