const redis = require('redis');

const client = redis.createClient({
    url: 'redis://localhost:6379' // Replace with your production URL later
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Connected to Redis'));

// Connect immediately
(async () => {
    await client.connect();
})();

module.exports = client;