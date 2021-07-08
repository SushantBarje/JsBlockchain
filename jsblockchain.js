const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash =''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        /**
        * This will be using SHA256 cryptographic function to generate hash of this block.
        */
        return SHA256(this.index+this.timestamp+this.previousHash+JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        /**
        *
        * The first variable of the array will be the genesis block and created manually.
        */
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0,'01/01/2018',"This is the genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    //new block object.
    //the hash of previous block.
    //calculate the current hash.
    //push the block in block chain.
}

//Creating the new blocks
let block1 = new Block(1,"02/01/2008",{message : 100});
let block2 = new Block(1,"03/01/2008",{message : 50});

//Creating the blockchain
let myBlockchain = new Blockchain();

//addin the new blocks to the blockchain
myBlockchain.addBlock(block1);
myBlockchain.addBlock(block2);

console.log(JSON.stringify(myBlockchain,null,4));