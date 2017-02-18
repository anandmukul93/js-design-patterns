//various ways to implement the singleton pattern 

//1. object literal, as no other object is the same as an object declared with the object literal
var singleton = {
    prop1: "value1",
    prop2: "value2"
}

//2. new constructor pattern

    //2.1 using the self -defining functions and instance as static property of the constructor
    function Singleton(){
        if(Singleton.instance !== undefined && typeof Singleton.instance === "object")
            return Singleton.instance
        this.prop = "value";
        Singleton.instance = this;
        return this; //or implicit return
    }
    
    //2.2 using instance in a closure
    function Singleton(){
        var instance = this
        
        this.prop = "val"
        
        Singleton = function(){
            return instance;
        }
    }
    //caveats are that the properties that are assinged to the prototype of Singleton after the first use of the constructor 
    //are not available to the object as the object was an instance of the previous definition of the singleton function and any addition to 
    //eg. if i use 
        var obj = new Singleton()
        //then if i do 
        Singleton.prototype.prop2 = "something"
        //and then if i try to access the prop2 , we get undefined as the (obj.constructor.prototype === old singleton) and Singleton is 
        //the new definition whose objects still have the old definition's prototype
    //to fix this we do this
    function SingletonFixed(){
        var instance;
        
        Singleton = function SingletonFixed(){
            return instance;
        }
        
        Singleton.prototype = this;
        instance = new Singleton();
        instance.constructor = SingletonFixed;
        instance.prop = "val"; //add properties 
        return instance;
    }
    
    
//3. using the immediate function pattern
var Singleton = (function(){
    function Singleton(){
        this.prop = "val"
    }
    //or object literal
    var instance = {
        prop: "val"
    }
    
    return {
        getInstance : function(options){
            return instance || new Singleton()
        }
    }
})();


//one benefit of using the closures that they provide additional scope for private functions and therefore are much in need at the moment

