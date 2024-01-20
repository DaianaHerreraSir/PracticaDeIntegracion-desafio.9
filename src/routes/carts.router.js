import { Router } from "express";
import CartManagerMongo from "../daos/Mongo/CartManagerMongo.js";

const cartsRouter = Router();
const cartManagerMongo = new CartManagerMongo();

cartsRouter.post("/", async (req, res) => {
  
  try {

    const newCart = await cartManagerMongo.createCart();
    console.log('Nuevo carrito:', newCart);

    if (!newCart) {
      console.error('Error al crear el carrito. newCart es null o undefined.');
      res.status(500).send('Error al crear el carrito');
      return;
    }

  const cartId = newCart._id;

  const updatedCart = await cartManagerMongo.getCart(cartId);

  res.json(updatedCart);
  } 
  catch (error) {
    console.error("ERROR AL CREAR CARRITO", error);
    res.status(500).send("Error al crear carrito");
  }
});


cartsRouter.get("/:cid", async (req, res) => {
  
  const { cid } = req.params;

  try {
    const cart = await cartManagerMongo.getCart(cid);
    res.json(cart);
  } 
  catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).send("Error al obtener carrito");
  }
});



cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  
  const { cid, pid } = req.params;
  
  const { title, description, price, quantity } = req.body;

  try {
    await cartManagerMongo.addProductToCart(cid, pid, title, description, price, quantity, res);
  } 
  catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).send(`Error al agregar producto al carrito: ${error.message}`);
  }


cartsRouter.delete('/:cid', async (req, res) => {
    
  const { cid } = req.params;
  
  try {
      
    const deletedCart = await cartManagerMongo.deleteCart(cid);
  
    res.json({ message: 'Carrito eliminado exitosamente', deletedCart });
    } 
  catch (error) {
      console.error('Error al eliminar el carrito:', error);
      res.status(500).send('Error al eliminar el carrito');
    }
  });
});


export default cartsRouter;
