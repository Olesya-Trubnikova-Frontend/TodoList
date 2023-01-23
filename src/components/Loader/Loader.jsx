import LoaderStyles from "./loader.module.css";

export const Loader = () => {
	
	 return (
		<div className="d-flex justify-content-center">
			<div className={LoaderStyles['lds-ripple']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
		</div>
	 )
}