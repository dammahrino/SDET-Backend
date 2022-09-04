import React, { useState, useEffect } from "react";
import axios from "axios";

const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        // Retrieve the posts created
        const response = await axios.get('http://localhost:4000/executions');

        setPosts(response.data);
    };
    useEffect(() => {
        fetchPosts();
    }, []);
    /**
     * Returns a JSX for each post contained in the posts list.
     */
    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div 
            className="card" 
            style={{width: '30%', marginBottom: '20px'}}
            key={post.id}
            >
                <div className="card-body">
                    <h3>Executed Test: {post.executionType}</h3>
                    <hr />
                    <h4>Timesamp:</h4> {post.timestamp}
                    <br />
                    <h4>Path to report: </h4> {post.file}
                </div>
            </div>
        );
    });

    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
    </div>;
};

export default PostList;