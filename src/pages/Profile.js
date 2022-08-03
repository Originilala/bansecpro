import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const {user} = useContext(AuthContext);
    const [profData, setProfData] = useState(null);


    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:3000/600/private-content`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);

                setProfData(response.data);
            } catch (e) {
                console.log(e)
            }
        }
        fetchUser();
    }, [])



  return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </section>
      <section>
        <h2>Strikt geheime profiel-content</h2>
          <p>{profData.title}</p>
          <p>{profData.content}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;