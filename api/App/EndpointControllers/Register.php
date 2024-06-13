<?php
/**
 * Register Endpoint
 *
 * This PHP class represents an endpoint for user registration and retrieval of user data.
 * It allows users to register by providing their name, email, and password.
 *
 * @author Maja Bosy
 */
namespace App\EndpointControllers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Register extends Endpoint {
    public function __construct()
    { 
        switch(\App\Request::method()) 
        {
            case 'POST':
                $data = $this->addUser();
                break;
            default:
                throw new \App\ClientError(405);
                break;
        }
        parent::__construct($data);
    }

    private function name() 
    {
        if (!isset(\App\REQUEST::params()['name']))
        {
            throw new \App\ClientError(444);
        }
 
       $name = \App\REQUEST::params()['name'];
       return htmlspecialchars($name);
    }

    private function dob() 
    {
        if (!isset(\App\REQUEST::params()['dob']))
        {
            throw new \App\ClientError(445);
        }
 
       $dob = \App\REQUEST::params()['dob'];
       return htmlspecialchars($dob);
    }

    private function email() 
    {
        if (!isset(\App\REQUEST::params()['email']))
        {
            throw new \App\ClientError(446);
        }
 
       $email = \App\REQUEST::params()['email'];
       return htmlspecialchars($email);
    }

    private function phone() 
    {
        if (!isset(\App\REQUEST::params()['phone']))
        {
            throw new \App\ClientError(447);
        }
 
       $phone = \App\REQUEST::params()['phone'];
       return htmlspecialchars($phone);
    }

    private function password() 
    {
        if (!isset(\App\REQUEST::params()['password']))
        {
            throw new \App\ClientError(448);
        }
 
       $password = \App\REQUEST::params()['password'];
       return htmlspecialchars($password);
    }

    private function ticket() 
    {
        if (!isset(\App\REQUEST::params()['ticket']))
        {
            throw new \App\ClientError(449);
        }
 
       $ticket = \App\REQUEST::params()['ticket'];
       return htmlspecialchars($ticket);
    }

   /* private function evidence() 
    {
        if (!isset(\App\REQUEST::params()['evidence']))
        {
            throw new \App\ClientError(450);
        }
 
       $evidence = \App\REQUEST::params()['evidence'];
       return htmlspecialchars($evidence);
    }
    */

    //Check if email exists
    private function emailExists($email) 
    {
        $dbConn = new \App\Database(MAIN_DATABASE);
        $sql = "SELECT COUNT(*) AS count FROM participant WHERE email = :email";
        $sqlParams = [':email' => $email];
        $result = $dbConn->executeSQL($sql, $sqlParams); // Execute the SQL query
        $count = $result[0]['count']; // Get the count from the result
        return $count > 0; // Return true if count is greater than 0
    }
    
    private function addUser()
    { 
        $name = $this->name();
        $dob = $this->dob();
        $email = $this->email();
        $phone = $this->phone();
        $password = $this->password();
        $ticket = $this->ticket();
        $dbConn = new \App\Database(MAIN_DATABASE);
        
        // Check if email already exists
        if ($this->emailExists($email)) {
            throw new \App\ClientError(450, "Email already exists");
        }


        // Prepare SQL query with parameters
        $sql = "INSERT INTO participant (name, dob, email, phone, password, ticket) VALUES (:name, :dob, :email, :phone, :password, :ticket)";
        $sqlParams = [
            ':name' => $name,
            ':dob' => $dob,
            ':email' => $email,
            ':phone' => $phone,
            ':password' => $password,
            ':ticket' => $ticket
        ];
        $data = $dbConn->executeSQL($sql, $sqlParams);
        return [];
    }
}
