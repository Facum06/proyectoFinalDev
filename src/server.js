import express from "express";
import cors from "cors";
import "dotenv/config";
import { routerProductos , routerCarrito } from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.all('*', (req, res) => {
    res.status( 404 ).json({
    error: '404', desc: 'Page not found!'
    })
})

const server = app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${server.address().port}`);
});

export default app;
//module.exports = app;