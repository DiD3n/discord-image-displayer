import express from 'express';

import { app as config } from '../config.json';

export const expressServer = express();


expressServer.listen(config.expressPort, () => {
    console.log(`Server is running on port ${config.expressPort}`);
});

expressServer.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
