import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form'

import PostsOrderContext from "../../../context/postsOrderContext";

/* Importing the MovieItem component and the Header component to be displayed within the MoviesHomePage component */
import { SocialMediaItem } from '../../SocialMediaItem';

export const MePage = () => {

    const history = useHistory();

    const [ posts, setPosts ] = useState([]);
    const[ filteredPosts, setFilteredPosts ] = useState([]);
    const [ email, setEmail ] = useState('');

    const globalState = useContext(PostsOrderContext);

    const { register, handleSubmit } = useForm();

    const auth = getAuth();


      //Check if a current user is logged into firebase
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

        //setSearchString(auth.currentUser.email);
        //console.log("setSearchString", auth.currentUser.email);

        const user = getAuth().currentUser;
        console.log("User", user);

           if (user!=null){
            console.log("im working", posts)
                //setEmail(auth.currentUser.email);
                //console.log("User Email", auth.currentUser.email);
            
             const postsFiltered = posts.filter(
                    (post) => post.email.stringValue === user.email
             )
            setFilteredPosts(postsFiltered);
            console.log("postsFiltered", postsFiltered);
  
         }
    }

    const getPosts = async() => {
        /* Getting our data from the API that was created to store data about movies*/ 
        try {
            const response = await fetch('https://firestore.googleapis.com/v1/projects/social-media-api-itec-4012/databases/(default)/documents/posts');
            const data = await response.json();
            //console.log(data);
            const formattedData = data.documents.map( (item) => {
                return item.fields
            });

            //console.log (formattedData);
            setPosts(formattedData);
            setFilteredPosts(formattedData);
            globalState.initializePosts(formattedData);  
            //setShow(false); /* Hiding the loading overlay when the API has finished loading*/
            

        }catch(err) {
            console.log (err)
        }

    }

    const submitPost = async (formVals) => {
        const user = getAuth().currentUser;
        const id = Math.floor(Math.random()*90000) + 10000;
        const idStr = id.toString();

        console.log(idStr);
        
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
            }
        }

        console.log(formVals, formattedData);
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

    return (
        <>  
       <div className="me-page">
        <div>{auth.currentUser.email}</div>
            <div className="myPosts-container">
                { 
                /* Mapping the fields from the API to the props that we are passing to the MovieItem component*/
                    filteredPosts.map((post) => (
                        <SocialMediaItem key={post.id.stringValue} id={post.id.stringValue} text={post.text.stringValue} email={post.email.stringValue} image={post.image.stringValue}></SocialMediaItem>
                            //<>
                                //<br/>
                                ///<div>{post.id.stringValue}</div>
                               // <div>{post.email.stringValue}</div>
                                //<div>{post.text.stringValue}</div>
                            //</>
                        
                    ))
                }
                {
                    
                }
                {
                    filteredPosts.length === 0 && <p>Nothing found</p>
                }
            </div>
            <form className="form-layout" onSubmit={handleSubmit(submitPost)}>
                <h2>Submit a new post: </h2>
                <br/>

                <label htmlFor="text"> Text </label>
                <input 
                    {...register("text")}
                    name="text"
                    required/>

        <input type="submit" value="Submit Post" />
        <br/>
                </form>
            </div>
        </>
    )
}