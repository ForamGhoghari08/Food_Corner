let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  displayCartItems();
});

const displayCartItems = () => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";
  let totalPrice = 0;

  cart.map((item) => {
    totalPrice += item.food_price * item.quantity;
    const cartItem = document.createElement("tr");
    cartItem.innerHTML = `
      <td><img src="${item.food_image}" alt="${item.food_name}" width="50"></td>
      <td>${item.food_name}</td>
      <td>${item.food_price}</td>
      <td><input type="number" value="${
        item.quantity
      }" min="1" onchange="updateQuantity(${item.food_id}, this.value)"></td>
      <td>${item.food_price * item.quantity}</td>
      <td><button onclick="removeFromCart(${item.food_id})">Remove</button></td>
    `;
    cartContainer.append(cartItem);
  });

  const totalDisplay = document.getElementById("total-price");
  totalDisplay.textContent = `Total Price: ${totalPrice}`;
};

const updateQuantity = (foodId, quantity) => {
  const item = cart.find((item) => item.food_id === foodId);
  if (item) {
    item.quantity = parseInt(quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
  }
};

const removeFromCart = (foodId) => {
  cart = cart.filter((item) => item.food_id !== foodId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
};

const checkout = () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  alert("Order placed successfully!");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
};
