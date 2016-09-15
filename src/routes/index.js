import { Router } from 'express';
import config from '../config.json';

export default ({ config, db, proxy }) => {
	let routes = Router();

	// add middleware here
	routes.get('*', (req, res) => {
		let urlArgs = req.url.slice(1).split('?')[0].split('/');
	  let appId = urlArgs.shift();
	  let app = config["apps-map"][appId];
	  if (app) {
	    if (app.url.slice(app.url.length+1) !== '/') app.url += '/';
	    req.appHost = app.url;
	    let requestPath = urlArgs.join('/');

	    let target = "";
	    if (app.rails) {
	      target = app.url;
	    }
	    else {
	      target = app.url + requestPath
	    }
	    proxy.web(req, res, { target, secure: false });
	  }
	  else {;
	    res.status(404).send("App not found");
	  }
	})

	return routes;
}
