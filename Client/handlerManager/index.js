'use strict'

const SocketEvnet = require('./event/SocketEvent');

module.exports = [
    {
        event:SocketEvnet.CONNECT,
        handler :require('./handler/OnConnect')
    },
    {
        event:SocketEvnet.CONNECT_TIMEOUT,
        handler :require('./handler/OnConnectTimeout')
    },
    {
        event:SocketEvnet.DISCONNECT,
        handler :require('./handler/OnDisconnect')
    },
    {
        event:SocketEvnet.HELLO,
        handler :require('./handler/OnHello')
    },
    {
        event:SocketEvnet.PING,
        handler :require('./handler/OnPing')
    },
    {
        event:SocketEvnet.PONG,
        handler :require('./handler/OnPong')
    },
    {
        event:SocketEvnet.RECONNECT_ERROR,
        handler :require('./handler/OnReconnectError')
    },
    {
        event:SocketEvnet.RECONNECT_FAILED,
        handler :require('./handler/OnReconnectFailed')
    },
    {
        event:SocketEvnet.RECONNECTING,
        handler :require('./handler/OnReconnecting')
    },

];