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
        useremail: inputFields[0].value,
        userpassword: inputFields[1].value,
      };

      const response = await authenticateUser(user);

      if (response === "Authenticated") {
        window.location.href = "/map";
      } else {
        alert(
          "You don't seem to have a WeWalk account yet, we are readdressing you to our registration page."
        );
        window.location.href = "/login";
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

  if (registerButton) {
    registerButton.addEventListener("click", function (event) {
      event.preventDefault();
      validateForm();
    });
  }
});
