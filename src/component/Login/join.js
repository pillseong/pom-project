import React,{useState,useEffect} from 'react';
import "./join.css"
import axios from 'axios';
const Join = () => {
  const [nationality, setNationality] = useState({
    email: "",
    name:"",
    password:"",
    phone:"",
    birthdate:"",
    addr:"",
    sex:"",
    user_type:"",
    nickname:"" 

}); // 내/외국인 선택 상태
const address="http://15.164.26.83:8000/signup/signup/"
const email_address="http://15.164.26.83:8000/signup/email_verify/"

 
  const handleNationalityChange = (value) => {
    setNationality({...nationality, sex: value });
   
  }
  const handleUsertypechange = (value) => {
    setNationality({...nationality,user_type: value });
   
  }
  const handlenickupchange = (value) => {
    setNationality({...nationality,nickname: value});
  }
  
  const handlepwupchange=(event)=>{
    setNationality({...nationality,password:event.target.value})
    
  } 
  const handlenamechange=(value)=>{
    setNationality({...nationality,name:value})
  }
  const handleemailchange=(event)=>{
    setNationality({...nationality,email:event.target.value})

  }
  const handlebrchange=(value)=>{
    setNationality({...nationality,birthdate:value})

  }
  const handleaddrchange=(value)=>{
    setNationality({...nationality,addr:value})

  }
   const handlephonechange=(value)=>{
    setNationality({...nationality,phone:value})


  }
  const onPostevent=async()=>{
    try{
      const response= await axios.post(address,{
        email:nationality.email,
        name:nationality.name,
        password:nationality.password,
        phone:nationality.phone,
        birthdate:nationality.birthdate,
        addr:nationality.addr,
        sex:nationality.sex,
        user_type:nationality.user_type,
        nickname:nationality.nickname
        
      })
      console.log(response)


    }catch(error){
      console.error("post 에러 발생",error);
    }

  }


  useEffect(() => {
    console.log(nationality);
  }, [nationality]);

  const onClickemail=async()=>{
    try{

      const respon=await axios.post(email_address,{
        email:nationality.email
      
      
      })
      console.log(nationality.email)
    



    }catch(error){
      console.error("이메일 인증 오류 발생",error)

    }


  }
  return (
    <div className='singup__box'>
      <div className='imfor_box'>
      <h2 className='singup__title'>회원가입</h2>
      <div className='singup__state__box'></div>
      <input type='email'
       placeholder='이메일'
      className='singup__state'
      onChange={handleemailchange}></input>
      <button className='email_sign'
      onClick={onClickemail}>이메일 인증</button>
      </div>
        
        <input type='password'
        placeholder='비밀번호'
        className='singup__state1'
        onChange={handlepwupchange}></input>
    
    <input type='text'
       placeholder='이름'
      className='singup__state2'
      onChange={(e)=>handlenamechange(e.target.value)}></input>
 <input type='text'
       placeholder='닉네임'
      className='singup__state3'
      onChange={(e)=>handlenickupchange(e.target.value)}
    ></input>
      

<input type='date'
       placeholder='생년월일 8자리  -포함'
      className='singup__state3'
      onChange={(e)=>handlebrchange(e.target.value)}></input>
    
      <input type='text'
       placeholder='주소'
      className='singup__state3'
      onChange={(e)=>handleaddrchange(e.target.value)}></input>


<div className="nationality-options">
  <div className='nationality__boxs'></div>
        <div
          className={`nationality-option ${nationality.sex === "M" ? "selected " : ""}`}
          onClick={() => handleNationalityChange("M")}
          style={{marginLeft:"-50px",position:"absolute"}}
          
        >
          남자
        </div>
        <div
          className={`nationality-option ${nationality.sex === "F" ? "selected" : ""}`}
          onClick={() => handleNationalityChange("F")}
          style={{marginLeft:"40px",position:"absolute"}}
        > 
          여자
        </div>
        <div
          className={`korean-option ${nationality.user_type === "i" ? "ON" : ""}`}
          onClick={() => handleUsertypechange("i")}
          style={{marginLeft:"150px",position:"absolute"}}
          
        >
         개인
        </div>
        <div
          className={`korean-option ${nationality.user_type === "e"? "ON" : ""}`}
          onClick={() => handleUsertypechange("e")}
          style={{marginLeft:"240px",position:"absolute"}}
        > 
        기업
        </div>
        
        
      </div>

      <input type='number'
       placeholder='휴대폰 번호  (-제외)'
      className='singup__state4'
      onChange={(e)=>handlephonechange(e.target.value)}></input>

      
    <button className='cert__button'>인증하기</button>
  


        <button className='signup__button'
        onClick={onPostevent}>회원가입</button>
    </div>
  
     
  );
};

export default Join;
