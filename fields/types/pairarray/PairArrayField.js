var _ = require('underscore'),
	Field = require('../Field'),
	PairArrayFieldMixin = require('../../mixins/PairArrayField');

module.exports = Field.create({
	
	displayName: 'PairArrayField',
	
	mixins: [PairArrayFieldMixin]
	
});
