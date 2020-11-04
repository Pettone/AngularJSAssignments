(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
    var Narrow = this;

    Narrow.searchItem = "";

    Narrow.wantItem = function(){
        var promise = MenuSearchService.getMatchedMenuItems();

        promise.then(function(response){
            var result = [];
            var foundItems = response.data;

            for (var i = 0; i < foundItems.length; i++) {
                var name = foundItems[i].description;
                if (name.toLowerCase().indexOf(Narrow.searchItem) !== -1) {
                    result.push(foundItems[i]);
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });


    }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
    var service = this;

    service.getMatchedMenuItems = function(){
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json"),
          });
      
          return response;
        };
    }


})();