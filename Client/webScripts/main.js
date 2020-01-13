(()=>{

    const election = require('electron');
    const ipcRenderer = election.ipcRenderer;
    const SocketEvent = require('././handlerManager/event/SocketEvent');
    ipcRenderer.on(SocketEvent.HELLO,(event,message) =>{
        console.log(message);
    });
})();