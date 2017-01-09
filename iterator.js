//the iterator pattern means to encapsulate the 

var Collection = function(){
//make this a factory of several types of collections like hash, array, set, trees, list,etc
}

//not required
// Collection.prototype.next = function(){
// 	//some generic implementation using this
// }
// Collection.prototype.hasNext = function(){
// 	//generic implementation
// }
Collection.getCollectionByType = function(type){
	if(typeof Collection[type] !== "function"){
		throw {
			type:"Collection Type Unavailable Error",
			message: type + "not found"
		}
	}
	
	return new Collection[type];
}

Collection.List = function(data){	
		var array = [], index = 0;

		//handle different cases where data is in several format or throw error when data input is different from all of those
		
		var length = array.length;
		
		return {
			next:function(){
				return array[index++];
			},
			hasNext:function(){
				return index < array.length;
			},
			rewind: function(){
				index = 0;
			},
			peek: function(){
				return array[index];
			}
		}
}

//similarly other types 

//GOOD LUCK !!!!