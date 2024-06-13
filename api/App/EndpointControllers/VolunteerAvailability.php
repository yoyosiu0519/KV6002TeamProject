<?php

namespace App\EndpointControllers;

/**
 * 
 * An endpoint that handles volunteers schedule.
 * 
 * @author James Sowerby
 * @studentID w21023500
 */
class VolunteerAvailability extends Endpoint
{
    protected $allowedParams = ["volunteerid", "date"];

    private $sql = "SELECT * FROM volunteerAvailability";

    private $sqlParams = [];

    public function __construct()
    {
        switch(\App\Request::method()) 
        {
            case 'GET':
                $this->checkAllowedParams();
                $this->getAvailability();
                $dbConn = new \App\Database(MAIN_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
            case 'POST':
                //$this->checkAllowedParams();
                $this->addAvailability();
                $dbConn = new \App\Database(MAIN_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
            case 'DELETE':
                $this->removeAvailability();
                $dbConn = new \App\Database(MAIN_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
            default:
                throw new \App\ClientError(405);
        }
        parent::__construct($data);
    }

    private function getAvailability()
    {
        if (!isset(\App\Request::params()['volunteerid'])) 
        {
            throw new \App\ClientError(422);
        }
        if (!is_numeric(\App\REQUEST::params()['volunteerid'])) {
            throw new \App\ClientError(422);
        }
        if (count(\App\Request::params()) > 1) {
            throw new \App\ClientError(422);
        }
        $this->sql .= " WHERE volunteerAvailability.volunteerID = :volunteerid";
        $this->sqlParams[":volunteerid"] = \App\Request::params()['volunteerid'];
    }

    private function addAvailability()
    {
        if (!isset(\App\Request::params()['volunteerid'], \App\Request::params()['date'])) {
            throw new \App\ClientError(400);
        }

        if (!is_numeric(\App\Request::params()['volunteerid'])) {
            throw new \App\ClientError(422);
        }

        $this->sql = "INSERT INTO volunteerAvailability (volunteerID, date) VALUES (:volunteerid, :date)";
        $this->sqlParams = [":volunteerid" => \App\Request::params()['volunteerid'], ":date" => \App\Request::params()['date']];
    }
    
    private function removeAvailability()
    {
        if (!isset(\App\Request::params()['volunteerid'], \App\Request::params()['date'])) {
            throw new \App\ClientError(400);
        }

        if (!is_numeric(\App\Request::params()['volunteerid'])) {
            throw new \App\ClientError(422);
        }

        // Validate the date format here if necessary
        $this->sql = "DELETE FROM volunteerAvailability WHERE volunteerID = :volunteerid AND date = :date";
        $this->sqlParams = [":volunteerid" => \App\Request::params()['volunteerid'], ":date" => \App\Request::params()['date']];
    }

}