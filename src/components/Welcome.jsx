import React, { useEffect, useState } from 'react'
import robot from "../assets/robot.gif"
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Welcome() {

    const [user, setUser] = useState({});

    const navigate=useNavigate();

    useEffect(() => {
        (async () => {
            if (localStorage.getItem("chat-app-user")) {
                const user=await JSON.parse(localStorage.getItem("chat-app-user"));
                setUser(user);
            }
            else{
                navigate("/navigate");
            }
        })();
    }, [])


    return (

        <>
            <Container>
                <img src={robot} />
                <h1>
                    Welcome, <span>{user.username}!</span>
                </h1>
                <h3>Please select a chat to Start messaging.</h3>
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
    color: #4e0eff;
  }
`;
export default Welcome