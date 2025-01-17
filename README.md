# Capstone Project Two
**********************************************************************************
I haven't been able to get the deployed versions of the front and backend to work
together correctly with all features as of submitting this project. A user can see the 
website layout, browse cards from each franchise, create a profile as well as log in but
the authentication tokens and session are not working as intended making the user profile
and cart components nonfunctional at this time. As such I would emplore whoever is grading 
this to clone the git repo and run the application locally in order to fully experience the 
application and its many features. See instructuions below ...
**********************************************************************************

Running the App Locally
------------------------------------------------
1. Create a new directory and initialize git. 
2. Clone the git repository for this project to the created directory.
3. Navigate to the Backend directory and execute the npm install command.
4. Once all packages are installed execute either "node server.js" or "nodemon server.js" to start the local server. ***(I have intentionally included part of my dotenv file in the backend for ease of acces to the database hosted on supabase)***
5. Navigate to the Frontend directory and execute the npm install command.
6. Once all packages have been installed execute the "npm run dev" command to run the vite application.
7. Next ctrl or command click on the link provided by vite to open the application in the browser.
---------------------------------------------------------------------------------------------------------------
You should now be able to utilize the application with all the features missing from the deployed versions  including session, cart, profile, auth, orders, and more!


APIs Used: https://docs.magicthegathering.io/#documentationgetting_started, https://ygoprodeck.com/api-guide/, https://docs.pokemontcg.io/ 

This project is a spoof of a card exchange website that sells trading cards from popular TCG franchises like Pokemon allowing users to enjoy a realistic browsing and purchasing experience with high quality visuals and a well designed layout and UI system.

This app should allow a user to: 
-Create and delete an account with an encrypted password
-Browse different collections of cards from various franchises
-Add items to the cart accurately displaying the total price and quantity
-Place orders that accurately effect the stock of the cards purchased and will be saved to their profile if logged in at the time of purchase
-Access a profile page displaying their information as well as their order history
-Browse all the cards of a specific franchise through paginated result pages
-Login, logout, edit, and delete their account seamlessly
-Use various buttons and links to access third party websites

This app utilizes a multitude of programming languages and subsequent packages including but not limited to 
--Javascript
--React
--Sequelize
--Bcrypt
--Vite
--PostgreSql
--HTML
--Express JS
--Bootstrap
--Faker
--CSS
and more


 Frontend Deployment Link: https://www.capstone2frontend.xyz/
 Backend Deployment Link: https://capstone2backend.xyz/