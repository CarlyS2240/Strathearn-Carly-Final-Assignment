import { useEffect, useState, useContext} from 'react';

/* Importing the MovieItem component and the Header component to be displayed within the MoviesHomePage component */
import { SocialMediaItem } from '../../SocialMediaItem';

/* Importing the MoviesOrderContext*/

//import MoviesOrderContext from '../../../context/moviesOrderContext';

import "./styles.css"

export const SocialMediaHomePage = () => {

    const [posts, setPosts] = useState([]);
    //const [loading, setLoading] = useState(true); /* Using in the loading state */
    //const [show, setShow] = useState(true); /* Using to hide an overlay when the API has finished loading */
    //const globalState = useContext(PostsOrderContext);
    
    useEffect (
        () => {
            getPosts();
        }, []
    );

    const getPosts = async() => {
        /* Getting our data from the API that was created to store data about movies*/ 
        try {
            const response = await fetch('https://firestore.googleapis.com/v1/projects/social-media-api-itec-4012/databases/(default)/documents/posts');
            const data = await response.json();
            console.log(data);
            const formattedData = data.documents.map( (item) => {
                return item.fields
            });

            console.log (formattedData);
            setPosts(formattedData);
            //globalState.initializePosts(formattedData);  
            //setShow(false); /* Hiding the loading overlay when the API has finished loading*/
            

        }catch(err) {
            console.log (err)
        }
    }

    return (
        <>
        <div className="home-page">
            <div className="posts-container">
                { 
                /* Mapping the fields from the API to the props that we are passing to the MovieItem component*/
                    posts.map((post) => (
                        <SocialMediaItem key={post.id.stringValue} id={post.id.stringValue} text={post.text.stringValue} username={post.username.stringValue}></SocialMediaItem>
                    ))
                }
                {
                    
                }

                {
                    //loading && <div className="loadOverlay" style={{display: show ? "block" : "none" }}><img className="loadingGIF" src={spinner} alt="loading..." /></div>
                }
            </div>
        </div>
        </>
    )
}