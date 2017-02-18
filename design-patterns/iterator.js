// this is primarily to achieve this behaviour 

// you want to create a container(which is a collection) which has some underlying structure 
// but you want to expose a standard way of iterating through the elements in the container


//but first an example of iterator pattern

//you want to create a collection which holds data in the form of list and can initialize it with some hash data, its easy

function Container(someHash){
    //based on the type of arguments given, you provide the logic whether you can construct the collection from them or not or throw error
    //if not supported
    //lets say i want to accept hashes and will store them in the container as pair_list(list of two elements -> [key ,value])
    return (function (){
       var innerData = [];
       var iteratorIndex = 0;
       if (typeof someHash === "object"){
            for(var key in someHash){
                if (someHash.hasOwnProperty(key))
                    innerData.push([key,someHash[key]])
            }
       }
       else if (someHash !== undefined){
           throw{
               name: "UnsupportedParameterException",
               messsage:"Cannot initialize the container with data of type " + typeof someHash
           }
       }
       
       return {
           getNext:function(){
                if (iteratorIndex >= innerData.length)
                    throw{
                        name:"NoNextElementFound",
                        message: "iterator reached end for container"
                    }
               return innerData[iteratorIndex++];
           },
           reset: function(){
               iteratorIndex = 0;
           },
           getPrev: function(){
               //similar implementation
           },
           count: function(){
               return innerData.length;
           },
           hasNext: function(){
                if (iteratorIndex < innerData.length)
                    return true;
                else
                    return false;
           },
           hasPrev: function(){
               //implementation similar
           },
           rewind: function(){
               if(iteratorIndex > 0)
                    iteratorIndex --;
               else
                    throw{
                        name:"IteratorBorderException",
                        message: "cannot rewind back, iterator border reached, no elements before it present"
                    }
           }
       }
    })(someHash);
}


