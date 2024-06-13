<?php

namespace App\EndpointControllers;

/**
 * 
 * An endpoint that returns account details for a volunteer.
 * 
 * @author James Sowerby
 * @studentID w21023500
 */
class VolunteerEvent extends Endpoint
{
    protected $allowedParams = ["volunteerid", "eventid"];

    private $sql = "SELECT 
                            volunteerEvent.volunteerID,
                            volunteerEvent.eventID,
                            volunteer.name AS volunteer_name,
                            volunteer.email AS volunteer_email,
                            event.name AS event_name,
                            event.description AS event_description,
                            event.date AS event_date,
                            event.time AS event_time,
                            event.location AS event_location
                        FROM volunteer
                        JOIN volunteerEvent ON  volunteerEvent.volunteerID= volunteer.volunteerID
                        LEFT JOIN event ON event.eventID = volunteerEvent.eventID";

    private $sqlParams = [];

    public function __construct()
    {
        switch(\App\Request::method()) 
        {
            case 'GET':
                $this->checkAllowedParams();
                $this->getEvents();
                $dbConn = new \App\Database(MAIN_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
            case 'POST':
                //$this->checkAllowedParams();
                $this->joinEvent();
                $dbConn = new \App\Database(MAIN_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
            case 'DELETE':
                $this->unregisterEvent();
                $dbConn = new \App\Database(MAIN_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
            default:
                throw new \App\ClientError(405);
        }
        parent::__construct($data);
    }

    private function getEvents()
    {
        if (isset(\App\Request::params()['volunteerid'])) 
        {
            
        if (!is_numeric(\App\REQUEST::params()['volunteerid'])) {
            throw new \App\ClientError(422);
        }
        if (count(\App\Request::params()) > 2) {
            throw new \App\ClientError(422);
        }
        $this->sql .= " WHERE volunteerEvent.volunteerID = :volunteerid";
        $this->sqlParams[":volunteerid"] = \App\Request::params()['volunteerid'];
         }
        // Check if 'eventid' is present and numeric, then add to SQL query
        if (isset(\App\Request::params()['eventid']) && is_numeric(\App\Request::params()['eventid'])) {
            $this->sql .= " AND volunteerEvent.eventID = :eventid";
            $this->sqlParams[":eventid"] = \App\Request::params()['eventid'];
        }
    }

    private function joinEvent()
    {
        $requiredParams = ["volunteerid", "eventid"];
        $allParamsSet = true;
        foreach($requiredParams as $param){
            if (!isset(\App\Request::params()[$param])){
                $allParamsSet = false;
                throw new \App\ClientError(400);
            }
        }

        if ($allParamsSet)
        {
            $this->sql = "INSERT INTO volunteerEvent (volunteerID, eventID) VALUES (:volunteerid, :eventid)";
            $this->sqlParams = [
                ":volunteerid" => \App\Request::params()["volunteerid"],
                ":eventid" => \App\Request::params()["eventid"]
            ];
        }
    }

    private function unregisterEvent()
    {
        $requiredParams = ["volunteerid", "eventid"];
        $allParamsSet = true;
        foreach($requiredParams as $param){
            if (!isset(\App\Request::params()[$param])){
                $allParamsSet = false;
                throw new \App\ClientError(400);
            }
        }

        if ($allParamsSet)
        {
            $this->sql = "DELETE FROM volunteerEvent WHERE volunteerID = :volunteerid AND eventID = :eventid";
            $this->sqlParams = [
                ":volunteerid" => \App\Request::params()["volunteerid"],
                ":eventid" => \App\Request::params()["eventid"]
            ];
        }
    }
}