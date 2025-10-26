import React from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

const CartPage = () => {
  const [auth] = useAuth();
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price * (item.quantity || 1);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (err) {
      console.log("Error calculating total price in cart: ", err.message);
    }
  };

  const getTotalItems = () => {
    return cart?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;
  };

  const updateQuantity = (pid, newQuantity) => {
    if (newQuantity <= 0) {
      removeCartItem(pid);
      return;
    }

    try {
      const updatedCart = cart.map((item) =>
        item._id === pid ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
    } catch (err) {
      console.log("Error updating quantity: ", err.message);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      const index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      // localStorage is automatically handled by cart context
    } catch (err) {
      console.log("Error removing item from cart: ", err.message);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="text-center bg-gray-100 p-4 rounded-lg">
          <h1 className="text-2xl font-bold">
            {`Hello ${auth?.token && auth?.user ? auth.user.name : "Guest"}`}
          </h1>
          <h4 className="text-lg mt-2">
            {cart.length
              ? `You have ${getTotalItems()} items in your cart ${
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
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 mb-6 border border-gray-100"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-xl shadow-md"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-purple-600">
                        ${product.price}
                        <span className="text-sm text-gray-500 font-normal">
                          {" "}
                          each
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          Subtotal: $
                          {(product.price * (product.quantity || 1)).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls and Remove Button */}
                  <div className="flex flex-col items-center gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() =>
                          updateQuantity(
                            product._id,
                            (product.quantity || 1) - 1
                          )
                        }
                        className="w-10 h-10 flex items-center justify-center bg-white hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 font-bold text-lg"
                      >
                        −
                      </button>
                      <span className="w-16 text-center font-bold text-lg">
                        {product.quantity || 1}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            product._id,
                            (product.quantity || 1) + 1
                          )
                        }
                        className="w-10 h-10 flex items-center justify-center bg-white hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-200 font-bold text-lg"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeCartItem(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit sticky top-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-4">
              Cart Summary
            </h4>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items ({cart.length} products):</span>
                <span>{getTotalItems()} total</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>{totalPrice()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total:</span>
                <span className="text-purple-600">{totalPrice()}</span>
              </div>
            </div>

            {auth?.token ? (
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Proceed to Checkout
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Login to Checkout
                </button>
                <p className="text-center text-sm text-gray-500">
                  Please login to proceed with your order
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
