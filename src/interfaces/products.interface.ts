import { Document } from "mongoose";


interface IProducts extends Document {
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
}


export default IProducts;