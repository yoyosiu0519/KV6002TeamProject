<?php

namespace App\EndpointControllers;

/**
 * Newsletter
 * 
 * This class is responsible for handling the newsletter endpoint:
 * adding, deleting, and getting newsletter.
 * 
 * params: email
 *
 * @author Aiden Anderson W21047714
 */

 class Newsletter extends Endpoint {

    public function __construct() {

        switch(\App\Request::method()) {
            case 'GET':
            $data = $this->getNewsletter();
                break;
            case 'POST':
            $data = $this->addNewsletter();
                break;
            case 'DELETE':
            $data = $this->deleteNewsletter();
                break;
            default:
                throw new \App\ClientError(405);
        }
        parent::__construct($data);
    }

    // Retrieves all email addresses subscribed to the newsletter from the newsletter table.
    private function getNewsletter() {

        $dbConn = new \App\Database(MAIN_DATABASE);

        $sql = "SELECT newsletter.email FROM newsletter ORDER BY email";
        $data = $dbConn->executeSQL($sql);

        return $data;

    }

    // Adds a new email address to the newsletter table.
    private function addNewsletter() {

        if (!isset(\App\REQUEST::params()['email'])) {

            throw new \App\ClientError(422);

        }

        $email = \App\Request::params()['email'];

        $dbConn = new \App\Database(MAIN_DATABASE);

        $sqlParams = [':email' => $email];
        $sql = "SELECT * FROM newsletter WHERE email = :email";
        $data = $dbConn->executeSQL($sql, $sqlParams);

        if (count($data) === 0) {

            $sql = "INSERT INTO newsletter (email) VALUES (:email)";
            $data = $dbConn->executeSQL($sql, $sqlParams);

        }
        return [];
 
    }

    // Deletes an email address from the newsletter table.
    private function deleteNewsletter() {

        if (!isset(\App\REQUEST::params()['email'])) {

            throw new \App\ClientError(422);

        }

        $email = \App\Request::params()['email'];
 
        $dbConn = new \App\Database(MAIN_DATABASE);

        $sqlParams = [':email' => $email];
        $sql = "DELETE FROM newsletter WHERE email = :email";
        $data = $dbConn->executeSQL($sql, $sqlParams);
        return $data;

    }

}