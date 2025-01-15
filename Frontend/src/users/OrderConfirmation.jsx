import React, { useEffect, useState } from 'react';

const OrderConfirmation = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className='my-4  mx-auto'>
                <h1 className=''>Order Confirmed</h1>
                <h4>Thank you for your order! Your order has been successfully placed.</h4>
                <p>Order details can be found on your profile page.</p>
                <p>We will send you an email confirmation shortly.</p>
            </div>
        </div>
    );
};

export default OrderConfirmation;