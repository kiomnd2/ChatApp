'use strict';

const electron = require('electron');
const {app, BrowserWindow ,ipcMain} = electron;
const url = require('url');
const path = require('path');
const io = require('socket.io-client');
const axios = require('axios');
const httpInstance = axios.create({
   baseURL : 'http://127.0.0.1:3000'
});
const socketUrl = 'ws://127.0.0.1:3000';


const handler_manager = require('./handlerManager');
const SocketService =require('./service/SocketService');


let win;
let socket;
let modal;
let waitDialog;
let listener;

const displayLoginWindow=()=> {
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
    const options = {
        width :width,
        height:height,
        resizable:false,
        show : false,
        webPreferences:{
            affinity: true,
            nodeIntegration: true
        }
    };
    win = new BrowserWindow(options);
    win.loadURL(url.format({
        pathname: path.join(__dirname,'./login.html'),
        protocol : 'file'
    }));
    win.webContents.openDevTools();
    win.once('ready-to-show',()=>{
        console.log('ready-to-show');
        win.show();
    });
    win.on('closed',()=>{
        console.log('window closed');
        app.quit();
    })
};

const displaySignUpModal =(event,message)=>{
    win.webContents.send('hide-page');
    modal = new BrowserWindow({ parent : win , modal:true, show:false });
    modal.loadURL( url.format({
        pathname:path.join(__dirname, './signUpModal.html'),
        protocol:'file'
    }));
   // modal.webContents.openDevTools();
    modal.on('ready-to-show', () => {
        modal.show();
    });
    modal.on('closed',() => {
        modal = null;
    })
};
const destroySignUpModal =(event,message)=>{
    win.webContents.send('hide-page');
    modal.close();
};

const createSignUpRequest = (event,message) =>{
    httpInstance.post('/users',message)
        .then((response)=>{
            event.sender.send('signUpRequest-Success',response.data)
        })
        .catch((error)=>{
            const result = {
                status:error.response.status,
                statusText:error.response.statusText
            };
            event.sender.send('signUpRequest-Failed', result)
        });
};

const displayWaitDialog = (event,message) => {
    const options = {
        width :800,
        height:800,
        resizable:false,
        show : false,
        frame : false,
        webPreferences:{
            affinity: true,
            nodeIntegration: true
        }
    };
    waitDialog = new BrowserWindow(options);
    waitDialog.loadURL(url.format({
        pathname: path.join(__dirname,'./waitDialog.html'),
        protocol : 'file'
    }));

    waitDialog.once('ready-to-show',()=>{
        console.log("displayWaitDialog ready to show");
        win.hide();
        waitDialog.show();
        const socketOptions = {
            transports:['websocket'],
            forceNew:true,
            query :{
                token: message.data.token
            }
        };
        socket = SocketService.createSocket(io,socketUrl,socketOptions);
        listener = SocketService.addHandler(socket,waitDialog,handler_manager[0]);
    });
    waitDialog.on('closed',()=>{
        console.log('wait Dialog closed');
        waitDialog =null;
    })
};

const destroyWaitDialog = (event, message) => {
    socket.removeListener('connect', listener);

    win.loadURL(url.format({
        pathname : path.join(__dirname, './main.html'),
        protocol : 'file',
        slashes : true
    }));

    waitDialog.close();
    win.show();
    listener = SocketService.addHandlers(socket,win,handler_manager);

   /* win.once('ready-to-show', () =>{
        console.log("dom readu");
       waitDialog.close();
       win.show();
       listener = SocketService.addHandlers(socket,win,handler_manager);
    });*/
};

app.on('ready',displayLoginWindow);
ipcMain.on('displayWaitDialog',displayWaitDialog);
ipcMain.on('destroyWaitDialog',destroyWaitDialog);
ipcMain.on('displaySignUpModal',displaySignUpModal);
ipcMain.on('destroySignUpModal',destroySignUpModal);
ipcMain.on('signUpRequest', createSignUpRequest);
ipcMain.on('signInRequest',(event,message)=> {
    httpInstance.post('/users/login',message)
        .then((response)=>{
            event.sender.send('signInRequest-Success',response)
        })
        .catch((error)=>{
            const result = {
                status:error.response.status,
                statusText:error.response.statusText
            };
            event.sender.send('signInRequest-Failed', result)
        });

});

app.on('window-all-closed',()=> {
    app.quit();
});
app.on('activate',()=> {
    app.quit();
});
