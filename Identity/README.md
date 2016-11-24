## Identity - A Challenge for Product Developers

**Challenge**: Roll your own authentication

**Description**

The majority of web applications share one thing in common: user authentication. Sure there are plenty of third-party services, frameworks and libraries (i.e. firbase, passport etc.) out there that help you easily manage or implement this functionality, but we want to see if you can do it yourself from scratch. So what do we mean by roll your own authentication? The following user stories highlight the features you'll need to implement:

As a user, I should be able to:
  - create an account
  - sign in
  - sign out
  - change my email/username (one can serve as both)
  - change my password
  - recover / create a new password in case I forget it
  - receive some sort of notification if i'm signed in at more than one location

**Specifics**
  - You're not allowed to make use of any full fledged frameworks (i.e. sails), authentication libraries (i.e. passport), or third-party services (i.e. firebase). Libraries such as express, nodemailer, and bcrypt are perfectly acceptable. If you're on the fence about whether you can use a specific library, just create a github issue stating the library in question and we'll get back to you ASAP.
  - You should store all user information in a database of your choice (i.e. mysql, mongo etc). We highly recommend choosing something persistent side from a plain-text file.
  - We really don't want to install or set anything up beyond running `npm install`. Providing a `Vagrantfile` or `Dockerfile` that sets up the development environment to run your submission locally would be very appreciated.
  - While this coding challenge doesn't ask too much of you on the front-end we'd still like to see something far better than something you'd expect to find on geocities (i.e. a rolling marquee or flames). Put some effort into your forms by styling them and providing error messages. We currently use react for the front-end so using it in your submission would be a plus. Using something like bootstrap or foundation is fine
  - the more secure the better. If you want to go as far as implementing two-factor authentication you're more than welcome to!

**Submission Instructions**: fork this repo and implement your solution. When you're done create a pull request and we'll review your submission

Good luck!

