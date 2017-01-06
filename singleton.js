// singleton pattern

//1. using the object literal as each object literal declaration is unique and cannot be replicated

var singleton = { prop:"value"}

//in js objects are not equal even if you make another object, but with the same properties in it. 

var singleton2 = {prop:"value"}

singleton === singleton2 // gives false
singleton == singleton2 // gives false


//2. using the static property, but remember that the static property is public so we need not implement this way as it
//exposes the variables 

function Singleton(vars){
	if(typeof Singleton.instance === "object"){
		Singleton.instance.vars = vars
		return Singleton.instance
	}

	//proceed as normal and create the instance and store in the static property
	this.vars = vars
	Singleton.instance = this

	//implicit return or return explicitly
}

//testing 
s1 = new Singleton({somevar: "somevalue"})
s2 = new Singleton({somevar: "somevalue2"})
s1 === s2 // true
s1 == s2 // true



//3. another way is to use the self defining functions but remember that the name properties or other properties of the
//previous constructor function gets lost when you redefine the function

function Universe(){
	//the cached instance
	var instance = this;

	//set the variables 
	//this.var = "something"
	Universe = function Universe(){
		return instance;	
	}
}

var uni = new Universe();
var uni2 = new Universe();

uni1 === uni2 //true


// see the problem with the above pattern 
Universe.prototype.var1 = true;

var obj = new Universe();

//now the Universe function is redefined
Universe.prototype.var2 = true
var obj2 = new Universe();

obj === obj2 // true
obj.var1 // true
obj2.var1 //true
obj2.var2 //false as obj2 and obj1 have no access to the var2 of the new prototype
obj2.constructor.name //Universe 
obj2.constructor === Universe //false as the constructor was the old one

//4. few tweaks make the constructor and the prototypes are working fine
function Universe(){
	//the cached instance
	var instance;

	//set the variables 
	//this.var = "something"
	Universe = function Universe(){
		return instance;	
	}

	
	Universe.prototype = this;
	instance = new Universe();
	instance.constructor = Universe;

	//set variables 
	return instance;
}

//5. another way is , this reduces another object initialization, but the prototypes and constructor property are 
//working fine

function Universe(){
	var instance = this, prototype = Universe.prototype;
    Universe = function Universe(){
		return instance;
	}
	Universe.prototype = prototype;
	instance.constructor = Universe; 
	//assign the values to this vars
	instance.some_var = true
	return instance;
}

Universe.prototype.var1 = true;

var obj = new Universe();

//now the Universe function is redefined
Universe.prototype.var2 = true
var obj2 = new Universe();

console.log(obj === obj2 )// true
console.log(obj.var1 )// true
console.log(obj2.var1 )//true
console.log(obj2.var2 )//true
console.log(obj2.constructor.name) //Universe 
console.log(obj2.constructor === Universe) //true


//another alternative is and in general the best if you like to create using new keyword is 
// it also provides for public and private members, but this too has some drawbacks like the constructor and 
//prototypes not working as expected but now you know how to tweak it to make the prototypes and constructor to 
//point to the correct functions or vars

var Singleton = (function(){
	//private members
	var instantiated;

	function init(){
		var obj = {
			publicMethod:function(){
				//something
			},
			publicVar : "some var"
		};
		return obj;
	}

	return {
		getInstance: function(){
			if(!instantiated){
				instantiated = init();
			}
			return instantiated;
		}
	}
})()


//Good luckkk!!