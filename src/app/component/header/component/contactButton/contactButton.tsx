'use client'

import React from 'react';

const ContactButton = ({ref, callback}: {ref: any, callback: any}) => {
    return (
        <button ref={ref} style={{opacity: 0,   display: "none"}} onClick={callback} className="button--primary">Jetzt durchstarten</button>
    );
};

export default ContactButton;