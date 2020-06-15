import React, { useState } from 'react';
import Styles from './ContactDetails.module.css';

import Button from '../UI/Button/Button';
import dbAPI from '../../DB-API';
import Spinner from '../UI/Spinner/Spinner';

const ContactDetails = (props) => {
    const [loading, setLoading] = useState(false);

    const OrderHandler = (event) => {
        //To prevent the page reload
        event.preventDefault();
        console.log(props.ingredients);

        setLoading(true);

        const order = {
            ingredients: props.ingredients,
            price: props.price,
            customer: {
                name: 'Seringas',
                address: {
                    street: 'test Street',
                    zipCode: '6000-200',
                    country: 'Portugal',
                },
                email: 'test@test.com',
            },
            orderNumber: '2342342-random',
        };

        dbAPI
            .post('/orders.json', order)
            .then((response) => {
                setLoading(false);
                props.history.push('/');
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    let form = (
        <form className={Styles.Form}>
            <input
                className={Styles.Input}
                type="text"
                name="name"
                placeholder="Your Name"
            />
            <input
                className={Styles.Input}
                type="text"
                name="email"
                placeholder="Your Email"
            />
            <input
                className={Styles.Input}
                type="text"
                name="street"
                placeholder="Street"
            />
            <input
                className={Styles.Input}
                type="text"
                name="postalCode"
                placeholder="Postal Code"
            />
            <Button btnType="Success" onClick={OrderHandler}>
                Order
            </Button>
        </form>
    );

    if (loading) {
        form = <Spinner />;
    }
    return (
        <div className={Styles.ContactDetails}>
            <h4>Enter your Contact Details</h4>
            {form}
        </div>
    );
};

export default ContactDetails;
