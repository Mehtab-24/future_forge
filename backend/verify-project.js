const http = require('http');

function testRoute(path, name) {
  return new Promise((resolve, reject) => {
    console.log(`Testing ${name}...`);
    const data = JSON.stringify({
      user_skills: ["React"], 
      interests: ["Frontend"], 
      constraints: [],
      one_change: "Focus on Backend" 
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
          
          const missing = [];
          
          // Common checks
          if (!json.timeline || json.timeline.length === 0) missing.push('timeline');
          if (json.timeline && json.timeline[0]) {
            const t = json.timeline[0];
            if (!t.projects) missing.push('timeline[0].projects');
            if (!t.duration) missing.push('timeline[0].duration');
            if (!t.skills_developed) missing.push('timeline[0].skills_developed');
          }

          // Variant specific checks
          if (path.includes('variant')) {
            if (!json.deltas) missing.push('deltas');
            else if (json.deltas.length > 0) {
              const d = json.deltas[0];
              if (!d.phase) missing.push('deltas[0].phase');
              if (!d.change) missing.push('deltas[0].change');
            }
            if (!json.comparison_summary) missing.push('comparison_summary');
          }
          
          if (missing.length > 0) {
            console.error(`${name} MISSING FIELDS: ${missing.join(', ')}`);
            reject(new Error(`Missing fields: ${missing.join(', ')}`));
          } else {
            console.log(`${name} PASSED: All required fields present.`);
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
    // Wait for server to potentially restart
    console.log('Waiting 3s for server to stabilize...');
    await new Promise(r => setTimeout(r, 3000));
    
    await testRoute('/api/v1/simulate?mock=1', 'Simulate (Mock)');
    await testRoute('/api/v1/simulate-variant?mock=1', 'Simulate Variant (Mock)');
    console.log('ALL VERIFICATION TESTS PASSED');
  } catch (e) {
    console.error('VERIFICATION FAILED');
    process.exit(1);
  }
}

run();
