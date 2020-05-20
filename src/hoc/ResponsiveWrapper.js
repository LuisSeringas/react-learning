import React from 'react';

const ResponsiveWrapper = (props) => (
    <div className={props.className}>
        {props.children}
    </div>
);

export default ResponsiveWrapper;
 
