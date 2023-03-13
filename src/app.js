import { useState } from "react";
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom';

import "./app.css";

import Dashboard from "./features/dashboard/dashboard";
import Layout from "./components/layout/layout";
import Users from "./features/users/users";
import Games from "./features/games/games";
import UserForm from "./features/users/user-form";
import UserDetails from "./features/users/user-details";
import GameForm from "./features/games/game-form";
import GameDetails from "./features/games/game-details";

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/games" element={<Games />}></Route>
        <Route path="/create-user" element={<UserForm />}></Route>
        <Route path="/edit-user/:id" element={<UserForm />}></Route>
        <Route path="/users/:id" element={<UserDetails />}></Route>
        <Route path="/create-game" element={<GameForm />}></Route>
        <Route path="/edit-game/:id" element={<GameForm />}></Route>
        <Route path="/games/:id" element={<GameDetails />}></Route>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
