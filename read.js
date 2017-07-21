
fs = require('fs');



var Web3 = require('web3')

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


path = require('path');
 filePath = path.join(__dirname, 'contracts/CryptoPunksMarket.abi');



var contract_abi = "";
fs.readFile(filePath, 'utf8', function (err,data) {
  if (err) {
    return console.log('error reading abi' + err);
  }
  contract_abi = data;
console.log('read abi')
  console.log(data)
});

console.log('contract_abi')
console.log(contract_abi)
