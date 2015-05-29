var React = require('react');

module.exports = React.createClass({
	
	displayName: 'InvalidFieldType',
	
	render: function() {
		return <div className="alert alert-danger">Fel fälttyp <strong>{this.props.type}</strong> vid path <strong>{this.props.path}</strong></div>;
	}
	
});
