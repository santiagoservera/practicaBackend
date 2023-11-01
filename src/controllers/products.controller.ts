import { Request, Response, NextFunction } from "express";
import Products from "../models/products.models";
import IProducts from "../interfaces/products.interface";


export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Products.find();
    return res.status(200).json(product);
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
    const user = req.user;

    if(user.rol === 'admin'){
      const { nombre, descripcion, precio, imageUrl } = req.body;
  
      const product: IProducts = new Products({
        nombre,
        descripcion,
        precio,
        imageUrl,
      });
      await product.save();
  
      return res.status(200).json(product);
    } else {
      return res.status(401).json('El usuario no tiene estos permisos')
    }
  } catch (error) {
    next(error);
  }
};
  
  //SHOW
  export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const products = await Products.findById(id);
      return res.status(200).json(products);
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
      const products = await Products.findById(id);
      if (!products) return res.status(404).json("Not existe");
      await products.deleteOne();
      return res.status(200).json(products);
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
      const { nombre, descripcion, precio, imagenUrl } = req.body;
  
      // Verificar si el usuario con el ID proporcionado existe en la base de datos
      const productExists = await Products.findById(id);
      if (!productExists) {
        return res.status(404).json("Usuario no encontrado");
      }
  
      // Actualizar los campos del usuario
      productExists.nombre = nombre;
      productExists.descripcion = descripcion;
      productExists.precio = precio;
      productExists.imagenUrl = imagenUrl;
  
      // Guardar los cambios en la base de datos
      await productExists.save();
  
      return res.status(200).json(productExists);
    } catch (error) {
      return next(error);
    }
  };
  