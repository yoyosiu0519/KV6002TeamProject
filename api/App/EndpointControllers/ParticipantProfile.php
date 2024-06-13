<?php

 /**
 * 
 *
 * @author Maja Bosy
 * This endpoint is used to view and edit participant details in the database 
 */ 

 namespace App\EndpointControllers;

 use Firebase\JWT\JWT;
 use Firebase\JWT\Key;


class ParticipantProfile extends Endpoint {

    
    public function __construct(){
        $id = $this->validateToken();
        $this->checkUserExists($id);        
        switch(\App\Request::method()) 
        {
            case 'GET':
                $data = $this->getParticipant($id);
                break;
            case 'POST':
                $data = $this->updateDetails($id);
                break;
            default:
                throw new \App\ClientError(405);
                break;
        }
        parent::__construct($data);
    }

    private function validateToken() {
        $secretkey = SECRET;    

        $jwt = \App\Request::getBearerToken();

        try {
            $decodedJWT =  \Firebase\JWT\JWT::decode($jwt, new \Firebase\JWT\Key($secretkey, 'HS256'));
        } catch (Exception $e) {
            error_log('Error decoding token: ' . $e->getMessage());
            error_log('Received token: ' . $jwt);
            throw new \App\ClientError(401);
        }
        if (!isset($decodedJWT->exp) || !isset($decodedJWT->id)) { 
            throw new \App\ClientError(401);
        }

        return $decodedJWT->id;
    }

    private function checkUserExists($id)
    {
        $dbConn = new \App\Database(MAIN_DATABASE);
        $sql = "SELECT participantID FROM participant WHERE participantID = :id";
        $sqlParameters = [':id' => $id];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
        if (count($data) != 1) {
            throw new \App\ClientError(401);
        }
    }

    private function name() 
    {
        if (!isset(\App\REQUEST::params()['name']))
        {
            throw new \App\ClientError(422);
        }
 
        if (mb_strlen(\App\REQUEST::params()['name']) > 50)
        {
            throw new \App\ClientError(402);
        }
 
       $name = \App\REQUEST::params()['name'];
       return htmlspecialchars($name);
    }

    private function phone() 
    {
        if (!isset(\App\REQUEST::params()['phone']))
        {
            throw new \App\ClientError(422);
        }
 
        if (!is_numeric(\App\REQUEST::params()['phone']))
        {
            throw new \App\ClientError(402);
        }
 
       $phone = \App\REQUEST::params()['phone'];
       return htmlspecialchars($phone);
    }

    private function email() 
    {
        if (!isset(\App\REQUEST::params()['email']))
        {
            throw new \App\ClientError(422);
        }
       $email = \App\REQUEST::params()['email'];
       return htmlspecialchars($email);
    }

    private function password() 
    {
        if (!isset(\App\REQUEST::params()['password']))
        {
            throw new \App\ClientError(422);
        }
 
        if (mb_strlen(\App\REQUEST::params()['password']) > 50)
        {
            throw new \App\ClientError(402);
        }
 
       $password = \App\REQUEST::params()['password'];
       return htmlspecialchars($password);
    }

    private function evidence()
    {
        if (!isset($_FILES['evidence']['tmp_name'])) // Check if evidence file is uploaded
        {
            throw new \App\ClientError(450); // Throw error if evidence is not provided
        }
    
        // Move uploaded file to desired directory and return its path
        $evidence_path = '/path/to/evidence_directory/' . $_FILES['evidence']['name'];
        move_uploaded_file($_FILES['evidence']['tmp_name'], $evidence_path);
        
        return htmlspecialchars($evidence_path); // Return path to evidence file
    }
    

    private function getParticipant($id) { 
        $sqlParameters = ['id' => $id];
    
        $sql = "SELECT name, phone, email, dob, evidence FROM participant WHERE participantID = :id";
        
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($sql, $sqlParameters);
    
        // Convert blob evidence to base64 encoded string
        if (!empty($data[0]['evidence'])) {
            $data[0]['evidence'] = base64_encode($data[0]['evidence']);
        }
    
        return $data;
    }
    

    private function updateDetails($id) {
        // Retrieve the phone number from the request parameters
        $phone = $this->phone(); 
        $email = $this->email(); 
        $name = $this->name(); 
    
        // Check if file was uploaded successfully
        if(isset($_FILES['evidence']) && $_FILES['evidence']['error'] === UPLOAD_ERR_OK) {
            // Read the uploaded file content
            $evidence = file_get_contents($_FILES['evidence']['tmp_name']);
        } else {
            $evidence = null; // No new evidence provided
        }
    
        // Update participant details including evidence
        $sql = "UPDATE participant SET phone = :phone, email = :email, name = :name";
        if ($evidence !== null) {
            $sql .= ", evidence = :evidence";
        }
        $sql .= " WHERE participantID = :id";
        $sqlParameters = ['phone' => $phone, 'email' => $email, 'name' => $name, 'id' => $id];
        if ($evidence !== null) {
            $sqlParameters['evidence'] = $evidence;
        }
                      
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($sql, $sqlParameters);
    
        return [];
    }

 }