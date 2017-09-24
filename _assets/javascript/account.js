function register(){
  var pass = document.getElementById('registerPassword').value;
  var confirmPass = document.getElementById('confirmPassword').value;
  alert(pass);
  if(pass != confirmPass){
      alert("Please match your passwords!");
      location.reload();
  }
  else if (pass.length < 6) {
      alert("Please increase the length of your password!");
      location.reload();
  }
}
