import React from 'react';
import './scss/app.scss'
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import FullPizza from "./pages/FullPizza";


const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<RootLayout/>} >
                <Route index element={<Home/>}/>
                <Route path='cart' element={<Cart/>}/>
                <Route path='pizza/:id' element={<FullPizza/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Route>
        ))

    return (
            <RouterProvider router={router}/>
    );
};

export default App;