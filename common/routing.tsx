import {renderRSC, renderHTML} from '@parcel/rsc/server';
import Stress from "./stress";
import StressUseClient from './stress-use-client';

export async function handleEdgeRequest(req: Request, ReactDOMServer: typeof import('react-dom/server')): Promise<Response> {
    if (req.method === 'GET') {
        const url = new URL(req.url);
        const num = Number(url.searchParams.get('count') || undefined)
        const count = isNaN(num) ? 1 : num;
        try {
            switch (url.pathname) {
                case '/fizz':
                    return new Response(await ReactDOMServer.renderToReadableStream(<Stress count={count} />), {
                        headers: {'Content-Type': 'text/html'}
                    });
                case '/flight':
                    return new Response(renderRSC(<Stress count={count} />));
                case '/ssr':
                    return new Response(await renderHTML(<Stress count={count} />), {
                        headers: {'Content-Type': 'text/html'}
                    });
                case '/use-client':
                    return new Response(await renderHTML(<StressUseClient count={count} />), {
                        headers: {'Content-Type': 'text/html'}
                    });
            }
        } catch (error) {
            return new Response(String(error), {status: 500})
        }
    }
   
    return new Response('Not found', {status: 404});
}