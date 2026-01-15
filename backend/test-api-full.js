const http = require('http');

function testRoute(path, name) {
  return new Promise((resolve, reject) => {
    console.log(`Testing ${name}...`);
    const data = JSON.stringify({
      user_skills: [], 
      interests: [], 
      constraints: [],
      one_change: "Make it more backend focused" // needed for variant
    });

    const options = {
      hostname: '127.0.0.1',
      port: 5000,
      path: path,
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
        if (res.statusCode !== 200) {
          console.error(`${name} failed with status ${res.statusCode}`);
          console.error(body);
          reject(new Error(`Status ${res.statusCode}`));
          return;
        }
        
        try {
          const json = JSON.parse(body);
          console.log(`${name} response valid JSON`);
          
          const timeline = json.timeline[0];
          const missing = [];
          if (!timeline.projects) missing.push('projects');
          if (!timeline.duration) missing.push('duration');
          if (!timeline.skills_developed) missing.push('skills_developed');
          
          if (missing.length > 0) {
            console.error(`${name} MISSING FIELDS: ${missing.join(', ')}`);
            reject(new Error(`Missing fields: ${missing.join(', ')}`));
          } else {
            console.log(`${name} PASSED: All fields present.`);
            resolve();
          }
        } catch (e) {
          console.error(`${name} Invalid JSON`, e);
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      console.error(`${name} Request error`, e);
      reject(e);
    });

    req.write(data);
    req.end();
  });
}

async function run() {
  try {
    await testRoute('/api/v1/simulate?mock=1', 'Simulate (Mock)');
    await testRoute('/api/v1/simulate-variant?mock=1', 'Simulate Variant (Mock)');
    console.log('ALL TESTS PASSED');
  } catch (e) {
    console.error('TESTS FAILED');
    process.exit(1);
  }
}

run();
