<?php 
include($_SERVER['DOCUMENT_ROOT'] . "/db.php");
session_start();
// if user posted login to page
if ( ! empty( $_POST ) ) {
  // make sure username and password fields are set
  if ( isset( $_POST['username'] ) && isset( $_POST['password'] ) ) {
    // fetch row from sql database
    $query_string = 'SELECT id,username,password,admin FROM users WHERE username="' . $_POST['username'] . '" || email="'. $_POST['username'] . '"'; 
    $result = $db -> query($query_string);
    // check if results found
    if(mysqli_num_rows($result) == 0) {
      echo "<p>No user found.</p>";
    }
    // found result
    else {
      // check password
      $row = mysqli_fetch_array($result);
      $pword_hash = $row['password'];
      // passed
      if( password_verify($_POST['password'], $pword_hash) ) {
        // set privilege level
        $_SESSION['privilege'] = $row['admin'];
        // redirect based on privilege
        if($row['admin']) {
          header("Location: /admin/index.php");
        }
        else {
          header("Location: /basic/index.php");
        }
      }
      // failed
      else {
        echo "<p>Incorrect password.</p>";
      }
    }
  }
}
?>