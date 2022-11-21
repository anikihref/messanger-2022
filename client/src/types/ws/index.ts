import { EVENT_TYPES } from './messageWS';
import { IChatMessage } from './../chatMessage';

export interface WSErrorResponse {
    responseState: 'error';
    message: string;
    eventType: EVENT_TYPES.join | EVENT_TYPES.leave | EVENT_TYPES.send
}

// this response gets only the user that emits leaving or joining the room or sending a message
export interface WSSuccessResponse {
    responseState: 'success';
    eventType: EVENT_TYPES.leave | EVENT_TYPES.join | EVENT_TYPES.send
}

// this response get all the user from multicast except the user who emited this message
export interface WSSuccessResponseWithData {
    responseState: 'success';
    data: IChatMessage;
    eventType: EVENT_TYPES.send;
}


export type WSResponse = WSSuccessResponseWithData | WSSuccessResponse| WSErrorResponse
