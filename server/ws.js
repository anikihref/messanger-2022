let connectedUsers = [];
/* 
{
    ws: WebSocket;
    roomId: MongooseIDType
    connectionId?: MongooseIDType;
    
}
*/
export function onConnect(ws) {
    ws.on('message', (json) => {
        const data = JSON.parse(json)
        try {
            switch (data.type) {
                case 'chat/message': {
                    message(data, ws);
                    break;
                }
    
                case 'chat/connection': {
                    connectionMessage(data, ws)
                    break;
                }
    
                case 'chat/close': {
                    closeMessage(data)
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


export function onClose(ws) {
    console.log('closed connection')
}

function message(data) {
    const sameRoomUsers = connectedUsers.filter(user => (
        user.roomId === data.roomId && 
        user.connectionId !== data.connectionId
    ))

    sameRoomUsers.forEach(user => {
        user.ws.send(JSON.stringify({
            responseState: 'success',
            data: data.content
        }))
    })
}

function connectionMessage(data, ws) {
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

function closeMessage(data) {
    if (!connectedUsers.includes(data.connectionId)) {
        connectedUsers = connectedUsers.filter(user => user.connectionId !== data.connectionId)
    } else {
        throw new Error('user is already disconnected')
    }
}  