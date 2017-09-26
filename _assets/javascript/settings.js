function changeProfileImage(input) {
  // TODO: save to profile of user
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            // $('#blah').attr('src', e.target.result);
            document.getElementById("profPic").src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}
