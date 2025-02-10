const { exec } = require('child_process');

exec('json-server --watch src/data.json --port 3001 ', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error starting json-server: ${err}`);
    return;
  }
  console.log(`json-server stdout: ${stdout}`);
  console.error(`json-server stderr: ${stderr}`);
});