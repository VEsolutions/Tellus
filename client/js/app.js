(function(){
    var app = angular.module('tellUs', ['ui.bootstrap']);

    app.controller('itemsController', ['$http', function($http) {

        itemsCtrl = this;
        itemsCtrl.items = []


        $http.get('./items').success(function(data) {
            itemsCtrl.items = data;
        })

        itemsCtrl.addPost = function() {
            var data = {name: itemsCtrl.title, description: itemsCtrl.description};
            $http.post('/items', data).then(function(response) {
                itemsCtrl.items.push({name: itemsCtrl.title, description: itemsCtrl.description, yum: "0"});
            },
            function(response) {
                alert("Server error");
            });
        }

        itemsCtrl.update = function(post, number) {
            var data = {id: post._id, number: number};
            $http.put('/items/'+post._id, data).then(function(response) {
                for(var i = 0; i < itemsCtrl.items.length; i++){
                    if(itemsCtrl.items[i]._id === response['data']._id) {
                        itemsCtrl.items[i].yum = response['data'].yum;

                    }
                }
            }, 
            function(response) {
                alert("Unsuccessfull update :/");
            });
        };

    }]);

})();