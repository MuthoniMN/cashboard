# Cashboard App
Cashboard is an application that helps users keep track of their income, expenses, savings and investments.

It is a personal finance tool that enables users to understand how they spend their money

## Demo and Video
![](../demo/Dashboard.gif)

[View Demo](https://cashboard-ucpq.onrender.com/)

## Tech Stack
- Node
- Express
- MongoDB
- Mongoose
- Postman - testing API endpoints

## How to Set It Up Locally
1. Create a directory 
``` 
mkdir project-new
 ```
2. Clone the GitHub repository
``` 
git clone https://github.com/MuthoniMN/cashboard/ 
```
3. Create `.env` files for the server directory.

### Environment Variables
1. Create an `.env` file in the `server` directory.
2. Use the `.env.example` as a template
3. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a database instance.
> Do not use a local MongoDB instance because the app requires a replica set to run transactions which comes automatically in MongoDB Atlas database.
4. Generate a salt and secret key for hashing passwords


### Run the App
1. Install the dependencies for the backend
```
cd server/
npm install
```
3. Run the backend
```
npm run dev
```
