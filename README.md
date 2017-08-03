# Punk Pipeline
This node bot will continuously pull data stored in an Ethereum SmartContract, which is in this case the Cryptopunks SmartContract, and will store it in memory and in a json file.  It will then serve this data up using JSONRPC to other local bots.  

I built this pipeline bot so that I can use custom JSONRPC calls from Ruby on Rails to indirectly access smart contract token storage data.  There are not many good Ethereum/Geth interfacing libraries for ruby and I expect the same is true for other programming languages so this bot acts as a middleman!  

## Requirements 
You will need a Geth instance open which this bot will communicate with. Do this using: 

      geth --fast --rpc

## Getting Started

 Start the pipeline bot with this command:
 
      node index.js 
    
Acquire the contract token data using JSONRPC in any language. The JSONRPC calls are as follows:

    1. getPunkOwner(punk_id_int): returns eth_address_string
      
