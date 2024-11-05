import React, { useState } from "react";
import logo from "C:/Users/nqhuy24/work/fe/demo/demohrms/src/images/CMC_logo.png";
import "./hrmsHeader.css";
// import { IoIosHelpCircleOutline } from "react-icons/io";
// import { FaArrowDown } from "react-icons/fa";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FaArrowDown } from "react-icons/fa";

// Define the interface for user data
interface UserData {
  firstName: string;
  lastName: string;
  companyName: string;
  groupName: string;
}

// Define the DisplayUser props
interface DisplayUserProps extends UserData {}

const Header: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    firstName: "Thuy",
    lastName: "Pham Xuan",
    companyName: "CMC GLOBAL",
    groupName: "DKR 1",
  });

  // Update the DisplayUser component to use TypeScript props
  const DisplayUser: React.FC<DisplayUserProps> = ({
    lastName,
    firstName,
    companyName,
    groupName,
  }) => {
    const fullName = `${firstName} ${lastName}`; // Removed the dot for a cleaner format
    return <span>{`${fullName} - ${companyName} ${groupName}`}</span>;
  };

  return (
    <div className="Header">
      <div className="container">
        <div className="container_left">
          <div className="logo">
            <img src={logo} alt="CMC Logo" />
          </div>
          <div className="navigation">
            <div className="nav">
              <a href="#">Office</a>
            </div>
            <div className="nav">
              <a href="#">Meeting</a>
            </div>
          </div>
        </div>
        <div className="container_right">
          <div className="get_help">
            <IoIosHelpCircleOutline />
          </div>
          <div className="user_login">
            <div className="user_logo">
              <img src={logo} alt="User Logo" />
            </div>
            <div className="user_account">
              <div className="account">
                <p>
                  <DisplayUser {...userData} />
                </p>
              </div>
              <div className="user_more">
                <FaArrowDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
