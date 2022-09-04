const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const fs = require('fs');

const newman = require('newman');
const path = require('path');

const app = express();

// Acting as middleware
app.use(bodyParser.json());
app.use(cors());


// Object for storing locally the execution log
const executions = {};

// Newman options object
let newman_options = {
    collection: require('./collections/Mars_Rover_API.postman_collection.json'),
    envVar: [
        { "key": "API_KEY", "value": "" },
        { "key": "Rover", "value": "curiosity" },
        { "key": "Sol", "value": 1000 },
        { "key": "n_photos", "value": 10 }
    ],
    reporters: ['htmlextra']
}

// Route for retrieving the posts
app.get('/executions', (request, response) => {
    console.log('Executions requested')
    response.send(executions);
});

// Route for posting 'posts'
app.post('/executions', async (request, response) => {
    
    const execution_id = randomBytes(4).toString('hex');
    const newman_reports_route = process.cwd() + '/newman/';

    console.log('Incoming Request \n')

    if (request.body.option !== 'All') {
        newman_options.folder = request.body.option
    }

    // Updating newman options
    newman_options.envVar[0].value = request.body.API_KEY;

    let results = await runPostmanCollection(newman_options);
    

    const files = fs.readdirSync(newman_reports_route, (err, files) => {
        if (err) {
            console.log(err)
            return;
        }
    });

    const last_report = files[files.length -1];
    
    executions[execution_id] = {
        'id': execution_id, 
        'file': path.join(process.cwd(), 'newman', last_report),
        'timestamp': new Date(results.run.timings.completed),
        'executionType': request.body.option
    }

    response.status(201).send(executions[execution_id]);
});

// Adding Post request handler
app.post('/events', (request, response) => {
    console.log('Received event', request.body.type);

    response.send({}).status(200);
});

async function runPostmanCollection(newman_options) {
    return new Promise((resolve, reject) => {
        newman
            .run(newman_options)
            .on('start', () => {
                console.log('Running Collection...');
            })
            .on('done', (err, summary) => {
                if (err || summary.error) {
                    console.log('Collection run encountered an error.')
                    reject(err)
                } else {
                    console.log('Collection run completed.')
                }
                resolve(summary);
            });
    }
    )
}

// Set the port in which the application will be listening.
app.listen(4000, () => {
    console.log('[EXECUTION_SERVICE] Listening on 4000.')
})