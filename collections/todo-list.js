var Backbone = require('backbone');
var Todo = require('../models/todo');

module.exports = Backbone.Collection.extend({
	model: Todo,
	url: 'http://localhost:3000/todo'
});