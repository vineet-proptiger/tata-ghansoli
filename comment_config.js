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

const searchString = `    // Block the specific spam gclid
    if (
      tracking.gclid && 
      ((Array.isArray(BLOCKED_GCLIDS) && BLOCKED_GCLIDS.includes(tracking.gclid)) || 
      (typeof BLOCKED_GCLIDS === 'string' && BLOCKED_GCLIDS === tracking.gclid))
    ) {
      setSuccess(true)
      setLoading(false)
      return
    }`;

const replacementString = `    // --- DISABLED CONFIG-BASED GCLID BLOCK ---
    /*
    if (
      tracking.gclid && 
      ((Array.isArray(BLOCKED_GCLIDS) && BLOCKED_GCLIDS.includes(tracking.gclid)) || 
      (typeof BLOCKED_GCLIDS === 'string' && BLOCKED_GCLIDS === tracking.gclid))
    ) {
      setSuccess(true);
      setLoading(false);
      return;
    }
    */`;

projects.forEach(project => {
  filesToPatch.forEach(file => {
    const filePath = `${project}/${file}`;
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      if (content.includes('// Block the specific spam gclid')) {
        content = content.replace(searchString, replacementString);
        fs.writeFileSync(filePath, content);
        console.log(`Commented out config logic in: ${filePath}`);
      } else {
        console.log(`Config logic not found or already commented in: ${filePath}`);
      }
    } else {
      console.log(`File not found: ${filePath}`);
    }
  });
});

console.log('All done!');
