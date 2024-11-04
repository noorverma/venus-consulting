// Lib/cart.js

// Fetch cart from localStorage
export function getCart() {
    if (typeof window !== "undefined") {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }
  
  // Add product to cart
  export function addToCart(product) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
  
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1; // Increment quantity if product exists
    } else {
      cart.push({ ...product, quantity: 1 }); // Add product if it doesn't exist
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log('Product added to cart:', cart);
  }
  
  // Remove product from cart
  export function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter((item) => item.id !== productId); // Remove product by ID
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log('Product removed from cart:', cart);
  }
  
  // Clear the cart (optional utility)
  export function clearCart() {
    localStorage.removeItem("cart");
    console.log('Cart cleared');
  }
  