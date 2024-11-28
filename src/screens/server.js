// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(bodyParser.json());

// // Serve static files from the "assests" folder
// app.use('/assets', express.static(path.join(__dirname, 'assets')));

// // Test route
// app.get('/test', (req, res) => {
//   res.send('Server is running!');
// });

// // Prediction route
// app.post('/predict', (req, res) => {
//   const { currentImageName } = req.body;

//   if (!currentImageName) {
//     return res.status(400).json({ error: 'Image name is required' });
//   }

//   const baseName = currentImageName.split('.')[0].replace(/\d+/g, '');
//   res.json({ predictedName: baseName });
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log('Server running on http://localhost:${PORT}');
// });
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Test endpoint
app.get('/test', (req, res) => {
    res.send('Server is working fine!');
});

// Serve static files from the 'src/assets' folder
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on http://192.168.227.96:${PORT}');
});