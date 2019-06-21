# Continuous deployment from github to glitch using webhooks:

Based on [https://dev.to/healeycodes/continuous-deployment-to-glitch-via-github-webhooks-3hmh](https://dev.to/healeycodes/continuous-deployment-to-glitch-via-github-webhooks-3hmh)

### Steps: 
- create project in Glitch
- with an express route to pull code
- export to github
- merge glitch branch to master on github repo
- add webhook on github and add key to .env
- `git remote add origin {url.git}`

**Project has to remain public**
