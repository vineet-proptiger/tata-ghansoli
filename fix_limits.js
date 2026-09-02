const fs = require('fs');
const files = ['components/LeadForm.jsx', 'components/ContactCTA.jsx', 'components/AboutDeveloper.jsx'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // replace double insertion with single insertion
  const doubleInsert = `      if (data.status) {
        const newCount = currentCount + 1;
        if (typeof document !== 'undefined') document.cookie = \`lead_trk_count=\${newCount}; max-age=2592000; path=/\`;
        if (typeof localStorage !== 'undefined') localStorage.setItem('lead_trk_data', JSON.stringify({ count: newCount, firstSeen }));
        const newCount = currentCount + 1;
        if (typeof document !== 'undefined') document.cookie = \`lead_trk_count=\${newCount}; max-age=2592000; path=/\`;
        if (typeof localStorage !== 'undefined') localStorage.setItem('lead_trk_data', JSON.stringify({ count: newCount, firstSeen }));`;
        
  const singleInsert = `      if (data.status) {
        const newCount = currentCount + 1;
        if (typeof document !== 'undefined') document.cookie = \`lead_trk_count=\${newCount}; max-age=2592000; path=/\`;
        if (typeof localStorage !== 'undefined') localStorage.setItem('lead_trk_data', JSON.stringify({ count: newCount, firstSeen }));`;

  content = content.replace(doubleInsert, singleInsert);
  fs.writeFileSync(file, content);
});
