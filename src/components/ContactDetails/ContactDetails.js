import React, { useState } from 'react';
import Styles from './ContactDetails.module.css';
import { connect } from 'react-redux';

import Button from '../UI/Button/Button';
import dbAPI from '../../DB-API';
import Spinner from '../UI/Spinner/Spinner';
import Input from '../UI/Input/Input';

const orderFormShape = {
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Name',
        },
        value: '',
        validations: {
            required: true,
            minLength: 4,
        },
        valid: false,
        touched: false,
    },
    street: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Street',
        },
        value: '',
        validations: {
            required: true,
        },
        valid: false,
        touched: false,
    },
    zipCode: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'ZIP Code',
        },
        value: '',
        validations: {
            required: true,
            zipCode: true,
        },
        valid: false,
        touched: false,
    },
    country: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Country',
        },
        value: '',
        validations: {
            required: true,
        },
        valid: false,
        touched: false,
    },
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Email',
        },
        value: '',
        validations: {
            required: true,
            email: true,
        },
        valid: false,
        touched: false,
    },
    deliveryMethod: {
        elementType: 'select',
        elementConfig: {
            options: [
                { value: 'fastest', displayValue: 'Fastest' },
                { value: 'normal', displayValue: 'Normal' },
            ],
        },
        value: '',
        valid: true,
    },
};

const ContactDetails = (props) => {
    const [loading, setLoading] = useState(false);

    const [orderForm, setOrderForm] = useState(orderFormShape);

    const [isValidForm, setIsValidForm] = useState(false);

    const OrderHandler = (event) => {
        //To prevent the page reload
        event.preventDefault();

        setLoading(true);

        const formData = {};

        for (let field in orderForm) {
            formData[field] = orderForm[field].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: props.price,
            OrderDetails: formData,
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

    const inputChangeHandler = (event, inputField) => {
        //This steps are very important because when we use spreed, we don't copy deeply, so the nested object still be the same pointers
        const orderFormUpdated = {
            ...orderForm,
        };

        const fieldUpdated = {
            ...orderFormUpdated[inputField],
        };

        fieldUpdated.value = event.target.value;
        fieldUpdated.valid = checkValidations(
            fieldUpdated.validations,
            fieldUpdated
        );

        fieldUpdated.touched = true;
        orderFormUpdated[inputField] = fieldUpdated;

        let isValidForm = true;

        for (let inputField in orderFormUpdated) {
            isValidForm = orderFormUpdated[inputField].valid && isValidForm;
        }

        setOrderForm(orderFormUpdated);
        setIsValidForm(isValidForm);
    };

    const checkValidations = (rules, inputField) => {
        let isValid = true;

        if (!rules) {
            return true;
        }

        // "&& isValid" ensure all rules are true, if we didn't check it, the input is validated to true if the last rule is true, even if the rules checked before was false.
        if (rules.required) {
            isValid = inputField.value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = inputField.value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = inputField.value.length <= rules.maxLength && isValid;
        }

        if (rules.zipCode) {
            const regex = /^(([0-9]{4})|([0-9]{5}))((?:-[0-9]{3})|(?:-[0-9]{4}))?$/;
            isValid = regex.test(inputField.value) && isValid;
        }

        if (rules.email) {
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            isValid = regex.test(inputField.value) && isValid;
        }

        return isValid;
    };

    let form = (
        <form onSubmit={OrderHandler}>
            {Object.keys(orderForm).map((inputField) => (
                <Input
                    key={inputField}
                    elementType={orderForm[inputField].elementType}
                    elementConfig={orderForm[inputField].elementConfig}
                    value={orderForm[inputField].value}
                    isInvalid={!orderForm[inputField].valid}
                    shouldValidate={
                        orderForm[inputField].validations &&
                        orderForm[inputField].touched
                    }
                    OnChange={(event) => inputChangeHandler(event, inputField)}
                />
            ))}

            <Button btnType="Success" disabled={!isValidForm}>
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice,
    };
};

export default connect(mapStateToProps)(ContactDetails);
