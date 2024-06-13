<?php

namespace App\EndpointControllers;
/**
 * ParticipantApplication endpoint
 * 
 * This endpoint is used to get request for participant information 
 *  and update the 'eligible' field of each pending participant record.
 *  
 * @author Pik Sum Siu 
 * Student ID: w20012367
 */

 class ParticipantApplication extends Endpoint {

    public function __construct(){

        switch(\App\Request::method()) 
        {
            case 'GET':
                $data = $this->getParticipant();
                break;
            case 'POST':
                $data = $this->postEligible();
                break;
        }
        parent::__construct($data);
    }

    private function eligible() 
    {
        if (!isset(\App\REQUEST::params()['eligible']))
        {
            throw new \App\ClientError(422);
        }
 
       $eligible = \App\REQUEST::params()['eligible'];
       return htmlspecialchars($eligible);
    }

    private function participantID() 
    {
        if (!isset(\App\REQUEST::params()['participantid']))
        {
            throw new \App\ClientError(422);
        }
       $participantID = \App\REQUEST::params()['participantid'];
       return htmlspecialchars($participantID);
    }

    private function getParticipant() { 
        $where = false; 
        $sql = "SELECT participantID, name, dob, 
        email, phone, eligible, evidence FROM participant
        WHERE eligible is NULL";   
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($sql);
        
        // Convert the 'evidence' field of all records in the result set
        foreach ($data as $key => $record) {
            if (!empty($record['evidence'])) {
                $data[$key]['evidence'] = base64_encode($record['evidence']);
            }
        }				

    
        return $data;
    }

    private function postEligible() {

        $eligible = $this->eligible();
        $participantID = $this->participantID();

        $dbConn = new \App\Database(MAIN_DATABASE);
 
        $sqlParameters = [
            'eligible' => $eligible,
            'participantid' => $participantID
        ];

        $sql = "UPDATE participant SET eligible = :eligible WHERE participantID = :participantid";
        $data = $dbConn->executeSQL($sql, $sqlParameters);
     
        return [];
    }

}
