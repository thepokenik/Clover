import { useState, useRef } from "react";
import Swal from "sweetalert2";
import "../components/style.css";
import {
  handleInputFocus,
  handleInputBlur,
} from "../../home/components/utils/handleInput/HandleInput";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import imgError from "../assets/icons8-erro-48 (1).png";
import wave from "../assets/wave.svg";
import openEye from "../assets/openEye.png";
import closeEye from "../assets/closeEye.png";
import user from "../assets/user.png";

const Register = ({ toggleForm }) => {

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [birth, setBirth] = useState("");
  const [role, setRole] = useState("USER");
  const [profileImage, setProfileImage] = useState(null);

  const [errors, setErrors] = useState([]);

  const [modal, setModal] = useState({ display: "none" });
  const [modalOpacity, setModalOpacity] = useState({ display: "none" });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateInputs()) {
      if (password === confirmPassword) {
        await cadastrar();
      } else {
        // Exibe um erro indicando que as senhas não coincidem
        setErrors([
          {
            campo: "Confirmação de senha",
            mensagem: "As senhas não coincidem.",
          },
        ]);
        setModalOpacity({ display: "block" });
        setModal({ display: "block" });
      }
    } else {
      // Exibe um erro indicando que há campos obrigatórios vazios
      setErrors([
        {
          campo: "Campos obrigatórios",
          mensagem: "Preencha todos os campos obrigatórios.",
        },
      ]);
      setModalOpacity({ display: "block" });
      setModal({ display: "block" });
    }
  };

  const validateInputs = () => {
    // Adicione verificações personalizadas para cada campo, se necessário
    if (
      !username.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !birth.trim()
    ) {
      return false;
    }
    return true;
  };

  const getUserFile = async (userImagePath) => {
    const response = await fetch(userImagePath);
    const blob = await response.blob();

    // Extrai o nome do arquivo do caminho
    const fileName = userImagePath.split('/').pop();

    // Cria o objeto File
    const userFile = new File([blob], fileName, { type: blob.type });

    return userFile;
  };

  const cadastrar = async () => {
    const userData = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      birth: birth,
      role: role,
    };

    const userFile = await getUserFile(user);
    console.log(userFile);


    const formData = new FormData();
    formData.append("profileImage", profileImage ? profileImage : userFile);

    formData.append(
      "userData",
      new Blob([JSON.stringify(userData)], { type: "application/json" })
    );

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        // Exibir alerta de sucesso
        Swal.fire({
          icon: "success",
          title: "Successful registration!",
        });
        limpar();
      } else if (response.status === 400) {
        const errorData = await response.json();
        const errorArray = [];

        // Mapeia os erros recebidos do backend para um formato mais legível
        for (const fieldName in errorData) {
          const errorMessage = errorData[fieldName];
          errorArray.push({ fieldName, errorMessage });
        }

        // Exibe o modal de erro
        setModalOpacity({ display: "block" });
        setErrors(errorArray);
        setModal({ display: "block" });

        // Exibir alerta de erro
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao cadastrar usuário.",
        });
      } else {
        console.log("Ocorreu um erro inesperado: " + response.status);
      }
    } catch (error) {
      console.log("Erro ao enviar a solicitação:", error);

      // Exibir alerta de erro
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao enviar a solicitação.",
      });
    }
  };

  const closeModalOpacity = () => {
    setModalOpacity({ display: "none" });
    setModal({ display: "none" });
  };

  const limpar = () => {
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setBirth("");
    setProfileImage(null);
  };

  const handleImagePreview = () => {
    if (profileImage) {
      return URL.createObjectURL(profileImage);
    }
    return null;
  };

  const handleScriptLoadSuccess = () => {
    console.log('Script carregado com sucesso');
  };

  const handleScriptLoadError = () => {
    console.error('Erro ao carregar o script');
  };

  const base64UrlDecode = (str) => {
    const padding = '='.repeat((4 - str.length % 4) % 4);
    const base64 = (str + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return rawData;
  };


  const decodeToken = (token) => {
    const [header, payload, signature] = token.split('.');
    const decodedHeader = JSON.parse(base64UrlDecode(header));
    const decodedPayload = JSON.parse(base64UrlDecode(payload));
    return { header: decodedHeader, payload: decodedPayload, signature };
  };

  const loadProfile = async (token) => {
    try {
      const decoded = decodeToken(token)

      const userData = {
        username: decoded.payload.name,
        firstName: decoded.payload.given_name,
        lastName: decoded.payload.family_name,
        email: decoded.payload.email,
        password: decoded.payload.sub,
        birth: "00-00-0000",
        role: role
      };

      const userFile = await getUserFile(user);


      const formData = new FormData();
      formData.append("profileImage", profileImage ? profileImage : userFile);

      console.log(userData);

      formData.append(
        "userData",
        new Blob([JSON.stringify(userData)], { type: "application/json" })
      );

      const response = await fetch("http://localhost:8080/auth/register/google", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Successful registration!",
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Error!",
        });
      }


    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
    }
  };

  return (
    <section className="sectionRegister">
      <article className="authArticle">
        <fieldset className="authFieldset">
          <div className="authFieldImage">
            <span>Select your profile image</span>
            <div className="imagePreview" onClick={handleImageClick}>
              <img src={handleImagePreview() || user} alt="userImage" />
            </div>
            <input
              ref={inputRef}
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
          <form onSubmit={handleSubmit} className="authForm">
            <div className="authField auth">
              <label
                id="usernameLabel"
                className={username ? "active" : ""}
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onMouseEnter={() => handleInputFocus("usernameLabel")}
                onMouseLeave={() => handleInputBlur("usernameLabel")}
              />
            </div>
            <div className="authField auth">
              <label
                id="firstNameLabel"
                className={firstName ? "active" : ""}
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onMouseEnter={() => handleInputFocus("firstNameLabel")}
                onMouseLeave={() => handleInputBlur("firstNameLabel")}
              />
            </div>
            <div className="authField auth">
              <label
                id="lastNameLabel"
                className={lastName ? "active" : ""}
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onMouseEnter={() => handleInputFocus("lastNameLabel")}
                onMouseLeave={() => handleInputBlur("lastNameLabel")}
              />
            </div>
            <div className="authField auth">
              <label
                id="emailLabel"
                className={email ? "active" : ""}
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onMouseEnter={() => handleInputFocus("emailLabel")}
                onMouseLeave={() => handleInputBlur("emailLabel")}
              />
            </div>
            <div className="authField auth">
              <label
                id="passwordLabel"
                className={password ? "active" : ""}
                htmlFor="password"
              >
                Password
              </label>
              <div className="togglePassword auth">
                <span onClick={handleTogglePassword}>
                  {showPassword ? (
                    <img src={openEye} alt="Open Eye" />
                  ) : (
                    <img src={closeEye} alt="Closed Eye" />
                  )}
                </span>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onMouseEnter={() => handleInputFocus("passwordLabel")}
                onMouseLeave={() => handleInputBlur("passwordLabel")}
              />
            </div>
            <div className="authField auth">
              <label
                id="confirmPasswordLabel"
                className={confirmPassword ? "active" : ""}
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onMouseEnter={() => handleInputFocus("confirmPasswordLabel")}
                onMouseLeave={() => handleInputBlur("confirmPasswordLabel")}
              />
            </div>
            <div className="authField auth">
              <legend>Birthday</legend>
              <input
                type="date"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
              />
            </div>
            <div className="btn">
              <button className="ui-btn">
                <span>Register</span>
              </button>
              <a onClick={toggleForm}>
                <span>Already registered? log in!</span>
              </a>

              <GoogleOAuthProvider
                clientId={"194451748874-lhbd66qk23vhbd2dv12gidnef7264do6.apps.googleusercontent.com"}
                onScriptLoadSuccess={handleScriptLoadSuccess}
                onScriptLoadError={handleScriptLoadError}
              >
                <GoogleLogin
                  type="icon"
                  theme="filled_black"
                  onSuccess={credentialResponse => {
                    loadProfile(credentialResponse.credential, credentialResponse.clientId);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  useOneTap
                />;
              </GoogleOAuthProvider>

            </div>
          </form>
        </fieldset>
        <div className="modal" style={{ display: modal.display }}>
          <div className="errorModal">
            <div className="errorIcon">
              <img src={imgError} alt="Error" />
              <h2>Erro!</h2>
            </div>
            <hr />
            <div className="errorMessages">
              {/* Mapeia e exibe os erros */}
              {errors.map((error, index) => (
                <div key={index}>
                  <strong>{error.campo}</strong> {error.mensagem}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Modal de fundo */}
        <div
          className="modalOpacity"
          onClick={closeModalOpacity}
          style={{ display: modalOpacity.display }}
        ></div>
      </article>
      <div className="WelcomeDescWave">
        <img src={wave} alt="" />
      </div>
    </section>
  );
};

export default Register;
