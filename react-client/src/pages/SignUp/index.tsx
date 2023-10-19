import { Link } from "react-router-dom";
import { useState } from "react";
import { useStateContext } from "../../context/auth";
import { AxiosResponse } from "axios";
import { useRef } from "react";
import api from "../../service/api";

interface ErrorMessage {
    campo: string;
    mensagem: string;
}

const SignUp = () => {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement | null>(null);

    const { setUser, setToken } = useStateContext();

    const [errors, setErrors] = useState<null | ErrorMessage>(null);

    const onSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();

        const nameInputElement = nameRef.current as HTMLInputElement | null;
        const emailInputElement = emailRef.current as HTMLInputElement | null;
        const passwordInputElement =
            passwordRef.current as HTMLInputElement | null;
        const passwordConfirmationInputElement =
            passwordConfirmationRef.current as HTMLInputElement | null;

        if (
            nameInputElement &&
            emailInputElement &&
            passwordInputElement &&
            passwordConfirmationInputElement
        ) {
            const payload = {
                name: nameInputElement.value,
                email: emailInputElement.value,
                password: passwordInputElement.value,
                password_confirmation: passwordConfirmationInputElement.value,
            };

            console.log(payload);

            api.post("/signup", payload)
                .then((response: AxiosResponse) => {
                    const data = response.data;
                    setUser(data.user);
                    setToken(data.token);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                        console.log(err);
                    }
                });
        }
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Crie sua conta</h1>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input ref={nameRef} type="text" placeholder="Nome" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Senha"
                    />
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Confirmar Senha"
                    />
                    <button className="btn btn-block">Criar conta</button>
                    <p className="message">
                        Já possui uma conta? <Link to="/login">Entrar</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
