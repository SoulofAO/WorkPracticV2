import { UWorker } from "./Core/Worker"
import React, { useEffect, useRef, useMemo } from 'react'
import './WorkerWidget.css'
import countryList from 'react-select-country-list'
import * as config_file from './config_file'
//Вспомогательные функции, которые используются при проверки вводимых данных
//Auxiliary functions that are used when checking input data
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


function isValidName(name) {
    if (name == "") {
        return false;
    }
    else {
        return true;
    }
}
// WorkerWidget представляет собой Widget - форму, которая используется для создания или редактирования уже существующих Worker. 
// WorkerWidget is a Widget form that is used to create or edit existing Workers.
export class WorkerWidget extends React.Component {
    // Worker. На основании валидности этой ссылки форма либо отправит запрос на создание нового worker, либо отредактирует текущего worker.
    // Worker. Based on the validity of this link, the form will either send a request to create a new worker, or edit the current worker.
    public worker: UWorker | null = null;
    
    constructor(props)
    {
        super(props);
        //Используется props что бы передать текущего worker. 
        //Props is used to pass the current worker.
        this.worker = props.worker;
        this.inputNameRef = React.createRef();
        this.inputEmailRef = React.createRef();
        this.inputPodrazdelenieRef = React.createRef();
        this.selectCountryRef = React.createRef();
        this.selectPositionRef = React.createRef();
        this.errorLabelRef = React.createRef();

        //Так как список стран ПО БОЛЬШЕЙ ЧАСТИ остается неизменным, он передается и получается не с сервера, а с помощью стороннего модуля.
        //Since the list of countries remains unchanged FOR the MOST part, it is transmitted and received not from the server, but using a third-party module.
        this.countryOptions = countryList().getData();
        this.countryFullNames = []
        
        for (const country of this.countryOptions)
        {
            this.countryFullNames.push(country.label)
        }
        this.countryShortNames = []
        for (const country of this.countryOptions) {
            this.countryShortNames.push(country.value)
        } 
        this.workPositionNames = config_file.GetWorkPositionEntityManager().GetWorkerNames()
    }

    //Простейшая функция, выводящая сообщение об ошибке. 
    //The simplest function that outputs an error message.
    ShowError = (text:string) => {
        this.errorLabelRef.current.textContent = text;
        this.forceUpdate();
    }

    //Функция обновления текущего Worker. При смене Worker меняются и переменные по умолчанию. 
    //The function of updating the current Worker. When changing the Worker, the default variables also change.
    SetWorker = (worker : UWorker) => 
    {
        this.worker = worker;
        this.inputNameRef.current.value = this.GetWorkerName();
        this.inputEmailRef.current.value = this.GetWorkerEmail();
        this.inputPodrazdelenieRef.current.value = this.GetWorkerPodrazdelenie();
        this.selectCountryRef.current.value = this.GetWorkerCountry();
        this.selectPositionRef.current.value = this.GetWorkerPosition();
        
        this.forceUpdate();
    }
    //Функция обработки принятия Widget. Сначала получаются все данные с Widget, проверяется их валидность, затем новая информация заносится в worker или в нового созданного worker если this.worker невалиден. 
    //После worker отправляется на обработку в WorkerEntityManager

