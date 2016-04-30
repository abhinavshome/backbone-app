var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var Todo = require('../models/todo');

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

var NewTodoView = Backbone.View.extend({
	el: '.page',
	template: _.template($('#new-todo-template').html()),
	render: function (router) {
		this.$el.html(this.template());
	},
	setRouter: function (router) {
		this.router = router;
	},
	events: {
		'submit form': 'createTodo'
	},
	createTodo: function (e) {
		e.preventDefault();
		var formObj = $(e.currentTarget).serializeObject();
		formObj.done = formObj.done ? true : false;
		var todo = new Todo(formObj);
		var that = this;
		todo.save({}, {
			success: function () {
				that.router.navigate('', {trigger: true});
			}
		});
	}
});

module.exports = new NewTodoView();