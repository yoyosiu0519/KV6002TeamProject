<?php

/**
 * An autoload function that loads the correct class file based on filename.
 * 
 * @author Team
 */

function autoloader($className) {
    $filename = $className . ".php";
    $filename = str_replace('\\', DIRECTORY_SEPARATOR, $filename);
    if (is_readable($filename)) {
        require $filename;
    } else {
        throw new Exception("File not found: " . $className ."(". $filename . ")");
    }
}