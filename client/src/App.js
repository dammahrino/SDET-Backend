import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

const App = () => {
    return (
    <div className="container">
        <h1>Run Tests</h1>
        <PostCreate />
        <i>Note: wait after hitting submit</i>
        <hr />
        <h1>Executions List</h1>
        <PostList />
    </div>
    );
};

export default App;