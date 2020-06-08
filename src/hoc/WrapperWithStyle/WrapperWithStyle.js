import React from 'react';

const WrapperWithStyle = (WrappedComponent, className) => {
    return (props) => (
        <div className={className}>
            <WrappedComponent {...props} />
        </div>
    );
};

export default WrapperWithStyle;