import { getAuth, onAuthStateChanged } from 'firebase/auth'; /*Importing auth to authenticate users*/
import { useEffect, useState, useContext } from 'react'; /*Importing useState, useEffect, and useContext*/
import { useHistory } from 'react-router-dom'; /*Importing useHistory to push/route to other pages in the website*/
import { useForm } from 'react-hook-form'  /*Importing useForm to create a form*/

import PostsOrderContext from "../../../context/postsOrderContext"; /* Importing the PostsOrderContext*/

/* Importing the SocialMediaItem containing the posts from the API to be displayed on the homepage and the me page */
import { SocialMediaItem } from '../../SocialMediaItem';

/* Importing a spinner for the loading state*/
import spinner from '../../../../src/spinner.gif'

import "./styles.css" /*Linking stylesheet*/

/*Asking a user to confirm that they would like to refresh the page prior to a refresh*/
window.onbeforeunload = function () {return false;}

export const MePage = () => {

    const history = useHistory();

    const [ posts, setPosts ] = useState([]);
    const[ filteredPosts, setFilteredPosts ] = useState([]); /*Used for filtering the posts*/
    const [loading, setLoading] = useState(true); /* Using in the loading state */
    const [show, setShow] = useState(true); /* Using to hide an overlay when the API has finished loading */

    const globalState = useContext(PostsOrderContext);

    const { register, handleSubmit } = useForm();

    const auth = getAuth();

      //Check if a current user is logged in
      useEffect(
        () => {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (!user){
                    history.push('/login');
                }
            })
        }, []
    );

    useEffect (
        () => {
            getPosts();
        }, []
    );

    useEffect (
        () => {
            handlePostsByEmail();
        }, [posts]
    )

    const handlePostsByEmail = () => {

        /*Setting user to the current user*/
        const user = getAuth().currentUser;

           if (user!=null){ /*checking to see if the user is not null*/
            /*If the user is not null, filter the posts in the database that contain that user's email (only show those posts*/ 
             const postsFiltered = posts.filter(
                    (post) => post.email.stringValue === user.email
             )
            setFilteredPosts(postsFiltered);
         }
    }

    const getPosts = async() => {
        /* Getting our data from the API that was created to store data about music*/ 
        try {
            const response = await fetch('https://firestore.googleapis.com/v1/projects/social-media-api-itec-4012/databases/(default)/documents/posts');
            const data = await response.json();
            const formattedData = data.documents.map( (item) => {
                return item.fields
            });

            setPosts(formattedData);
            setFilteredPosts(formattedData);
            globalState.initializePosts(formattedData);  
            setShow(false); /* Hiding the loading overlay when the API has finished loading*/
            

        }catch(err) {
            console.log (err)
        }

    }

    /*Functionality for submitting a new post*/
    const submitPost = async (formVals) => {
        const user = getAuth().currentUser;
        const id = Math.floor(Math.random()*90000) + 10000; /*Creating a random id for new posts*/
        const idStr = id.toString();
        
        /*Formatting data to be inserted in the database*/
        const formattedData = {
            fields: {
                email: {
                    stringValue: user.email
                },
                id: {
                    stringValue: idStr
                },
                text: {
                    stringValue: formVals.text
                },
                image: {
                    stringValue: formVals.image
                },
            }
        }

        /*inserting new post in the firebase database*/
        try{
            const response = await fetch('https://firestore.googleapis.com/v1/projects/social-media-api-itec-4012/databases/(default)/documents/posts',
            {
                headers: {
                    'Content-Type' : 'application/json'
                },
                method: "POST",
                body: JSON.stringify(formattedData)
            })
          history.push('/');
        } catch (error) {
            console.log("Error", error);
        }
    };

    /*Creating a form to allow users to create a new post and displaying the logged in user's posts underneath*/

    return (
        <>  
       <div className="me-page">
            <div className="heading">Welcome Back,</div>
            <div className="user">{auth.currentUser.email}</div>
            <hr className="break"></hr>
            <div className="form-container">
                <form className="form-layout" onSubmit={handleSubmit(submitPost)}>
                    <h2 className="submit-title">Let Your Friends Know What You've Been Listening To</h2>
                    <br/>
                    <div className="text-container">
                        <label htmlFor="text"></label>
                        <input className="post-input"
                            {...register("text")}
                            name="text"
                            placeholder="What are you listening to?"
                            required/>
                    </div>
                    <div className="photo-container">
                        <input className="post-image-input"
                            {...register("image")}
                            name="image"
                            placeholder="Insert a link to a photo of an album cover"
                            required/>
                            
                            <div className="submit-button-container">
                                <input className="submit-button" type="submit" value="Submit Post" />
                            </div>
                    </div>
                    <br/>
                    </form>
            </div>
                <p className="post-title">My Posts</p>
                <hr className="posts-break"></hr>
                <div className="myPosts-container">
                    { 
                    /* Mapping the fields from the API to the props that we are passing to the SocialMediaItem component*/
                        filteredPosts.map((post) => (
                            <SocialMediaItem key={post.id.stringValue} id={post.id.stringValue} text={post.text.stringValue} email={post.email.stringValue} image={post.image.stringValue}></SocialMediaItem>
                        ))
                    }
                    {
                        loading && <div className="loadOverlay" style={{display: show ? "block" : "none" }}><img className="loadingGIF" src={spinner} alt="loading..." /></div>
                    }
                    {
                        filteredPosts.length === 0 && <p className="noPosts-paragraph">You don't have any posts yet!</p>
                    }
                </div>
                </div>
        </>
    )
}