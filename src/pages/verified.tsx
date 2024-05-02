import { Link } from "react-router-dom";

const VerificationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md flex items-center flex-col">
        <h2 className="text-3xl mb-4 text-center">You are verified!</h2>
        <p className="text-lg mb-6 text-center">
          Congratulations! You have been successfully verified.
        </p>

        <Link to="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VerificationPage;
