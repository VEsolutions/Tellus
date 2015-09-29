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

    }]);

})();