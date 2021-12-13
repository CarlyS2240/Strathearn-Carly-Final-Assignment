import './styles.css';

import {Link} from 'react-router-dom'; /* Importing Link to route to the MovieDetailsPage from the homepage*/


<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta> /* Used to add breakpoints to website for responsive design */


export const SocialMediaItem = (props) => {
    const {username, text} = props; /* Declaring props */
  
    /* Making the product card component from text, the Button component, and the Rating hook*/

    return (
        <div className="post">
            <p className="post-username">{username}</p>
            <p className="post-text">{text}</p>
        </div>
    )
}