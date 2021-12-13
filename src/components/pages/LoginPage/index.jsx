import {useState} from 'react';
import {useForm} from 'react-hook-form';

import './styles.css';

export const LoginPage = () => {
    const [mode, setMode] = useState("login");

    const{register, handleSubmit} = useForm();

    const loginUser = (formVals) => {
        console.log("Login Submitted", formVals)

    }

    const signUpUser = (formVals) => {
        console.log("Sign Up Submitted", formVals)
    }
    
    return (
        <div className="posts-page">
            { mode === "login" && (
                <form className="form-layout" onSubmit={handleSubmit(loginUser)}>
                    <h2>Welcome back, please sign in!</h2>
                    <br/>
                    <label htmlFor="user">Username</label>
                    <input type="email" required name="user" required {...register('user')}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required {...register('password')}/>
                    <input type="submit" value="Login"/>
                    <br/>

                    <p> Don't have an account with us yet? Create a new account with your email and password</p>
                    <button onClick={()=> setMode("signup")}>Sign up</button>
                </form>
            )
            }

            { mode === "signup" && (
                <form className="form-layout" onSubmit={handleSubmit(signUpUser)}>
                    <h2>Create a new account now!</h2>
                    <br/>
                    <label htmlFor="user">Email</label>
                    <input type="email" required name="user" {...register('user')}/>

                    <label htmlFor="passwordConfirm">Password</label>
                    <input type="password" name="password" required {...register('password')}/>

                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name="passwordConfirm" required {...register('passwordConfirm')}/>

                    <input type="submit" value="Sign Up"/>
                    <br/>

                    <p>Have an account already?</p>
                    <button onClick={()=> setMode("login")}>Login</button>
                </form>
            )
            }
        </div>
    ) 
}