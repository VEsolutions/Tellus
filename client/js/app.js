(function(){
    var app = angular.module('tellUs', ['ngResource', 'ui.bootstrap']);

    app.factory('ItemService', function($resource) {
        return $resource('./items/:id', {id: '@id'}, {
            query: {method:'GET', isArray:true },
            post: {method:'POST'}
        });
    });


    app.controller('itemsController', function ($resource, ItemService) {
        this.items = [];

        this.items = ItemService.query();

        this.addPost = function(ItemService) {
            ItemService.post(this.title);
        };


    });

    // app.controller('itemsController', ['$resource', function ($resource) {
    //     var Item = $resource('api/items:item', {item: "@item"});

    //     this.items = [];

        
    //     Item.query(function(results) {
    //         this.items = results;
    //         console.log(results);
    //     });
    // }]);


    // app.controller('ItemController', function(){
    //  this.items = meals;
    // });

    // var meals = [{
    //  name: 'McDonalds',
    //  description: "Donken du vet..",
    //  yum: 0
    // }];
})();