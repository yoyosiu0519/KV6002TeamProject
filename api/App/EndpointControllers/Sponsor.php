<?php

namespace App\EndpointControllers;

/**
 * Sponsor
 * 
 * This class is responsible for handling the sponsor endpoint:
 * adding, deleting, and getting sponsors.
 * 
 * params: email
 *
 * @author Aiden Anserson W21047714
 */

 class Sponsor extends Endpoint {

    public function __construct() {

        switch(\App\Request::method()) {
            case 'GET':
            $data = $this->getSponsor();
                break;
            case 'POST':
            $data = $this->addSponsor();
                break;
            case 'DELETE':
            $data = $this->deleteSponsor();
                break;
            default:
                throw new \App\ClientError(405);
        }
        parent::__construct($data);
    }

    // Retrieves all email addresses subscribed to the sponsor from the sponsor table.
    private function getSponsor() {

        $dbConn = new \App\Database(MAIN_DATABASE);

        $sql = "SELECT sponsor.email FROM sponsor ORDER BY email";
        $data = $dbConn->executeSQL($sql);

        return $data;

    }

    // Adds a new email address to the sponsor table.
    private function addSponsor() {

        if (!isset(\App\REQUEST::params()['email'])) {

            throw new \App\ClientError(422);

        }

        $email = \App\Request::params()['email'];

        $dbConn = new \App\Database(MAIN_DATABASE);

        $sqlParams = [':email' => $email];
        $sql = "SELECT * FROM sponsor WHERE email = :email";
        $data = $dbConn->executeSQL($sql, $sqlParams);
 
        if (count($data) === 0) {

            $sql = "INSERT INTO sponsor (email) VALUES (:email)";
            $data = $dbConn->executeSQL($sql, $sqlParams);

        }
        return [];

    }

    // Deletes an email address from the sponsor table.
    private function deleteSponsor() {

        if (!isset(\App\REQUEST::params()['email'])) {

            throw new \App\ClientError(422);

        }

        $email = \App\Request::params()['email'];

        $dbConn = new \App\Database(MAIN_DATABASE);

        $sqlParams = [':email' => $email];
        $sql = "DELETE FROM sponsor WHERE email = :email";
        $data = $dbConn->executeSQL($sql, $sqlParams);
        return $data;

    }

}