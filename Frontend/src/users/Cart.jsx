import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { X } from 'react-bootstrap-icons';
import { useNavigate, Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';

const Cart = () => {

    const [cart, setCart] = useState();
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        address2: '',
        country: '',
        state: '',
        zip: '',
        paymentMethod: 'creditCard',
        cardName: '',
        cardNumber: '',
        cardExpiration: '',
        cardCVV: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const items = cart;
        try {
            await axios.post('/api/cart/purchase', { items });
            navigate('/order-confirmation');
        } catch (error) {
            console.error(error);
            alert('Failed to complete order')
        }

    };

    const handleRemove = (id) => async () => {
        try {
            await axios.get(`/api/cart/delete/${id}`);
        } catch (error) {
            console.error(error);
            alert('Error removing item from cart');
        }
        try {
            const res = await axios.get('/api/cart');
            if (res.data.items.length) {
                setCart(res.data.items);
                let totalPrice = 0;
                for (let item of res.data.items) {
                    totalPrice += (item.price * item.quantity);
                }
                let salesTax = totalPrice * 0.07;
                setTax(salesTax);
                setSubtotal(totalPrice);
                if (totalPrice > 50) {
                    setTotal(totalPrice + salesTax);
                } else {
                    setTotal(totalPrice + salesTax + 7.99);
                }
            }
        } catch (error) {
            console.error(error);
        }
        navigate('/cart');
    };

    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await axios.get('/api/cart');
                if (res.data.items.length) {
                    setCart(res.data.items);
                    let totalPrice = 0;
                    for (let item of res.data.items) {
                        totalPrice += (item.price * item.quantity);
                    }
                    let salesTax = totalPrice * 0.07;
                    setTax(salesTax);
                    setSubtotal(totalPrice);
                    if (totalPrice > 50) {
                        setTotal(totalPrice + salesTax);
                    } else {
                        setTotal(totalPrice + salesTax + 7.99);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchCart();
    }, []);

    return (
        <>
            {isLoaded ? (
                <div>
                    <main className="mt-5 pt-4">
                        <div className="container">
                            <h2 className="my-5 text-center">Checkout</h2>
                            <div className="row">
                                <div className="col-lg-8 mb-4">
                                    <div className="card p-4">
                                        <form className='p-2' onSubmit={handleSubmit}>
                                            <div className="row mb-3">
                                                <div className="col-md-6 mb-2">
                                                    <div className="form-outline">
                                                        <input type="text" id="firstName" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} />
                                                        <label className="form-label" htmlFor="firstName">First Name</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <div className="form-outline">
                                                        <input type="text" id="lastName" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} />
                                                        <label className="form-label" htmlFor="lastName">Last Name</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="mb-0">Email</p>
                                            <div className="form-outline mb-4">
                                                <input type="email" name="email" className="form-control" placeholder="youremail@example.com" aria-label="youremail@example.com" aria-describedby="basic-addon1" value={formData.email} onChange={handleChange} />
                                            </div>
                                            <p className="mb-0">Address</p>
                                            <div className="form-outline mb-4">
                                                <input type="text" name="address" className="form-control" placeholder="1234 Main St" aria-label="1234 Main St" aria-describedby="basic-addon1" value={formData.address} onChange={handleChange} />
                                            </div>
                                            <p className="mb-0">Address 2 (optional)</p>
                                            <div className="form-outline mb-4">
                                                <input type="text" name="address2" className="form-control" placeholder="Apartment or suite" aria-label="Apartment or suite" aria-describedby="basic-addon1" value={formData.address2} onChange={handleChange} />
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4 col-md-12 mb-4">
                                                    <p className="mb-0">Country</p>
                                                    <div className="form-outline mb-4">
                                                        <input type="text" name="country" className="form-control" placeholder="United States" aria-label="United States" aria-describedby="basic-addon1" value={formData.country} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-12 mb-4">
                                                    <p className="mb-0">State</p>
                                                    <div className="form-outline mb-4">
                                                        <input type="text" name="state" className="form-control" placeholder="California" aria-label="California" aria-describedby="basic-addon1" value={formData.state} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-12 mb-4">
                                                    <p className="mb-0">Zip</p>
                                                    <div className="form-outline">
                                                        <input type="text" name="zip" className="form-control" value={formData.zip} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="sameAddress" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                                                <label className="form-check-label" htmlFor="sameAddress">Shipping address is the same as my billing address</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="saveInfo" />
                                                <label className="form-check-label" htmlFor="saveInfo">Save this information for next time</label>
                                            </div>
                                            <hr />
                                            {isChecked ? null : (
                                                <>
                                                    <div className='d-flex justify-content-center m-2'>
                                                        <h5>Billing Address</h5>
                                                    </div>
                                                    <p className="mb-0">Address</p>
                                                    <div className="form-outline mb-4">
                                                        <input type="text" name="billingAddress" className="form-control" placeholder="1234 Main St" aria-label="1234 Main St" aria-describedby="basic-addon1" value={formData.billingAddress} onChange={handleChange} />
                                                    </div>
                                                    <p className="mb-0">Address 2 (optional)</p>
                                                    <div className="form-outline mb-4">
                                                        <input type="text" name="billingAddress2" className="form-control" placeholder="Apartment or suite" aria-label="Apartment or suite" aria-describedby="basic-addon1" value={formData.billingAddress2} onChange={handleChange} />
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-4 col-md-12 mb-4">
                                                            <p className="mb-0">Country</p>
                                                            <div className="form-outline mb-4">
                                                                <input type="text" name="billingCountry" className="form-control" placeholder="United States" aria-label="United States" aria-describedby="basic-addon1" value={formData.billingCountry} onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-12 mb-4">
                                                            <p className="mb-0">State</p>
                                                            <div className="form-outline mb-4">
                                                                <input type="text" name="billingState" className="form-control" placeholder="California" aria-label="California" aria-describedby="basic-addon1" value={formData.billingState} onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-12 mb-4">
                                                            <p className="mb-0">Zip</p>
                                                            <div className="form-outline">
                                                                <input type="text" name="billingZip" className="form-control" value={formData.billingZip} onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </>
                                            )}
                                            <div className="my-3">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="paymentMethod" id="creditCard" value="creditCard" checked={formData.paymentMethod === 'creditCard'} onChange={handleChange} />
                                                    <label className="form-check-label" htmlFor="creditCard"> Credit card </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="paymentMethod" id="debitCard" value="debitCard" checked={formData.paymentMethod === 'debitCard'} onChange={handleChange} />
                                                    <label className="form-check-label" htmlFor="debitCard"> Debit card </label>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6 mb-3">
                                                    <p className="mb-0">Name on card</p>
                                                    <div className="form-outline">
                                                        <input type="text" name="cardName" className="form-control" value={formData.cardName} onChange={handleChange} />
                                                        <div className="form-helper">Full name as displayed on card</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <p className="mb-0">Credit card number</p>
                                                    <div className="form-outline">
                                                        <input type="text" name="cardNumber" className="form-control" value={formData.cardNumber} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-3 mb-3">
                                                    <p className="mb-0">Expiration</p>
                                                    <div className="form-outline">
                                                        <input type="text" name="cardExpiration" className="form-control" value={formData.cardExpiration} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <p className="mb-0">CVV</p>
                                                    <div className="form-outline">
                                                        <input type="text" name="cardCVV" className="form-control" value={formData.cardCVV} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="mb-4" />
                                            <div className='d-grid gap-2'>
                                                <button className={`btn btn-primary  ${cart ? "" : "disabled"}`} type="submit">Confirm Purchase</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-4">
                                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="text-muted">Cart Items</span>
                                    </h4>
                                    <ul className="list-group mb-3">
                                        {cart ? (
                                            cart.map((item) => (
                                                <Link to={`/${item.type}/cards/${item.id}`} style={{ textDecoration: "none" }}>
                                                    <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                                                        <img src={item.image} width={"100px"} alt="" />
                                                        <div className='mt-2 mx-auto text-center'>
                                                            <h5 className="my-2">{item.name}</h5>
                                                            <h6 className="text-muted">Quantity: {item.quantity}</h6>
                                                            <span className="text-muted">${item.price}</span>
                                                        </div>
                                                        <div>
                                                            <X size={"1.5em"} className='remove-icon' style={{ cursor: 'pointer' }} onClick={handleRemove(item.id)} />
                                                        </div>
                                                    </li>
                                                </Link>
                                            ))
                                        ) : (
                                            <li key={uuid()} className="list-group-item d-flex justify-content-center">
                                                <div className=''>
                                                    <h5 className="my-2">Your Cart is Empty</h5>
                                                </div>
                                            </li>
                                        )}
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Subtotal</span>
                                            <strong>${subtotal.toFixed(2)}</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Tax</span>
                                            <strong>${tax.toFixed(2)}</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Shipping</span>
                                            {total > 50 ? <strong>Free</strong> : <strong>$7.99</strong>}
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Total (USD)</span>
                                            <strong>${total.toFixed(2)}</strong>
                                        </li>
                                    </ul>
                                    <form className="card p-2">
                                        <div className="input-group my-2">
                                            <input type="text" className="form-control" placeholder="Promo code" aria-label="Promo code" aria-describedby="button-addon2" />
                                            <button className="btn btn-success" type="button" id="button-addon2">Redeem</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div >
                    </main >
                    <style jsx>{`
                        .remove-icon:hover {
                            color: red;
                        }
                    `}</style>
                </div>
            ) : (
                <div className="d-flex justify-content-center m-5">
                    <Spinner color="primary" />
                </div>
            )}
        </>
    );
};

export default Cart;