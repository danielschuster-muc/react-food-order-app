# react-food-order-app

## Setup

1. Clone the repository

```console
git clone git@github.com:danielschuster-muc/react-food-order-app.git
```

2. Install npm packages

```console
npm install
```

3. Create a .env file and put your firebase url into it
Make sure to choose realtime database when creating the db.
```
REACT_APP_FIREBASE_URL=https://DATABASE_NAME.firebaseio.com 
```

4. Import the following json file for some sample data in your db

```json
{
  "1": {
    "description": "Pasta with a very spicy tomat sauce",
    "name": "Penne al'arrabiata",
    "price": 8.90
  },
  "2": {
    "description": "Served with french fries",
    "name": "Cheese Burger",
    "price": 13.95
  },
  "3": {
    "description": "A very yummy bavarian meal.",
    "name": "Schweinebraten",
    "price": 11.50
  }
}
```

5. Start the server

```
npm start
```