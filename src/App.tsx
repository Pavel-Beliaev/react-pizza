import React from 'react';
import './scss/app.scss'
import Home from "./pages/Home";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./pages/RootLayout";

const Cart = React.lazy(() => import("./pages/Cart"))
const NotFound = React.lazy(() => import("./pages/NotFound"))
const FullPizza = React.lazy(() => import("./pages/FullPizza"))

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<RootLayout/>} >
                <Route index element={<Home/>}/>
                <Route path='cart' element={<React.Suspense><Cart/></React.Suspense>}/>
                <Route path='pizza/:id' element={<React.Suspense><FullPizza/></React.Suspense>}/>
                <Route path='*' element={<React.Suspense><NotFound/></React.Suspense>}/>
            </Route>
        ))

    return (
            <RouterProvider router={router}/>
    );
};

export default App;