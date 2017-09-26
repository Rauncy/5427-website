function register(){
  var email = document.getElementById('registerEmail').value;
  var pass = document.getElementById('registerPassword').value;
  var confirmPass = document.getElementById('confirmPassword').value;

  if(pass != confirmPass){
      alert("Please match your passwords!");
      location.reload();
  }
  else if (pass.length < 6) {
      alert("Please increase the length of your password!");
      location.reload();
  }
  else if(email.indexOf("@") == -1){
    alert("Please enter a valid email address!");
    location.reload();
  }
}
