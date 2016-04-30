var Backbone = require('backbone');
var mainView = require('./views/main-view');
var newTodoView = require('./views/new-todo-view');
var editTodoView = require('./views/edit-todo-view');


var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'new-todo': 'create',
		'edit-todo/:id': 'edit'
	}
});

var router = new Router();

router.on('route:home', function() {
    mainView.render();
});

router.on('route:create', function () {
	newTodoView.setRouter(router);
	newTodoView.render();
});

router.on('route:edit', function (id) {
	editTodoView.setRouter(router);
	editTodoView.render(id);
});


Backbone.history.start();

module.exports = router;