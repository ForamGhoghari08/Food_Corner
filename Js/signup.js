document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let phone = document.getElementById("phone").value;
    let city = document.getElementById("city").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email, password , phone , city});
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    window.location.href = "login.html";
  });


  