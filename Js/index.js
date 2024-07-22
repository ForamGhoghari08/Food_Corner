// ASKING FOR THE LOCATION

if ("geolocation" in navigator) {

  navigator.geolocation.getCurrentPosition(

    function (position) {

      const userLatitude = position.coords.latitude;
      const userLongitude = position.coords.longitude;

      fetchLocation(userLatitude, userLongitude).then(userLocation => {
      
        window.userLocation = userLocation;
      
        displayFoods(foods.filter(food => food.food_delivery_location.toLowerCase() === userLocation.toLowerCase()));

      });

    },
    function (error) 
    {
      console.error("Error occurred. Error code:", error.code);
    }
  );
} 
else 
{
  console.log("Geolocation is not supported by this browser.");
}

// JSON DATA SHOW

let foods = [];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener("DOMContentLoaded", function () 
{
  fetch("http://localhost:3000/foods")
    .then((response) => response.json())
    .then((data) => {
      foods = data;
      displayFoods(foods);
    })
    .catch((error) => console.error("Error fetching data:", error));
});


const displayFoods = (items) => 
  {
  const foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";

  items.map((food) => 
    {
    const foodItem = document.createElement("div");
    foodItem.className = "food-item";
    foodItem.innerHTML = `
      <img src="${food.food_image}" alt="${food.food_name}">
      <h2>${food.food_name}</h2>
      <p>Price: $${food.food_price}</p>
      <p>Delivery Time: ${food.food_delivery_time}</p>
      <p>Rating: ${food.food_rating} ★</p>
      <p>Category: ${food.food_category}</p>
      <p>Location: ${food.food_delivery_location}</p>
      <button class="btn" onclick="addToCart(${food.food_id})">Add to Cart</button>
    `;
    foodContainer.append(foodItem);
  });
};

// ADD TO CART FUNCTIONALITY

const addToCart = (foodId) => 
  {
  const food = foods.find(item => item.food_id === foodId);

  if (!food) return;

  if (food.food_delivery_location.toLowerCase() !== window.userLocation.toLowerCase()) 
    {
    alert('This food item is not available in your location.');
    return;
  }

  const existingItem = cart.find(item => item.food_id === foodId);

  if (existingItem) 
  {
    existingItem.quantity += 1;
  } else 
  {
    cart.push({ ...food, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  window.location.href = 'cart.html';
};

// SEARCH FUNCTIONALITY

const handleSearch = (value) => 
  {
  const filteredItems = foods.filter((ele) =>
    ele.food_name.toLowerCase().includes(value.toLowerCase())
  );

  displayFoods(filteredItems);
};

const handleSearchData = (e) => {
  e.preventDefault();
  const value = document.getElementById("search-input").value;
  handleSearch(value);
};

const handleInput = () => {
  const value = document.getElementById("search-input").value;
  handleSearch(value);
};

// EVENT LISTENERS

document.getElementById("search-form").addEventListener("submit", handleSearchData);
document.getElementById("search-input").addEventListener("input", handleInput);

// FILTER BY CATEGORY (VEG / NONVEG)

const filterByCategory = (category) => 
  {
  const filteredItems = category === 'All' ? foods : foods.filter((item) => item.food_category === category);
  displayFoods(filteredItems);
};

// SORTING FUNCTIONALITY (SORT BY PRICE / SORT BY RATING )

const sortFoods = (criteria, order) => 
  {
  let sortedFoods = [...foods];
  if (criteria === 'price') 
    {
    sortedFoods.sort((a, b) => order === 'low-to-high' ? a.food_price - b.food_price : b.food_price - a.food_price);
    }
  else if (criteria === 'rating') {
    sortedFoods.sort((a, b) => order === 'low-to-high' ? a.food_rating - b.food_rating : b.food_rating - a.food_rating);
  }
  displayFoods(sortedFoods);
};

// FUNCTION TO FETCH LOCATION 

const fetchLocation = async (latitude, longitude) => 
  {
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
  const data = await response.json();
  return data.address.city ;
};

