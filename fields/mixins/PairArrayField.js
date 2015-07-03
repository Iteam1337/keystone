var _ = require('underscore'),
	React = require('react');

var lastId = 0;

function newItem(values) {
	lastId = lastId + 1;
	return { key: 'i' + lastId, value: { first: values.first, second: values.second } };
}

module.exports = {
	getInitialState: function() {
		return {
			values: this.props.value.map(newItem)
		};
	},
	
	componentWillReceiveProps: function(nextProps) {
    var propsValues = nextProps.value;
    var stateValues = _.pluck(this.state.values, 'value');
    var propsString = _.map(propsValues, function(val) {
      return val.first + val.second;
    });
    var stateString = _.map(propsValues, function(val) {
      return val.first + val.second;
    });
		if (propsString.join('|') !== stateString.join('|')) {
			this.setState({
				values: nextProps.value.map(newItem)
			});
		}
	},
	
	addItem: function() {
		var newValues = this.state.values.concat(newItem('', ''));
		this.setState({
			values: newValues
		});
		this.valueChanged(_.pluck(newValues, 'value'));
	},
	
	removeItem: function(i) {
		var newValues = _.without(this.state.values, i);
		this.setState({
			values: newValues
		});
		this.valueChanged(_.pluck(newValues, 'value'));
	},
	
	firstChanged: function(i, event) {
		var updatedValues = this.state.values;
		var updateIndex = updatedValues.indexOf(i);
		updatedValues[updateIndex].value.first = this.cleanInput ? this.cleanInput(event.target.value) : event.target.value;
		this.setState({
			values: updatedValues
		});
		this.valueChanged(_.pluck(updatedValues, 'value'));
	},

	secondChanged: function(i, event) {
		var updatedValues = this.state.values;
		var updateIndex = updatedValues.indexOf(i);
		updatedValues[updateIndex].value.second = this.cleanInput ? this.cleanInput(event.target.value) : event.target.value;
		this.setState({
			values: updatedValues
		});
		this.valueChanged(_.pluck(updatedValues, 'value'));
	},
	
	valueChanged: function(values) {
		this.props.onChange({
			path: this.props.path,
			value: values
		});
	},
	
	renderItem: function(i) {
		return (
			<div key={i.key} className='field-item'>
				<a href="javascript:;" className='field-item-button btn-cancel' onClick={this.removeItem.bind(this, i)}>&times;</a>
				<input ref={'input_' + i.key} className='form-control multi' type='text' name={this.props.path + '[' + i.key + '][first]'} value={i.value.first} onChange={this.firstChanged.bind(this, i)} autoComplete='off' />
				<input ref={'input_' + i.key} className='form-control multi' type='text' name={this.props.path + '[' + i.key + '][second]'} value={i.value.second} onChange={this.secondChanged.bind(this, i)} autoComplete='off' />
			</div>
		);
	},
	
	renderField: function () {
		return (
			<div>
				{this.state.values.map(this.renderItem)}
				<button type="button" className='btn btn-xs btn-default' onClick={this.addItem}>Lägg till</button>
			</div>
		);
	},
	
	// Override shouldCollapse to check for array length
	shouldCollapse: function () {
		return this.props.collapse && !this.props.value.length;
	}
};
