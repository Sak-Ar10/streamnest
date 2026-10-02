/**
 * This script tests the Auth endpoints for Phase 2.
 * Ensure the server is running on http://localhost:4000 before executing.
 * Run with: node test_auth.js
 */
const http = require('http');

const API_URL = 'http://localhost:4000/api/auth';
let cookie = '';

function request(method, path, data, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (cookie) {
      options.headers['Cookie'] = cookie;
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        // Extract set-cookie
        if (res.headers['set-cookie']) {
          cookie = res.headers['set-cookie'][0];
        }
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed, headers: res.headers });
        } catch {
          resolve({ status: res.statusCode, data: body, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTests() {
  console.log('--- StreamNest Auth Phase 2 Tests ---');
  
  const testEmail = `test_${Date.now()}@streamnest.io`;
  const testPassword = 'SecurePassword123!';

  try {
    // 1. Signup
    console.log(`\n[1] Testing SIGNUP with ${testEmail}...`);
    const signupRes = await request('POST', '/signup', {
      name: 'Test User',
      email: testEmail,
      password: testPassword
    });
    console.log(`Status: ${signupRes.status}`);
    console.log(`Response:`, signupRes.data);
    if (signupRes.status !== 201) throw new Error('Signup failed');

    // 2. Duplicate Signup
    console.log(`\n[2] Testing DUPLICATE SIGNUP...`);
    const dupRes = await request('POST', '/signup', {
      name: 'Test User',
      email: testEmail,
      password: testPassword
    });
    console.log(`Status: ${dupRes.status}`);
    console.log(`Response:`, dupRes.data);
    if (dupRes.status !== 409) throw new Error('Duplicate signup did not return 409');

    // 3. Logout
    console.log(`\n[3] Testing LOGOUT...`);
    const logoutRes = await request('POST', '/logout', null);
    console.log(`Status: ${logoutRes.status}`);
    console.log(`Response:`, logoutRes.data);

    // 4. Me (Unauthorized)
    console.log(`\n[4] Testing /ME (Unauthorized - cookie cleared)...`);
    cookie = ''; // Clear local script cookie to simulate logout
    const meFail = await request('GET', '/me', null);
    console.log(`Status: ${meFail.status}`);
    if (meFail.status !== 401) throw new Error('/me did not return 401 when logged out');

    // 5. Login
    console.log(`\n[5] Testing LOGIN...`);
    const loginRes = await request('POST', '/login', {
      email: testEmail,
      password: testPassword
    });
    console.log(`Status: ${loginRes.status}`);
    console.log(`Response:`, loginRes.data);
    if (loginRes.status !== 200) throw new Error('Login failed');
    if (!cookie) throw new Error('Login did not set cookie');

    // 6. Me (Authorized)
    console.log(`\n[6] Testing /ME (Authorized)...`);
    const meSuccess = await request('GET', '/me', null);
    console.log(`Status: ${meSuccess.status}`);
    console.log(`Response:`, meSuccess.data);
    if (meSuccess.status !== 200) throw new Error('/me failed after login');

    console.log('\n✅ All Auth tests passed successfully!');
    
  } catch (err) {
    console.error('\n❌ Test execution failed:', err.message);
  }
}

runTests();
