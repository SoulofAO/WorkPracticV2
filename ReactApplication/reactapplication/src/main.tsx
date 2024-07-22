import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { UWorkerEntityManager } from './Core/JSON/JSONWorkerManager.ts'
import { UWorkPositionEntityManager } from './Core/JSON/JSONWorkPositionManager.ts'
import * as config_file from './config_file.ts'



const WorkPositionEntityManager = new UWorkPositionEntityManager();
if (WorkPositionEntityManager) {
    config_file.SetWorkPositionEntityManager(WorkPositionEntityManager);
    await WorkPositionEntityManager.Initialization();
}

const WorkerEntityManager = new UWorkerEntityManager();
if (WorkerEntityManager) {
    config_file.SetWorkerEntityManager(WorkerEntityManager);
    await WorkerEntityManager.Initialization();
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <App />
  </React.StrictMode>,
)

