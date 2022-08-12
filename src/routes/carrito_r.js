import { Router } from "express";
import carrito_c from "../controllers/carrito_c.js";
const routerCarrito = Router();

routerCarrito.post('/', carrito_c.nuevoCarrito);

routerCarrito.post('/:id/productos/:id_prod', carrito_c.nuevoProduCarrito);

routerCarrito.get('/:id/productos', carrito_c.produCarInfo);

routerCarrito.delete('/:id/productos/:id_prod', carrito_c.produCarBorrar);

routerCarrito.delete('/', carrito_c.carritoBorrar);

export { routerCarrito };



