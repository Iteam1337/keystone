/**
 * Returns an Express Router with bindings for the Admin UI static resources,
 * i.e files, less and browserified scripts.
 *
 * Should be included before other middleware (e.g. session management,
 * logging, etc) for reduced overhead.
 */

var babelify = require('babelify');
var browserify = require('browserify-middleware');
var debug = require('debug')('keystone:admin:app:static');
var express = require('express');
var packages = require('../packages');
var router = express.Router();
var main = require('path').dirname(require.main.filename);
var fs = require('fs');

var root;

try {
	fs.accessSync(`${main}/admin/src`, fs.F_OK);
	root = `${main}`;
} catch (_error) {
	fs.accessSync(`${__dirname}/../../admin/src`, fs.F_OK);
	root = require('path').normalize(`${__dirname}/../..`);
}

router.use('/styles', require('less-middleware')(`${root}/public/styles`));
router.use(express.static(`${root}/public`));

function doBrowserify (path) {
	router.use('/js', browserify(`${root}/${path}`, {
		external: packages,
		transform: [babelify]
	}));
}

try {
	doBrowserify('src/views');
} catch (_e) {
	console.log('Attempting fail-safe override...');
	doBrowserify('admin/src/views');
}

module.exports = router;
