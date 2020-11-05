(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

var result = [];

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
    var Narrow = this;

    Narrow.searchItem = "";
    Narrow.array = [];

    Narrow.wantItem = function(){
        var found = MenuSearchService.getMatchedMenuItems();

        found.then(function(response){
            var items = [];
            items = response.data.menu_items;
            console.log(foundItems);

            for (var i = 0; i < items.length; i++) {
                var name = items[i].description;
            
                if (name.toLowerCase().indexOf(Narrow.searchItem) !== -1) {
                    result.push(items[i]);
                }
            }
            Narrow.array = result;
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    Narrow.removeItem = function(index){
        MenuSearchService.removeItem(index);
    }
}

function FoundItemsDirective(){
    var ddo ={
        templateUrl: 'foundItems.html',
        scope: {
            items: '<',
            badRemove: '=',
            onRemove: '&'
        },
        controller: NarrowItDownController,
        controllerAs: 'Narrow',
        bindToController: true
    };

    return ddo;
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

    service.removeItem = function (itemIndex){
        result.splice(itemIndex,1);
    }
}


})();