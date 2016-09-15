import http from 'http';
import url from 'url';
import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import config from './config.json';

import { createProxyServer } from 'http-proxy';

let proxy = createProxyServer({});
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('Host', url.parse(req.appHost).host);
});

let app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(routes({ config, proxy }));

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
