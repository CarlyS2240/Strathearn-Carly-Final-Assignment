import "./styles.css" /*Linking the styles sheet*/

import {Link} from 'react-router-dom'; /*Importing Link to route to different pages in the website*/

<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta> /* Used to add breakpoints to website for responsive design */

 
/* Making the Footer component from text and links. The footer also uses Links to provide a quick link to the homepage and Me page.*/
export const Footer = () => {
    return (
        <>
            <div className="listWrapper">
                <ul className="firstList">
                    <h2 className="listHeading">GROOVE</h2>
                </ul>
                <ul className="secondList">
                        <h3>Home</h3>
                    <Link style={{textDecoration: "none"}} to={`/`}>
                        <li>Visit the Homepage</li>
                    </Link>
                </ul>
                <ul className="thirdList">
                    <h3>My Account</h3>
                    <Link style={{textDecoration: "none"}} to={`/Me`}>
                        <li>My Profile</li>
                    </Link>
                </ul>
            </div>
        </>
    )
}