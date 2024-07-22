import { UWorker } from "./Core/Worker"
import React, { useEffect, useRef, useMemo } from 'react'
import './WorkerWidget.css'
import countryList from 'react-select-country-list'
import * as config_file from './config_file'

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

export class WorkerWidget extends React.Component {

    public worker: UWorker | null = null;
    
    constructor(props)
    {
        super(props);
        this.worker = props.worker;
        this.inputNameRef = React.createRef();
        this.inputEmailRef = React.createRef();
        this.inputPodrazdelenieRef = React.createRef();
        this.selectCountryRef = React.createRef();
        this.selectPositionRef = React.createRef();
        this.errorLabelRef = React.createRef();
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


    ShowError = (text:string) => {
        this.errorLabelRef.current.textContent = text;
        this.forceUpdate();
    }

    
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


