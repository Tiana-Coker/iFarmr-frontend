import { useNavigate } from "react-router-dom";


const EmailSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="bg-[#f2f2f2] flex justify-center items-center h-screen font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-[400px]">
        <div className="flex flex-col">
         
          <h2 className="mb-4 text-[#204E51]">Email Confirmed</h2>
          <p className="mb-6 text-[#333333]">
            Your email has been successfully confirmed. Please log in to continue.
          </p>

          <button
            onClick={handleLoginClick}
            className="btn px-4 py-[0.65rem] bg-[#204E51] text-white border-none text-base cursor-pointer transition ease-in-out duration-300 text-center inline-block w-full no-underline hover:bg-opacity-90"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailSuccess;
