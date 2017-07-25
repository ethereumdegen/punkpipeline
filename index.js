console.log('init');

fs = require('fs');

var Web3 = require('web3')

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

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

        try
        {
          loadContract(contract_abi);
        }
        catch(e)
        {
          console.error(e);
        }



   });


 }


     var inc;
     var update = function (err, x) {
         document.getElementById('result').textContent = JSON.stringify(x, null, 2);
     };

     var loadContract = function (contract_abi) {
         // let's assume that we have a private key to coinbase ;)
        /* web3.eth.defaultAccount = web3.eth.coinbase;

         document.getElementById('create').style.visibility = 'hidden';
         document.getElementById('status').innerText = "transaction sent, waiting for confirmation";*/
    //     web3.eth.contract(abi).new({data: code}, function (err, c) {




      console.log('loading contract')

      //block number 3914495

        var PunkContract = web3.eth.contract(contract_abi);
        var contractInstance = PunkContract.at('0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB');



                console.log('contract instance ')
                console.log(contractInstance)


        try
        {
          var x = contractInstance.nextPunkIndexToAssign.call('');
          console.log(x)
        }
        catch(e)
        {
          console.error(e);
        }






        /*var assignEvent = contractInstance.Assign({some: 'args'}, {fromBlock: 0, toBlock: 'latest'});
        var transferEvent = contractInstance.Transfer({some: 'args'}, {fromBlock: 0, toBlock: 'latest'});
        var transferPunkEvent = contractInstance.PunkTransfer({some: 'args'}, {fromBlock: 0, toBlock: 'latest'});


        assignEvent.watch(function(error, result){
                 console.log(result)
           });

           // would get all past logs again.
           var myResults = assignEvent.get(function(error, logs){
             console.log(logs)
           });*/


      /* -- this work s
           web3.eth.getBlock(48, function(error, result){
               if(!error)
                   console.log(result)
               else
                   console.error(error);
           })
           */





           // watch for an event with {some: 'args'}
          var events = contractInstance.allEvents({fromBlock: 0, toBlock: 'latest'});

          var transferPunkEvent = contractInstance.PunkTransfer({fromBlock: 0, toBlock: 'latest'});


          var assignEvent = contractInstance.Assign();


              console.log('watch contract  ')


        assignEvent.watch(function(error, result){
            if(error)
            {
                 console.error(error)
            }
               console.log(JSON.stringify(result.args))
          })


              console.log('get contract  ')

          // would get all past logs again.
          events.get(function(error, logs){
            if(error)
            {
                 console.error(error)
            }
             console.log(JSON.stringify(logs.args))
           });

          /* contractInstance.PunkTransfer({}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
             if (error)
               console.log('Error in myEvent event handler: ' + error);
             else
               console.log('myEvent: ' + JSON.stringify(eventResult.args));
           });
           */


        /*  web3.eth.contract(abi).new({}, function (err, c) {
             if (err) {
                 console.error(err);
                 return;
             // callback fires twice, we only want the second call when the contract is deployed
             } else if(c.address){
                 contract = c;
                 console.log('address: ' + contract.address);
                 document.getElementById('status').innerText = 'Mined!';
                 document.getElementById('call').style.visibility = 'visible';
                 inc = contract.Incremented({odd: true}, update);
             }
         });*/
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
           add: function(args, callback) {
             callback(null, args[0] + args[1]);
           }
         });

         server.http().listen(4040);

     }


    init();
