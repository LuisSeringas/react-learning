import React, { useState, useEffect } from 'react';

import Order from '../../components/Burger/Order/Order';
import dbAPI from '../../DB-API';
import errorHandler from '../../hoc/errorHandler/errorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState(null);

    //ComponentDidMount
    useEffect(() => {
        setLoading(true);

        dbAPI
            .get('orders.json')
            .then((res) => {
                const fetchOrders = [];

                for (let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key,
                    });
                }
                setOrders(fetchOrders);
                setLoading(false);
                console.log(fetchOrders);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);

    let ordersToPresent = <Spinner />;

    if (orders) {
        ordersToPresent = orders.map((order) => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
            />
        ));
    }

    return <div>{ordersToPresent}</div>;
};

export default errorHandler(Orders, dbAPI);
