let productoDB = process.env.DB;

switch (productoDB){
    case "fs":
    const { Producto_fs } = await import("./producto_fs_m.js");
    productoDB = new Producto_fs("productos");
  break;
  case "mongo":
    const { Producto_mongo } = await import("./producto_mongo_m.js" );
    productoDB = new Producto_mongo('productos');
  break;
  case "memoria":
    const { ProductoMemoria } = await import("./producto_memoria_m.js");
    productoDB = new ProductoMemoria();
  break;
}

export {productoDB};