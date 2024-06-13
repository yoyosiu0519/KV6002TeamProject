<?php

namespace App;

/**
 * An abstract class that handles routing requests to the correct endpoint controller.
 * Throws a 404 error if the endpoint is not found.
 * 
 * @author Team
 */
abstract class Router
{
    public static function routeRequest()
    {
        $requestedEndpoint = strtolower(Request::endpointName());
        try
        {
            switch ($requestedEndpoint) {
                case '':
                case '/developer':
                case '/developer/':
                    $endpoint = new EndpointControllers\Developer();
                    break;
                case '/content':
                case '/content/':
                    $endpoint = new EndpointControllers\Content();
                    break;
                case '/token':
                case '/token/':
                    $endpoint = new EndpointControllers\Token();
                    break;
                case '/volunteerevent':
                case '/volunteerevent/':
                    $endpoint = new EndpointControllers\VolunteerEvent();
                    break;
                case '/event':
                case '/event/':
                    $endpoint = new EndpointControllers\Event();
                    break;
                case '/waiting':
                case '/waiting/':
                    $endpoint = new EndpointControllers\WaitingList();
                    break;
                case '/register':
                case '/register/':
                    $endpoint = new EndpointControllers\Register();
                    break;
                case '/attend':
                case '/attend/':
                    $endpoint = new EndpointControllers\ParticipantEvent();
                    break;
                case '/eventlist':
                case '/eventlist/':
                    $endpoint = new EndpointControllers\EventList();
                    break;
                case '/volunteerlist':
                case '/volunteerlist/':
                    $endpoint = new EndpointControllers\VolunteerEventList();
                    break;
                case '/volunteeravailability':
                case '/volunteeravailability/':
                    $endpoint = new EndpointControllers\VolunteerAvailability();
                    break;
                case '/newsletter':
                case '/newsletter/':
                case '/newsletters':
                case '/newsletters/':
                    $endpoint = new EndpointControllers\Newsletter();
                    break;
                
                case '/sponsor':
                case '/sponsor/':
                    $endpoint = new EndpointControllers\Sponsor();
                    break; 
                case '/adminregister':
                case '/adminregister/':
                    $endpoint = new EndpointControllers\AdminRegister();
                    break;
                case '/checkparticipant':
                case '/checkparticipant/':
                    $endpoint = new EndpointControllers\ParticipantApplication();
                    break;
                case '/volunteer':
                case '/volunteer/':
                    $endpoint = new EndpointControllers\Volunteer();
                    break;
                
                case '/participant':
                case '/participant/':
                        $endpoint = new EndpointControllers\ParticipantProfile();
                        break;
                case '/waitingdata':
                case '/waitingdata/':
                        $endpoint = new EndpointControllers\WaitingData();
                        break;
                default:
                    throw new ClientError(404);
            }
        } catch (ClientError $e) {
            $data = ['message' => $e->getMessage()];
            $endpoint = new EndpointControllers\Endpoint($data);
        }
        return $endpoint;
    }
}