<?php

namespace App\EndpointControllers;

/**
 * 
 * An endpoint that returns account details for a volunteer.
 * 
 */
class Volunteer extends Endpoint
{
    protected $allowedParams = ["volunteerid", "name", "dob", "email", "phone", "password"];

    private $sql = "SELECT volunteer.volunteerID, volunteer.name, volunteer.dob, volunteer.email, volunteer.phone
                    FROM volunteer";

    private $sqlParams = [];

    public function __construct()
    {
        switch(\App\Request::method()) 
        {
            case 'GET':
                $this->checkAllowedParams();
                $this->buildSQL();
                $dbConn = new \App\Database(MAIN_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
            case 'POST':
                $this->checkAllowedParams();
                $this->addUser();
                $dbConn = new \App\Database(MAIN_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
            case 'PUT':
                $this->checkAllowedParams();
                $this->updateUser();
                $dbConn = new \App\Database(MAIN_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
            default:
                throw new \App\ClientError(405);
        }
        parent::__construct($data);
    }

    private function buildSQL()
    {
        if (isset(\App\Request::params()['volunteerid'])) 
        {
            if (!is_numeric(\App\REQUEST::params()['volunteerid'])) {
                throw new \App\ClientError(422);
            }
            if (count(\App\Request::params()) > 2) {
                throw new \App\ClientError(422);
            }
            $this->sql .= " WHERE volunteer.volunteerID = :volunteerid";
            $this->sqlParams[":volunteerid"] = \App\Request::params()['volunteerid'];
        }
    }

    private function addUser()
    {
        $requiredParams = ["name", "dob", "email", "phone", "password"];
        $allParamsSet = true;
        foreach($requiredParams as $param){
            if (!isset(\App\Request::params()[$param])){
                $allParamsSet = false;
                throw new \App\ClientError(400);
            }
        }

        if ($allParamsSet)
        {
            $this->sql = "INSERT INTO volunteer (name, dob, email, phone, password) VALUES (:name, :dob, :email, :phone, :password)";
            $this->sqlParams = [
                ":name" => \App\Request::params()["name"],
                ":dob" => \App\Request::params()["dob"],
                ":email" => \App\Request::params()["email"],
                ":phone" => \App\Request::params()["phone"],
                ":password"=> \App\Request::params()["password"]
            ];
        }
    }

    private function updateUser()
    {
        if(!isset(\App\Request::params()["volunteerid"]))
        {
            throw new \App\ClientError(400);
        }


        if (isset(\App\Request::params()["volunteerid"]))
        {
            $this->sql = "UPDATE volunteer SET name = :name, dob = :dob, email = :email, phone = :phone WHERE volunteerID = :volunteerid";
            $this->sqlParams = [
                ":volunteerid" => \App\Request::params()["volunteerid"],
                ":name" => \App\Request::params()["name"],
                ":dob" => \App\Request::params()["dob"],
                ":email" => \App\Request::params()["email"],
                ":phone" => \App\Request::params()["phone"],
            ];
        }
    }
}