import React, { useState, useEffect } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const errorHandler = (WrappedComponent, dbAPI) => {
    return (props) => {
        const [error, setError] = useState(null);

        const reqInterceptor = dbAPI.interceptors.request.use((req) => {
            setError(null);
            return req;
        });

        const respInterceptor = dbAPI.interceptors.response.use(
            (res) => res,
            (err) => {
                console.log('[ErrorHandler.js] SetError to ', err);
                setError(err);
            }
        );

        useEffect(() => {
            console.log('[ErrorHandler.js] componentDidMount');
        }, []);

        useEffect(() => {
            console.log('[ErrorHandler.js] componentDidUpdate');
        });

        useEffect(() => {
            dbAPI.interceptors.request.eject(reqInterceptor);
            dbAPI.interceptors.response.eject(respInterceptor);
        }, [reqInterceptor, respInterceptor]);

        const closeErrorHandler = () => {
            setError(null);
        };

        return (
            <Aux>
                {console.log('[ERROR]' + error)}
                <Modal isToShow={error} closeModalHandler={closeErrorHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    };
};

export default errorHandler;
