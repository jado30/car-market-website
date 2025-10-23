
const wrapper = document.querySelector('.wrapper');
const signUpLink = document.querySelector('.signUp-link');
const signInLink = document.querySelector('.signIn-link');

async function submitForm(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const password_confirmation = document.getElementById('password_confirmation').value;
  const errorMessage = document.getElementById('error-message');

  if (password !== password_confirmation) {
    errorMessage.textContent = 'Passwords do not match.';
    return;
  } else {
    errorMessage.textContent = '';
  }

  const payload = {
    name: username,
    email: email,
    password: password,
    password_confirmation: password_confirmation
  };

  try {
    const response = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.status) {
      alert('Registration successful!');
      localStorage.setItem('token', data.access_token);
      window.location.href = '../KBS/KBS.html';
    } else {
      alert('Error: ' + data.msg);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while registering. Please try again.');
  }
}




signUpLink.addEventListener('click', () => {
  wrapper.classList.add('animate-signIn');
  wrapper.classList.remove('animate-signUp');
});

signInLink.addEventListener('click', () => {
  wrapper.classList.add('animate-signUp');
  wrapper.classList.remove('animate-signIn');
});




let passworddd = document.getElementById('password');
let Cpassworddd = document.getElementById('password_confirmation');
let Lpassworddd = document.getElementById('Lpassword');
let lockicon = document.getElementById("locki1");
let lockicon1 = document.getElementById("locki");
let lockicon2 = document.getElementById("locki2");
lockicon.onclick = function () {
  if (passworddd.type === "password") {
    passworddd.type = "text";
    lockicon.className = "fa-solid fa-lock-open fa-1x icon";
  }
  else {
    passworddd.type = "password";
    lockicon.className = "fa-solid fa-lock fa-1x icon";
  }
}
lockicon2.onclick = function () {
  if (Cpassworddd.type === "password") {
    Cpassworddd.type = "text";
    lockicon2.className = "fa-solid fa-lock-open fa-1x icon";
  }
  else {
    Cpassworddd.type = "password";
    lockicon2.className = "fa-solid fa-lock fa-1x icon";
  }
}
lockicon1.onclick = function () {
  if (Lpassworddd.type === "password") {
    Lpassworddd.type = "text";
    lockicon1.className = "fa-solid fa-lock-open fa-1x icon";
  }
  else {
    Lpassworddd.type = "password";
    lockicon1.className = "fa-solid fa-lock fa-1x icon";
  }
}



const cors = require("cors");
app.use(cors());



async function submitLoginForm(event) {
  event.preventDefault();

  const email = document.getElementById('semail').value;
  const password = document.getElementById('Lpassword').value;
  const errorMessage = document.getElementById('Lerror-message');

  const payload1 = {
    email: email,
    password: password
  };

  try {
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload1)
    });

    const data = await response.json();

    if (response.ok) {
      if (data.status) {
        errorMessage.style.color = 'green';
        errorMessage.textContent = 'Login successful!';
        localStorage.setItem('token', data.access_token); // Store token in localStorage
        window.location.href = '../Car_Market copy 2/index.html';
      } else {
        errorMessage.textContent = 'Error: ' + data.msg;
      }
    } else {
      // Handle validation errors
      if (response.status === 422 && data.errors) {
        const errors = Object.values(data.errors).flat().join(' ');
        errorMessage.textContent = 'Validation Error: ' + errors;
      } else {
        errorMessage.textContent = 'Error: ' + data.msg;
      }
    }
  } catch (error) {
    console.error('Error:', error);
    errorMessage.textContent = 'An error occurred while logging in. Please try again.';
  }
}
