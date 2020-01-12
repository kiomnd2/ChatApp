(()=>{
    const election = require('electron');
    const ipcRenderer = election.ipcRenderer;
    const SocketEvent = require('././handlerManager/event/SocketEvent');
    ipcRenderer.on(SocketEvent.HELLO,(event,message) =>{
        console.log(message);
    });

    const userIdInput=  document.getElementById('user-id-input');
    const userPasswordInput = document.getElementById('user-password-input');

    const signInButton = document.getElementById('button-SignIn');
    const signUpButton = document.getElementById('button-SignUp');

    /**
     * 로그인 시
     */
    signInButton.addEventListener('click', () =>{
        console.log('click');
        const id = userIdInput.value;
        const password = userPasswordInput.value;
        const parameter = {
            id : id,
            password : password
        };
        ipcRenderer.send('signInRequest', parameter);
    });

    ipcRenderer.on('signInRequest-Success',(event,message)=>{
        console.log(message);
        alert(message.statusText);
    });

    ipcRenderer.on('signInRequest-Failed',(event,message)=>{
        console.log(message);
        alert(message.statusText);
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
        alert(message.statusText);
    });
    ipcRenderer.on('signUpRequest-Failed',(event,message)=>{
        console.log(message);
        alert(message.statusText);
    });

})();