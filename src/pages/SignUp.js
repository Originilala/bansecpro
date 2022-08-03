import axios from "axios";
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

function SignUp() {
    const history = useHistory();
    const [messageValue, setMessageValue] = useState({
        email : "",
        password : "",
        username : ""
    })

    // let {nameUser, passUser, mailUser } = messageValue;

    async function submitForm() {
        console.log(messageValue.email, messageValue.password, messageValue.username);
        console.log(messageValue);
        try{
            const response = await axios.post("http://localhost:3000/register", messageValue);
            console.log(response.status);
            if(response.status === 201 || response.status === 200) {
                history.push("/signin")
            }
        } catch (e){
            console.error(e);
        }

    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form>
                <label>Name:
                    <input
                        type="text"
                        name="username"
                        value={messageValue.username}
                        onChange={(e) => {
                            setMessageValue({
                                ...messageValue,
                                username: e.target.value
                            })
                        }}
                    />
                </label>
                <label>Password:
                    <input
                        type="password"
                        name="password"
                        value={messageValue.password}
                        onChange={(e) => {
                            setMessageValue({
                                ...messageValue,
                                password: e.target.value
                            })
                        }}
                    />
                </label>
                <label>Email:
                    <input
                        type="email"
                        name="email"
                        value={messageValue.email}
                        onChange={(e) => {
                            setMessageValue({
                                ...messageValue,
                                email: e.target.value
                            })
                        }}
                    />
                </label>
                <button
                    type="button"
                    onClick={submitForm}
                >Submit
                </button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;