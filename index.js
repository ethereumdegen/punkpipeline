
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

var punkOwners={}
var punkOwnersCollected = false;

 function init()
 {

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



                console.log('contract instance ')
            //    console.log(contractInstance)



        var punk_id = 0;
        try
        {
          for(punk_id=0;punk_id<10000;punk_id++)
          {
            var owner_address = contractInstance.punkIndexToAddress.call(punk_id);
            punkOwners[punk_id] = owner_address;
            console.log('owner of punk' + punk_id.toString() + ' is ' +  owner_address.toString() )

          }


        }
        catch(e)
        {
          console.error(e);
        }

        punkOwnersCollected = true;

        console.log('Completed collection of punk owners.')






            var punkContractBlock = 3914495;
/*
            var punkOwners={}

           var contractEventAssign = contractInstance.Assign({}, {fromBlock: punkContractBlock, toBlock: punkContractBlock+100000});
           console.log("address\tamount\tto\tblockHash\tblockNumber\tevent\tlogIndex\ttransactionHash\ttransactionIndex");
           contractEventAssign.watch(function(error, result){

              console.log(JSON.stringify(result))

               var punk_id = result.args.punkIndex;
               var owner_address = result.args.to;
               punkOwners[punk_id] = owner_address;

              console.log('owner of punk' + punk_id.toString() + ' is ' +  owner_address.toString() )

           });

*/




     };


     var counter = 0;
     var callContract = function () {
         counter++;
         var all = 70 + counter;
         document.getElementById('count').innerText = 'Transaction sent ' + counter + ' times. ' +
             'Expected x value is: ' + (all - (all % 2 ? 0 : 1)) + ' ' +
             'Waiting for the blocks to be mined...';

         contract.inc();
     };


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


    init();
