import express from 'express'; // use express
import { getUsdcInfo } from '../contract/usdc.js'; // Get usdc object

const app = express(); // Get express object
const PORT = 3000; // Port = 3000

app.use(express.json());
// Express receives the request body as JSON text. express.json() parses it so your backend can access the data as a JavaScript object.

// GET /JimmyApiTest — reads USDC contract data from Ethereum mainnet
app.get('/JimmyApiTest', async (req, res) => {
  try {
    const data = await getUsdcInfo();
    res.json({ success: true, timestamp: new Date().toISOString(), data });
  } catch (err) {
    res.status(502).json({ success: false, error: `Failed to read contract: ${err.shortMessage || err.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
}); // start your Express.js server and wait for incoming requests on a specific port

export default app;
