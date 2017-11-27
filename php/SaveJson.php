<?php

require __DIR__ . '/../Json.php';

use Desarrolla2\File\Json;

$json = $_POST('vendors');

Json::write('/www/html/trees/vendors.json', $json);

return 'success';