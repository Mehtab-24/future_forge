const http = require('http');

console.log('Sending request...');

const data = JSON.stringify({
  user_skills: [],
  interests: [],
  constraints: []
});

const options = {
  hostname: '127.0.0.1',
  port: 5000,
  path: '/api/v1/simulate?mock=1',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log('Body:', body);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();