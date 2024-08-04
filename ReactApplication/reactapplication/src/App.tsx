import './App.css'
import React from 'react'
import { UWorker } from "./Core/Worker"
import * as config_file from "./config_file"
import {WorkerWidget} from "./WorkerWidget"

//Вспомогательный энумератор, определяющий нужно ли открывать окошко редактирования Worker. /
//An auxiliary enumerator that determines whether to open the Worker editing window.
enum EActionStatus
{
    None,
    New,
    Edit
}

//Это ключевой компонент моей системы. В будущем будет называться UApp Widget. Поддерживает актуальный список Workers и несколько кнопок отвечающих за переход к форме редактирования Worker (New, Edit), удаление Workers, отмену действий. 
//This is a key component of my system. In the future it will be called UApp Widget. It supports an up-to-date list of Workers and several buttons responsible for switching to the Worker editing form (New, Edit), deleting Workers, and canceling actions.
export class App extends React.Component {

    //Локальная копия отображаемых workers соответсвующая копии workers в UWorkerEntityManager.
    //Отвечая на немой вопрос - да, вы действительно можете использовать workers из UWorkerEntityManager напрямую. Однако это противоречит принципу максимального разделения.

    //The local copy of the displayed workers corresponds to the copy of workers in the UWorkerEntityManager.
    //Answering the dumb question - yes, you can actually use workers from UWorkerEntityManager directly. However, this contradicts the principle of maximum separation.
    public workers: UWorker[] = [];
    public actionStatus: EActionStatus = EActionStatus.None;
    public lastSelectedWorker: UWorker | null = null;
    
    /*
        Этот элемент вызывается единожды при создании Widget. Фактически это не совсем так. Constructor вызывается дважды в некоторых Mode сборки для проверки некоторых элементов React. 
        В конструкторе мы подписываемся на обновления Worker Entities используя UWorkerEntityManager через ссылку в config_variable 
    */
    /*
         This element is called once when creating a Widget. In fact, this is not quite true. Constructor is called twice in some Build Modes to check some React elements. 
          In the constructor, we subscribe to Worker Entities updates using the UWorkerEntityManager via a link in config_variable 
     */

    constructor()
    {
        super();
        this.workers = []
        this.actionStatus = EActionStatus.None
        //Ссылка на this.WorkerWidget
        this.WorkerWidgetRef = React.createRef();
        this.errorServerLabelRef = React.createRef();
        this.serverStatus = false;
        //Connecting to Delegates on a Worker Entity Manager.
        if (config_file.GetWorkerEntityManager() != null)
        {
            config_file.GetWorkerEntityManager()?.new_entity_delegate.RemoveHandlerByName(this.handleNewWorkerRecive);
            config_file.GetWorkerEntityManager()?.remove_entity_delegate.RemoveHandlerByName(this.handleRemoveWorkerRecive);
            config_file.GetWorkerEntityManager()?.update_entity_delegate.RemoveHandler(this.handleNewUpdateRecive);
            config_file.GetWorkerEntityManager()?.new_entity_delegate.AddHandler(this.handleNewWorkerRecive);
            config_file.GetWorkerEntityManager()?.remove_entity_delegate.AddHandler(this.handleRemoveWorkerRecive);
            config_file.GetWorkerEntityManager()?.update_entity_delegate.AddHandler(this.handleNewUpdateRecive);
            this.workers = config_file.GetWorkerEntityManager()?.workers.slice();
            this.serverStatus = config_file.GetWorkerEntityManager()?.serverStatus;
        }
        
    }
    handleNewUpdateRecive = (request: boolean) => {
        
        if (this.errorServerLabelRef.current) {
            if (this.serverStatus != request)
            {
                this.serverStatus = request;
                if (request) {
                    this.errorServerLabelRef.current.textContent = "";
                }
                else {
                    this.errorServerLabelRef.current.textContent = "Server Not Response";
                    }
                this.forceUpdate();
            }
        }
       
    }

    //Функции удаления и добавления локальной Workers копии.
    //The functions of deleting and adding a local Worker copy.
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

    //События, которые обновляют статус WorkerWidget.
    //Events that update the status of the Worker Widget.
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

    //Функция для удаления работников.
    //Function to Delete Workers.
    handleRemoveWorkerClick = () => {
        this.actionStatus = EActionStatus.None;
        //Копия необходима, так как удаление может привести к изменению this.GetSelectedWorkers() и соответсвенно к ошибке цикла For. Не думаю, что я должен обьяснить это подробнее. 
        //A copy is necessary, as deleting it may change this.GetSelectedWorkers() and correspondingly to the error of the For loop. I don't think I should explain this in more detail.
        const deleteWorkers = this.GetSelectedWorkers();
        for (const worker of deleteWorkers)
        {
            config_file.GetWorkerEntityManager()?.DeleteWorker(worker);
        }
    }
    //Получение всех Workers из selected Workers.
    //Getting all Workers from selected Workers.
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
            workerResults.push(config_file.GetWorkerEntityManager().workers[Number(select_index)])
        }

        return workerResults;
    }
    /*this.lastSelectedWorker передается Worker Widget при инициализации и передается по прямой ссылке если WorkerWidget уже валиден. 
    Читатель может заметить - почему я передаю this.lastSelectedWorker дважды, а не сначала создаю WorkerWidget, а затем назначаю SetWorker(). Помимо чисто оптимизационных формальностей, 
    React не инициализирует ссылки мгновенно после ForceUpdate()
    */
    /*this.lastSelectedWorker is passed to Worker Widget during initialization and passed by direct link if WorkerWidget is already valid.
      The reader may notice why I pass this.lastSelectedWorker twice instead of first creating a WorkerWidget and then assigning SetWorker(). Apart from purely optimization formalities, 
      React does not initialize links instantly after forceUpdate()
      */
    handleWorkerClick = (worker) => {
        this.lastSelectedWorker = worker;
        if(this.WorkerWidgetRef.current)
        {
            this.WorkerWidgetRef.current.SetWorker(this.lastSelectedWorker);
        }
        this.forceUpdate()
        
    }

    //Ключевой элемент рендеринга. Вызывается множетсво раз при обновлении состояния или ForceUpdate()
    //A key element of rendering. Called many times when the state is updated or forceUpdate()
    render()
    {
        return (
            <div style={{ height: '100vh' }}>
                <div style={{ marginBottom: '20px' }}>
                    <h1>Control Entity</h1>
                </div>
                <div> 
                    <label id="ErrorServerTextLabel" className='required' ref={this.errorServerLabelRef}>{this.serverStatus ? "" : "Server Not Response"  }</label>
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
                    {(this.actionStatus == EActionStatus.Edit && this.lastSelectedWorker && this.GetSelectedWorkers().length>0) && <WorkerWidget worker={this.lastSelectedWorker} ref={this.WorkerWidgetRef}/>}
                </div>
                <div key={2}>
                    {(this.actionStatus == EActionStatus.New) && <WorkerWidget worker={null}/>}

                </div>
            </div>
        );
    }
}


