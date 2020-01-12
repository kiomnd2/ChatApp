const express = require('express');
const router = express.Router();

/**
 * login 요청 : 요청은 메서드는 post, body에 id, password 키로 값을 보낸다. 로그인 성공조건은 id === 본인이름 password === 분인이름+123
 */

/**
 * id : 본인이름
 * password : 본인이름123
 */
router.post('/login',(req,res,next)=>{
  const {id, password} = req.body; //body에서 id password 를 가져옴
  if(id !== '김형익')
  {
    res.status(404).json({message:"User not found"});

  }else if(password !== 'rlaguddlr123') {
    res.status(401).json({message:"Invalid Password"});
  }
  res.json({token:password});
});


/*
/!**
 * TODO : DB Model을 가지고 실제 User 생성
 *!/
router.post('/', (req,res,next)=>{

});*/

/**
 * User 생성 요청
 * body : id ,password
 * method :post
 * content-type: x-www-urlencoded, application/json
 */
router.post("/", (req,res,next)=>{
  const {id, password} = req.body;

  if(id !== '김형익')
  {
    // res.status(404).json({message:"User not found"});
    //에럭 객체 생성해 주어도 됌
    const error = new Error("Bad Request");
    error.status = 400;
    next(error);
  }else if(password !== '김형익123') {
    // res.status(401).json({message:"Invalid Password"});
    const error = new Error("Bad Request");
    error.status = 400;
    next(error);
  }

  const UserModel = {
    id: id,
    password: password
  };
  req.CreatedUser = UserModel;
  next();

});

router.post('/',(req,res,next)=>{
  res.json({message :"ok"});
});


module.exports = router;
