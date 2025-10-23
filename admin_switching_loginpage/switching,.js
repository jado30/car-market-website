const wrapper = document.querySelector('.wrapper');
const signUpLink = document.querySelector('.signUp-link');
const signInLink = document.querySelector('.signIn-link');

signUpLink.addEventListener('click', () => {
    wrapper.classList.add('animate-signIn');
    wrapper.classList.remove('animate-signUp');
});

signInLink.addEventListener('click', () => {
    wrapper.classList.add('animate-signUp');
    wrapper.classList.remove('animate-signIn');
});
let lockicon = document.getElementById("locki");
 lockicon.onclick = function () {
  if(passworddd.type ==="password")  {
    passworddd.type = "text";
    lockicon.className = "fa-solid fa-lock-open fa-3x icon";
 }
 else {
   passworddd.type = "password";
   lockicon.className = "fa-solid fa-lock fa-3x icon";
 }
}
function redirectToLink(link) {
  window.location.href = link;
}