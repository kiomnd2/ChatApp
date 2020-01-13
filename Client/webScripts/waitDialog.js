(()=>{
    const election = require('electron');
    const ipcRenderer = election.ipcRenderer;

    ipcRenderer.on("hello",(event,args)=>{
        event.sender.send('destroyWaitDialog');
    });



})();