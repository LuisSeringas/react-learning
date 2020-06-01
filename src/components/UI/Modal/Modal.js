import React from 'react';
import Style from './Modal.module.css';
import Aux from '../../../hoc/aux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
    const styles = [Style.Modal];

    if (props.isOnPurchase) {
        styles.push(Style.OnPurchase);
    }

    return (
        <Aux>
            <Backdrop
                show={props.isOnPurchase}
                clicked={props.closeModalHandler}
            />
            <div className={styles.join(' ')}>{props.children}</div>
        </Aux>
    );
};

function areEqual(prevProps, nextProps) {
    return (
        prevProps.isOnPurchase === nextProps.isOnPurchase &&
        prevProps.children === nextProps.children
    );
}

export default React.memo(Modal, areEqual);
