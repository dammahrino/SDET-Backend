import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
    const [API_KEY, setAPI_KEY] = useState('');
    const [option, setOption] = useState();

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post('http://localhost:4000/executions', {
            API_KEY, option
        });

        setTimeout(window.location.reload(true), 100000);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <p className="form-label">Choose a test:</p>
                    <select value={option} name="tests" id="tests" className="form-control" onChange={e=> setOption(e.target.value)}>
                        <option>Select an option</option>
                        <option value="All">Run all tests</option>
                        <option value="Test_1">Execute Test 1</option>
                        <option value="Test_2">Execute Test 2</option>
                        <option value="Test_3">Execute Test 3</option>
                        <option value="Test_4">Execute Test 4</option>
                    </select>
                    <br />
                    <p>Nasa API Key</p>
                    <input placeholder='Insert your NASA API Key' value={API_KEY} onChange={e => setAPI_KEY(e.target.value)} className="form-control" />
                </div>
                <br />
                <button className="btn btn-primary" type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default PostCreate;