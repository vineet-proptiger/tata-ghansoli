const fs = require('fs');
const files = ['components/LeadForm.jsx', 'components/ContactCTA.jsx', 'components/AboutDeveloper.jsx'];

const oldCode = `            lsData[tracking.gclid] = {
              count: newCount,
              firstSeen: (lsData[tracking.gclid] && lsData[tracking.gclid].firstSeen) ? lsData[tracking.gclid].firstSeen : Date.now()
            };
            localStorage.setItem(lsKey, JSON.stringify(lsData));`;

const newCode = `            lsData[tracking.gclid] = {
              count: newCount,
              firstSeen: (lsData[tracking.gclid] && lsData[tracking.gclid].firstSeen) ? lsData[tracking.gclid].firstSeen : Date.now()
            };
            try { localStorage.setItem(lsKey, JSON.stringify(lsData)); } catch(e) {}`;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(oldCode)) {
      content = content.replace(oldCode, newCode);
      fs.writeFileSync(file, content);
      console.log('Fixed', file);
    }
  }
});
