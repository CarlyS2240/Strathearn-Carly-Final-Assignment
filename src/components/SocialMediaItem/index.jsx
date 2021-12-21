import './styles.css'; /*Linking the stylesheet*/

import {Link} from 'react-router-dom'; /* Importing Link to route to other pages in the website*/


<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta> /* Used to add breakpoints to website for responsive design */


export const SocialMediaItem = (props) => {
    const {email, image, text} = props; /* Declaring props */
  
    /* Making the SocialMediaItem component from text and images*/
    return (
        <div className="post">
            <p className="post-email">@{email}</p>
            <img className="post-image" src={image}/>
            <p className="post-text">{text}</p>
        </div>
    )
}