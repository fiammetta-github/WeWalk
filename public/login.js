document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.querySelector("button");

  async function validateForm() {
    const inputFields = document.querySelectorAll(".input-field");
    let allFieldsFilled = true;

    inputFields.forEach((field) => {
      if (!field.value) {
        allFieldsFilled = false;
        field.classList.add("error");
      } else {
        field.classList.remove("error");
      }
    });

    if (allFieldsFilled) {
      const user = {
        username: inputFields[0].value,
        userphone: inputFields[1].value,
        useremail: inputFields[2].value,
        userpassword: inputFields[3].value,
        contact1: inputFields[4].value,
        contact1phone: inputFields[5].value,
        contact2: inputFields[6].value,
        contact2phone: inputFields[7].value,
        contact3: inputFields[8].value,
        contact3phone: inputFields[9].value,
      };

      const response = await authenticateUser(user);

      if (response === "Authenticated") {
        alert("You are already registered.");
        window.location.href = "/map";
      } else {
        registerUser(user);
      }
    } else {
      alert("Please fill in all the fields to proceed.");
    }
  }

  async function authenticateUser(user) {
    const response = await fetch("/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return response.text();
  }

  async function registerUser(user) {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      alert("Registration successful!");
      window.location.href = "/map";
    } else {
      alert("Registration failed. Please try again.");
    }
  }

  if (registerButton) {
    registerButton.addEventListener("click", function (event) {
      event.preventDefault();
      validateForm();
    });
  }
});
