// lets you select an algorithm at run time
//eg. is to use in places where you want run time selection of algorithm much like run time creation of objects based on some input

//lets say you have some validator and you want to validate different fields of data from a form, you might have seen in many frameworks
//that there is a method to do form validation like non-empty, only upper-case, only number, length : 1<= l <= n, etc

//so we will see and implement strategy pattern with an example, form validation example and also examples from some other frameworks 

//you have some data : 

var data = {
    first_name: "Super",
    last_name: "Man",
    age: "unknown",
    username: "o_O"
};

// and you have some configuration for the datatypes. It says about the context you want each datatype of the data object to be validated
//with. eg. - first_name : ["isNonEmpty", "isAlphabetic" "hasLength:10-30"], age:"isNumber", etc which are the context in which we want 
//validate each data type of the data object



var validator = {
    errorMessages : [],
    validators : {}
}

validator.validate = function(data, context){
    var type, validationtype, checker,params,result; 
    this.errorMessages = [];
    
    for(var datatype in data){
        if(data.hasOwnProperty(datatype)){
            var type = context[datatype];
                if(Object.prototype.toString.call(type) === '[object Array]'){
                    if(type.length === 0)
                        continue;

                    //array of configs
                    for(var i  in type){
                        
                        validationtype = type[i];
                        params = null;
                        
                        if(validationtype.indexOf("hasLength") != -1){
                            checker = this.validators["hasLength"];
                            params = validationtype.split[':'][1].split['-']; 
                        }
                        else
                            checker = this.validators[validationtype];
                        
                        if(!checker){
                            throw{
                                name:"NoValidatorFoundException",
                                message : "there is no validator found with the name : " + validationtype
                            }
                        }
                        
                        result = params ? checker.validate(data[datatype], params):checker.validate(data[datatype])
                        if(!result){
                            this.errorMessages.push("Invalid value for * " + datatype + " * " + checker.instructions);
                        }
                    }
                }
                else{
                    //simple config
                    if(!type)
                        continue;
                    validationtype = type;
                    params = null
                    if(validationtype.indexOf("hasLength") != -1){
                        checker = this.validators["hasLength"];
                        params = validationtype.split[':'][1].split['-']; 
                    }
                    else
                        checker = this.validators[validationtype];
                        
                    if(!checker){
                        throw{
                            name:"NoValidatorFoundException",
                            message : "there is no validator found with the name : " + validationtype
                        }
                    }
                    result = params ? checker.validate(data[datatype], params):checker.validate(data[datatype])
                    if(!result){
                        this.errorMessages.push("Invalid value for * " + datatype + " * " + checker.instructions);
                    }
                }
        }
    }
    return this.hasErrors()
}

//a more generic attach validator would be to give some string representation to it and a validator associated to it and also how to interpret 
//the string representation of it in the config

validator.attachValidator = function(name, validator){
    if(typeof validator === 'function'){
        this[name] = validator;
    }
    else
        throw {
            name: "UnSupported validator exception",
            message : "cannot add the validator " + validator.toString()
        }
}

validator.hasErrors = function(){
    return this.errorMessage.length > 0;
}

validator.validators.isNonEmpty = {
    validate : function(value){
        return value !== "";
    },
    instructions: "the value cannot be empty"
}

validator.validators.isAlphaNum = {
    validate: function(value){
        return !/[^0-9a-z]/i.test(value);
    },
    instructions: "the value can only contain numbers and alphabets, no special symbols"
} 
validator.validators.isAlphabetic = {
    validate: function(value){
        return ! /[^a-z]/i.test(value);
    },
    instructions: "the value can only be alphabetic, no other characters"
}
validator.validators.hasLength = {
    validate : function(value, params){
        params = params.split('-')
        this.params.lengthMin = params[0] == '*' ?0:Number(params[0]);
        this.params.lengthMax = params[1] == '*' ?"unlimited":Number(params[1]);
        var validated = true;
        if (this.params.lengthMax !== "unlimited")
            validated = validated && value.length <= this.params.lengthMax;
        validated = validated && value.length >= this.params.minLength;
        return validated;
    },
    instructions: "the value can have the allowed length"
}

validator.validators.isNumber = {
    validate: function(value){
        return !isNaN(value);
    },
    instructions: "the value should only be a number"
}


var config = {
    "first_name":["isNonEmpty", "isAlphabetic","hasLength:10-30"],
    "age": "isNumber",
    "username": "isAlphaNum"
}

validator.validate(data, config);
if (validator.hasErrors()){
        console.log(validator.errorMessages.join('\n'));
}


//jquery's toggle also accepts similarly two functions and selects the alternate functions for the alternate clicks

$('button').toggle(function(){
    console.log('path 1');
},
function(){
    console.log('path 2');
});
