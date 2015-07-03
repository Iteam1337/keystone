/*!
 * Module dependencies.
 */

var util = require('util'),
    _ = require('underscore'),
	  utils = require('keystone-utils'),
	  super_ = require('../Type');

/**
 * PairArray FieldType Constructor
 * @extends Field
 * @api public
 */

function pairarray(list, path, options) {
  this._nativeType = [];

	pairarray.super_.call(this, list, path, options);
}

/*!
 * Inherit from Field
 */

util.inherits(pairarray, super_);

//pairarray.prototype.addToSchema = function() {

	//var schema = this.list.schema;

	//var paths = this.paths = {
		//first: this._path.append('.first'),
		//second: this._path.append('.second')
	//};

	//schema.add({
		//first: String,
		//second: String
	//}, this.path + '.');

	//this.bindUnderscoreMethods();
//};

/**
 * Validates that a value for this field has been provided in a data object
 *
 * @api public
 */

pairarray.prototype.validateInput = function(data, required, item) {
	var value = this.getValueFromData(data);

	if (required) {
		if (value === undefined && item && item.get(this.path) && item.get(this.path).length) {
			return true;
		}
		if (value === undefined || ('object' !== typeof value) || ('string' !== typeof value) || ('number' !== typeof value)) {
			return false;
		}
		if (('object' === typeof value) && !value.length) {
			return false;
		}
	}
	return (value === undefined || ('object' === typeof value) || ('string' === typeof value) || ('number' === typeof value));
};

/**
 * Updates the value for this field in the item from a data object
 *
 * @api public
 */

pairarray.prototype.updateItem = function(item, data) {
	var value = this.getValueFromData(data);
	
	if ('undefined' !== typeof value) {
		if (value === null) {
			value = [];
		}
		if ('string' === typeof value) {
			value = [value];
		}
		if ('number' === typeof value) {
			value = [value.toString()];
		}
		if ('object' === typeof value) {
			item.set(this.path, _.values(value));
		}
	}
};

/*!
 * Export class
 */

exports = module.exports = pairarray;
