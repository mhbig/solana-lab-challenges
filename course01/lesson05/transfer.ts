// Import required dependencies from Solana web3.js library
import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
  } from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// Get the recipient's public key from command line arguments
const suppliedToPubkey = process.argv[2] || null;

// Validate that a recipient public key was provided
if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
}

// Load the sender's keypair from environment variables
const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

// Convert the supplied public key string to a PublicKey object
const toPubkey = new PublicKey(suppliedToPubkey);

// Initialize a connection to Solana devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
);

// Create a new transaction object
const transaction = new Transaction();

// Define the amount of lamports (smallest unit of SOL) to send
// 1 SOL = 1,000,000,000 lamports
const LAMPORTS_TO_SEND = 25000;

// Create a transfer instruction using SystemProgram
// This instruction will transfer LAMPORTS_TO_SEND from sender to recipient
const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
});

// Add the transfer instruction to the transaction
transaction.add(sendSolInstruction);

// Send and confirm the transaction
// The senderKeypair is required to sign the transaction
const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
]);

// Log the transaction details and provide an explorer link
console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
);
console.log(`Transaction signature is ${signature}!`);
console.log(
    `You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
);