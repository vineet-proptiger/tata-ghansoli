const fs = require('fs');
const file = 'patch_limits.js';

let content = fs.readFileSync(file, 'utf8');

const oldCode = `    // --- UNIVERSAL BROWSER LIMIT (Max 3 submissions / 30 days) ---
    let currentCount = 0;
    const cookieMatch = document.cookie.match(/(?:^|; )lead_trk_count=([^;]*)/);
    const cookieCount = cookieMatch ? parseInt(cookieMatch[1], 10) : 0;
    
    let lsCount = 0;
    const lsDataStr = localStorage.getItem('lead_trk_data');
    let firstSeen = Date.now();
    
    if (lsDataStr) {
      try {
        const lsData = JSON.parse(lsDataStr);
        if (Date.now() - lsData.firstSeen < 2592000000) { // 30 days in ms
          lsCount = lsData.count || 0;
          firstSeen = lsData.firstSeen;
        } else {
          localStorage.removeItem('lead_trk_data');
        }
      } catch (e) {}
    }
    
    currentCount = Math.max(cookieCount, lsCount);
    
    if (currentCount >= 3) {
      setSuccess(true);
      setLoading(false);
      return;
    }
    
    const newCount = currentCount + 1;
    document.cookie = \\\`lead_trk_count=\\\${newCount}; max-age=2592000; path=/\\\`;
    localStorage.setItem('lead_trk_data', JSON.stringify({ count: newCount, firstSeen }));
    // -------------------------------------------------------------

    const payload = new FormData()\`;`;

const newCode = `    // --- UNIVERSAL BROWSER LIMIT (Max 3 submissions / 30 days) ---
    let currentCount = 0;
    const cookieRegex = new RegExp(\\\`(?:^|; )lead_trk_count_\\\${PROJECT_ID}=([^;]*)\\\`);
    const cookieMatch = document.cookie.match(cookieRegex);
    const cookieCount = cookieMatch ? parseInt(cookieMatch[1], 10) : 0;
    
    let lsCount = 0;
    const lsKey = \\\`lead_trk_data_\\\${PROJECT_ID}\\\`;
    const lsDataStr = localStorage.getItem(lsKey);
    let firstSeen = Date.now();
    
    if (lsDataStr) {
      try {
        const lsData = JSON.parse(lsDataStr);
        if (Date.now() - lsData.firstSeen < 2592000000) { // 30 days in ms
          lsCount = lsData.count || 0;
          firstSeen = lsData.firstSeen;
        } else {
          localStorage.removeItem(lsKey);
        }
      } catch (e) {}
    }
    
    currentCount = Math.max(cookieCount, lsCount);
    
    if (currentCount >= 3) {
      setSuccess(true);
      setLoading(false);
      return;
    }
    // -------------------------------------------------------------

    const payload = new FormData()\`;

    // Note: To complete the implementation in target files, you need to add the increment logic inside \`if (data.status) { ... }\`:
    // const newCount = currentCount + 1;
    // if (typeof document !== 'undefined') document.cookie = \\\`lead_trk_count_\\\${PROJECT_ID}=\\\${newCount}; max-age=2592000; path=/\\\`;
    // if (typeof localStorage !== 'undefined') localStorage.setItem(\\\`lead_trk_data_\\\${PROJECT_ID}\\\`, JSON.stringify({ count: newCount, firstSeen }));`;

// Let's do a simple replace
content = content.replace(oldCode, newCode);
fs.writeFileSync(file, content);
console.log('Updated patch_limits.js');
