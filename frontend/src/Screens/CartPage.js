import React from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

const CartPage = () => {
  const { auth } = useAuth();
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (err) {
      console.log("Error calculating total price in cart: ", err.message);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      const index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (err) {
      console.log("Error removing item from cart: ", err.message);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="text-center bg-gray-100 p-4 rounded-lg">
          <h1 className="text-2xl font-bold">
            {`Hello ${auth?.token && auth?.user}`}
          </h1>
          <h4 className="text-lg mt-2">
            {cart.length
              ? `You have ${cart.length} items in your cart ${
                  auth?.token ? "" : "Please login to checkout"
                }`
              : "Your cart is empty"}
          </h4>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6">
          {/* Cart Items */}
          <div className="lg:col-span-3">
            {cart?.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <img
                  src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-grow px-4">
                  <h5 className="text-lg font-semibold">{product.name}</h5>
                  <p className="text-gray-600">Price: {product.price}</p>
                </div>
                <button
                  onClick={() => removeCartItem(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-xl font-bold">Cart Summary</h4>
            <p className="text-gray-600 mt-2">Total | Checkout | Payment</p>
            <hr className="my-4" />
            <h4 className="text-lg font-semibold">Total: {totalPrice()}</h4>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 w-full hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
