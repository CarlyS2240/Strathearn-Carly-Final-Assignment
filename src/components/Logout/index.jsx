import { getAuth, onAuthStateChanged, signOut} from 'firebase/auth'; /* Importing auth so we can authenticate users*/
import { useEffect, useState} from 'react'; /*Importing useEffect and useState*/
import './styles.css'; /*Linking stylesheet*/


export const Logout = () => {

    const [user, setUser] = useState(null);

    /*Checking to see if a user is logged in*/
    useEffect(
        () => {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }
            })
        }, []
    )

    /*functionality for signing a user out of the website*/
    const logoutUser = async() => {
        const auth = getAuth();
        try{
            await signOut(auth);

        } catch (error){
            console.log(error)
        }
    }

    /*Creating the logout button component*/
    return(
        user && <button className="logout-btn" onClick={logoutUser}>
            Logout
        </button>
    )

}