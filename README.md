# io.vefskoli.is


# What is it?

io.vefskoli.is is an LMS ( Learning Management System) for the [Reykjavik Academy of Web Development](https://en.tskoli.is/study-programme/reykjavik-academy-of-web-development/). In this system students can review each other's projects and give the review they got a grade on the scale from 0 to 10. This encourages students to make good reviews, they look more into their co students projects, get another perspective of the projects they have been doing and get better at giving feedback to others, which is a very good skill to have when they go into the working life.


# How to contribute to this project.


### Make an issue and fork

To contribute to this project it is best to start by creating an issue here on GitHub (see “Issues” in the upper-left corner of the screen). Then fork this project to your own account by clicking the “Fork” in the upper-right corner of the screen. You will then get a screen with a green button in the lower-right corner saying “Create fork”. Now you have a copy of the project on your own GitHub account


### Clone the repository

To clone the repository open a terminal in the folder where you store your projects (don’t make a new folder for the project because the clone command will make a folder called “io.vefskoli.is”). Write:

```git clone https://github.com/YOUR_USERNAME/io.vefskoli.is```

and press enter. This will start a short process that takes a few seconds and after that you should be able to see the folder when you write `ls` in your terminal. Now open the folder in VSCode ( if you used the VSCode terminal to do this I recommend still opening the new folder in VSCode because if you don’t do that you will need to write `cd io.tskoli.is` to open the folder in the terminal and whenever you open a new terminal you would again need to remember to type in `cd io.tskoli.is` )


### Prepare the local instance.

To start with you will need to run the command `npm install` or just `yarn` without anything else to install all the libraries. After that you need to create a .env.local file in the root folder. You can do that by clicking on the new file icon that appears when you hover over the IO.VEFSKOLI.IS in the upper right corner of your VSCode or you can just write `touch .env.local` in the terminal. Then add two environment variables in there like so:


```
MONGODB_CONNECTION=mongodb+srv:THIS YOU NEED TO COPY FROM YOUR MONGODB ATLAS
SECRET_COOKIE_PASSWORD="some strange sentence that we can use as secret"
```


### Run the project
After creating this file you should be able to run the page by typing yarn run dev into your terminal. Once you have run the page you can click sign up and create a user. Then you will see a new user collection in your database and you should see the user there. You will want to change the role of the user into a teacher so that you can create a new guide in “[http://localhost:3000/guides/uglyAdmin](http://localhost:3000/guides/uglyAdmin)”. After that you should create some more users to be able to make reviews and as you make more content on the page more data will start to generate in your database. Feel free to mess around with the code a bit before you start, try changing some things or adding something just to see how it feels. Good luck!.
 

