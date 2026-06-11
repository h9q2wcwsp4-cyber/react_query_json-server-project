import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLoginUser } from '../../store/hooks/useUser';
import { Modal, Input, Typography, Divider } from 'antd'; // 1. 백틱(`)을 따옴표(')로 수정

const { Title } = Typography;

const initialState = {
  username: "",
  password: ""
};

// 2. Props 구조 분해 할당 오류 수정 { open, setOpen }
const LoginForm = ({ open, setOpen }) => {
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();
  const loginMutation = useLoginUser();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (event) => {
    if (event && event.preventDefault) event.preventDefault(); // Antd Modal의 onOk는 event가 없을 수 있음 처리
    
    if (user.username.trim() === "") {
      alert("이름을 넣어주세요!");
      return;
    }

    if (user.password.trim() === "") {
      alert("비밀번호를 넣어주세요.");
      return;
    }
    
    try {
      await loginMutation.mutateAsync(user);
      alert("로그인 성공");
      setOpen(false); // 로그인 성공 시 모달 닫기 추가
      setUser(initialState)
      navigate("/");
    } catch(error) {
      alert(error?.message || "로그인실패");
    }
  };

  return (
    <Modal
      open={open}
      onOk={handleLogin}
      onCancel={() => setOpen(false)} // 3. onCancle -> onCancel 오타 수정
      okText="로그인"
      cancelText="취소" // 4. cancleText -> cancelText 오타 수정
      confirmLoading={loginMutation.isPending} // 5. confirmLoding -> confirmLoading 오타 수정
      width={450} // 6. whith -> width 오타 수정
      centered // 7. cantered -> centered 오타 수정
    >
      <wrapper>
        <Title level={3} style={{ textAlign: 'center' }}>로그인</Title>

        <Description>
          계정에 로그인하여 서비스를 이용하세요.
        </Description>

        <InputGroup>
          <Label>아이디</Label>
          {/* 8. Antd의 Input을 커스텀 Input 컴포넌트(StyledInput)로 교체 */}
          <StyledInput
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="아이디 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>비밀번호</Label>
          <StyledInput
            type="password" // 비밀번호 마스킹 처리 추가
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="비밀번호 입력"
          />
        </InputGroup>
        <Divider />

        <RegisterButton
          type="button"
          onClick={() => {
            setOpen(false);
            navigate("/")
          }}
        >
          닫기
        </RegisterButton>
      </wrapper>
    </Modal>
  ); // 9. 끊겨있던 컴포넌트 괄호 및 export 위치 정상화
};

export default LoginForm;

const wrapper = styled.div`
padding:10px 0;
`

// 스타일 컴포넌트 정의 (컴포넌트 외부)
const Description = styled.p`
  text-align: center;
  color: #64748b;
  font-size: 15px;
  margin-bottom: 32px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 8px;
`;

// 8번 해결: Antd Input과 이름 충돌을 피하기 위해 StyledInput으로 변경
const StyledInput = styled(Input)`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  font-size: 15px;
  outline: none;
  transition: 0.2s;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59,130,246,0.15);
  }
`;

const BaseButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
`;

const LoginButton = styled(BaseButton)`
  background: #2563eb;
  color: white;
  margin-top: 8px;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }
  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
`;

const RegisterButton = styled(BaseButton)`
  background: #eff6ff;
  color: #2563eb;

  &:hover {
    background: #dbeafe;
  }
`;