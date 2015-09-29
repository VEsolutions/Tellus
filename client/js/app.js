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
/*            var request = $http({
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST',
                    url: './items',
                    data: { name: itemsCtrl.title,
                            description: itemsCtrl.description},
                    params: {name: itemsCtrl.title,
                            description: itemsCtrl.description}
            })*/
            var data = {name: itemsCtrl.title, description: itemsCtrl.description};
            $http.post('/items', data).then(function(response) {
                itemsCtrl.items.push({name: itemsCtrl.title, description: itemsCtrl.description, yum: "0"});
            },
            function(response) {
                alert("Server error");
            });
        }

    }]);

})();