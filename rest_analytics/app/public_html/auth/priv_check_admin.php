<?php
    session_start();

    if ( isset( $_SESSION['privilege'] ) ) {
        if($_SESSION['privilege'] != 1) {
        // Redirect them to the login page 
            header("Location: /index.php");
        }
    } 
    else {
        // Redirect them to the login page 
        header("Location: /index.php");
    }

?>