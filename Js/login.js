document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      alert("User does not exist. Please sign up.");
      window.location.href = "signup.html";
    }
  });
