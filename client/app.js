(function(){
	var app = angular.module('tellUs', []);

	app.controller('ItemController', function(){
		this.items = meals;
	});

	var meals = [{
		name: 'McDonalds',
		description: "Donken du vet..",
		yum: 0
	}];
})();