import { ethers } from 'ethers';

export const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // Choose USDC address

const ERC20_ABI = [
  'function name() view returns (string)', // Name
  'function symbol() view returns (string)', // Symbol
  'function decimals() view returns (uint8)', // Decimals
  'function totalSupply() view returns (uint256)', // TotalSupply
];

const RPC_URL = process.env.RPC_URL || 'https://ethereum-rpc.publicnode.com'; // Connect to ethereum node

const provider = new ethers.JsonRpcProvider(RPC_URL, 'mainnet', { staticNetwork: true }); // Connect to mainnet staticNetwork: true tells the provider that the network is fixed and will not change
const usdc = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, provider); // Connect to usdc contract

export async function getUsdcInfo() {
  const [name, symbol, decimals, totalSupply, blockNumber] = await Promise.all([
    usdc.name(),
    usdc.symbol(),
    usdc.decimals(),
    usdc.totalSupply(),
    provider.getBlockNumber(),
  ]); // Promise.all() is used to run multiple asynchronous operations concurrently and wait until all of them finish.

  const info = {
    network: 'ethereum-mainnet',
    contract: USDC_ADDRESS,
    blockNumber,
    name,
    symbol,
    decimals: Number(decimals),
    totalSupply: ethers.formatUnits(totalSupply, decimals),
  }; // Construct info object

  return info;
}
