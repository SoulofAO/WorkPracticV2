import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useEffect } from 'react'
import axios from 'axios'
import GetWorkersRequest from "./Test1"


export function App() {
    useEffect(() => {
        const fetchData = async () => {
            const workers = await GetWorkersRequest();

            for (const val in workers.data) {
                console.log(val)
            }
        }
        fetchData();
    });

    return (
        <div>
            <h1>Список пользователей:</h1>
        </div>
    );


}


