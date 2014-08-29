Node Scaffold
=======

A boiled down [Node](http://nodejs.org/), [Express](http://expressjs.com/), and [Grunt](http://gruntjs.com/) scaffold that is easily deployable on [Heroku](https://www.heroku.com/).

Fork, `npm install`, and run!

Deploy on Heroku
-------
Follow these instructions to deploy your index.html page on Heroku.

1. `grunt build`
2. `cd dist`
3. `git init` (first time only)
4. `heroku apps:create app-name` (first time only. make sure you're signed in before)
5. `git add -A`
6. `git commit -m 'my WHATEVER commit'`
7. `git push heroku master`
8. `heroku open`

Watch changes
-------
After `npm install` you can livereload your project using `grunt serve` or `grunt dist` (to examine dist/index.html)