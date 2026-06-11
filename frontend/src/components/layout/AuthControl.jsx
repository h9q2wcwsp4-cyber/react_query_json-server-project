import React from 'react';

const AuthControl = ({ message = "로그인 후 이용 가능합니다" }) => {
    return (
        <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "300px", 
            fontSize: "18px", 
            fontWeight: "bold",
            color: "#333"
        }}>
            <div>{message}</div>
        </div>
    );
};

export default AuthControl;