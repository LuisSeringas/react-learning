import React from 'react';
import Style from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
    const styles = [Style.Modal];

    if (props.isToShow) {
        styles.push(Style.OnPurchase);
    }

    return (
        <Aux>
            <Backdrop show={props.isToShow} clicked={props.closeModalHandler} />
            <div className={styles.join(' ')}>{props.children}</div>
        </Aux>
    );
};

function areEqual(prevProps, nextProps) {
    return (
        prevProps.isToShow === nextProps.isToShow &&
        prevProps.children === nextProps.children
    );
}

export default React.memo(Modal, areEqual);
