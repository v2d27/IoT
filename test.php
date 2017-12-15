<HTML>
  <HEAD>
  <TITLE>Displaying Login ID Options</TITLE>
  </HEAD>
  <BODY>
  <Hl><CENTER>Generating Login IDs for Dave</CENTER></Hl>
  <?php
  $loginfo = array (
             FirstName => "Joe",
             LastName => "Howrod",
             Sex => "Male",
             Location => "Arizona",
             Age => "24",
             MusicChoice => "Pop",
             Hobby => "Dance",
             Occupation => "Author");

  echo "<H3>The information entered by JOe:<BR></H3>"; 
  foreach ($loginfo as $key => $val) {
     echo "<B>$key</B> => $val<BR>";
  }
  echo "<BR> ";
  echo "<H3>The login options are:<BR></H3>";

  $loginone = array_slice ($loginfo, 0, 2);
  $logintwo = array_slice ($loginfo, 3, 2);
  $loginthree = array_slice ($loginfo, 5, 2);
  $loginfour = array_slice ($loginfo, 6, 2);
  $loginfive = array_merge ($loginfour, "2001");

  echo "The first login option:<BR>";
  foreach ($loginone as $optionone) {
      echo "<B>$optionone</B>";
  }
  echo "<BR>";

  echo "The second login option:<BR>";
  foreach ($loginone as $optiontwo) {
      echo "<B>$optiontwo</B>";
  }
  echo "<BR>";

  echo "The third login option:<BR>";
  foreach ($loginthree as $optionthree) {
      echo "<B>$optionthree</B>";
  }
  echo "<BR>";
  
  echo "The fourth login option:<BR>";
  foreach ($loginfour as $optionfour) {
      echo "<B>$optionfour</B>";
  }

  echo "<BR>";
  echo "The fifth login option:<BR>";
  foreach ($loginfive as $optionfive) {
      echo "<B>$optionfive</B>";
  }
  echo "<BR>";
  ?>
  </BODY>
  </HTML>
