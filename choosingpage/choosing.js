function redirectToLink(link) {
    window.location.href = link;
  }

  function redirectToLink1(link) {
    let enteredPassword = prompt("Please enter the password");
    
    if (enteredPassword === "1234") {
      window.location.href = link;
    } else {
      alert("Incorrect password. Access denied.");
      redirectToLink1(link);
    }
  }
  function redirectToLink2(){
    let enteredPassword = document.getElementById("passworddd").value;
    if(enteredPassword === "1234") {
        window.location.href = "../admin_switching_loginpage/switching.html";
  } else{
    alert("Incorrect password. Access denied.");
  }
}
let lockicon = document.getElementById("locki");
 lockicon.onclick = function () {
  if(passworddd.type ==="password")  {
    passworddd.type = "text";
    lockicon.className = "fa-solid fa-lock-open fa-1x icon";
 }
 else {
   passworddd.type = "password";
   lockicon.className = "fa-solid fa-lock fa-1x icon";
 }
}
function changeIconColor() {
    var iconElement = document.getElementById('locki');
    iconElement.style.color = "rgba(45, 89, 77,0.8)";
}
function resetIconColor() {
    var iconElement = document.getElementById('locki');
    // Set the color back to its default value (e.g., black)
    iconElement.style.color = "black";
  }