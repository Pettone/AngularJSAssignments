(function () {
'use strict';

var items = [
    {
        name: "Banana",
        quantity: "9"
    },
    {
        name: "Coca-Cola",
        quantity: "8"
    },
    {
        name: "Pepsi",
        quantity: "7"
    },
    {
        name: "Orange",
        quantity: "6"
    },
    {
        name: "Bimbo",
        quantity: "5"
    }
];

var items2 = [];


angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this;

    toBuy.empty1 = false;
    
    toBuy.items = ShoppingListCheckOffService.getItems();

    toBuy.swapItems = function (index){
        ShoppingListCheckOffService.swapItems(index);
        toBuy.empty1 = ShoppingListCheckOffService.check1();
    }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
    var already = this;

    already.list2 = function(){
        return ShoppingListCheckOffService.checkList2();
    }

    already.showAlready = ShoppingListCheckOffService.getItems2();
}

function ShoppingListCheckOffService(){
    var service = this;

    service.swapItems = function(index) {

        var item = {
            name: items[index].name,
            quantity: items[index].quantity
        };

        items2.push(item);
        items.splice(index,1);
       
    };

    service.check1 = function(){
        if ( items.length === 0 ){
            return true;
        }
        else
        {
            return false;
        }
    }

    service.getItems = function (){
        return items;
    };

    service.getItems2 = function (){
        return items2;
    };

    service.checkList2 = function(){
        console.log(items2.length);
        if ( items2.length === 0 ){
            return true;
        }else{
            return false;
        }
    }

}


})();