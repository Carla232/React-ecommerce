const addToCart = () => {
    const newCart = [...cart];
    const existingProduct = newCart.find((item) => item.id === product.id);
  
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      newCart.push({ ...product, quantity: 1 });
    }
  
    setCart(newCart);
  };