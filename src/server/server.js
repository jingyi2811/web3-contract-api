import express from 'express';
import { ethers } from 'ethers';
import { getUsdcInfo } from '../contract/usdc.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET /JimmyApiTest?address=0x... — reads USDC contract data from Ethereum mainnet
app.get('/JimmyApiTest', async (req, res) => {
  const { address } = req.query;

  if (address && !ethers.isAddress(address)) {
    return res.status(400).json({ success: false, error: 'Invalid Ethereum address' });
  }

  try {
    const data = await getUsdcInfo(address);
    res.json({ success: true, timestamp: new Date().toISOString(), data });
  } catch (err) {
    res.status(502).json({ success: false, error: `Failed to read contract: ${err.shortMessage || err.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

export default app;
