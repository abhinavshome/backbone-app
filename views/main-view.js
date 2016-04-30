var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var TodoList = require('../collections/todo-list');


var MainView = Backbone.View.extend({
    el: '.page',
    template: _.template($('#main-view-template').html()),
    render: function() {
        var todoList = new TodoList(), that = this;
        todoList.fetch({
            success: function() {
                var todos = todoList.toJSON();
                that.$el.html(that.template({todos: todos}));
            }
        });
    }
});

module.exports = new MainView();
