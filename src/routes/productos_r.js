import { Router } from "express";
import productos_c from "../controllers/productos_c.js";
const routerProductos = Router();

routerProductos.get('/', productos_c.todos);

routerProductos.post('/', productos_c.nuevoProducto);

routerProductos.get('/:id', productos_c.produInfo);

routerProductos.delete('/:id', productos_c.borrar);

routerProductos.put('/:id', productos_c.actualizar);

export { routerProductos };
//module.exports = routerProductos;



