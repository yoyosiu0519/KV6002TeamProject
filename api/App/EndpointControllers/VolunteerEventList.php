<?php

namespace App\EndpointControllers;

 /**
 * 
 *
 * @author Antonio Gorgan
 * This endpoint is used to retrieve participants name and numbers for each event 
 */ 

class VolunteerEventList extends Endpoint
{
    public function __construct() {
        $sql = "SELECT event.eventID, event.name AS event_name, 
                COUNT(volunteerEvent.volunteerID) AS numberOfVo,
                GROUP_CONCAT(volunteer.name) AS volunteerNames
                FROM event JOIN volunteerEvent ON volunteerEvent.eventID = event.eventID
                JOIN volunteer ON volunteer.volunteerID = volunteerEvent.volunteerID
                GROUP BY event.eventID, event.name";
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($sql);
        parent::__construct($data);
    }
    
   
}