//It is used when 

//1.suppose a parent object has several children objects inheriting from it or it shares a is-a relationship then you might want to provide the
//inheritence of properties of parent object to the child objects

//2. There may be several children types and you want to create objects of children based on runtime inputs to the getInstance method of the 
//parent , then you might use this pattern

//3. you may want the parent class to be abstract type (non-instantiable)

/*you can achieve all this and more with little tweaks in the factory pattern*/

/*
points to keep in mind when you make the factory pattern:
    1. we need the child classes to be the static properties (functions) of the parent constructor, so we know what they are and access them
    2. we define a getInstance method that takes the input as to what type of child instance you want

*/
//1. first way to define a factory

AbstractFactoryProducer.CarFactory = (function(){
function CarFactory(){}

//defining the properties to be inherited from the parent in the prototype of the parent
CarFactory.prototype.drive = function(){
    //method to be inherited in all cars
}


//define the static constructors of various types to be chosen among for object creation
CarFactory.SUV = function(){
    this.prop = "val"
}

CarFactory.Mahindra = function(){
    this.prop = "val"
}

CarFactory.Sumo = function(){
    this.prop = "val"
}

//defining a static method to create the right kind of object and throw error if not found
CarFactory.getInstance = function(type){
    var vehicleClass = CarFactory[type]; //additional logic to select the car type based on the config options send in the parameter
    if (typeof vehicleClass !== "function"){
        // if the vehicle class is not found then throw error
        throw{
            name:"UnknownConstructorError",
            message: "the type "+ type + " is not found for Carfactory"
        }
    }
    
    // if the inheritence of parents properties has not been done then do it here, (its better if u make the factory singleton so that 
    // every inheritence only seeks one  object of the parent cause that makes sense if there are only methods in parent)
    if (vehicleClass.prototype.drive !== "function"){
        vehicleClass.prototype = new CarFactory;
    }
    
    return new vehicleClass();
}
return CarFactory;
})();
//using this pattern

var mySuv = CarFactory.getInstance("SUV");
var mySumo = CarFactory.getInstance("Sumo");


//2. if you want some private methods  and private classes in the factory rather than
//public static classes then you put it inside an immediate function and return the factory class
AbstractFactoryProducer.FoodFactory = (function(){
    function Breakfast(){
        this.something= "something"
    }
    function Lunch(){
        this.something= "something"
    }
    function Dinner(){
        this.something= "something"
    }
    var selections = {
        "BREAKFAST": Breakfast,
        "LUNCH" : Lunch,
        "DINNER": Dinner
    }
    
    function getClass(selector){
        //logic to return the correct class, here we consider the same names but all capitalized
        return selections[selector.toUpperCase()]
    }
    
    function FoodFactory(){}
    
    FoodFactory.getInstance = function(type){
        var childClass = getClass(type);
        return new childClass();
    }
    FoodFactory.prototype.drive = function(){
        //do something;
    }
    
    var factoryObj = new FoodFactory(); 
    //see below how only one object is used if we wanted to inherit only the methods
    Dinner.prototype = factoryObj;
    Breakfast.prototype = factoryObj;
    Lunch.prototype = factoryObj;
    
    return FoodFactory;
})();


//you can make a factory of factories called Abstract factory pattern

function AbstractFactoryProducer(){}

AbstractFactoryProducer.getFactory = function(factoryType){
    if (factoryType == "car")
        return AbstractFactoryProducer.CarFactory;  
    else if (factoryType == 'food')
        return AbstractFactoryProducer.FoodFactory;
}

//also you can put them all in one module as I did to not polute the global namespace
//it all depends on the level of exposure you want to provide to the users and the level of privacy you want in your module
