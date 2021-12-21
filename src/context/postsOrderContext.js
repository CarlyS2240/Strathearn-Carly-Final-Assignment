/* Making the post data from the API accessible across the app*/

import React, {useState} from 'react';

const PostsOrderContext = React.createContext({
    posts: [],
    order: [],
    initializePosts: () => {},    
});

export const PostsOrderContextProvider = (props) => {

    const [posts, setPosts] = useState([]);

    const initializePosts = (postsFromApi) => {
        setPosts(postsFromApi);
    }

    return (<PostsOrderContext.Provider
     value={{ posts: posts, initializePosts: initializePosts }}
    >
        {props.children}
    </PostsOrderContext.Provider>)

} 

export default PostsOrderContext;