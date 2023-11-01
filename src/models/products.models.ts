import { model, Schema } from "mongoose";
import IProducts from "../interfaces/products.interface";


const UserSchema = new Schema<IProducts>(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    descripcion: {
      type: String,
      
     
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatoria"],
      min:0
    },
    imagenUrl: {
      type: String
      
      
      
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);


export default model<IProducts>("Products", UserSchema);