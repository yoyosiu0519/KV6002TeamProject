<?php

namespace App;

/**
 * A class that provides a database connection and methods to execute SQL.
 * 
 * @author Team
 */

class Database 
{
    private $dbConnection;

    public function __construct($dbName) 
    {
        $this->setDbConnection($dbName);  
    }

    private function setDbConnection($dbName) 
    {
        $this->dbConnection = new \PDO('sqlite:'.$dbName);
        $this->dbConnection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    }
    
    public function executeSQL($sql, $params=[])
    { 
        $stmt = $this->dbConnection->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
