DataFizz
========

A collection of challenges


#Identity Challenge
datafizz.frankiexv.com

##Before We Get Started
These instructions are given assuming that you have NodeJS and MongoDB installed beforehand.

If you would like to take a look at the submission live. I have it hosted on a VPS at datafizz.frankiexv.com.

I did attempt to create a Vagrant file. However this was my first time ever using this. It seemed pretty straightforward at the beginning but then somehow I just kept running into all the errors. I finally gave up when I ended up being unable to reload Vagrant while in the VM because the version of Vagrant installed in the VM wasn't updated, and even after updating it still didn't work, which is where I gave up. I spent way too much of a day attempting this. So I hope the web hosting will make up for it.

##Get Started
If you have NodeJS and MongoDB installed the rest should be really simple. 

I have a post install script that will build and run the production code once you run "npm install". Next step is just going to localhost:8081 in your browser and you should be all set. 

##Dependencies
I used JWT Session Authentication, the stack is React, Express, Mongo, and Node. I ran webpack for the dev server, hot reload, transpiling/bundling, y'know all the good stuff. Nodemailer is used for password recovery and notification of multiple sessions. Material UI for the front end components. BCrypt for password hashing, bluebird for the backend promises, and Axios for the requests.


