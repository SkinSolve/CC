require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const loadModel = require('../services/loadModel');
const InputError = require('../exceptions/InputError');
const serviceAccount = require('../key/serviceAccountKey.json');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const init = async () => {
    try {
        const model = await loadModel();
        app.locals.model = model;

        app.use('/', routes);

        app.use((err, req, res, next) => {
            if (err instanceof InputError) {
                return res.status(err.statusCode).json({ status: 'fail', message: err.message });
            }
            if (err.isBoom) {
                return res.status(err.output.statusCode).json({ status: 'fail', message: err.message });
            }
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        });

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to initialize server:', error);
    }
};

init();