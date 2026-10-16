import { ethers } from 'ethers';

// USDC token contract on Ethereum mainnet
export const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';

const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address owner) view returns (uint256)',
];

const RPC_URL = process.env.RPC_URL || 'https://ethereum-rpc.publicnode.com';

const provider = new ethers.JsonRpcProvider(RPC_URL, 'mainnet', { staticNetwork: true });
const usdc = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, provider);

export async function getUsdcInfo(address) {
  const [name, symbol, decimals, totalSupply, blockNumber] = await Promise.all([
    usdc.name(),
    usdc.symbol(),
    usdc.decimals(),
    usdc.totalSupply(),
    provider.getBlockNumber(),
  ]);

  const info = {
    network: 'ethereum-mainnet',
    contract: USDC_ADDRESS,
    blockNumber,
    name,
    symbol,
    decimals: Number(decimals),
    totalSupply: ethers.formatUnits(totalSupply, decimals),
  };

  if (address) {
    const balance = await usdc.balanceOf(address);
    info.balance = { address, amount: ethers.formatUnits(balance, decimals) };
  }

  return info;
}
