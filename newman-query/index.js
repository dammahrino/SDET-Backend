const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const query_service_port = 4002;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const executions = {};

app.get('/executions', (request, response) => {
    response.status(200).send(executions);
});

app.post('/events', (request, response) => {
    const { type, data } = request.body;

    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = {
            id, 
            title,
            comments: []
        }
    }

    response.status(201).send({});
});

app.listen(query_service_port, () => {
    console.log('[QUERY_SERVICE] Listening on', query_service_port);
})
