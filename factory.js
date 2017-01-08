//factory simply means that a class is capable of giving back objects of different types based on the type
//criteria that we pass to it..

// The factory method / constructor/class (whatever you can make it) if has a static function will be a better
//implementation 

var VehicleFactory;
function(){
//you can define somethings inside if you want some instance based properties.
//but mostly factory class will be utility class and will provide only creation of objects (Maybe synthesis also)
	var instance;
	VehicleFactory=  function VehicleFactory(){
		if (!instance)
			instance = this;
		return instance;
	}
}

VehicleFactory.prototype.drive = function(){
	return "I have" +  this.wheels + "and I am a" + this.type
}


VehicleFactory.getVehicle = function(type){

	if (typeof VehicleFactory[type] !== "function" {
		throw {
			name:"Vehicle type not Error",
			message:type + "does not exist"
		}
	}

	if (typeof VehicleFactory[type].prototype.drive !== "function"){
		VehicleFactory[type].prototype = new VehicleFactory(); //make the carmaker a singleton , that would be nice
	}

	return new VehicleFactory[type]();
}

VehicleFactory.Car = function(){
	this.wheels = 4;
	this.type = "car"
}

VehicleFactory.Truck = function(){
	this.wheels = 6;
	this.type = "truck"
}

VehicleFactory.Ricksaw = function(){
	this.wheels = 3;
	this.type = "Auto"
}