import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProfile = () => {

    const { username } = useParams();
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/api/users/${username}`);
                const user = res.data
                setFormData({ username: user.username, first_name: user.first_name, last_name: user.last_name, email: user.email });
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { username: formData.username, first_name: formData.first_name, last_name: formData.last_name, email: formData.email };
        try {
            axios.patch(`/api/users/${username}`, data);
            navigate(`/${username}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;