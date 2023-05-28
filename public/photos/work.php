<?php
header("Access-Control-Allow-Origin: *");
$directory = "./";
$images = glob($directory . "/*.jpg");
$cnt = 1;
foreach ($images as $i => $img) {
  rename($img, 'img-' . $cnt . '.jpg');
  $cnt++;
}
// $count = count($images);
// print_r(json_encode(array('images'=> $images, 'count' => $count)));
exit;
function img($img, $i)
{
  echo '<div class="column"><img src="' . $img . '" onclick="openModal();currentSlide(' . $i . ')" class="hover-shadow" height="100"></div>';
}
function slide($img, $i, $count)
{
  echo '<div class="mySlides"><div class="numbertext">' . $i . ' / ' . $count . '</div><img src="' . $img . '" style="width:100%"></div>';
}

function gal($img, $i)
{
  echo '<div class="column"><img class="demo" src="' . $img . '" onclick="currentSlide(' . $i . ')" alt="" height="100"></div>';
}
?>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>

  <link rel="stylesheet" href="styles.css">
  <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script> -->

</head>

<body>
  <div id="carRow" class="row">
    <?php
    foreach($images as $i => $img) {
        img($img, $i + 1);
    }
    ?>
  </div>

  <!-- The Modal/Lightbox -->
  <div id="myModal" class="modal">
    <span class="close cursor" onclick="closeModal()">&times;</span>
    <div id="modalContent" class="modal-content">
      <span id="slides">
        <?php
        foreach ($images as $i => $img) {
          slide($img, $i + 1, $count);
        }
        ?>
      </span>
      <!-- Next/previous controls -->
      <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
      <a class="next" onclick="plusSlides(1)">&#10095;</a>

      <!-- Caption text -->
      <div id="captionContainer" class="caption-container">
        <p id="caption" class=""></p>
      </div>
      <span id="gal">
        <?php
        foreach ($images as $i => $img) {
          gal($img, $i + 1);
        }
        ?>
      </span>
    </div>
  </div>
  <script src="script.js"></script>
  <?php

  ?>
</body>

</html>