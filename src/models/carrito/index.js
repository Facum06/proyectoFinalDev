let carritoDB = process.env.DB;

switch (carritoDB){
    case "fs":
    const { Carrito_fs } = await import("./carrito_fs_m.js");
    carritoDB = new Carrito_fs("carrito");
  break;
  case "mongo":
    const { Carrito_mongo } = await import("./carrito_mongo_m.js" );
    
    carritoDB = new Carrito_mongo();
    break;
  case "memoria":
    const { CarritoMemoria } = await import("./carrito_memoria_m.js");
    carritoDB = new CarritoMemoria();
  break;
}
export {carritoDB};