const fs = require('fs');

const files = [
  'components/LeadForm.jsx',
  'components/ContactCTA.jsx',
  'components/AboutDeveloper.jsx'
];

const oldCode = `safeGclid = tracking.gclid.slice(-15); // Use last 15 chars for safe cookie name`;
const newCode = `safeGclid = tracking.gclid; // Use full GCLID for cookie name to prevent collision`;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(oldCode)) {
      content = content.replace(oldCode, newCode);
      fs.writeFileSync(file, content);
      console.log('Fixed', file);
    } else {
      console.log('Code not found in', file);
    }
  }
});
