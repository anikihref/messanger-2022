import { WSSuccessResponse } from '../../types/ws/index';
import { EVENT_TYPES } from "../../types/ws/messageWS";


// handle response by default returns Promise<WSSuccessResponse> but in generic you can add your own types handleAsyncWS<WSSuccessResponse & YourInterface>
export function handleAsyncWS<T extends WSSuccessResponse>(
    eventType: EVENT_TYPES,
    webSocket: WebSocket
): Promise<T> {
    let resolveScoped: (value: T | PromiseLike<T>) => void;
    let rejectScoped: (reason?: any) => void; 

    function responseHandler (
        evt: MessageEvent<any>
    ) {
        const response: T = JSON.parse(evt.data);
        
        if (response.eventType === eventType) {
            if (response.responseState === 'success') {
                resolveScoped(response)
            } else {
                rejectScoped(response)
            }
        }
    }

    const promise: Promise<T> = new Promise((resolve, reject) => {
        resolveScoped = resolve
        rejectScoped = reject

        webSocket.addEventListener('message', responseHandler)
    })

    promise
        .finally(() => {
            webSocket?.removeEventListener('message', responseHandler)
        })


    return promise
}