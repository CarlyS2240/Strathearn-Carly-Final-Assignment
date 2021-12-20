import PropTypes from 'prop-types';  /* Using props to be able to reuse this header component in other components of the website */
import './styles.css';

<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta> /* Used to add breakpoints to website for responsive design */

export const Header = (props) => {

    const {headerImage} = props; /* Declaring props */

    return (
        <>
            <div className="logo">GROOVE</div>
            <div className="background">
                <img className="headerImage" src={headerImage}/>
            </div>
        </>
    )
}

/* Header component takes a parameter for the following: the headerImage and paragraphText displayed in the component so that the featured movie can easily be swapped out*/

Header.propTypes = {
    headerImage: PropTypes.string
}