import { wsServer } from "./index.js";

let connectedUsers = [];

export function onConnect(ws) {
    console.log('connection')
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

            case 'changeRoom': {
                changeRoom(data)

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
    console.log('message')

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
    if (!connectedUsers.some(user => user.connectionId === data.connectionId)) {
        connectedUsers.push({
            ws,
            connectionId: data.connectionId,
            roomId: data.roomId
        })

        console.log('connected users ' + connectedUsers.length)
    } else {
        // throw new Error('user is already connected')
    }
}

function closeMessage(data) {
    console.log('close message')
    if (!connectedUsers.includes(data.connectionId)) {
        connectedUsers = connectedUsers.filter(user => user.connectionId !== data.connectionId)

        console.log('disconnected users ' + connectedUsers.length)
    } else {
        throw new Error('user is already disconnected')
    }
}

function changeRoom(data) {
    const {connectionId, roomId} = data;
    connectedUsers = connectedUsers.map(user => {
        return user.connectionId === connectionId 
        ? {...user, roomId}
        : user
    })
}   