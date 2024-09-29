import React, { useState, useEffect, useRef } from "react";
import EmailFailure from "./EmailFailure";
import EmailSuccess from "./EmailSuccess";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../utils/apiConfig";

const EmailConfirmation: React.FC = () => {
  const [status, setStatus] = useState<"success" | "failure" | null>(null);
  const location = useLocation();
  const requestSent = useRef<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    

    if (token && !requestSent.current) {
      requestSent.current = true;

      axios
        .get(`${baseUrl}/api/v1/auth/confirm?token=${token}`)
        .then((response) => {
          

          
          if (response.status === 200 && response.data.message.includes("Email confirmed successfully")) {
            setStatus("success");
          } else {
            setStatus("failure");
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setStatus("failure");
        });
    }
  }, [location.search]);

  return (
    <div className="font-sans">
      {status === "success" && <EmailSuccess />}
      {status === "failure" && <EmailFailure />}
      {status === null && <div>Loading...</div>}
    </div>
  );
};

export default EmailConfirmation;
