import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const api = import.meta.env.VITE_BACKEND_API;

const Logout = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.post(`${api}/users/logout`);
                Cookies.remove('username');
                setIsLoggedIn(false);
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        };
        logout();
    }, []);

    return (
        <></>
    );
}

export default Logout;