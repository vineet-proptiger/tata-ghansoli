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

projects.forEach(project => {
  filesToPatch.forEach(file => {
    const filePath = `${project}/${file}`;
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      const regex = /\s*\/\/\s*Block the specific spam gclid\s*if\s*\(\s*tracking\.gclid\s*&&\s*\(\(Array\.isArray\(BLOCKED_GCLIDS\)\s*&&\s*BLOCKED_GCLIDS\.includes\(tracking\.gclid\)\)\s*\|\|\s*\(typeof BLOCKED_GCLIDS === 'string'\s*&&\s*BLOCKED_GCLIDS === tracking\.gclid\)\)\s*\)\s*\{\s*setSuccess\(true\)\s*setLoading\(false\)\s*return\s*\}/g;
      
      if (regex.test(content)) {
        content = content.replace(regex, `
    // --- DISABLED CONFIG-BASED GCLID BLOCK ---
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
    */`);
        fs.writeFileSync(filePath, content);
        console.log(`Successfully commented via regex: ${filePath}`);
      } else {
        console.log(`Regex not matched in: ${filePath}`);
      }
    }
  });
});
