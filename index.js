
//https://ethereum.stackexchange.com/questions/4452/how-do-i-retrieve-the-voted-events-from-thedao

console.log('init');

fs = require('fs');

var Web3 = require('web3')

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
}

let punkOwners={}
var punkOwnersCollected = false;


let number_of_punks_found = 0;

 function init()
 {

   //read from file if exists


   fs.readFile('./punkownerdata.json', 'utf8', function (err,data) {
     if (err) {
       return console.log('error reading existing punk file' + err);
     }

     try {
       punkOwners = JSON.parse(data);

     } catch (e) {
        console.error('could not load existing punk data')
     } finally {

     }

     punkOwnersCollected = true;
     console.log('loaded cached punk data')

   });




    initJSONRPCServer();

    readABIFile();

 }

 function readABIFile()
 {


   path = require('path');
    filePath = path.join(__dirname, 'contracts/CryptoPunksMarket.abi');



   var contract_abi = "";
   fs.readFile(filePath, 'utf8', function (err,data) {
     if (err) {
       return console.log('error reading abi' + err);
     }

     contract_abi = JSON.parse(data);



      //  console.log('contract_abi')
        //console.log(contract_abi)


          readPunkOwnersFromContract(contract_abi);




   });


 }


     var inc;
     var update = function (err, x) {
         document.getElementById('result').textContent = JSON.stringify(x, null, 2);
     };

     var readPunkOwnersFromContract = function (contract_abi) {
         // let's assume that we have a private key to coinbase ;)



      console.log('loading contract')

      //block number 3914495


 


          var PunkContract = web3.eth.contract(contract_abi);
          var contractInstance = PunkContract.at('0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB');



          var punks = contractInstance.punkIndexToAddress(33, function(err, res){



                console.log('temp_punk_id X');
              console.log(33);
              console.log(res);



          });


        let tempPunkOwners = {}


        pollAllPunks(contractInstance,tempPunkOwners);

 


     };




     function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }


     function pollNextPunk(contractInstance, tempPunkOwners, callback)
     {


       let temp_punk_id = number_of_punks_found;

       var punks = contractInstance.punkIndexToAddress(temp_punk_id, function(err, res){





           tempPunkOwners[temp_punk_id] = res;
           number_of_punks_found++;

           console.log('number_of_punks_found');
           console.log(number_of_punks_found)



          // console.log(punkOwners[33])


           callback();


       });

     }

     function pollAllPunks(contractInstance, tempPunkOwners ) {



       if(number_of_punks_found < 10000) {


          pollNextPunk(contractInstance, tempPunkOwners, function(){pollAllPunks(contractInstance, tempPunkOwners)} );

          //  setTimeout(pollAllPunks(contractInstance), 10);

       } else {

           console.log('collected all punks ')

           console.log(punkOwners[43])

           punkOwnersCollected = true;

          punkOwners = clone(tempPunkOwners);

         //save to file
         fs.writeFile('./punkownerdata.json', JSON.stringify(punkOwners, null, 2) , 'utf-8', function(error,written,buffer){
           console.log('Completed collection of punk owners.')


           resetAndRestartPunkCollection(contractInstance);
           //wait and then poll all punks again !

         });




       }
   }


   function resetAndRestartPunkCollection(contractInstance)
   {
     number_of_punks_found = 0;
     tempPunkOwners = {};
     pollAllPunks(contractInstance,tempPunkOwners);
   }

     function initJSONRPCServer()
     {

       var jayson = require('jayson');

       console.log('listening on JSONRPC server localhost:4040')
         // create a server
         var server = jayson.server({
           getPunkOwner: function(args, callback) {

             if(punkOwnersCollected == false )
             {
               callback(null, 'notSynced');
             }


             var punk_id = args[0];
             var punk_owner_address = punkOwners[punk_id];
             callback(null, punk_owner_address);


           }
         });

         server.http().listen(4040);

     }





     var counter = 0;
     var callContract = function () {
         counter++;
         var all = 70 + counter;
         document.getElementById('count').innerText = 'Transaction sent ' + counter + ' times. ' +
             'Expected x value is: ' + (all - (all % 2 ? 0 : 1)) + ' ' +
             'Waiting for the blocks to be mined...';

         contract.inc();
     };



    init();
