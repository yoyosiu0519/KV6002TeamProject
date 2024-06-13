<?php 

namespace App;

/**
 * A custom error response for handling client errors.
 * 
 * @author Team
 */

class ClientError extends \Exception
{
    public function __construct($code)
    {
        parent::__construct($this->errorResponses($code));
    }

    public function errorResponses($code)
    {
        switch ($code) {
            case 204:
                http_response_code(204);
                $message = 'No Content';
                break;
            case 400:
                http_response_code(400);
                $message = 'Bad Request';
                break;
            case 401:
                http_response_code(401);
                $message = 'Unauthorized';
                break;
            case 403:
                http_response_code(403);
                $message = 'Forbidden';
                break;
            case 404:
                http_response_code(404);
                $message = 'Endpoint Not Found';
                break;
            case 405:
                http_response_code(405);
                $message = 'Method Not Allowed';
                break;
            case 444:
                http_response_code(444);
                $message = 'Unprocessable name';
            case 409:
                http_response_code(409);
                $message = 'No space available';
                break;
            case 422:
                http_response_code(422);
                $message = 'Unprocessable Entity';
                break;
            case 445:
                http_response_code(445);
                $message = 'Unprocessable dob';
                break;     
            case 446:
                http_response_code(446);
                $message = 'Unprocessable email';
                break;     
            case 447:
                http_response_code(447);
                $message = 'Unprocessable phone';
                break;     
            case 448:
                http_response_code(448);
                $message = 'Unprocessable password';
                break;     
            case 449:
                http_response_code(449);
                $message = 'Unprocessable ticket';
                break;     
            case 450:
                http_response_code(450);
                $message = 'Unprocessable evidence';
                break;     
            case 451:
                http_response_code(451);
                $message = 'Unprocessable evidence 2';
                break;     
             case 467:
                http_response_code(467);
                $message = 'No space';
                break;  
            case 468:
                http_response_code(468);
                $message = 'No ticket';
                break;  
            case 469:
                http_response_code(469);
                $message = 'Alredy attending';
                break;  
            case 471:
                http_response_code(471);
                $message = 'Cannot cancel';
                break;  
            case 472:
                http_response_code(472);
                $message = 'Not eligible';
                break;  

            default:
                throw new \Exception('Internal Server Error');
        }
        return $message;
    }
}
