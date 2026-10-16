const API_URL = 'http://localhost:3000'; // Base url
const url = `${API_URL}/JimmyApiTest`; // uri = JimmyApiTest
console.log(`Fetching contract data from ${url}\n`); // Console.log

try {
  const res = await fetch(url); // send a request to a URL and wait for the response before continuing
  const body = await res.json(); // Get the content

  if (!body.success) { // If failed
    console.error('Request failed:', body.error); // Throw error
    process.exit(1); // Exit
  }

  const { data } = body; // If succeed
  console.log('Contract data fetched successfully:'); // Log succeed
  console.table({ // Write network, contract, block, name, symbols, decimal, total supply
    Network: data.network,
    Contract: data.contract,
    Block: data.blockNumber,
    Name: data.name,
    Symbol: data.symbol,
    Decimals: data.decimals,
    'Total Supply': data.totalSupply,
  });
} catch (err) {
  console.error(err.message); // Throw error
  process.exit(1); // Exit
}
