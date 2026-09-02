const fs = require('fs');

const files = [
  'components/LeadForm.jsx',
  'components/ContactCTA.jsx',
  'components/AboutDeveloper.jsx'
];

const readOld = `    // --- UNIVERSAL BROWSER LIMIT (Max 3 submissions / 30 days) ---
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
    }`;

const readNew = `    // --- UNIVERSAL BROWSER LIMIT (Max 3 submissions / 30 days) ---
    let currentCount = 0;
    const cookieRegex = new RegExp(\`(?:^|; )lead_trk_count_\${PROJECT_ID}=([^;]*)\`);
    const cookieMatch = document.cookie.match(cookieRegex);
    const cookieCount = cookieMatch ? parseInt(cookieMatch[1], 10) : 0;
    
    let lsCount = 0;
    const lsKey = \`lead_trk_data_\${PROJECT_ID}\`;
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
    }`;

const writeOld = `        if (typeof document !== 'undefined') document.cookie = \`lead_trk_count=\${newCount}; max-age=2592000; path=/\`;
        if (typeof localStorage !== 'undefined') localStorage.setItem('lead_trk_data', JSON.stringify({ count: newCount, firstSeen }));`;

const writeNew = `        if (typeof document !== 'undefined') document.cookie = \`lead_trk_count_\${PROJECT_ID}=\${newCount}; max-age=2592000; path=/\`;
        if (typeof localStorage !== 'undefined') localStorage.setItem(\`lead_trk_data_\${PROJECT_ID}\`, JSON.stringify({ count: newCount, firstSeen }));`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(readOld, readNew);
  content = content.replace(writeOld, writeNew);
  fs.writeFileSync(file, content);
  console.log('Updated PID logic in', file);
});
