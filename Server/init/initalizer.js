'use strict';

exports.InitMongoDb = (env,mongoose) => {
    if(env.VCAP_SERVICES){
        /**
         * 클라우드 환경
         */
    }else{
        /**
         * 로컬
         * mongodb://<dbuser>:<dbpassword>@ds153093.mlab.com:53093/firstexample
         */
        const connectUrl = 'mongodb://admin:qwer1234!@ds153093.mlab.com:53093/firstexample';
        const options = {
            connectTimeoutMS : 4000,
            keepAlive:true,
            ha:true,
            autoReconnect:true,
            reconnectTries:30
        };
        mongoose.connect(connectUrl,options);
        const db= mongoose.connection;
        db.on('open',()=>{
            console.log('connected');
        })

    }
};