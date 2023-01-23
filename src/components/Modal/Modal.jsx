import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import classNames from "classnames";

// функция размонтирования
function ModalInner({closeHandler, children}) {

			// функция закрытия модального окна по Esc
	useEffect(() => {

		const closeModalByEscape = (e) => {
			if (e.key === "Escape") {
				closeHandler()
			}
		}
		document.addEventListener("keydown", closeModalByEscape)

    // удаляем обработчик после закрытия
		return () => {
			console.log("useEffect Return")
			document.removeEventListener("keydown", closeModalByEscape)
		}
	}, [])

	 // функция закрытия модального окна на крестик
	const closeModalByClickX = () => closeHandler()

	return (
	<div className={styles.modalInner}>
		<button type="button" className={classNames(
			"btn",
			"btn-primary",
			"btn-sm",
			styles.closeBtn,
		)} 
		onClick={closeModalByClickX}>x</button>
		{children}
	</div>
	)
}

export const Modal = ({isOpen, closeHandler, children}) => {
	console.log({isOpen, closeHandler})

	if (!isOpen) return null // если ... разметку не возвращаем

	// функция закрытия модального окна по фону
	const closeModalByClickWrapper = (e) => {
		console.log (e.currentTarget)
		if (e.target === e.currentTarget) {
			closeHandler()
		}
	}

	// указываем где находится наша разметка в портале
	return createPortal(
		<div onMouseDown={closeModalByClickWrapper} className={styles.modalWr}>
			<ModalInner closeHandler={closeHandler}>
				{children}
			</ModalInner>
		</div>,
		document.getElementById("modal-root")
	)
}