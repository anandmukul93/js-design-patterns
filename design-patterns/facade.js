//facade pattern
//useful when you need to make an outward interface for a complex set of tasks
// these tasks make more sense to be elementary and short and reusable
//now when you make these methods short functionalities, then you might go and 

function PostingService(){
    var configDefault = {
        //... default settings, like method, type, port, etc
    }
    function tcpLayer(config){
        //posts data and also sees to the tcp layer
    }
    function encryption(config){
        //sees the encryption of the content
    }
    
    function compress(config){
        //sees the pac of the content
    }
    function makeConfigForAllSteps(config){
        //merge config into configDefault
    }
    return {
        doPost: function(config){
            config = makeConfigForAllSteps(config);
            encryption(config.encryptionConfig).compress(config.discretizeConfig).tcpLayer(config.tcpConfig)
        },
        recievePost: function(response){
            //pipe the data that is recieved with the use of the some more functions in the PostingService function
        }
    }
}

//you can also do environment based branching internally to check and call or use the functions that are specific to chrome, mozilla, IE 
//etc. internally
