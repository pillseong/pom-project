import React, { useState, useEffect } from 'react';
import './join.css';
import axios from 'axios';

const Join = () => {
  const [nationality, setNationality] = useState({
    email: '',
    name: '',
    password: '',
    phone: '',
    birthdate: '',
    addr: '',
    sex: '',
    user_type: '',
    nickname: '',
  });
const [emailerror, setemailerror]=useState("");
const [nameerror, setnameerror]=useState("");
const [nickerror, setnickerror]=useState("");
const [pwerror, setpwerror]=useState("");
const [phoneerror, setphoneerror]=useState("");
const [brderror, setbrderror]=useState("");
const [addrerror, setaddrerror]=useState("");
const [sexerror, setsexerror]=useState("");
const [typeerror, settypeerror]=useState("");


  const address = 'http://15.164.26.83:8000/signup/signup/';
  const email_address = 'http://15.164.26.83:8000/signup/email_verify/';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;

    script.onload = () => {
      // Kakao 지도 API 스크립트가 로드된 후 실행되어야 하는 코드
      const daum = window.daum || {};
      if (daum.Postcode) {
        window.sample6_execDaumPostcode = () => {
          new daum.Postcode({
            oncomplete: function (data) {
              var addr = '';
              var extraAddr = '';

              if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                  extraAddr += data.bname;
                }
                if (data.buildingName !== '' && data.apartment === 'Y') {
                  extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
                }
                if (extraAddr !== '') {
                  extraAddr = ' (' + extraAddr + ')';
                }
                document.getElementById('sample6_extraAddress').value = extraAddr;
              } else {
                document.getElementById('sample6_extraAddress').value = '';
              }

              document.getElementById('sample6_postcode').value = data.zonecode;
              document.getElementById('sample6_address').value = addr;
              document.getElementById('sample6_detailAddress').focus();
            },
          }).open();
        };
      } else {
        console.error('Kakao 지도 API 스크립트가 로드되지 않았습니다.');
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  const handleNationalityChange = (value) => {
    setNationality({ ...nationality, sex: value });
  };

  const handleUsertypechange = (value) => {
    setNationality({ ...nationality, user_type: value });
  };

  const handlenickupchange = (value) => {
    setNationality({ ...nationality, nickname: value });
  };

  const handlepwupchange = (event) => {
    setNationality({ ...nationality, password: event.target.value });
  };

  const handlenamechange = (value) => {
    setNationality({ ...nationality, name: value });
  };

  const handleemailchange = (event) => {
    setNationality({ ...nationality, email: event.target.value });
  };

  const handlebrchange = (value) => {
    setNationality({ ...nationality, birthdate: value });
  };

  const handleaddrchange = (value) => {
    setNationality({ ...nationality, addr: value });
  };

  const handlephonechange = (value) => {
    setNationality({ ...nationality, phone: value });
  };

 
  const onPostevent = async () => {
    if(nationality.email===""){
      setemailerror("*이메일을 확인해 주십시오")
    }
    else{
      setemailerror("");
    }
    if(nationality.password===""){
      setpwerror("*비밀번호를 확인해 주십시오")
    }
  else{
    setpwerror("");
  }
    if(nationality.name===""){
      setnameerror("*이름을 확인해 주십시오")
    }
   
    else{
      setnameerror("")
    }
      try {
        const response = await axios.post(address, {
          email: nationality.email,
          name: nationality.name,
          password: nationality.password,
          phone: nationality.phone,
          birthdate: nationality.birthdate,
          addr: nationality.addr,
          sex: nationality.sex,
          user_type: nationality.user_type,
          nickname: nationality.nickname,
        });
       
      
        // 성공적으로 요청이 완료되면 오류 메시지 초기화
        setemailerror("");
        console.log(response);
      } catch (error) {
        console.error('post 에러 발생', error);
      }
    }
  
  useEffect(() => {
    console.log(nationality);
  }, [nationality]);

  const onClickemail = async () => {
    try {
      const respon = await axios.post(email_address, {
        email: nationality.email,
      });
      console.log(nationality.email);
    } catch (error) {
      console.error('이메일 인증 오류 발생', error);
    }
  };

  return (
    <div className='singup__box'>
      <div className='imfor_box'>
        <h2 className='singup__title'>회원가입</h2>
        <div className='singup__state__box'></div>
        <input
          type='email'
          placeholder='이메일'
          className='singup__state'
          onChange={handleemailchange}
        ></input>
        <button className='email_sign' onClick={onClickemail}>
          이메일 인증
        </button>
      </div>

      <input
        type='password'
        placeholder='비밀번호'
        className='singup__state1'
        onChange={handlepwupchange}
      ></input>
      <div className='emailerror__text'>{emailerror}</div>
      <div className='pwerror__text'>{pwerror}</div>

      <input
        type='text'
        placeholder='이름'
        className='singup__state2'
        onChange={(e) => handlenamechange(e.target.value)}
      ></input>

      <input
        type='text'
        placeholder='닉네임'
        className='singup__state3'
        onChange={(e) => handlenickupchange(e.target.value)}
      ></input>

      <input
        type='date'
        placeholder='생년월일 8자리  -포함'
        className='singup__state3'
        onChange={(e) => handlebrchange(e.target.value)}
      ></input>

    
      <div className='nationality-options'>
        <div className='nationality__boxs'></div>
        <div
          className={`nationality-option ${nationality.sex === 'M' ? 'selected ' : ''}`}
          onClick={() => handleNationalityChange('M')}
          style={{ marginLeft: '-50px', position: 'absolute' }}
        >
          남자
        </div>
        <div
          className={`nationality-option ${nationality.sex === 'F' ? 'selected' : ''}`}
          onClick={() => handleNationalityChange('F')}
          style={{ marginLeft: '40px', position: 'absolute' }}
        >
          여자
        </div>
        <div
          className={`korean-option ${nationality.user_type === 'i' ? 'ON' : ''}`}
          onClick={() => handleUsertypechange('i')}
          style={{ marginLeft: '150px', position: 'absolute' }}
        >
          개인
        </div>
        <div
          className={`korean-option ${nationality.user_type === 'e' ? 'ON' : ''}`}
          onClick={() => handleUsertypechange('e')}
          style={{ marginLeft: '240px', position: 'absolute' }}
        >
          기업
        </div>
      </div>

      <input
        type='number'
        placeholder='휴대폰 번호  (-제외)'
        className='singup__state4'
        onChange={(e) => handlephonechange(e.target.value)}
      ></input>

      <button className='cert__button'>인증하기</button>
      <div className='nameerror__text'>{nameerror}</div>
      <div className='nickerror__text'>{nickerror}</div>
      <div className='brderror_text'>{brderror}</div>
      <div className='sexerror__text'>{sexerror}</div>
      <div className='typerror__text'>{typeerror}</div>
      <div className='phoneerror__text'>{phoneerror}</div>

      
      <div className='address-box'>
        <input type='text' id='sample6_postcode' placeholder='우편번호' className='addr_1' />
        <button type='button' onClick={window.sample6_execDaumPostcode}>
          우편번호 찾기
        </button>
        <br />
        <input type='text' id='sample6_address' placeholder='주소' className='addr_2'/>
        <br />
        <input type='text' id='sample6_detailAddress' placeholder='상세주소' className='addr_3' />
        
      </div>


      <button className='signup__button' onClick={onPostevent}>
        회원가입
      </button>
    </div>
  );
};

export default Join;
