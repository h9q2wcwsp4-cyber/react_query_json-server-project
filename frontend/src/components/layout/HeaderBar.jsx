// HeaderBar.jsx
import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../../store/hooks/useUser'
import LoginFormModal from '../user/LoginFormModal'
// 1. 임포트 누락 가정 하에 적어둠 (파일명 오타 주의: Register)
import RegisterFormModal from '../user/RegisterFormModal' 

const HeaderBar = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  
  // 2. setRigisterOpen -> setRegisterOpen 스펠링 오타 수정 (통일)
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleLogout = () => {
    logout()
    alert("로그아웃 되었습니다.")
    navigate("/login")
  }

  return (
    <>
      <Container>
        <Logo onClick={() => navigate("/")}>
          MySystem
        </Logo>
        <Menu>
          {user ?
            <UserSection>
              <UserName>
                {user.username}
              </UserName>
              <LogoutButton onClick={handleLogout}>
                로그아웃
              </LogoutButton>
            </UserSection>
            :
            <ButtonGroup>
              <LoginButton onClick={() => setLoginOpen(true)}>
                로그인
              </LoginButton>
              
              {/* 3. 회원가입 버튼 클릭 시 페이지 이동 대신 모달이 열리도록 변경 */}
              <RegisterButton onClick={() => setRegisterOpen(true)}>
                회원가입
              </RegisterButton>
            </ButtonGroup>
          }
        </Menu>
      </Container>

      <LoginFormModal 
        open={loginOpen} 
        setOpen={setLoginOpen} 
      />

      {/* 4. 잘못 닫혀있던 셀프 클로징 태그 문법 오류 수정 */}
      <RegisterFormModal
        open={registerOpen}
        setOpen={setRegisterOpen}
      />
    </>
  );
};

export default HeaderBar;

const Container = styled.header`
  width: 100%;
  height: 70px;
  background: #1e293b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
  @media (max-width: 768px){
    display: none;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #4dabf7;
  cursor: pointer;
  transition: 0.2s;
  &:hover{
    opacity: 0.8;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const UserName = styled.div`
  color: white;
  font-size: 15px;
  font-weight: 600;
  background: rgba(255,255,255,0.08);
  padding: 10px 14px;
  border-radius: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BaseButton = styled.button`
  border: none;
  outline: none;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: 0.2s;
  &:hover{
    transform: translateY(-1px);
  }
`;

const LoginButton = styled(BaseButton)`
  background: white;
  color: #1e293b;
  &:hover{
    background: #f1f5f9;
  }
`;

const RegisterButton = styled(BaseButton)`
  background: #3b82f6;
  color: white;
  &:hover{
    background: #2563eb;
  }
`;

const LogoutButton = styled(BaseButton)`
  background: #ef4444;
  color: white;
  &:hover{
    background: #dc2626;
  }
`;