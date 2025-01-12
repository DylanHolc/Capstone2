import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ChangePassword = () => {
    const { username } = useParams();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { oldPassword, newPassword };
        try {
            await axios.patch(`/api/users/${username}/password`, formData);
            navigate(`/${username}`);
        } catch (error) {
            console.log(error);
            alert('Failed to change password');
            navigate(`/${username}`);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="oldPassword" className="form-label">Old Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Confirm Changes</button>
            </form>
        </div>
    );
};

export default ChangePassword;