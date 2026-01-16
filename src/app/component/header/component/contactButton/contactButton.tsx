"use client";

import React from "react";

const ContactButton = ({ ref, callback }: { ref: any; callback: any }) => {
	return (
		<button ref={ref} onClick={callback} className="button--primary">
			Jetzt durchstarten
		</button>
	);
};

export default ContactButton;
