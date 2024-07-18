import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useEffect } from 'react'
import axios from 'axios'
import { GetWorkersRequest, LoginOnDrupal, GetAllPodrazdelenieOptionNames } from "./Test1"
import { replaceVariablesByName, findVariablesByName } from "./Core/JSON/JsonLibrary"
import { UEntityManager } from "./Core/JSON/JSONEntityManager"
import { UWorker } from "./Core/Worker"

export function App() {
    const [workers, setWorkers] = useState<UWorker[]>([]);
    const [selectedWorker, setSelectedWorker] = useState<UWorker| null>(null);

    const new_worker = new UWorker();
    new_worker.name = "NewName"
    workers.push(new_worker)
    const new_workerv2 = new UWorker();
    new_workerv2.name = "Newsafsag"
    workers.push(new_workerv2)
    const handleNewWorkerClick = () => {
            // Логика для создания нового работника
    };

    const handleEditWorkerClick = () => {
            // Логика для редактирования выбранного работника
    };

    const handleRemoveWorkerClick = () => {
            // Логика для удаления выбранного работника
    };

    const handleWorkerClick = (worker) => {
        console.log(worker.name)
    };

    return (
        <div style={{height: '100vh' }}>
            <div style={{ marginBottom: '20px' }}>
                <h1>Control Entity</h1>
            </div>
            <div>
                <select name="select" size="12" multiple style={{ width: '200px' }}>

                    {workers.map((worker, index) => (
                        <option value={index} onClick={() => handleWorkerClick(worker)}>
                            {worker.name}
                        </option>
                    ))}
                </select>
            </div>
            <div style={{}}>
                <button onClick={handleNewWorkerClick} style={{ marginBottom: '10px' }}>New</button>
                <button onClick={handleEditWorkerClick} style={{ marginBottom: '10px' }}>Edit</button>
                <button onClick={handleRemoveWorkerClick}>Delete</button>
            </div>
        </div>
    );
}


