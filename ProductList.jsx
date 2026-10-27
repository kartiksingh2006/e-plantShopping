import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "./CartSlice";

/*
 * Each category is represented as an object with its own plants array.
 * Prices are retained as `price`; CartSlice also normalizes them to `cost`.
 */
const plantsArray = [
  {
    category: "Air Purifying Plants",
    plants: [
      { id: 1, name: "Snake Plant", price: 20, image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee" },
      { id: 2, name: "Peace Lily", price: 25, image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee" },
      { id: 3, name: "Spider Plant", price: 15, image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333" },
      { id: 4, name: "Aloe Vera", price: 18, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09" },
      { id: 5, name: "Boston Fern", price: 22, image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a" },
      { id: 6, name: "Rubber Plant", price: 30, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6" },
    ],
  },
  {
    category: "Tropical Plants",
    plants: [
      { id: 7, name: "Monstera", price: 35, image: "https://images.unsplash.com/photo-1614594575929-b7f2f7e6b7d5" },
      { id: 8, name: "Calathea", price: 28, image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee" },
      { id: 9, name: "Bird of Paradise", price: 40, image: "https://images.unsplash.com/photo-1597055181300-a7b668ea1f3c" },
      { id: 10, name: "Philodendron", price: 32, image: "https://images.unsplash.com/photo-1614594575929-b7f2f7e6b7d5" },
      { id: 11, name: "Dieffenbachia", price: 24, image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6" },
      { id: 12, name: "Croton", price: 27, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09" },
    ],
  },
  {
    category: "Succulent Plants",
    plants: [
      { id: 13, name: "Jade Plant", price: 16, image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc" },
      { id: 14, name: "Echeveria", price: 14, image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc" },
      { id: 15, name: "Haworthia", price: 12, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09" },
      { id: 16, name: "String of Pearls", price: 19, image: "https://images.unsplash.com/photo-1525498128493-380d1990a112" },
      { id: 17, name: "Zebra Haworthia", price: 17, image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc" },
      { id: 18, name: "Panda Plant", price: 21, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09" },
    ],
  },
];

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <h2>Paradise Nursery</h2>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart" aria-label={`Shopping cart, ${cartCount} items`}>
          🛒 Cart ({cartCount})
        </Link>
      </div>
    </nav>
  );
}

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items ?? []);
  const [addedToCart, setAddedToCart] = useState({});

  // Sum quantities, not just unique products, so the count stays accurate.
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity ?? 0), 0);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((previous) => ({ ...previous, [product.name]: true }));
  };

  return (
    <div>
      <Navbar cartCount={cartCount} />

      <main className="product-container">
        <h1>Our Plants</h1>

        {plantsArray.map((category) => (
          <section key={category.category} className="category-section">
            <h2>{category.category}</h2>

            <div className="product-grid">
              {category.plants.map((plant) => {
                const isAdded = Boolean(addedToCart[plant.name]) ||
                  cartItems.some((item) => item.id === plant.id);

                return (
                  <article className="product-card" key={plant.id}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>${plant.price.toFixed(2)}</p>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isAdded}
                    >
                      {isAdded ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