    //Widget acceptance processing function. First, all the data from the Widget is obtained, their validity is checked, then the new information is entered into the worker or into the newly created worker if this.worker is invalid.
    //After that, the worker is sent to the WorkerEntityManager for processing
    HandleEditClick = () => {
        const name = this.inputNameRef.current.value;
        const email = this.inputEmailRef.current.value;
        const podrazdelenie = this.inputPodrazdelenieRef.current.value;
        const country = this.selectCountryRef.current.value;
        const countrySmall = this.countryShortNames[this.countryFullNames.indexOf(country)]
        const position = this.selectPositionRef.current.value;
        const positionObject = config_file.GetWorkPositionEntityManager()?.FindWorkPositionByName(position, config_file.GetWorkPositionEntityManager()?.workPositions);


        if (!isValidName(name)) {
            this.ShowError("Error: Wrong Name")
        }
        else if (!isValidEmail(email)) {
            this.ShowError("Error: Wrong Email")
        }
        else
        {
            this.ShowError("")
            if (this.worker) {
                this.worker.name = name;
                this.worker.email = email;
                this.worker.podrazdelenie = podrazdelenie;
                this.worker.country = countrySmall;
                this.worker.workPosition = positionObject;
                config_file.GetWorkerEntityManager()?.PatchWorker(this.worker)
            }
            else {
                const newWorker = new UWorker(name, email, countrySmall, positionObject, podrazdelenie);
                config_file.GetWorkerEntityManager()?.NewWorker(newWorker);
            }
        }
    };
    //Вспомогательные функции отвечающие за предоставление информации в Widget пусть даже и при условии ее невалидность.
    //Auxiliary functions responsible for providing information in the Widget, even if it is invalid.
    GetWorkerName = () => {
        if (this.worker) {
            return this.worker.name;
        }
        else {
            console.log("No Name");
        }
    };

    GetWorkerEmail = () => {
        if (this.worker) {
            return this.worker.email;
        }
        else {
            return "None"
        }
    };

    GetWorkerCountry = () => {
        if (this.worker) {
            return this.countryFullNames[this.countryShortNames.indexOf(this.worker.country)];
        }
        else {
            return "None"
        }
    };

    GetWorkerPosition = () => {
        if (this.worker && this.worker.workPosition) {
            return this.worker.workPosition.name;
        }
        else {
            return "None"
        }
    };

    GetWorkerPodrazdelenie = () => {
        if (this.worker) {
            return this.worker.podrazdelenie;
        }
        else {
            return "None"
        }
    };

    //Основная функция рендеринга. className='required' и css файл используется только для того, что бы задать Error красный цвет. 
    //The main rendering function. className='required' and the css file is only used to set Error to red.
    render()
    { 
        return(
   
            <div style={{ height: '100vh' }}>
                <table>
                    <thead/>
                        <tbody>
                        <tr>
                            <th> <label id="NameTextLabel"> Name:</label></th>
                            <th> <input id="NameTextInput" type="text" ref={this.inputNameRef} defaultValue={this.GetWorkerName()} /></th>
                        </tr>
                        <tr>  
                            <th> <label id="EmailTextLabel">Email:</label></th>
                            <th> <input type="email" id="EmailTextInput" ref={this.inputEmailRef}  defaultValue={this.GetWorkerEmail()} /></th>
                        </tr> 
                        <tr>
                            <th> <label id="CountryTextLabel">Country:</label></th>
                            <th>
                                <select id="CountrySelectInput" ref={this.selectCountryRef} defaultValue={this.GetWorkerCountry()}>
                                    {this.countryFullNames.map(countryName => (
                                        <option key={countryName} value={countryName}>
                                            {countryName}
                                        </option>
                                    ))}
                                </select>
                            </th>
                        </tr>
                        <tr>
                            <th> <label id="PositionTextLabel"> working position </label></th>
                            <th>
                                <select id="PositionSelectInput" ref={this.selectPositionRef} defaultValue={this.GetWorkerPosition()}>
                                    {this.workPositionNames.map(workPositionName => (
                                        <option key={workPositionName} value={workPositionName}>
                                            {workPositionName}
                                        </option>
                                    ))}
                                </select>
                            </th>
                        </tr>
                        <tr>
                            <th> <label id="PodrazdelenieTextLabel">working position:</label></th>
                            <th><input type="text" id="PodrazdelenieTextInput" ref={this.inputPodrazdelenieRef} defaultValue={this.GetWorkerPodrazdelenie()} />

                                <button id="btn_apply" onClick={this.HandleEditClick} >Edit</button></th>
                        </tr>
                        </tbody>
                </table>
                <div>
                    <label id="ErrorTextLabel" className='required' ref={this.errorLabelRef}> </label>
                </div>
            </div>
        );
    }
}


