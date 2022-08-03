import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: {
            username: '',
            email: '',
            id: '',
        },
        status: "pending",
    });
    const history = useHistory();
    const decoder = jwt_decode;

    useEffect(() => {
        console.log("Context wordt gerefresht!");
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decoder(token);
            const id = Number(decoded.sub);
            console.log(id);
            getUser(token, id);
        } else {
            toggleIsAuth({
                ...isAuth,
                isAuth: false,
                user: {},
                status: 'done'
            });
        }
    }, []);

    function login(token) {
        console.log('Gebruiker is ingelogd!', token);
        localStorage.setItem('token', token);
        const decoded = decoder(token);
        const id = Number(decoded.sub);
        console.log(id);
        getUser(token, id);
        history.push('/profile');
    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        localStorage.removeItem('token');
        toggleIsAuth({
            ...isAuth,
            isAuth: false,
            user: {}
        });
        history.push('/');
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    async function getUser(tokenCode, tokenDecoded) {
        console.log("check", tokenCode);
        try {
            const result = await axios.get(`http://localhost:3000/600/users/${tokenDecoded}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenCode}`,
                },
            });

            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                },
                status: 'done',
            });

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? {children} : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;