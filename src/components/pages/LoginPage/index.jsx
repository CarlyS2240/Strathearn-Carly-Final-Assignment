import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { useHistory } from 'react-router-dom';

import './styles.css';

export const LoginPage = () => {
    const [mode, setMode] = useState("login");

    const{register, handleSubmit} = useForm();

    const history = useHistory();

    const loginUser = async(formVals) => {
        try {
            console.log("Login Submitted", formVals)
            const auth = getAuth();
            console.log("before", auth);
            const loginUser = await signInWithEmailAndPassword(auth, formVals.user, formVals.password);
            console.log("After", auth);
            history.push('/');

        } catch(error) {
            console.log("Error connecting to firebase", error)
        }
    }

    const signUpUser = async(formVals) => {
        console.log("Sign Up Submitted", formVals)
        const auth = getAuth();

        try{
            const signUpUser = await createUserWithEmailAndPassword(auth, formVals.user, formVals.password);
            console.log("New user was created", signUpUser);
            history.push('/');
        } catch (error) {
            console.log("Error from firebase", error)
        }
    }
    
    return (
         <div className="posts-page">
            { mode === "login" && (
                <form className="signIn-form-layout" onSubmit={handleSubmit(loginUser)}>
                    <h1 className="login-logo">GROOVE</h1>
                    <h2 className="form-title">Welcome back, sign in to find out what your friends are listening to.</h2>
                    <br/>
                    <label className="form-label" htmlFor="user">Username</label>
                    <input className="form-input" type="email" required name="user" required {...register('user')}/>

                    <label className="form-label" htmlFor="password">Password</label>
                    <input className="form-input" type="password" name="password" required {...register('password')}/>
                    <div className="form-button-container">
                        <input className="form-submit-button" type="submit" value="Login"/>
                    </div>
                    <br/>

                    <p className="signUp-title"> Don't have an account with us yet? Create a new account with your email and password</p>
                    <button className="signUp-button" onClick={()=> setMode("signup")}>Sign up</button>
                </form>
            )
            }

            { mode === "signup" && (
                <form className="signIn-form-layout" onSubmit={handleSubmit(signUpUser)}>
                    <h1 className="login-logo">GROOVE</h1>
                    <h2 className="form-title">Create a new account now!</h2>
                    <br/>
                    <label className="form-label" htmlFor="user">Email</label>
                    <input className="form-input" type="email" required name="user" {...register('user')}/>

                    <label className="form-label" htmlFor="passwordConfirm">Password</label>
                    <input className="form-input" type="password" name="password" required {...register('password')}/>

                    <label className="form-label" htmlFor="password">Confirm Password</label>
                    <input className="form-input" type="password" name="passwordConfirm" required {...register('passwordConfirm')}/>
                    
                    <div className="form-button-container">
                        <input className="signUp-button" type="submit" value="Sign Up"/>
                    </div>
                    <br/>

                    <p className="signUp-title">Have an account already?</p>
                    <button className="signUp-button" onClick={()=> setMode("login")}>Login</button>
                </form>
            )
            }
        </div>
    ) 
}