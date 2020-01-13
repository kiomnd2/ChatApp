(()=>{
    const election = require('electron');
    const ipcRenderer = election.ipcRenderer;
    const SocketEvent = require('././handlerManager/event/SocketEvent');
    ipcRenderer.on(SocketEvent.HELLO,(event,message) =>{
        console.log(message);
    });

    const userIdInput=  document.getElementById('user-id-input');
    const userPasswordInput = document.getElementById('user-password-input');

    const signUpButton = document.getElementById('button-SignUp');
    const cancelButton = document.getElementById('button-Cancel');

    /**
     * 로그인 시
     */
    cancelButton.addEventListener('click', () =>{
        ipcRenderer.send('destroySignUpModal');
    });

    /**
     * 회원가입 시
     */
    signUpButton.addEventListener('click', () =>{
        console.log('click');
        const id = userIdInput.value;
        const password = userPasswordInput.value;
        const parameter = {
            id : id,
            password : password
        };
        ipcRenderer.send('signUpRequest', parameter);
    });
    ipcRenderer.on('signUpRequest-Success',(event,message)=>{
        console.log(message);
        alert("가입성공");
        ipcRenderer.send('destroySignUpModal');
    });
    ipcRenderer.on('signUpRequest-Failed',(event,message)=>{
        console.log(message);
        alert(message.statusText);
    });

})();