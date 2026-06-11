import React, { useState } from 'react';
import { Modal, Input, Typography, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRegisterUser } from '../../store/hooks/useUser';

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

const Wrapper = styled.div`
  padding: 10px;
`;

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

const initialState = {
  username: "",
  password: "",
  confirmPassword: "",
  age: "",
  email: "",
  city: ""
};

const RegisterForm = ({ open, setOpen }) => {
  const registerMutation = useRegisterUser();
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (event) => {
    if (event && event.preventDefault) event.preventDefault();

    const { username, password, confirmPassword, email, age, city } = user;

    if (!username.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {
      const submitData = {
        username,
        password,
        email,
        city,
        age: age ? Number(age) : ""
      };

      await registerMutation.mutateAsync(submitData);
      alert("회원가입 성공");
      setOpen(false);
      setUser(initialState);
      navigate("/");
    } catch(error) {
      alert(error?.message || "회원가입 실패");
    }
  };

  return (
    <Modal
      open={open}
      onOk={handleRegister}
      onCancel={() => setOpen(false)}
      okText="회원가입"
      cancelText="취소"
      confirmLoading={registerMutation.isPending}
      width={500}
      centered
    >
      <Wrapper>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>회원가입</Typography.Title>

        <Description>
          새로운 계정을 생성하세요.
        </Description>

        <InputGroup>
          <Label>아이디</Label>
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
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="비밀번호 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>비밀번호 확인</Label>
          <StyledInput
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호 다시 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>나이</Label>
          <StyledInput
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
            placeholder="나이 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>이메일</Label>
          <StyledInput
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="이메일 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>도시</Label>
          <StyledInput
            type="text"
            name="city"
            value={user.city}
            onChange={handleChange}
            placeholder="도시 입력"
          />
        </InputGroup>

        <Divider />
      </Wrapper>
    </Modal>
  );
};

export default RegisterForm;