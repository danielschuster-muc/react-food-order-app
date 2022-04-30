import { useEffect, useState } from "react";

import Card from "../ui/Card";
import MealItem from "./meal_item/MealItem";

import useHttp from "../../hooks/use-http";

import styles from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformedMeals = (meals) => {
      const loadedMeals = Object.keys(meals).map((key) => {
        return {
          id: key,
          name: meals[key].name,
          description: meals[key].description,
          price: meals[key].price,
        };
      });
      setMeals(loadedMeals);
    };

    fetchMeals(
      {
        url: process.env.REACT_APP_FIREBASE_URL + "meals.json",
      },
      transformedMeals
    );
  }, [fetchMeals]);

  if (isLoading) {
    return (
      <section className={styles["meals-loading"]}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p className={styles["meals-error"]}>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
