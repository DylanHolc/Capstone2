import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import { PersonBadgeFill } from "react-bootstrap-icons";

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [orders, setOrders] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const res = await axios.get(`/api/users/${username}`);
                setUser(res.data);
                const orderItems = await axios.get(`/api/users/${username}/orders`);
                setOrders(orderItems.data);
                setIsLoaded(!isLoaded);
            } catch (err) {
                console.log(err);
                navigate("/users/login");
            }
        };
        getUserInfo();
    }, []);

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
                        <div className="row d-flex justify-content-between">
                            <Link to={`/${username}/edit`} className="btn btn-primary m-2 col-3">Edit Profile</Link>
                            <Link to={`/${username}/password`} className="btn btn-info m-2 text-light col-3">Change Password</Link>
                            <Link to={`/${username}/delete`} className="btn btn-danger m-2 text-light col-3">Delete Profile</Link>
                        </div>
                        <hr />
                        <div>
                            <h2 className="d-flex justify-content-center">Previous Orders</h2>
                        </div>
                        <div className="mt-4">
                            {orders.map((order) => (
                                < div className="row" >
                                    <div className="col-sm-12 mb-4">
                                        <div className="card">
                                            <div className="card-title text-center mt-1">
                                                <h5>Order Date: {order.date}</h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="row g-6">
                                                    {order.pokemon ? (
                                                        order.pokemon.map((card) => (
                                                            <div key={card.card_id} className=" col-xs-12 col-md-6 col-lg-4 col-xxl-3">
                                                                <div className="d-flex justify-content-center">
                                                                    <div className="col-4">
                                                                        <img src={card.image} width={"100px"} alt="" />
                                                                    </div>
                                                                    <div className='col-4 my-auto mx-auto text-center'>
                                                                        <h5 className="my-2">{card.name}</h5>
                                                                        <h6 className="text-muted">Quantity: {card.quantity}</h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (null)}
                                                    {order.mtg ? (
                                                        order.mtg.map((card) => (
                                                            <div key={card.card_id} className="col-xs-12 col-md-6 col-lg-4 col-xxl-3">
                                                                <div className="d-flex justify-content-around">
                                                                    <div className="col-6">
                                                                        <img src={card.image} width={"100px"} alt="" />
                                                                    </div>
                                                                    <div className='col-6 my-auto mx-auto text-center'>
                                                                        <h5 className="my-2">{card.name}</h5>
                                                                        <h6 className="text-muted">Quantity: {card.quantity}</h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (null)}
                                                    {order.yugioh ? (
                                                        order.yugioh.map((card) => (
                                                            <div key={card.card_id} className="col-xs-12 col-md-6 col-lg-4 col-xxl-3">
                                                                <img src={`https://capstone2-yugioh-images.s3.us-east-1.amazonaws.com/Yugioh_Images/${card.card_id}.jpg`} width={"100px"} alt="" />
                                                                <div className='mt-2 mx-auto text-center'>
                                                                    <h5 className="my-2">{card.name}</h5>
                                                                    <h6 className="text-muted">Quantity: {card.quantity}</h6>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (null)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            ) : (
                <div className="d-flex justify-content-center m-5">
                    <Spinner color="primary" />
                </div>
            )
            }
        </div >
    );
}

export default Profile;
