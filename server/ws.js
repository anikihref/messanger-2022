import { wsServer } from "./index.js";

let connectedUsers = [];

export function onConnect(ws) {
    ws.on('message', (json) => {
        const data = JSON.parse(json)

        switch (data.type) {
            case 'message': {
                message(data, ws);
                break;
            }

            case 'connectionMessage': {
                connectionMessage(data, ws)
                break;
            }

            case 'closeMessage': {
                closeMessage(data)
                break;
            }

            default: {
                console.log('invalid message type')
            }
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
            message: data.message
        }))
    })
}

function connectionMessage(data, ws) {
    if (!connectedUsers.includes(data.connectionId)) {
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