<?php

namespace App\EndpointControllers;

/**
 * 
 * Use this as an example of how to create a new endpoint.
 * 
 */
class Content extends Endpoint
{
    protected $allowedParams = ["page", "type"];

    private $sql = "SELECT content.id, content.title, content.abstract, type.name AS type, award.name AS award
                    FROM content
                    JOIN type ON content.type = type.id
                    LEFT JOIN content_has_award ON content.id = content_has_award.content
                    LEFT JOIN award ON content_has_award.award = award.id";

    private $sqlParams = [];

    public function __construct()
    {
        switch(\App\Request::method()) 
        {
            case 'GET':
                $this->checkAllowedParams();
                $this->buildSQL();
                $dbConn = new \App\Database(MAIN_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
            default:
                throw new \App\ClientError(405);
        }
        parent::__construct($data);
    }

    private function buildSQL()
    {
        if (isset(\App\Request::params()['type'])) 
        {
            if (count(\App\Request::params()) > 2) {
                throw new \App\ClientError(422);
            } 
            $this->sql .= " WHERE type.name = :type COLLATE NOCASE";
            $this->sqlParams[":type"] = \App\Request::params()['type'];
        }

        if (isset(\App\Request::params()['page'])) 
        {
            if (!is_numeric(\App\REQUEST::params()['page'])) {
                throw new \App\ClientError(422);
            }
            if (count(\App\Request::params()) > 2) {
                throw new \App\ClientError(422);
            } 
            if (\App\Request::params()['page'] == 1) {
                $this->sql .= " LIMIT 20";
            } elseif (\App\Request::params()['page'] > 1){
                $this->sql .= " LIMIT 20 OFFSET :offset";
                $this->sqlParams[":offset"] = (\App\Request::params()['page']) * 10;
            }
        }
    }
}