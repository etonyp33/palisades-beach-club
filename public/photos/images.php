<?php
header("Access-Control-Allow-Origin: *");
$directory = "./";
$images = glob($directory . "/*.jpg");
$cnt = 1;
$newImages = array();
foreach ($images as $i => $img) {
  // rename($img, 'img-' . $cnt . '.jpg');
  list($width, $height) = getimagesize($img);
  // echo "width: " . $width . "<br />";
  // echo "height: " . $height;
  if($width > 599 && $width > $height) {
    $newImages[] = array('image' => 'http://tonypweb.com/pbc/photos/img-' . $cnt . '.jpg', 'width' => $width, 'height' => $height, 'id' => 'img' . $cnt);
  }
  $cnt++;
}
// print_r($images);
// exit;
$count = count($images);
print_r(json_encode(array('images' => $newImages, 'count' => $count, 'width' => $width)));
exit;