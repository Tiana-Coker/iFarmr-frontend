import React from 'react';


const EmailFailure: React.FC = () => {
  return (
    <div className="bg-[#f2f2f2] flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-[400px]">
        <div className="flex flex-col">
          
          <h2 className="mb-4 text-[#204E51]">Email Verification Failed</h2>
          <p className="mb-6 text-[#333333]">
            Unfortunately, we couldn't verify your email address. Please try again.
          </p>

          <button className="btn px-4 py-[0.65rem] bg-[#204E51] text-white border-none text-base cursor-pointer transition ease-in-out duration-300 text-center inline-block w-full no-underline hover:bg-opacity-90">
            Resend Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailFailure;
