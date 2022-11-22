import { MongooseIDType } from '..';
import { EVENT_TYPES } from './messageWS';
import { IChatMessage } from './../chatMessage';

export interface WSErrorResponse {
    responseState: 'error';
    message: string;
    eventType: EVENT_TYPES
}

// this response gets only the user that emits leaving or joining the room or sending a message
export interface WSSuccessResponse {
    responseState: 'success';
    eventType: EVENT_TYPES
}

// this response get all the user from multicast except the user who emited this message
export interface WSSuccessResponseWithData<T> {
    responseState: 'success';
    data: T;
    eventType: EVENT_TYPES.send | EVENT_TYPES.delete;
}

export type WSResponse = WSSuccessResponseWithData<IChatMessage | MongooseIDType> | WSSuccessResponse| WSErrorResponse
