import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getDomainKeySync } from "@bonfida/spl-name-service";

const suppliedAddress = process.argv[2];
if (!suppliedAddress) {
  throw new Error("Provide a public key or .sol domain to check the balance of!");
}

// Create connection to mainnet
const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

async function resolveAddress(address: string): Promise<PublicKey> {
  if (address.endsWith('.sol')) {
    try {
      const { pubkey } = getDomainKeySync(address);
      const owner = await connection.getAccountInfo(pubkey);
      if (!owner) {
        throw new Error(`Could not resolve .sol domain: ${address}`);
      }
      return new PublicKey(owner.data.slice(32, 64));
    } catch (error) {
      throw new Error(`Failed to resolve .sol domain: ${address}`);
    }
  }
  return new PublicKey(address);
}

try {
  // Resolve the address (whether it's a .sol domain or regular address)
  const publicKey = await resolveAddress(suppliedAddress);

  // Check if the public key is valid
  if (!PublicKey.isOnCurve(publicKey.toBytes())) {
    throw new Error("Invalid wallet address: The provided address is not a valid Solana address");
  }
 
  const balanceInLamports = await connection.getBalance(publicKey);
  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

  console.log(
    `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL} SOL!`,
  );
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Error: ${error.message}`);
  } else {
    console.error("❌ An unexpected error occurred");
  }
  process.exit(1);
}