const express = require('express');
const router = express.Router();


router.get('/healthz', async (req, res) => {
  console.log(' Health check request received');

    // Check if request has body (should return 400 if it does)
   if (req.headers['content-length'] && parseInt(req.headers['content-length'], 10) > 0) {
    console.log(' Request has body, returning 400');
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('X-Content-Type-Options', 'nosniff');
    return res.status(400).end(); // Bad Request
  }
  

    const HealthCheck = req.app.get('HealthCheck');
  
  try {
    console.log(' Inserting health check record...');
    await HealthCheck.create();
    console.log(' Health check record inserted successfully');
    
    // Respond with 200 OK
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('X-Content-Type-Options', 'nosniff');
    res.status(200).end();
  } catch (error) {
    console.error(' Health check failed:', error.message);

    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('X-Content-Type-Options', 'nosniff');
    res.status(503).end();
    // Respond with 503 Service Unavailable
  }
});

router.all('/healthz', (req, res) => {
  console.log(` Method ${req.method} not allowed for /healthz`);
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('X-Content-Type-Options', 'nosniff');
  res.status(405).end(); // Method Not Allowed
});


module.exports = router;