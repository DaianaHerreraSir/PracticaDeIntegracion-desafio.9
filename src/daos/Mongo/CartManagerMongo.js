import productModel from "../../models/products.models.js";
import cartModel from "../../models/carts.models.js";




class CartManagerMongo {

async createCart() {
    try {
      const newCart = await cartModel.create({ products: [] });
      console.log('Nuevo carrito creado:', newCart);
      return newCart;
    } catch (error) {
      console.error('Error en createCart:', error);
      throw error;
    }
  }

async getCart(cartId) {
    try {
      const cart = await cartModel.findById(cartId).lean().populate('products.product');
      return cart;
    } catch (error) {
      console.error('Error en getCart:', error);
      throw error;
    }
  }

async getCartProducts(cartId) {
    try {
        const cart = await cartModel.findById(cartId).lean();
        if (cart) {
            return cart.products
        } else {
            console.log("Carrito no encontrado");
            return [];
        }
    } catch (error) {
        console.error('Error en getCartProducts:', error);
        throw error;
    }
}

async newCart() {
    try {
      const newCart = { products: [] };
      await cartModel.create(newCart);
      return newCart;
    } catch (error) {
      console.error('Error en newCart:', error);
      throw error;
    }
  }

async addProductToCart(cartId, productId, title, description, price, quantity = 1, res) {
    try {
      const cart = await cartModel.findById(cartId);
  
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
  
    const product = await productModel.findById(productId);
  
      if (!product) {
        throw new Error('Producto no encontrado');
      }

    const existingProduct = cart.products.find(productEntry => productEntry.product && productEntry.product.equals(productId));
  
    if (existingProduct) {

        existingProduct.quantity += quantity;
      } else {
        cart.products.push({
          product: product._id, 
          title,
          description,
          price,
          quantity
        });
      }
  
    await cart.save();
  
  const updatedCart = await cartModel.findById(cartId).populate('products.product');
  
    if (res) {
        res.json(updatedCart);
      }
  
  return updatedCart;
    } catch (error) {
      console.error('Error en addProductToCart:', error);
      throw error;
    }
  }
  
async deleteCart(cartId) {
    try {
    
      const deletedCart = await cartModel.findByIdAndDelete(cartId);

      if (!deletedCart) {
        throw new Error('Carrito no encontrado');
      }

      return deletedCart;
    } catch (error) {
      console.error('Error en deleteCart:', error);
      throw error;
    }
  }
}


export default CartManagerMongo;