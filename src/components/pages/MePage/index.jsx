import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import PostsOrderContext from "../../../context/postsOrderContext";

/* Importing the MovieItem component and the Header component to be displayed within the MoviesHomePage component */
import { SocialMediaItem } from '../../SocialMediaItem';

export const MePage = () => {

    const history = useHistory();

    const [ posts, setPosts ] = useState([]);
    const[ filteredPosts, setFilteredPosts ] = useState([]);
    const [ email, setEmail ] = useState('');

    const [searchString, setSearchString] = useState ('');

    const globalState = useContext(PostsOrderContext);

    const auth = getAuth();

      //Check if a current user is logged into firebase
      useEffect(
        () => {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (!user){
                    history.push('/login');
                }else {
                    setSearchString(user.email);
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
        }, [searchString]
    )

    const handlePostsByEmail = () => {

        //setSearchString(auth.currentUser.email);
        //console.log("setSearchString", auth.currentUser.email);

        if (searchString == '') {
            setFilteredPosts(posts);
            return;
        }

        const user = getAuth().currentUser;
        console.log("User", user);

           if (user!=null){
                //setEmail(auth.currentUser.email);
                //console.log("User Email", auth.currentUser.email);
            
                const postsFiltered = posts.filter(
                    (post) => {
                        const email = post.email.stringValue;
                        const isMatch = email.indexOf(searchString);
                        console.log("isMatch", isMatch);
                        return isMatch !== -1; 
                }
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

    return (
        <>  
       <div className="me-page">
        <div>{auth.currentUser.email}</div>
            <div className="myPosts-container">
                { 
                /* Mapping the fields from the API to the props that we are passing to the MovieItem component*/
                    filteredPosts.map((post) => (
                        <SocialMediaItem key={post.id.stringValue} id={post.id.stringValue} text={post.text.stringValue} username={post.username.stringValue} email={post.email.stringValue}></SocialMediaItem>
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
                    //loading && <div className="loadOverlay" style={{display: show ? "block" : "none" }}><img className="loadingGIF" src={spinner} alt="loading..." /></div>
                }
                {
                    filteredPosts.length === 0 && <p>Nothing found for {searchString}</p>
                }
            </div>
        </div>
        </>
    )
}