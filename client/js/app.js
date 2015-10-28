(function(){
    var app = angular.module('tellUs', ['ngCookies', 'ui.bootstrap']);

    app.controller('itemsController', ['$http', '$cookies', function($http, $cookies) {

        itemsCtrl = this;
        itemsCtrl.items = [];
        itemsCtrl.newItem = {};
        itemsCtrl.incoming = false;
        var votesCookie = $cookies.get('allVotes');
        if(!votesCookie) {
            votesCookie = "";
        }
        itemsCtrl.votedOn = [];

        if(votesCookie.indexOf(', ') != -1) {
            itemsCtrl.votedOn = votesCookie.split(', ');
        }
        itemsCtrl.isClicked = function(id) {
            if(itemsCtrl.votedOn.indexOf(id) == -1) {
                return false;
            }            
            return true;
        }

        $http.get('./items').success(function(data) {
            itemsCtrl.items = data;
        })



        
        //alert(votesCookie);

        itemsCtrl.previewPost = function() {
            var data = {name: itemsCtrl.title, description: itemsCtrl.description, imgurl: ""};
            var body = "";

            $http.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + data.name)
            .then(function(res){ //successfull callback
                body = res.data;
                var parsed = angular.fromJson(body);
                var parsedData = parsed['data'];
                data.imgurl = parsedData['image_url'];
                itemsCtrl.newItem = data;
                itemsCtrl.incoming = true;
            }, function(res) { // error callback
                alert(res.message);
            });
        }

        itemsCtrl.addPost = function() {
            itemsCtrl.incoming = false;
            $http.post('./items', itemsCtrl.newItem)
            .then(function(response) {
                itemsCtrl.resetNewItem();
                itemsCtrl.items.push(response.data);
            },
            function(response) {
                alert("Server error");
                itemsCtrl.resetNewItem();
            });
        }

        itemsCtrl.resetNewItem = function() {
            itemsCtrl.newItem = {};
            itemsCtrl.incoming = false;
            itemsCtrl.title = "";
            itemsCtrl.description = "";
        }


        itemsCtrl.update = function(post, number) {
            var data = {id: post._id, number: number};
            itemsCtrl.votedOn.push(post._id);
            $http.put('./items/'+post._id, data).then(function(response) {
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