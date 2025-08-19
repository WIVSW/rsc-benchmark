import { handleEdgeRequest } from '../../common/routing';
import path from 'path';

const ReactDOMServer: typeof import('react-dom/server') = require(path.resolve(__dirname, '../dist/react.js'));

Deno.serve({ port: 3002 }, (req) => handleEdgeRequest(req, ReactDOMServer));

process.on("unhandledRejection", async (err) => {
	console.log("unhandledRejection");
	console.error(err);
});
