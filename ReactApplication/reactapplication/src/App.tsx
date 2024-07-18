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
import * as config_file from "./config_file"
import {WorkerWidget} from "./WorkerWidget"

enum EActionStatus
{
    None,
    New,
    Edit
}
export function App() {
    let [workers, setWorkers] = useState<UWorker[]>([]);
    let [actionStatus, setActionStatus] = useState<EActionStatus>(EActionStatus.None);

    const handleNewWorkerRecive = (new_worker: UWorker) => {
        setWorkers(prevWorkers => [...prevWorkers, new_worker]);
    };

    const handleRemoveWorkerRecive = (remove_worker: UWorker) => {
        setWorkers(prevWorkers => prevWorkers.filter(worker => worker !== remove_worker));
    };


    useEffect(() => {
        const fetchData = async () => {
            if (config_file.GetEntityManager()!=null) {
                config_file.GetEntityManager()?.new_worker_delegate.RemoveHandler(handleNewWorkerRecive)
                config_file.GetEntityManager()?.remove_worker_delegate.RemoveHandler(handleRemoveWorkerRecive)
                config_file.GetEntityManager()?.new_worker_delegate.AddHandler(handleNewWorkerRecive)
                config_file.GetEntityManager()?.remove_worker_delegate.AddHandler(handleRemoveWorkerRecive)
                setWorkers(config_file.GetEntityManager()?.workers);
            }
        }
        fetchData();
    }, []);

    const handleNewWorkerClick = () => {
        setActionStatus(EActionStatus.New);
        GetSelectedWorkers()
    };

    const handleEditWorkerClick = () => {
        setActionStatus(EActionStatus.Edit);
    };

    const handleRemoveWorkerClick = () => {
            // Логика для удаления выбранного работника
    };

    const GetSelectedWorkers = ():UWorker[] => {
        const select = document.getElementsByTagName('select')[0];
        const result = [];
        const options = select && select.options;
        let opt;

        for (let i = 0, iLen = options.length; i < iLen; i++) {
            opt = options[i];

            if (opt.selected) {
                result.push(opt.value || opt.text);
            }
        }
        workerResults = []
        for (select_index of result) {
            workerResults.push(config_file.GetEntityManager()?.workers[Number(select_index)])
        }
        return workerResults;
    };

    const handleWorkerClick = (worker) => {

    };

    return (
        <div style={{height: '100vh' }}>
            <div style={{ marginBottom: '20px' }}>
                <h1>Control Entity</h1>
            </div>
            <div>
                <select id="ddlViewBy"  name="select" size="12" multiple style={{ width: '200px' }}>

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
            <div>
                {(actionStatus==EActionStatus.Edit||actionStatus==EActionStatus.New) && <WorkerWidget/>}
                
            </div>
        </div>
    );
}


