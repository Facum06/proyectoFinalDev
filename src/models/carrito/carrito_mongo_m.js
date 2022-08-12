import MongoContainer from "../../classes/ContenedorMongo.js";

class Carrito_mongo extends MongoContainer {
    constructor() {
        super("carrito", {
          id: { type: Number, required: true },
          productos: { type: Array, required: false }, //SE INICIALIZA EL ARRAY VACÍO
        }
      );
    }
}

export {Carrito_mongo};

