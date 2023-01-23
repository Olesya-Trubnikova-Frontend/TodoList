import { Loader } from "../Loader/Loader";

// компонент высшего порядка принимает тот компонент которому нужно добавить новое поведение
export const withQuery = (WrappedComponent) => ({ isLoading, isError, error, refetch, ...rest}) => {

	if (isError) {
		return (
      <div className="d-flex flex-column justify-content-center">
        <p>Error happend: {error.message}</p>
        <button onClick={refetch} type="button" className="btn btn-primary">
          Refetch
        </button>
      </div>
    )}

  // кружочек ожидания
  if (isLoading) return <Loader />;

 return <WrappedComponent {...rest} />;
};