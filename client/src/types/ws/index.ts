import { IChatMessage } from './../chatMessage';

export interface WSErrorResponse {
    responseState: 'error';
    data: Error;
}

export interface WSSuccessResponse {
    responseState: 'success';
    data: IChatMessage;
}

export type WSResponse = WSSuccessResponse | WSErrorResponse
