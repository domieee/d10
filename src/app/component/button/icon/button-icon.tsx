import type React from "react";
import { forwardRef } from "react";
import styles from "./button-icon.module.scss";

type ButtonIconProps = {
	icon: React.ReactNode;
};

// forwardRef automatically makes the ref optional
const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
	({ icon }, ref) => {
		return (
			<button ref={ref} type="button" className={styles.iconButton}>
				{icon}
			</button>
		);
	},
);

export default ButtonIcon;
