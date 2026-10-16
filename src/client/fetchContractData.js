// Calls the /JimmyApiTest endpoint and prints the smart contract data to the console.
// Usage: node src/client/fetchContractData.js [address]

const API_URL = process.env.API_URL || 'http://localhost:3000';
const address = process.argv[2] || '0x28C6c06298d514Db089934071355E5743bf21d60';

const url = `${API_URL}/JimmyApiTest?address=${address}`;
console.log(`Fetching contract data from ${url}\n`);

try {
  const res = await fetch(url);
  const body = await res.json();

  if (!body.success) {
    console.error('Request failed:', body.error);
    process.exit(1);
  }

  const { data } = body;
  console.log('Contract data fetched successfully:');
  console.table({
    Network: data.network,
    Contract: data.contract,
    Block: data.blockNumber,
    Name: data.name,
    Symbol: data.symbol,
    Decimals: data.decimals,
    'Total Supply': data.totalSupply,
    'Balance Of': data.balance.address,
    Balance: `${data.balance.amount} ${data.symbol}`,
  });
} catch (err) {
  console.error(`Could not reach the API at ${API_URL}. Is the server running (npm start)?`);
  console.error(err.message);
  process.exit(1);
}
