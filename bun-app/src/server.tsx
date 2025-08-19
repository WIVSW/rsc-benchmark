import path from 'path';
import { handleEdgeRequest } from '../../common/routing';

const ReactDOMServer: typeof import('react-dom/server') = require(path.resolve(__dirname, '../dist/react.js'));

Bun.serve({
   port: 3001,
   fetch: (req) => handleEdgeRequest(req, ReactDOMServer)
});

process.on("unhandledRejection", async (err) => {
	console.log("unhandledRejection");
	console.error(err);
});

console.log('Server listening on port http://localhost:3001/');
