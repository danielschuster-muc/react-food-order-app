# React Food Order App
Simple react app which allows users to pick various items from a menu. Selected items will be add to a cart where user can check their order before submitting it.

## Framework
- React v18.0.0
- Firebase Realtime Database

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

```
REACT_APP_FIREBASE_URL=https://DATABASE_NAME.firebaseio.com
```

4. Import the following json file into your db for some sample meals

```json
{
  "meals": {
    "0": {
      "description": "Pasta with a very spicy tomat sauce",
      "name": "Penne al'arrabiata",
      "price": 8.9
    },
    "1": {
      "description": "Served with french fries",
      "name": "Cheese Burger",
      "price": 13.95
    },
    "2": {
      "description": "A very yummy bavarian meal",
      "name": "Schweinebraten",
      "price": 11.5
    }
  }
}
```

5. Start the server

```console
npm start
```
