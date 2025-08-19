import path from 'path';
import express from 'express';
import {renderRSC, renderHTML} from '@parcel/rsc/node';
import Stress from '../../common/stress';
import StressUseClient from '../../common/stress-use-client';

const ReactDOMServer: typeof import('react-dom/server') = require(path.resolve(__dirname, '../dist/react.js'));

const app = express();

const pickCount = (req: express.Request): number => {
    const count = Number(req.query.count);
    return isNaN(count) ? 1 : count;
}

app.get('/fizz',  async (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    ReactDOMServer.renderToPipeableStream(<Stress count={pickCount(req)} />).pipe(res)
});

app.get('/flight',  (req, res) => {
    renderRSC(<Stress count={pickCount(req)} />).pipe((res));
});

app.get('/ssr',  async (req, res) => {
    let html = await renderHTML(<Stress count={pickCount(req)} />);
    res.setHeader('Content-Type', 'text/html');
    html.pipe((res));
});

app.get('/use-client',  async (req, res) => {
    let html = await renderHTML(<StressUseClient count={pickCount(req)} />);
    res.setHeader('Content-Type', 'text/html');
    html.pipe((res));
});

app.listen(3000);
console.log(`Server listening on port http://localhost:3000/`);

