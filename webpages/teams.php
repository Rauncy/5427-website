<link href="https://fonts.googleapis.com/css?family=Anton|Josefin+Sans|Open+Sans|Oswald|Poppins|Princess+Sofia|Titillium+Web" rel="stylesheet">
  <link rel = "stylesheet"  href = "/_asset/header-main.css">
  <div id = "header">
    <script src = "/_asset/header-main.js" defer></script>
  </div>

  <?php
  $servername = "localhost";
  $username = "root";
  $password = "root";
  $dbname = "robotics";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $sql = "SELECT * FROM Teams";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
      echo "<table><tr><th>ID</th><th>Name</th><th>Location</th><th>Description</th></tr>";
      // output data of each row
      while($row = $result->fetch_assoc()) {
          echo "<tr><td>".$row["TeamID"]."</td><td>".$row["Name"]."</td><td>".$row["Location"]."</td><td>".$row["Description"]"</td></tr>";
      }
      echo "</table>";
  } else {
      echo "0 results";
  }
  $conn->close();
  ?>
