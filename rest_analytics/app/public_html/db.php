<?php 
/* Get SQL Credentials */ 
    $servername = "localhost";
    $username = "curt";
    $password = "H@ve_MercY";
    $db_name = "collections";

    $db = new mysqli($servername, $username, $password, $db_name);

    // Check connection
    if ($db->connect_error) {
      die("Connection failed: " . $db->connect_error);
    }
?>


