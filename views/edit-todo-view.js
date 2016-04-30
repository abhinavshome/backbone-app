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

var EditTodoView = Backbone.View.extend({
    el: '.page',
    template: _.template($('#edit-todo-template').html()),
    render: function(id) {
        this.todo = new Todo({ id: id }),
            that = this;
        this.todo.fetch({
            success: function() {
                that.$el.html(that.template({ todo: that.todo.toJSON() }));
            }
        })
    },
    setRouter: function(router) {
        this.router = router;
    },
    events: {
        'submit form': 'updateTodo'
    },
    updateTodo: function(e) {
        e.preventDefault();
        var formObj = $(e.currentTarget).serializeObject();
        formObj.done = formObj.done ? true : false;
        
        var that = this;
        this.todo.save(formObj, {
            success: function() {
                that.router.navigate('', { trigger: true });
            }
        });
    }
});

module.exports = new EditTodoView();
