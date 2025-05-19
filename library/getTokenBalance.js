import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { client } from "./sanity"; // adjust path if needed
import imageUrlBuilder from "@sanity/image-url";

// Initialize the builder
const builder = imageUrlBuilder(client);

// Helper delay function
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getTokenBalances = async (walletAddress, provider) => {
  try {
    // 1. Query Sanity to get token metadata (including the logo)
    const sanityQuery = `*[_type == "coins"]{
      name,
      symbol,
      contractAddress,
      usdPrice,
      logo
    }`;
    const sanityTokens = await client.fetch(sanityQuery);
    console.log("Sanity Tokens:", sanityTokens);

    // 2. Initialize the Thirdweb SDK using the connected provider
    const sdk = new ThirdwebSDK(provider.getSigner());

    // 3. Serialize token balance requests with a delay
    const balances = [];

    for (const token of sanityTokens) {
      try {
        let balanceValue;

        if (token.symbol.toUpperCase() === "ETH") {
          const ethBalance = await provider.getBalance(walletAddress);
          balanceValue = ethers.utils.formatUnits(ethBalance, 18);
        } else {
          const tokenContract = await sdk.getToken(token.contractAddress);
          const tokenBalance = await tokenContract.balanceOf(walletAddress);
          balanceValue = tokenBalance.displayValue;
        }

        const logoUrl = builder.image(token.logo).url();

        balances.push({
          ...token,
          balance: balanceValue,
          logo: logoUrl,
        });
      } catch (err) {
        console.error(`Error fetching balance for ${token.symbol}:`, err);
        balances.push({
          ...token,
          balance: "0",
          logo: builder.image(token.logo).url(),
        });
      }

      // Pause slightly between requests to avoid hitting rate limits
      await delay(400); // 400ms delay
    }

    return balances;
  } catch (err) {
    console.error("getTokenBalances error:", err);
    return [];
  }
};
