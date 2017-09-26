<cfg>{"type":"content", "src":"^header", "spreadsheets":{}, "scripts":{}}</cfg>
<link rel = "stylesheet"  href = "/_asset/settings.css">
<script src="/_asset/settings.js" charset="utf-8"></script>

<h2><u>Settings</u></h2>
<div id="profilePic">
    <?php
  $servername = "localhost";
  $username = "admin";
  $password = "admin";
  $dbname = "robotics";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $sql = "SELECT firstname, lastname, profilepic FROM Accounts";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
      // output data of each row
      while($row = $result->fetch_assoc()) {
          echo "<img src= '" . $row["id"] . "' id = 'profPic' class='img' width='250' height='250' alt='Profile Picture'>" . "<br>";
      }
  } else {
      echo "0 results";
  }
  $conn->close();
  ?>

  <!-- TODO: get specific settings for user's profile-->
  <!-- <img src="https://www.javacodegeeks.com/wp-content/uploads/2014/05/Must-read-articles-for-Programmers-and-Software-Developers.jpg" id = "profPic"class="img" width="250" height="250" alt="Profile Picture"> -->
  <b class = "imgText">Click to Change</b>
  <input type="file" id = "fileSelector" class="imgText" accept="image/gif, image/jpeg, image/png" onchange="changeProfileImage(this)">
</div>
