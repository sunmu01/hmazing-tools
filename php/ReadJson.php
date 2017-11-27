<?php

require __DIR__ . '/../Json.php';

use Desarrolla2\File\Json;

$json = Json::read('/www/html/trees/vendors.json', $json);

return $json;