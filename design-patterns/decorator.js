//decorator is required to have a wrapper around the inner object

//useful when you want to decorate some base entity with wrapper entity and again some other wrapper entity

//eg. go to CCD , there you order a pastry, and then you order toppings and extras on it like double whipped cream, hot chocolate, vanilla icecream, etc

//this is decorating , but when you want to calculate price,you might want to have several specialised implementation of decorators and
// base products

function ProductAndDecorator(){
    //make this also singleton if you just want method inheritence
    
    var getDecorator = function(type, subtype){
        //return the right object using abstract factory   
    }
    
    ProductAndDecorator.prototype.decorate = function(type,subtype, quantity){
        var decorator = getDecorator(type,subtype);
        
        if (decorator !== undefined){
            if (decorator.prototype.getPrice !== "function"){
                decorator.prototype = new Decorator;
            }
            var decoratorObj = new decorator(quantity);
            decoratorObj.uber = this;
        }
    }
}

function BaseProduct(){
    if (typeof BaseProduct.instance === "object")
        return BaseProduct.instance;
    this.getPrice = function(){
        return this.price;
    }
    
    BaseProduct.instance = this;
    return this;
}

BaseProduct.prototype = new ProductAndDecorator();


function Decorator(){
    if (typeof Decorator.instance === "object")
        return Decorator.instance;
    this.getPrice = function(){
        return this.price* this.quantity + this.uber.getPrice();
    }
    Decorator.instance = this
    return this;
}

Decorator.prototype = new ProductAndDecorator();


//now we have established some reusable functions and other things for the parent child inheritence and 
// we are only left with the various children relationships
BaseProduct.Pastry = function(){
    this.price = 100;
}

Decorator.whippedCream = function(quantity){
    this.price = 20;
    this.quantity = quantity || 1;
}

Decorator.hotChocolate = function(quantity){
    this.price = 30;
    this.quantity = quantity || 1;
}

Decorator.VanillaTopping = function(quantity){
    this.price = 30;
    this.quantity = quantity || 1;
}



// 2. we can also implement using the list approach 
function Sale(baseItem){
    this.price = baseItem.getPrice() || 100;
    this.decorators_list = [];
}


Sale.prototype.decorate = function (decorator) {
    this.decorators_list.push(decorator);
};

Sale.prototype.getPrice = function () {
    var price = this.price,
        i,
        max = this.decorators_list.length,
        name;
    for (i = 0; i < max; i += 1) {
        name = this.decorators_list[i];
        price = Sale.decorators[name].getPrice(price);
    }
    return price;
};


//and each decorator can be implemented simply
Sale.decorators = {}

Sale.decorators.HotChocolate = {
    getPrice:function(price){
        return price + price * 7 / 100; //cost as percentage of the cost
    }
}

Sale.decorators.WhippedCream = {
    getPrice: function(price){
        return price + 20;
    }
}
//etc...

//And thats it,  the decorator pattern is as simple as you might be thinking of it now...