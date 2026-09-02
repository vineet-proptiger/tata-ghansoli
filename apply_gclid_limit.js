const fs = require('fs');

const projects = [
  '/Users/mac/Desktop/tata-ghansoli-new-domain',
  '/Users/mac/Desktop/tata-ghansoli'
];

const filesToPatch = [
  'components/LeadForm.jsx',
  'components/ContactCTA.jsx',
  'components/AboutDeveloper.jsx'
];

const injectionStart = `
    // --- GCLID-SPECIFIC BROWSER LIMIT (Max 3 submissions per GCLID / 30 days) ---
    let currentCount = 0;
    let safeGclid = '';
    
    if (tracking.gclid) {
      safeGclid = tracking.gclid.slice(-15); // Use last 15 chars for safe cookie name
      
      const cookieRegex = new RegExp(\`(?:^|; )lead_trk_\${PROJECT_ID}_\${safeGclid}=([^;]*)\`);
      const cookieMatch = document.cookie.match(cookieRegex);
      const cookieCount = cookieMatch ? parseInt(cookieMatch[1], 10) : 0;
      
      let lsCount = 0;
      const lsKey = \`lead_trk_data_\${PROJECT_ID}\`;
      const lsDataStr = localStorage.getItem(lsKey);
      
      if (lsDataStr) {
        try {
          const lsData = JSON.parse(lsDataStr);
          const gclidRecord = lsData[tracking.gclid];
          
          if (gclidRecord) {
            if (Date.now() - gclidRecord.firstSeen < 2592000000) { // 30 days
              lsCount = gclidRecord.count || 0;
            } else {
              delete lsData[tracking.gclid];
              localStorage.setItem(lsKey, JSON.stringify(lsData));
            }
          }
        } catch (e) {}
      }
      
      currentCount = Math.max(cookieCount, lsCount);
      
      if (currentCount >= 3) {
        setSuccess(true);
        setLoading(false);
        return;
      }
    }
    // -------------------------------------------------------------
`;

const injectionEnd = `      if (data.status) {
        // --- SAVE GCLID TRACKING ON SUCCESS ---
        if (tracking.gclid) {
          const newCount = currentCount + 1;
          if (typeof document !== 'undefined') document.cookie = \`lead_trk_\${PROJECT_ID}_\${safeGclid}=\${newCount}; max-age=2592000; path=/\`;
          
          if (typeof localStorage !== 'undefined') {
            const lsKey = \`lead_trk_data_\${PROJECT_ID}\`;
            let lsData = {};
            try {
              const existing = localStorage.getItem(lsKey);
              if (existing) lsData = JSON.parse(existing);
            } catch(e) {}
            
            lsData[tracking.gclid] = {
              count: newCount,
              firstSeen: (lsData[tracking.gclid] && lsData[tracking.gclid].firstSeen) ? lsData[tracking.gclid].firstSeen : Date.now()
            };
            localStorage.setItem(lsKey, JSON.stringify(lsData));
          }
        }
        // --------------------------------------`;

// We need to replace the old Universal limit chunk that the user and I added previously
const regexUniversalLimitStart = /\/\/\s*---\s*UNIVERSAL BROWSER LIMIT[\s\S]*?\/\/\s*-------------------------------------------------------------\s*/g;
const regexUniversalLimitEnd = /if\s*\(data\.status\)\s*\{\s*const\s*newCount\s*=\s*currentCount\s*\+\s*1;\s*if\s*\(typeof\s*document\s*!==\s*'undefined'\)\s*document\.cookie\s*=\s*`lead_trk_count_\$\{PROJECT_ID\}=\$\{newCount\};\s*max-age=2592000;\s*path=\/`;\s*if\s*\(typeof\s*localStorage\s*!==\s*'undefined'\)\s*localStorage\.setItem\(`lead_trk_data_\$\{PROJECT_ID\}`,\s*JSON\.stringify\(\{\s*count:\s*newCount,\s*firstSeen\s*\}\)\);/g;

// Fallback regex if the user didn't have the exactly matched universal limit end in tata-ghansoli
const regexUniversalLimitEndFallback = /if\s*\(data\.status\)\s*\{/g;

projects.forEach(project => {
  filesToPatch.forEach(file => {
    const filePath = `${project}/${file}`;
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Remove my old universal limit check
      if (regexUniversalLimitStart.test(content)) {
         content = content.replace(regexUniversalLimitStart, injectionStart + "\n");
      } else {
         // If for some reason it wasn't there, insert it before const payload
         content = content.replace("    const payload = new FormData()", injectionStart + "\n    const payload = new FormData()");
      }
      
      // Replace the old success saving block
      if (regexUniversalLimitEnd.test(content)) {
         content = content.replace(regexUniversalLimitEnd, injectionEnd);
      } else {
         // Maybe it just says if (data.status) {
         content = content.replace(regexUniversalLimitEndFallback, injectionEnd);
      }
      
      fs.writeFileSync(filePath, content);
      console.log(`Patched GCLID limits: ${filePath}`);
    }
  });
});

console.log('All done!');
