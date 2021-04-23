import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { ProductContext } from "./contexts/ProductContext";
import { cartContext } from "./contexts/CartContext";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("myStorage")) || []
  );

  const addItem = (item) => {
    setCart([...cart, item]);
    // add the given item to the cart
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("myStorage", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="App">
      <cartContext.Provider value={cart}>
        <Navigation cart={cart} />
      </cartContext.Provider>

      {/* Routes */}
      <ProductContext.Provider value={{ products, addItem }}>
        <Route exact path="/">
          <Products products={products} addItem={addItem} />
        </Route>
      </ProductContext.Provider>

      <cartContext.Provider value={{ cart, removeItem }}>
        <Route path="/cart">
          <ShoppingCart cart={cart} />
        </Route>
      </cartContext.Provider>
    </div>
  );
}

export default App;
