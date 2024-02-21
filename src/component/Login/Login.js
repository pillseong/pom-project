import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const address="http://15.164.26.83:8000/api/token/"
const readdress="http://15.164.26.83/api/token/refresh/" //리프래시토큰을 보내면 새로운 엑세스토큰 전달됨




const Login = () => {
  const [userdata, setuserdata] = useState({
    email: '',
    password: ''
  });

  const onChangeId = (value) => {
    setuserdata({ ...userdata, email: value }); 
  };

  const onChangePw = (value) => {
    setuserdata({ ...userdata, password: value });
  };
const onClickLogin=async()=>{
  try{
   const response= await axios.post(address,{
      email:userdata.email,
      password:userdata.password

   
    })
    Cookies.set("access_token", JSON.stringify(response.data.access));
    Cookies.set("refresh_token", JSON.stringify(response.data.refresh));
    const cookie = Cookies.get("access_token");
    const recookie= Cookies.get("refresh_token")
    const parsedCookie = JSON.parse(cookie);
    const reparesdCookie=JSON.parse(recookie)

    console.log('쿠키에 저장된 엑세스 토큰:', parsedCookie);
    console.log("쿠키에 저장된 리프래시 토큰:",reparesdCookie);


    
    
    const Token_post=async()=>{
      try{
        const accesstoken=Cookies.get("access_token");
        const refreshtoken=Cookies.get("refresh_token")

       const tokenup=await axios.post(address,accesstoken)
      console.log(tokenup.data)
      }catch(error){
        console.error("엑세스 토큰 전달 오류",error)

      }
     
    }


  }catch(error){
    console.error("post 에러 ",error)
    
  }
}
useEffect(()=>{
  console.log(userdata)

},[userdata])

  return (
    <div className="Login__box">
      <h2 className="Login__title">LOGIN</h2>
      <div className='check__box'>
     <input
     type='radio'/>개인
     <input
     type='radio'/>기업
     </div>
      <div className="Input__container">
        <input
          onChange={(e) => onChangeId(e.target.value)}
          placeholder="이메일"
          className="Id__input"
          type='email'
        />
        <input
          onChange={(e) => onChangePw(e.target.value)}
          placeholder="비밀번호"
          className="Pw__input"
          type='password'
        />
      </div>
      <Link className="Join" to="/Check" >회원가입</Link>
      <button type='submit' className="Login__button" onClick={onClickLogin}>LOGIN</button>
    </div>
  );
};

export default Login;
