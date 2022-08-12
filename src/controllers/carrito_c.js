import {carritoDB} from "../models/carrito/index.js";
import userCheck from "../classes/Admin.js";
import {productoDB} from "../models/productos/index.js";

const carrito_c = {
  nuevoCarrito : async(req, res) => {
    try {             
        const id = await carritoDB.nuevoCart();
        res.json({"id":id});
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }    
  },
  nuevoProduCarrito: async(req, res) => {
    try {       
        const cartId = req.params.id
        const prodId = req.params.id_prod
        const productoFind = await productoDB.getById(prodId);
        let produ = await carritoDB.productToCart(cartId,productoFind);
        res.json(produ);
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }    
  },
  produCarInfo: async(req, res) => {
    try {
        let id = req.params.id;
        let result = await carritoDB.getById(id, "carrito");       
        res.json(result);
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
  },
  produCarBorrar: async(req, res) => {
    try {        
        const cartId = req.params.id
        const prodId = req.params.id_prod
        const productoFind = await productoDB.getById(prodId);
        let result = await carritoDB.deleteById(cartId, productoFind);       
        res.json(result);
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
  },
  carritoBorrar: async(req, res) => {
    try {       
        await carritoDB.deleteAll();       
        res.json({result: "Se elimino el carrito"});
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
  }
};

export default carrito_c;
