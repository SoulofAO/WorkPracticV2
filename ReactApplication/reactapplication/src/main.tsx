import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { UWorkerEntityManager } from './Core/JSON/JSONWorkerManager.ts'
import { UWorkPositionEntityManager } from './Core/JSON/JSONWorkPositionManager.ts'
import * as config_file from './config_file.ts'


/*
    ������ ����������.
    ����� ���������������� �������� Subsystem ���������� � �������������� ���������. 
    ��� ������������� ���� �� ������ ������ ����������� ��������� subsistem.

*/
/*
    Application root.
    This is where the main Subsystem applications are initialized and rendering is processed. 
    If necessary, it would be good to introduce a full-fledged idealogy of subsistem.

*/

//�������� �������� EntityManager. ������ Manager ��������� � config_file.
//Creating the main EntityManager. Each Manager is entered in the config_file.
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

//������ ����������. 
//The basis of rendering.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <App />
  </React.StrictMode>,
)

