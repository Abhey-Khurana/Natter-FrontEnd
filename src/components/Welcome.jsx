import React, { useEffect, useState } from 'react'
import welcome from "../assets/welcome.gif"
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';

function Welcome() {

    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (localStorage.getItem("chat-app-user")) {
                const user = await JSON.parse(localStorage.getItem("chat-app-user"));
                setUser(user);
            }
            else {
                navigate("/navigate");
            }
        })();
    }, [])


    return (

        <>
            <Container>
                <img src={welcome} />
                <h1>
                    Welcome, <span>{user.username}!</span>
                </h1>
                <h3>Please select a chat to Start messaging.</h3>
                <LogoutButton>
                    <Logout />
                </LogoutButton>
                <h4>Logout</h4>
            </Container>
        </>
    )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #5a189a;
  }
  h4{
    margin-top:0.5rem;
    color:#5a189a;
  }
`;

const LogoutButton = styled.div`
  margin-top: 1rem;
  
`
export default Welcome