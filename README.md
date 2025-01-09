# Solana Developers course challenges
My Solana Developers course challenges results

## Introduction to cryptography and Solana clients
### Read Data From The Solana Network
The **Lab section** of the document guides users through coding exercises that demonstrate how to **connect to the Solana Devnet**, **retrieve the balance** of a specified **Solana wallet address**, and obtain free Devnet SOL for testing.

#### Challenge 1
```typescript
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
 
const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}
 
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const publicKey = new PublicKey(suppliedPublicKey);
const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
 
console.log(
  `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
);
```

Modify the script as follows:

Add instructions to handle invalid wallet addresses.
Modify the script to connect to mainNet and look up some famous Solana wallets. Try toly.sol, shaq.sol or mccann.sol.

| Challenge | Status |
|-----------|--------|
| Challenge 1 | [Open]() |


## Installation
Install TypeScript, Solana web3.js and esrun
```bash
npm install typescript @solana/web3.js@1 esrun @solana-developers/helpers@2
```