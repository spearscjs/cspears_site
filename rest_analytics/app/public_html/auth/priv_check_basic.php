<?php
    session_start();

    if ( ! isset( $_SESSION['privilege'] ) ) {
        // Redirect them to the login page 
        header("Location: /index.php");
    } 

?>