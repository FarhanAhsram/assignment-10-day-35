const ErrorComponent = ({ message }) => {
  return (
    <div className="text-red-500">
      <h6>Error: {message}</h6>
    </div>
  );
};

export default ErrorComponent;
