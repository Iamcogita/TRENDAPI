const express = require('express');
const googleTrends = require('google-trends-api');
const cron = require('node-cron');

const app = express();
const PORT = 3000;

// In-memory cache for trends data
let cachedTrends = {
  global: [],
  regions: {},
};

// Function to fetch global trends
const fetchGlobalTrends = async () => {
  try {
    const results = await googleTrends.dailyTrends({ geo: 'US' });
    const parsed = JSON.parse(results);
    cachedTrends.global = parsed.default.trendingSearchesDays[0].trendingSearches;
    console.log('Updated global trends');
  } catch (error) {
    console.error('Error fetching global trends:', error);
  }
};

// Function to fetch regional trends
const fetchRegionalTrends = async (region) => {
  try {
    const results = await googleTrends.dailyTrends({ geo: region });
    const parsed = JSON.parse(results);
    cachedTrends.regions[region] = parsed.default.trendingSearchesDays[0].trendingSearches;
    console.log(`Updated trends for region: ${region}`);
  } catch (error) {
    console.error(`Error fetching trends for region (${region}):`, error);
  }
};

// Schedule trends fetching every 15 minutes
cron.schedule('*/15 * * * *', () => {
  fetchGlobalTrends();
});

// Endpoint: GET /trends
app.get('/trends', (req, res) => {
  res.json({ globalTrends: cachedTrends.global });
});

// Endpoint: GET /trends/:region
app.get('/trends/:region', async (req, res) => {
  const region = req.params.region.toUpperCase();

  // Fetch trends for the region if not already cached
  if (!cachedTrends.regions[region]) {
    try {
      await fetchRegionalTrends(region);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch regional trends' });
    }
  }

  res.json({ regionTrends: cachedTrends.regions[region] });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  fetchGlobalTrends(); // Initial fetch on server start
});
