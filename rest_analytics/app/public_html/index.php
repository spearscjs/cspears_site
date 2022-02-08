
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Analytics Login</title>
  <link rel="stylesheet" href="styles.css">
</head>

<body>
<div class='login'>
  <h1>Analytics Login</h1>

  <form action="" method="post">
    <input type="text" name="username" placeholder="Enter your username or email" required>
    <input type="password" name="password" placeholder="Enter your password" required>
    <input type="submit" value="Submit">
  </form>
  <?php
    include($_SERVER['DOCUMENT_ROOT'] . "/auth/auth.php");
  ?>
</div>
</body>

</html>
