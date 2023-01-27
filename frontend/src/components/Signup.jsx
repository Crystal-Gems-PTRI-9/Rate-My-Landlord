import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "./Container.jsx";
import FormSubmit from "./FormSubmit.jsx";
import FormTitle from "./FormTitle.jsx";
import FormInput from "./FormInput.jsx";

async function signUp(credentials, navigate) {
  return fetch("/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data === "user created")
        return navigate("/login", { state: { from: "signup" } });
      Swal.fire("Sign Up Failed!", "email already in use", "error");
    });
}

export default function Login() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [city, setCity] = useState();

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    city: "",
  });
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(
      {
        ...userInfo,
      },
      navigate
    );
  };

  return (
    <section class="bg-page signup-page h-full p-4 bg-cover">

    <div className="inset-0 flex justify-center items-center mt-6">
      <Container>
        {/* <div className=" bg-primary flex justify-center items-center h-screen -z-10 "> */}

        <form
          onSubmit={handleSubmit}
          className={"bg-primary drop-shadow rounded p-6 space-y-6 w-80"}
        >
          <FormTitle>Sign Up with Email</FormTitle>
          <FormInput
            value={username}
            onChange={handleChange}
            label="Username"
            placeholder="username"
            name="username"
          />
          <FormInput
            value={email}
            onChange={handleChange}
            label="Email"
            placeholder="test@email.com"
            name="email"
          />
          <FormInput
            type="password"
            value={password}
            onChange={handleChange}
            label="Password"
            placeholder="********"
            name="password"
          />
          <FormInput
            value={city}
            onChange={handleChange}
            label="City"
            placeholder="New York City"
            name="city"
          />
          <FormSubmit value="Submit" />
        </form>
      </Container>
    </div>

    </section>
  );
}
