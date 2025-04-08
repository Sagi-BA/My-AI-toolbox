// Simple Express server to serve the AI Toolbox website
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to get tools data
app.get('/api/tools', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'public', 'tools.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading tools data:', error);
    res.status(500).json({ error: 'Failed to fetch tools data' });
  }
});

// API endpoint to get videos data
app.get('/api/videos', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'public', 'videos.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading videos data:', error);
    res.status(500).json({ error: 'Failed to fetch videos data' });
  }
});

// API endpoint to update tools data (requires authentication in production)
app.post('/api/tools', (req, res) => {
  try {
    // In a real application, you would add authentication here
    const data = JSON.stringify(req.body, null, 2);
    fs.writeFileSync(path.join(__dirname, 'public', 'tools.json'), data, 'utf8');
    res.json({ success: true, message: 'Tools data updated successfully' });
  } catch (error) {
    console.error('Error updating tools data:', error);
    res.status(500).json({ error: 'Failed to update tools data' });
  }
});

// API endpoint to update videos data (requires authentication in production)
app.post('/api/videos', (req, res) => {
  try {
    // In a real application, you would add authentication here
    const data = JSON.stringify(req.body, null, 2);
    fs.writeFileSync(path.join(__dirname, 'public', 'videos.json'), data, 'utf8');
    res.json({ success: true, message: 'Videos data updated successfully' });
  } catch (error) {
    console.error('Error updating videos data:', error);
    res.status(500).json({ error: 'Failed to update videos data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
