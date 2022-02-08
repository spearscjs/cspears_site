<?php 
    include $_SERVER['DOCUMENT_ROOT'] . "/auth/priv_check_admin.php";
    // can either download curl for php, do request on server side (can process data on server, more secure)
    // do the fetch on client side with JS (more responsive)
?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Management</title>
    <a href="/admin">Home</a>
    <a href="/auth/logout.php">Logout</a>
    <!-- Zing Grid -->
    <script src="/node_modules/zinggrid/dist/zinggrid.min.js"></script>

  <body style="background-color: rgb(201, 201, 201);">
    <zing-grid
      caption="User Management"
      src="https://cspears.site/api/users"
      pager
      sort
      filter
      page-size="5"
      theme="light"
      draggable = "both"
      editor-controls
      layout = "row"
    >
    </zing-grid>
  </body>
</html>

