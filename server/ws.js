let connectedUsers = [];
/* 
{
    ws: WebSocket;
    roomId: MongooseIDType
    connectionId?: MongooseIDType;
}
*/

const EVENT_TYPES = {
    join: 'chat/join',
    leave: 'chat/leave',
    send: 'chat/send',
}

export function onConnect(ws) {
    ws.on('message', (json) => {
        const data = JSON.parse(json)
        try {
            switch (data.type) {
                case EVENT_TYPES.send: {
                    try {
                        message(data, ws);
                        ws.send(JSON.stringify({
                            responseState: 'success',
                            eventType: EVENT_TYPES.send
                        }))
                    } catch (error) {
                        ws.send(JSON.stringify({
                            eventType: EVENT_TYPES.message,
                            responseState: 'error',
                            message: error.message || 'Could send message. Try again.'
                        }))
                    }
                    break;
                }
    
                case EVENT_TYPES.join: {
                    try {
                        joinRoom(data, ws)
                        ws.send(JSON.stringify({
                            responseState: 'success',
                            eventType: EVENT_TYPES.join
                        }))
                    } catch (error) {
                        ws.send(JSON.stringify({
                            eventType: EVENT_TYPES.join,
                            responseState: 'error',
                            message: error.message || 'Could not join this chat. Try again.'
                        }))
                    }
                    
                    break;
                }

                case EVENT_TYPES.leave: {
                    try {
                        leaveRoom(data);
                        ws.send(JSON.stringify({
                            responseState: 'success',
                            eventType: EVENT_TYPES.leave
                        }))
                    } catch (error) {
                        ws.send(JSON.stringify({
                            responseState: 'error',
                            eventType: EVENT_TYPES.leave,
                            message: error.message || 'Could not leave this chat. Try again.'
                        }))
                    }
                    break;
                }
    
                default: {
                    throw new Error('Unregistered case')
                }
            }
        } catch (error) {
            ws.send(JSON.stringify({
                responseState: 'error',
                data: error
            }))
        }
    })
}


export function onClose() {
    console.log('closed connection')
}

function message(data) {
    const multicastUsers = connectedUsers.filter(user => (
        user.roomId === data.roomId && 
        user.connectionId !== data.connectionId
    ))

    multicastUsers.forEach(user => {
        user.ws.send(JSON.stringify({
            responseState: 'success',
            eventType: EVENT_TYPES.send,
            data: data.content
        }))
    })
}

function joinRoom(data, ws) {
    if (!connectedUsers.some(user => user.connectionId === data.connectionId)) {
        connectedUsers.push({
            ws,
            connectionId: data.connectionId,
            roomId: data.roomId
        })
    } else {
        throw new Error('user is already connected')
    }
}

function leaveRoom(data) {
    if (!connectedUsers.includes(data.connectionId)) {
        connectedUsers = connectedUsers.filter(user => user.connectionId !== data.connectionId)
    } else {
        throw new Error('user is already disconnected')
    }
}  