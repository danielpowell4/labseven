const ErrorAlert = ({ error }) => {
  return (
    <div>
      <h2>Oh no!</h2>
      <h3>An error occurred: {error.message}</h3>
    </div>
  );
};

export default ErrorAlert;
