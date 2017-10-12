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

  $sql = "SELECT * FROM Members";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
      echo "<table><tr><th>MemberID</th><th>Name</th><th>Grade</th><th>Year</th><th>Permission</th><th>Roles</th><th>Username</th><th>Password</th><th>Email</th><th>Phone Number</th></tr>";
      // output data of each row
      while($row = $result->fetch_assoc()) {
          echo "<tr><td>".$row["MemberID"]."</td><td>".$row["FirstName"]." ".$row["LastName"]."</td><td>".$row["Grade"]."</td><td>".$row["Year"]"</td><td>".$row["Permission"]."</td><td>".$row["Roles"]."</td><td>".$row["Username"]."</td><td>".$row["Password"]."</td><td>".$row["Email"]."</td><td>".$row["Picture"]."</td><td>".$row["Description"]."</td><td>".$row["Phone"]."</td><td>"."</tr>";
      }
      echo "</table>";
  } else {
      echo "0 results";
  }
  $conn->close();
  ?>
