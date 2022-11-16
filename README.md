#Setup

1. Go to db_setup.mjs and db/config.js and enter your postgres db password. 
2. RUN: "npm run db_setup"
3. Build docker file and run container


#Assumptions and shortcut

A. Task understanding assumptions
I wanted to timebox this project for 4 hours. Majority of time went to research api and actually understand what gmi means and how I can get needed data. Based on my assumptions, asset collection api contains list of cryptopunk nfts and their owners. With sales api, I identified who transferred money and how much each of the addresses spent. Something must be wrong in my judgement, since after importing data in db, wallet addresses from assets api and sales api did not match. I decided to proceed since most of the time was used.

B. Code shortcuts
Since I had little time to code, I had to take immence amount of shortcuts. 
First in my importet function, I am using fixed for loops to cover all data with current requirements. I would update it to dynamic function, to check total count. Also I would structure functions differently with less complexity.
Also I would structure my project differently, instead of routers and controllers, would split logic into routers, controllers and services(similar to NestJS).
Also I would write app in Nest but decided to avoid extra configuration and stick to simple boilerplate.
I would add docker compose file to get both app and pg instances running.
I would add unit tests. I would implement mocks for upshot apis that I used throughout app.
I would create api resource for response, instead of returning on fly created object.