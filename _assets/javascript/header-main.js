

(function(){

  var e = document.getElementById('list').children;

  for(p=0;p<e.length;p++){
    if(e[p].firstChild.href==window.location){
      let title = document.getElementById('header-title');
      title.innerHTML = title.innerHTML + '&nbsp;:&nbsp;' + window.location.pathname.charAt(1).toUpperCase() + window.location.pathname.substring(2, window.location.pathname.length);
    }
  }


})();
