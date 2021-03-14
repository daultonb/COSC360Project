import React, {useState, useEffect} from 'react'
import PostsDataService from '../services/posts.service';

function PostsList() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        setPosts(JSON.parse('[{"id":1,"title":"testing","description":"testing2","username":"skyrossm","createdAt":"2021-03-14T00:38:54.000Z","updatedAt":"2021-03-14T00:38:54.000Z"},{"id":2,"title":"testing","description":"testing238912378123","username":"skyrossm","createdAt":"2021-03-14T00:42:22.000Z","updatedAt":"2021-03-14T00:42:22.000Z"}]'));
        // PostsDataService.getAll()
        //     .then(res => {
        //         setPosts(res.data);
        //         console.log(res.data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }

    return (
        <div>
            <ul>
                {posts && posts.map((post, index) => {
                    return <li onClick={getPosts} className="post" key={index}>
                        <h1>{post.title}</h1>
                        <p>{post.description}</p>
                        <p>{post.username}</p>
                        <p>{post.createdAt}</p>
                    </li>;
                })}
            </ul>
        </div>
    )
}

export default PostsList;
