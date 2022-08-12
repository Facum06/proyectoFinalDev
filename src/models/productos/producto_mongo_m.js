import ProductoMongoContainer from "../../classes/ContenedorMongo.js";

class Producto_mongo extends ProductoMongoContainer {
    constructor() {
        super("productos", {
          id: { type: Number, required: true },          
          title: { type: String, required: true },          
          thumbail: { type: String, required: false },
          price: { type: Number, required: true },
          stock: { type: Number, required: true },
        });
    }
}

export {Producto_mongo};
