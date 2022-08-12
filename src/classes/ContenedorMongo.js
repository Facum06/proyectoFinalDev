//----------* IMPORTS *----------//
import mongoose from "mongoose";
import config from "../config/config.js";

try {
   mongoose
   .connect(config.mongodb.url, { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log("ERROR EN LA CONEXION DE MONGO\n" +err));  
} catch (error) {
  console.log("Mongoose could not connect.");
}

class MongoContainer {
  constructor(collectionName, schema) {
    this.db = mongoose.model(collectionName, schema);      
  }
  async getAll() {
    try {
      const todos = {};
      const result = await this.db.find(todos);
      return result;
    } catch (err) {
      throw new Error(`Error en listado general: ${err}`);
    }
  }
  async writeFile(obj) {
    try {
      await this.db.create(obj);
    } catch (err) {
      throw new Error(`Error en alta: ${err}`);
    }
  }
  async update(obj,id) {
    try {
      
      await this.db.updateOne({id: id,},{$set: obj});
    } catch (err) {
      throw new Error(`Error actualizar: ${err}`);
    }
  }
  async getById(id) {
    try {
      const result = await this.db.find({id: Number(id)});
      return result;
    } catch (err) {
      throw new Error(`Error info: ${err}`);
    }
  }

  async removeItem(cartId, produId){
    try {
      await this.db.updateOne({ id: cartId },{$pull: {productos: { id: produId },},});
    } catch (error) {
      throw new Error(`Error removing item from: ${error}`);
    }
  }
  
  async deleteById(cartId, producto) {    
    try {              
      const carrito = await this.getById(cartId)      
      if (!carrito) {
          return ({error: 'Carrito no encontrado.'})                
      } else if (!producto) {
          return ({error: 'Producto no encontrado.'})                
      } else {                          
          await this.removeItem(cartId, producto.id);                  
          const result = await this.getById(cartId);
          return result;
      }
    } catch ( error ) {
      console.log(`ERROR: ${error}`)
    }
  }
  
  async deleteAll() {
    try {
      await this.db.deleteMany({});
    } catch (error) {
      throw new Error(`Error en eliminar todo: ${error}`);
    }
  }
  async nuevoCart(){    
    try {
        const tiene = await this.getAll();
        const chequeoId = () => {
          let lastID = 0;
          if (tiene != undefined) {                    
              tiene.forEach((value,i) => { 
                  lastID = value.id
              });
          }
          return lastID + 1
        }        
        const idL = chequeoId();
        const carrito = {id: idL, productos: []};
        if (idL == 1){
            await this.writeFile(carrito);
        }else {                
            tiene.push(carrito);
            await this.writeFile(tiene);
        }
        return idL;
    } catch (error) {
        console.log("ERROR! "+error);
    }
  }
  async addProductToCart(carritoId, obj) {
    try {
      await this.db.updateOne(
        { id: carritoId },
        { $push: { productos: obj[0] } }
      );
    } catch (error) {
      throw new Error(`Error actualizar carrito: ${error}`);
    }
  }
  async productToCart(cartId, producto){
    try {              
      const carrito = await this.getById(cartId)      
      if (!carrito) {
          return ({error: 'Carrito no encontrado.'})                
      } else if (!producto) {
          return ({error: 'Producto no encontrado.'})                
      } else {                          
          await this.addProductToCart(cartId, producto);                  
          const result = await this.getById(cartId);
          return result;
      }
    } catch ( error ) {
      console.log(`ERROR: ${error}`)
    }
  }
}

export default MongoContainer;
