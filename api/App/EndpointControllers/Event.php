<?php

namespace App\EndpointControllers;

 /**
 * 
 *
 * @author Antonio Gorgan
 * This endpoint is used to create, view and delete events in the database 
 */ 

class Event extends Endpoint {

    
    public function __construct(){
//        $ths-> autoDeleteEvent();
        switch(\App\Request::method()) 
        {
            case 'GET':
                $data = $this->getEvent();
                break;
            case 'POST':
                $data = $this->postEvent();
                break;
            case 'DELETE':
                $data = $this->deleteEvent();
                break;
            default:
                throw new \App\ClientError(405);
                break;
        }
        parent::__construct($data);
    }

    private function name() {
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

    private function description() {
        if (!isset(\App\REQUEST::params()['description']))
        {
            throw new \App\ClientError(422);
        }
 
        if (mb_strlen(\App\REQUEST::params()['description']) > 250)
        {
            throw new \App\ClientError(402);
        }
 
       $description = \App\REQUEST::params()['description'];
       return htmlspecialchars($description);
    }

    private function date() 
    {
        if (!isset(\App\REQUEST::params()['date']))
        {
            throw new \App\ClientError(422);
        }
 
        if (mb_strlen(\App\REQUEST::params()['date']) > 50)
        {
            throw new \App\ClientError(402);
        }
 
       $date = \App\REQUEST::params()['date'];
       return htmlspecialchars($date);
    }

    private function time() 
    {
        if (!isset(\App\REQUEST::params()['time']))
        {
            throw new \App\ClientError(422);
        }
 
       $time = \App\REQUEST::params()['time'];
       return htmlspecialchars($time);
    }


    private function location() 
    {
        if (!isset(\App\REQUEST::params()['location']))
        {
            throw new \App\ClientError(422);
        }
 
        if (mb_strlen(\App\REQUEST::params()['location']) > 50)
        {
            throw new \App\ClientError(402);
        }
 
       $location = \App\REQUEST::params()['location'];
       return htmlspecialchars($location);
    }

    private function space() 
    {
        if (!isset(\App\REQUEST::params()['space']))
        {
            throw new \App\ClientError(422);
        }
 
        if (!is_numeric(\App\REQUEST::params()['space']) )
        {
            throw new \App\ClientError(402);
        }
 
       $space = \App\REQUEST::params()['space'];
       return htmlspecialchars($space);
    }


    private function getEvent() { 
        $where = false; 
        $sql = "SELECT event.eventID, event.name, event.description, 
                event.date, event.time, event.location, event.space FROM event";   
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($sql);
        return $data;
    }

    private function postEvent() {

        $name = $this->name();
        $description = $this->description();
        $date = $this->date();
        $time = $this->time();
        $location = $this->location();
        $space = $this->space();
 
        $dbConn = new \App\Database(MAIN_DATABASE);
 
        $sqlParameters = ['eventid' => $eventID];
        $sql = "SELECT * FROM event WHERE eventID = :eventid";
        $data = $dbConn->executeSQL($sql, $sqlParameters);

        if (count($data) === 0) {
            $sql = "INSERT INTO event (name, description, date, time, location, space) 
                    VALUES (:name, :description, :date, :time, :location, :space)";
        } else {
            $sql = "UPDATE event SET name = :name, description = :description, 
                    date = :date, time = :time, location = :location, space = :space 
                    WHERE eventID = :eventID";
        }

        $sqlParameters = ['name' => $name, 'description' => $description, 'time' => $time, 
                         'location' => $location, 'space' => $space, 'date'=>$date];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
     
        return [];
    }

    private function deleteEvent() {
        if (!isset(\App\REQUEST::params()['eventid']))
        {
            throw new \App\ClientError(422);
        }
 
        $eventID =\App\REQUEST::params()['eventid'];
        
        if (!is_numeric($eventID))
        {
            throw new \App\ClientError(422);
        }
 
        $dbConn = new \App\Database(MAIN_DATABASE);
        $sql = "DELETE FROM event WHERE eventID = :eventid";
        $sqlParameters = ['eventid' => $eventID];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
        return $data;
    }

   /* private function autoDeleteEvent() {
        $dbConn = new \App\Database(MAIN_DATABASE);
    
        // Calculate the date 5 days 
        $fiveDaysAgo = date('Y-m-d H:i:s', strtotime('-5 days'));
    
        // sql query to delete events older than 5 days
        $sql = "DELETE FROM event WHERE CONCAT(date, ' ', time) <= :fiveDaysAgo";
        $sqlParameters = ['fiveDaysAgo' => $fiveDaysAgo];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
    
        return true; 
    }*/
}