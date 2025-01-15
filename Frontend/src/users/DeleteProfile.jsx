import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from "reactstrap";
import { PersonBadgeFill } from "react-bootstrap-icons";
import Cookies from 'js-cookie';

const DeleteProfile = ({ setIsLoggedIn }) => {

    const { username } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/api/users/${username}`);
                setUser(res.data);
                setIsLoaded(!isLoaded);
            } catch (err) {
                console.log(err);
                navigate("/users/login");
            }
        };
        getUser();
    }, []);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your profile?')) {
            await axios.delete(`/api/users/${username}`);
            await axios.post('/api/users/logout');
            Cookies.remove('username');
            setIsLoggedIn(false);
            navigate('/');
        }
    };

    return (
        <div>
            {isLoaded ? (
                <main className="mt-5">
                    <div className="container pt-4">
                        <section>
                            <div className="row">
                                <div className="col-xl-6 col-sm-12 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between p-md-1">
                                                <div className="col-1 my-auto">
                                                    <PersonBadgeFill size={"2.5em"} color="blue" />
                                                </div>
                                                <div className="col-4 text-center my-auto">
                                                    <h3>Username:</h3>
                                                </div>
                                                <div className="col-7 text-center my-auto">
                                                    <h3 className="">{user.username}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-sm-12 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between p-md-1">
                                                <div className="col-3 text-center my-auto">
                                                    <h3>Email:</h3>
                                                </div>
                                                <div className="col-9 text-center my-auto">
                                                    <h5 className="">{user.email}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-6 col-sm-12 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between p-md-1">
                                                <div className="col-4 text-center my-auto">
                                                    <h3>First Name:</h3>
                                                </div>
                                                <div className="col-8 text-center my-auto">
                                                    <h3 className="">{user.first_name}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-sm-12 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between p-md-1">
                                                <div className="col-4 text-center my-auto">
                                                    <h3>Last Name:</h3>
                                                </div>
                                                <div className="col-8 text-center my-auto">
                                                    <h3 className="">{user.last_name}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <hr />
                        <div className='d-flex justify-content-center'>
                            <button className='btn btn-danger m-2 col-4' onClick={handleDelete}>Delete Profile?</button>
                        </div>
                    </div>
                </main>
            ) : (
                <div className="d-flex justify-content-center m-5">
                    <Spinner color="primary" />
                </div>
            )
            }
        </div>
    )
};

export default DeleteProfile;