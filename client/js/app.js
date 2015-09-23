(function(){
 /*   var app = angular.module('tellUs', ['ngResource', 'ui.bootstrap']);

    app.factory('ItemService', function($resource) {
        return $resource('./items/:id', {id: '@id'}, {
            query: {method:'GET', isArray:true },
            save: {method:'POST'}
        });
    });


    app.controller('itemsController', function ($resource, ItemService) {
        this.items = [];

        this.items = ItemService.query();

        this.addPost = function(ItemService) {
            this.items.push([this.title, this.description]);
            ItemService.save([this.title, this.description]);
        };


    });*/


    var app = angular.module('tellUs', ['ui.bootstrap']);

    app.controller('itemsController', ['$http', function($http) {

        itemsCtrl = this;
        itemsCtrl.items = []


        $http.get('./items').success(function(data) {
            itemsCtrl.items = data;
        })

        itemsCtrl.addPost = function() {
            var request = $http({
                    method: 'POST',
                    url: '/items',
                    data: {name: itemsCtrl.title,
                            description: itemsCtrl.description}
                    //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {

            },
            function(response) {

            });
        }

    }]);

})();