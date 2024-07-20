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
export class App extends React.Component {
    public workers: UWorker[] = [];
    public actionStatus: EActionStatus = EActionStatus.None;
    public lastSelectedWorker: UWorker | null = null;

    constructor()
    {
        super();
        this.workers = []
        this.actionStatus = EActionStatus.None
        if (config_file.GetEntityManager() != null)
        {
            config_file.GetEntityManager()?.new_worker_delegate.RemoveHandler(this.handleNewWorkerRecive);
            config_file.GetEntityManager()?.remove_worker_delegate.RemoveHandler(this.handleRemoveWorkerRecive);
            config_file.GetEntityManager()?.new_worker_delegate.AddHandler(this.handleNewWorkerRecive);
            config_file.GetEntityManager()?.remove_worker_delegate.AddHandler(this.handleRemoveWorkerRecive);
            this.workers = config_file.GetEntityManager()?.workers;
        }
        
    }


    handleRemoveWorkerRecive = (remove_worker: UWorker) => {
        const index = this.workers.indexOf(remove_worker);
        if (index > -1) {
            this.workers.splice(index, 1);
        }
        this.forceUpdate();
    }

    handleNewWorkerRecive = (new_worker: UWorker) => {
        this.workers.push(new_worker);
        this.forceUpdate();
    }


    handleNewWorkerClick = () => {
        this.actionStatus = EActionStatus.New;
        this.forceUpdate();
    }

    handleEditWorkerClick = () => {
        this.actionStatus = EActionStatus.Edit;
        this.forceUpdate();
    }

    handleClearWorkerPanelClick = () => {
        this.actionStatus = EActionStatus.None;
        this.forceUpdate();
    }


    handleRemoveWorkerClick = () => {
        // Логика для удаления выбранного работника
    }

    GetSelectedWorkers = (): UWorker[] =>
    {
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
        const workerResults = [];
        for (const select_index of result) {
            workerResults.push(config_file.GetEntityManager()?.workers[Number(select_index)])
        }
        return workerResults;
    }

    handleWorkerClick = (worker) => {
        this.lastSelectedWorker = worker;
    }

    render()
    {
        return (
            <div style={{ height: '100vh' }}>
                <div style={{ marginBottom: '20px' }}>
                    <h1>Control Entity</h1>
                </div>
                <div>
                    <select id="ddlViewBy" name="select" size="12" multiple style={{ width: '200px' }}>

                        {this.workers.map((worker, index) => (
                            <option value={index} onClick={() => this.handleWorkerClick(worker)}>
                                {worker.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{}}>
                    <button onClick={this.handleNewWorkerClick} style={{ marginBottom: '10px' }}>New</button>
                    <button onClick={this.handleEditWorkerClick} style={{ marginBottom: '10px' }}>Edit</button>
                    <button onClick={this.handleRemoveWorkerClick}>Delete</button>
                    <button onClick={this.handleClearWorkerPanelClick}>Exit</button>
                </div>
                <div key={1}>
                    {(this.actionStatus == EActionStatus.Edit && this.lastSelectedWorker && this.GetSelectedWorkers().length>0) && <WorkerWidget worker={this.lastSelectedWorker}/>}
                </div>
                <div key={2}>
                    {(this.actionStatus == EActionStatus.New) && <WorkerWidget worker={null}/>}

                </div>
            </div>
        );
    }
}


