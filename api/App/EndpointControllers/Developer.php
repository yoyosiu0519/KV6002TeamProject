<?php

namespace App\EndpointControllers;

/**
 * An endpoint that returns my name and student id.
 * 
 */
class Developer extends Endpoint
{
    private $sql = "SELECT * FROM participant";

    private $sqlParameters = [];

    public function __construct() {
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($this->sql, $this->sqlParameters);
        parent::__construct($data);
    }
}