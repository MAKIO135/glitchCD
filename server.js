const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { execSync } = require('child_process');

const app = express();

// app.use(express.static('public'));
app.use(express.json());

app.get('/', (request, response) => {
  // response.sendFile(__dirname + '/views/index.html');
  response.json({ msg: 'YO!' });
});

app.use(bodyParser.json());

app.post('/git', (req, res) => {
  const hmac = crypto.createHmac('sha1', process.env.SECRET);
  const sig = 'sha1=' + hmac.update(JSON.stringify(req.body)).digest('hex');
  console.log(req.headers);
  
  if (req.headers['x-github-event'] === 'push' && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(req.headers['x-hub-signature']))) {
    res.sendStatus(200);
    
    const commands = [
      'git fetch origin master',
      'git reset --hard origin/master',
      'git pull origin master --force',
      'npm install',
      // your build commands here
      'refresh'
    ]; // fixes glitch ui
    for (const cmd of commands) {
      console.log(execSync(cmd).toString());
    }
    console.log('updated with origin/master!');
    return;
  }
  else {
    console.log('webhook signature incorrect!');
    return res.sendStatus(403);
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});