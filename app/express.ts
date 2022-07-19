import express from 'express';
import path from "path";

import config from '../config.json';

export const expressServer = express();

expressServer.set('view engine', 'pug')

expressServer.use(express.static('public'))

expressServer.get('/', (req, res) => {
    res.render(path.join(__dirname, '../public/index.pug'), {
        wsPort: config.app.wsPort,
        ...config.client
    })
});

expressServer.listen(config.app.expressPort, () => {
    console.log(`Server is running on port ${config.app.expressPort}`);
});

