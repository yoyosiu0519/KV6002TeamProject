<?php

namespace App\EndpointControllers;

/**
 * 
 *
 * @author Antonio Gorgan
 * This endpoint is used to retrieve participants name and numbers for each event 
 */ 

class WaitingData extends Endpoint
{
    protected $allowedParams = ["eventid"];

    private $sql = "SELECT event.eventID, event.name AS event_name, waitingList.space, 
                COUNT(waitingList.participantID) AS numberOfPa,
                GROUP_CONCAT(participant.name) AS participantsNames
                FROM event JOIN waitingList ON waitingList.eventID = event.eventID
                JOIN participant ON participant.participantID = waitingList.participantID";

    private $sqlParameters = [];

    public function __construct() {
        $this->checkAllowedParams();
        $this->buildSQL();
        $this->sql .= " GROUP BY event.eventID, event.name";
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($this->sql, $this->sqlParameters);
        parent::__construct($data);
    }

    private function buildSQL() {
        if (isset(\App\Request::params()['eventid'])) {
            if (!is_numeric(\App\Request::params()['eventid'])) {
                if (is_numeric(\App\Request::params()['eventid'])) {
                    throw new \App\ClientError(403);
                }
                throw new \App\ClientError(422);
            }
            
            $this->sql .= " WHERE event.eventID = :eventid";
            $this->sqlParameters[":eventid"] = \App\Request::params()['eventid'];
        }
    }
}
