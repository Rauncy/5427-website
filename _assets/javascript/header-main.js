

(function(){


  var html =
  "<header role = 'banner'>" +
         "<a id='header-title' class ='horizm' style='float:left; padding-top:5px; padding-left:10px; font-size: 50px' href='/'>Tompkins&nbspRobotics</a>" +
       "</header>" +

           "<nav id = 'tabs'>" +
             "<ul id='list'>" +
              "<li class ='horizm'><a class = 'tab' href = '/officers'>Officers</a></li>" +
              "<li class ='horizm'><a class = 'tab'  href = '/archive/teams'>Teams</a></li>" +
              "<li class ='horizm'><a class = 'tab'  href = '/members'>Members</a></li>" +
              " <li class ='horizm'><a class = 'tab'  href = '/schedule'>Schedule</a></li>" +
              "<li class ='horizm'><a class = 'tab'  href = '/contactinfo/contactinfo'>Contact Us</a></li>" +
              "<li class ='horizm'><a class = 'tab'  href = '/sponsors/sponsors'>Sponsors</a></li>" +
              " <li class ='horizm' style='float:right; padding:0; margin-right:6px'><a class = 'tab'  href = '/account/login'>Login</a></li>"+
             "</ul>"+
          "</nav>";

         document.getElementById('header').innerHTML = html;

  var e = document.getElementById('list').children;

  for(p=0;p<e.length;p++){
    if(e[p].firstChild.href==window.location){
      let title = document.getElementById('header-title');
      title.innerHTML = title.innerHTML + '&nbsp;:&nbsp;' + window.location.pathname.charAt(1).toUpperCase() + window.location.pathname.substring(2, window.location.pathname.length);
    }
  }


})();
