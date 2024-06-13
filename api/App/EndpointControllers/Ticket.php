<?php

/**
 * Rating class represents an endpoint for managing user ratings for content.
 * It extends the Endpoint class and allows users to get, create, and delete ratings.
 *
 * @author Antonio Gorgan
 * 
 */

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Ticket extends Endpoint {
    
    public function __construct(){
        $id = $this->validateToken();
        $this->checkUserExists($id);
        switch(Request::method()) 
        {
            case 'GET':
                $data = $this->getRatings($id);
                break;
            case 'POST':
                $data = $this->giveRarting($id);
                break;
            case 'DELETE':
                $data = $this->deleteRating($id);
                break;
            default:
                throw new ClientError(405);
                break;
        }
        parent::__construct($data);
    }

    private function validateToken() {
        $secretkey = SECRET;
                
        $jwt = REQUEST::getToken();
 
        try {
            $decodedJWT = JWT::decode($jwt, new Key($secretkey, 'HS256'));
        } catch (Exception $e) {
            error_log('Error decoding token: ' . $e->getMessage());
            error_log('Received token: ' . $jwt);
            throw new ClientError(401);
        }
 
        if (!isset($decodedJWT->exp) || !isset($decodedJWT->id)) { 
            throw new ClientError(401);
        }
 
        return $decodedJWT->id;
    }

    private function ticket() 
    {
        if (!isset(REQUEST::params()['ticket']))
        {
            throw new ClientError(422);
        }
 
        if (!is_numeric(REQUEST::params()['ticket']))
        {
            throw new ClientError(422);
        }
 
       $ticket = REQUEST::params()['ticket'];
       return htmlspecialchars($ticket);
    }

    private function checkUserExists($id)
    {
        $dbConn = new \App\Database(MAIN_DATABASE);
        $sql = "SELECT participantID FROM participant WHERE participantID = :id";
        $sqlParameters = [':id' => $id];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
        if (count($data) != 1) {
            throw new ClientError(401);
        }
    }
    

    private function getTicket($id) { 
        $where = false; 
        $sql = "SELECT ticket FROM participant WHERE participantID = :id";   
        $sqlParameters = [':id' => $id];    

        $dbConn = new \App\Database(MAIN_DATABASE);

        $data = $dbConn->executeSQL($sql, $sqlParameters);
        return $data;
    }

    private function deleteTicket($id) {
        if (!isset(REQUEST::params()['participantID']))
        {
            throw new ClientError(422);
        }
 
        $participantID = REQUEST::params()['participantID'];
        
        if (!is_numeric($contentID))
        {
            throw new ClientError(422);
        }
 
        $dbConn = new \App\Database(MAIN_DATABASE);
        $sql = "UPDATE participant SET ticket = ticket - 1 WHERE participantID = :id";
        $dbConn->executeSQL($sql, $sqlParameters);
        $sqlParameters = [':id' => $id, 'participantID' => $participantID];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
        return $data;
    }
}
