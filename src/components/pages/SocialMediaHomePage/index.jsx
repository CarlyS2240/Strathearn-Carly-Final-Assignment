import { useEffect, useState} from 'react';  /*Importing useState, and useEffect*/

/* Importing the SocialMediaItem component and the Header component */
import { SocialMediaItem } from '../../SocialMediaItem';
import { Header } from '../../Header';

import "./styles.css" /*Linking the stylesheet*/

/* Importing a spinner for the loading state*/
import spinner from '../../../../src/spinner.gif'

export const SocialMediaHomePage = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); /* Using in the loading state */
    const [show, setShow] = useState(true); /* Using to hide an overlay when the API has finished loading */
    
    useEffect (
        () => {
            getPosts();
        }, []
    );

    const getPosts = async() => {
        /* Getting our data from the API that was created to store data about social media posts*/ 
        try {
            const response = await fetch('https://firestore.googleapis.com/v1/projects/social-media-api-itec-4012/databases/(default)/documents/posts');
            const data = await response.json();
            console.log(data);
            const formattedData = data.documents.map( (item) => {
                return item.fields
            });

            console.log (formattedData);
            setPosts(formattedData);
            setShow(false); /* Hiding the loading overlay when the API has finished loading*/
            

        }catch(err) {
            console.log (err)
        }
    }

    /*Displaying the data from the API in the SocialMediaComponent and added some heading text (not using props for heading
      text since it is static). Used props to display a heading image to allow it to be easily changed.*/

    return (
        <>
        <div className="home-page">
            <Header headerImage="https://images.pexels.com/photos/1187974/pexels-photo-1187974.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"></Header>
            <h1 className="sub-title">Hi there,</h1>
            <h1 className="title">Find out what your friends are listening to...</h1>
            <div className="posts-container">
                { 
                /* Mapping the fields from the API to the props that we are passing to the SocialMediaItem component*/
                    posts.map((post) => (
                        <SocialMediaItem key={post.id.stringValue} id={post.id.stringValue} image={post.image.stringValue} text={post.text.stringValue} email={post.email.stringValue}></SocialMediaItem>
                    ))
                }
                {
                    
                }

                {
                    loading && <div className="loadOverlay" style={{display: show ? "block" : "none" }}><img className="loadingGIF" src={spinner} alt="loading..." /></div>
                }
            </div>
        </div>
        </>
    )
}
