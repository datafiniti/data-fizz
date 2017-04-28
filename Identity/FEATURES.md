# Planned and implemented features

Unfortunately, due to an unforseen event in my family, I was unable to devote much time to this. If I had had the ability to put more effort and work into this project this is what else would have come along.

## Extensions of standard features

While all of the User requirements are met, there are things that I would have liked to have done beter.

- The 2FA is set up on the server, or at least the user receiving their secondary auth code, but there was no client side implementation
- I would liked to have used a library like node-where to pull location data from the request objects ip field to show where a user last logged in from and require 2FA if the next login was so far outside of that area
- I would have liked to have expanded on the messaging and notification functionality that is coded in detail on the server side of things, but has bare functionality on the client
- The UI, while not the absolute worst, was one of the things I was able to focus on the least simply due to the fact that I wanted to finish in a timely manner. You can notice the difference between the login and signup pages and the rest of the application. The login and signup happened immediately after I received the project and has time to put into it.

## Extra features I wanted to do

- I really wish I had had the time to actually write tests. I don't like writing untested applications, even when it is material I'm familiar with. I like having good build and test coverage.
- I also had considered, because why not, setting up the React application to isomorphically render. This way I could create an app-shell that I could use a service worker to cache. I'd also be using a service worker to cache other assets, making async requests to the cache and server, displaying the info from the cache, and then updating the cache with the server response. I would have also liked to use these services workers to cache data in indexedDB to provide an offline experience. 