//import producto from "../classes/Producto.js";
//const producto = new Producto();
import {productoDB} from "../models/productos/index.js";

import userCheck from "../classes/Admin.js";

const productos_c = {
  nuevoProducto: async (req, res) => {    
    try {                
        const isAdmin = userCheck.adminCheq();
        if(isAdmin === true){            
            const nuevoProducto = req.body;                       
            let todos = await productoDB.getAll();   
            let nuevoId = 1;
            if (todos != '' && todos.length > 0){
                todos.forEach(element => {
                    if (element.id > nuevoId){
                        nuevoId = element.id;
                    }
                });  
                nuevoId = nuevoId + 1;         
            }                
            nuevoProducto.id = nuevoId;       
            //nuevoProducto.timestamp = Date.now();     
            todos.push(nuevoProducto);
            await productoDB.writeFile(todos);           
            res.status(200).json(nuevoProducto);
        }else {
            console.log("NO AUTORIZADO");      
        }
    } catch (error) {
      console.log(`ERROR EN ALTA DE PRODUCTO: ${error}`);
    }
  },
  todos: async(req, res) => {    
    try{
        let todos = await productoDB.getAll(); 
        if (todos){
            res.status(200).json(todos);
        }else {
            res.status(500).json('Productos is empty');    
        }
    }catch (e){
        console.log(`ERROR: ${e}`)
    }
  },
  produInfo: async(req, res) => {
    try {
        let id = req.params.id;
        let result = await productoDB.getById(id);       
        res.status(200).json(result);
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
  },
  borrar: async(req, res) => {
    try {
        const isAdmin = userCheck.adminCheq();
        if(isAdmin === true){
            let id = req.params.id;
            let result = await productoDB.deleteById(id);       
            res.status(200).json({result:result});
        }else {
            res.status(403).send("No autorizado");
        }
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
  },
  actualizar: async(req, res) => {
    try {
        const isAdmin = userCheck.adminCheq();
        if(isAdmin === true){
            let id = req.params.id;
            if (id != ''){
                let produ = await productoDB.getById(id);         
                if (produ.id != ''){        
                    let nuevoProducto = {                
                        title: req.body.title ? req.body.title : produ.title,                                                
                        thumbail: req.body.thumbail ? req.body.thumbail : produ.thumbail,
                        price: req.body.price ? req.body.price : produ.price,
                        stock: req.body.stock ? req.body.stock : produ.stock,
                        id: id
                    };
                    productoDB.update(nuevoProducto, id);
                    res.status(200).json(nuevoProducto);
                }
            }else {
                res.status(500).json('ID vacío');    
            }
        }else {
            res.status(403).send("No autorizado");
        }
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
  }
};

export default productos_c;
