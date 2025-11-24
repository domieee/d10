import styles from "./button-secondary.module.scss";

const ButtonSecondary = ({ text }: { text: string }) => {
	return (
		<button type="button" className={styles.buttonSecondary}>
			{text}
		</button>
	);
};

export default ButtonSecondary;
