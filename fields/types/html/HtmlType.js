var FieldType = require('../Type');
var TextType = require('../text/TextType');
var util = require('util');

/**
 * HTML FieldType Constructor
 * @extends Field
 * @api public
 */
function html(list, path, options) {
	this._nativeType = String;
	this._defaultSize = 'full';
	this.wysiwyg = options.wysiwyg || false;
	this.height = options.height || 180;
  this.enableImages = options.enableImages || false;
  this.enableCloudinaryUploads = options.enableCloudinaryUploads || false;
  this.enableHtmlPaste = options.enableHtmlPaste || false;
  this.enableTables = options.enableTables || false;
  this.enableHtml = options.enableHtml || false;

	this._properties = ['wysiwyg', 'height', 'enableImages', 'enableCloudinaryUploads', 'enableHtmlPaste', 'enableTables', 'enableHtml'];

	html.super_.call(this, list, path, options);
}
util.inherits(html, FieldType);

/* Inherit from TextType prototype */
html.prototype.addFilterToQuery = TextType.prototype.addFilterToQuery;

/* Export Field Type */
exports = module.exports = html;
