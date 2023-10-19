//import { useState } from "react";
import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../service/api";
import { useStateContext } from "../../context/auth";

const Login = () => {
    const emailRef = createRef();
    const passwordRef = createRef();

    const [, setMessage] = useState<string | null>(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();

        const emailInputElement = emailRef.current as HTMLInputElement | null;
        const passwordInputElement =
            passwordRef.current as HTMLInputElement | null;

        if (emailInputElement && passwordInputElement) {
            const payload = {
                email: emailInputElement.value,
                password: passwordInputElement.value,
            };

            api.post("/login", payload)
                .then(({ data }) => {
                    setUser(data.user);
                    setToken(data.token);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setMessage(response.data.errors);
                    }
                });
        }
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Bem vindo</h1>

                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Senha"
                    />
                    <button className="btn btn-block">Entrar</button>
                    <p className="message">
                        Novo aqui? <Link to="/signup">Criar conta</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
