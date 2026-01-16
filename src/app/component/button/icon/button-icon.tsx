import type React from "react";
import { forwardRef } from "react";
import styles from "./button-icon.module.scss";

type ButtonIconProps = {
	icon: React.ReactNode;
	callback: any;
	style?: React.CSSProperties;
};

// forwardRef automatically makes the ref optional
const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
	({ icon, callback = null, style = {} }, ref) => {
		return (
			<button
				onClick={callback}
				ref={ref}
				style={style}
				type="button"
				className={styles.iconButton}
			>
				{icon}
			</button>
		);
	},
);

export default ButtonIcon;
