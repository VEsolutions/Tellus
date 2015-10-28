(function(){
    var app = angular.module('tellUs', ['ui.bootstrap']);

    app.controller('itemsController', ['$http', function($http) {

        itemsCtrl = this;
        itemsCtrl.items = [];
        itemsCtrl.newItem = {};
        itemsCtrl.incoming = false;


        $http.get('./items').success(function(data) {
            itemsCtrl.items = data;
        })

        itemsCtrl.addPost = function() {
            var data = {name: itemsCtrl.title, description: itemsCtrl.description, imgurl: ""};
            var body = "";

            // http.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + searchWord, function(res) {
            //     console.log("Got response: " + res.statusCode);
            //     res.on('data', function(d) {
            //         body += d;
            //     });

            //     res.on('end', function() {
            //         var parsed = JSON.parse(body);
            //         var data = parsed["data"];
            //         console.log(data);
            //         item.imgurl = data["image_url"];
            //         console.log(item.imgurl);
            //         save();
            //     });

            // }, save).on('error', function(e, save) {
            //     console.log("Got error: " + e.message);
            //     save();
            // });

            $http.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + data.name)
            .then(function(res){ //successfull callback
                body = res.data;
                var parsed = angular.fromJson(body);
                var parsedData = parsed['data'];
                data.imgurl = parsedData;
                itemsCtrl.newItem = data;
                itemsCtrl.incoming = true;

            }, function(res) { // error callback
                alert(res.message);
            });


            


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