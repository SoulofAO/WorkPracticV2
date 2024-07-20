import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { UEntityManager } from './Core/JSON/JSONEntityManager.ts'
import * as config_file from './config_file.ts'
import * as fs from 'fs';


const EntityManager = new UEntityManager();
if (EntityManager) {
    config_file.SetEntityManager(EntityManager);
    await EntityManager.Initialization();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <App />
  </React.StrictMode>,
)

