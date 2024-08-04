import { useRef, useState } from "react";
import Eye from "../../assets/svg/Eye";
import "./Registration.scss";
import { url, validateEmail } from "../../utils/utils";
import { Link, useNavigate } from "react-router-dom";

type RegisterData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  repPassword: string;
  number: string;
};

const Registration: React.FC = () => {
  const passRef = useRef<HTMLInputElement>(null);
  const repPassRef = useRef<HTMLInputElement>(null);

  const passLabelRef = useRef<HTMLLabelElement>(null);
  const emailLabelRef = useRef<HTMLLabelElement>(null);
  const nameLabelRef = useRef<HTMLLabelElement>(null);
  const surnameLabelRef = useRef<HTMLLabelElement>(null);
  const numberLabelRef = useRef<HTMLLabelElement>(null);

  const [data, setData] = useState<RegisterData>({
    email: "",
    name: "",
    surname: "",
    password: "",
    repPassword: "",
    number: "",
  });
  const navigate = useNavigate();

  const handleData = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setData((prev) => ({ ...prev, [key as keyof typeof data]: e.target.value }));
  };

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let flag = true;

    if (!validateEmail(data.email) && !data.email.length && emailLabelRef.current) {
      emailLabelRef.current.style.color = "#ec3e3e";
      emailLabelRef.current.textContent = "That must be an email";
      flag = false;
    }

    if (!data.name.length && nameLabelRef.current) {
      nameLabelRef.current.style.color = "#ec3e3e";
      nameLabelRef.current.textContent = "There must be a username";
      flag = false;
    }

    if (!data.surname.length && surnameLabelRef.current) {
      surnameLabelRef.current.style.color = "#ec3e3e";
      surnameLabelRef.current.textContent = "There must be a surname";
      flag = false;
    }

    if (!data.number.length && numberLabelRef.current) {
      numberLabelRef.current.style.color = "#ec3e3e";
      numberLabelRef.current.textContent = "There must be a number";
      flag = false;
    }

    if ((data.password !== data.repPassword || !data.password.length) && passLabelRef.current) {
      passLabelRef.current.style.color = "#ec3e3e";
      passLabelRef.current.textContent = "Password doesn't match";
      flag = false;
    }

    if (!flag) {
      return;
    }

    const dataToPost = {
      ...data,
    };

    const response = await fetch(`${url}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(dataToPost),
    });

    if (response.status !== 200) {
      const responseData = await response.text();

      if (responseData.includes("email") && emailLabelRef.current) {
        emailLabelRef.current.style.color = "#ec3e3e";
        emailLabelRef.current.textContent = responseData;
      }
      if (responseData.includes("name") && nameLabelRef.current) {
        nameLabelRef.current.style.color = "#ec3e3e";
        nameLabelRef.current.textContent = responseData;
      }
      if (responseData.includes("surname") && surnameLabelRef.current) {
        surnameLabelRef.current.style.color = "#ec3e3e";
        surnameLabelRef.current.textContent = responseData;
      }
      if (responseData.includes("number") && numberLabelRef.current) {
        numberLabelRef.current.style.color = "#ec3e3e";
        numberLabelRef.current.textContent = responseData;
      }
      if (responseData.includes("Password") && passLabelRef.current) {
        passLabelRef.current.style.color = "#ec3e3e";
        passLabelRef.current.textContent = responseData;
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="registration-wrapper">
      <form action="" className="reg-form" onSubmit={(e) => register(e)}>
        <div className="email">
          <label htmlFor="email" ref={emailLabelRef}>
            Email
          </label>
          <input type="text" placeholder="email" id="email" onChange={(e) => handleData(e, "email")} />
        </div>
        <div className="name">
          <label htmlFor="name" ref={nameLabelRef}>
            Name
          </label>
          <input type="text" placeholder="name" id="name" onChange={(e) => handleData(e, "name")} />
        </div>
        <div className="surname">
          <label htmlFor="surname" ref={surnameLabelRef}>
            Surname
          </label>
          <input type="text" placeholder="surname" id="surname" onChange={(e) => handleData(e, "surname")} />
        </div>
        <div className="number">
          <label htmlFor="number" ref={numberLabelRef}>
            Phone number
          </label>
          <input type="tel" placeholder="+380 ** *** ** **" id="number" onChange={(e) => handleData(e, "number")} />
        </div>
        <div className="password">
          <label htmlFor="password" ref={passLabelRef}>
            Password
          </label>
          <div className="pass-wrapper">
            <input
              type="password"
              placeholder="password"
              id="password"
              ref={passRef}
              onChange={(e) => handleData(e, "password")}
            />
            <Eye passRef={passRef} />
          </div>
        </div>
        <div className="rep-password">
          <label htmlFor="rep-password">Repeat password</label>
          <div className="pass-wrapper">
            <input
              type="password"
              placeholder="rep-password"
              id="rep-password"
              ref={repPassRef}
              onChange={(e) => handleData(e, "repPassword")}
            />
            <Eye passRef={repPassRef} />
          </div>
        </div>
        <span className="terms">
          Натискаючи на кнопку "Зареєструватися", ви погоджуєтесь з нашими{" "}
          <Link to="#" target="_blank">
            правилами користування
          </Link>
        </span>
        <button type="submit" className="submit">
          Зареєструватися
        </button>
      </form>
    </div>
  );
};

export default Registration;
