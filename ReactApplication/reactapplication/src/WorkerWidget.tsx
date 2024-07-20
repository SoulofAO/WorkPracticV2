import { UWorker } from "./Core/Worker"
import React, { useEffect, useRef, useMemo } from 'react'
import './WorkerWidget.css'
import countryList from 'react-select-country-list'
import { GetAllPodrazdelenieOptionNames } from './Core/JSON/JsonApplicationLibrary'
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
        for (let country of this.countryOptions)
        {
            this.countryFullNames.push(country.label)
        }
        this.countryShortNames = []
        for (let country of this.countryOptions) {
            this.countryShortNames.push(country.value)
        } 
        this.podrazdelenieOptions = [];
    }


    ShowError = (text:string) => {
        this.errorLabelRef.current.textContent = text;
        this.forceUpdate();
    }



    HandleEditClick = () => {
        const name = this.inputNameRef.current.value;
        const email = this.inputEmailRef.current.value;
        const podrazdelenie = this.inputPodrazdelenieRef.current.value;
        const country = this.selectCountryRef.current.value;
        const position = this.selectPositionRef.current.value;
        if (!isValidName(name)) {
            this.ShowError("Error: Wrong Name")
        }
        else if (!isValidEmail(email)) {
            this.ShowError("Error: Wrong Email")
        }
        else
        {
            if (this.worker) {
                this.worker.name = name;
                this.worker.email = email;
                this.worker.podrazdelenie = podrazdelenie;
                country = this.countryShortNames[this.countryFullNames.indexOf(country)]
                this.worker.country = country;
                this.worker.position = position;
                config_file.GetEntityManager()?.PatchWorker(this.worker)
            }
            else {
                const newWorker = new UWorker(name, email, country, position, podrazdelenie);
                config_file.GetEntityManager()?.NewWorker(newWorker);
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
        if (this.worker) {
            return this.worker.work_position;
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

    async componentDidMount() {
        this.podrazdelenieOptions = await GetAllPodrazdelenieOptionNames();
        this.selectCountryRef.current.value = this.GetWorkerCountry();
        this.selectPositionRef.current.value = this.GetWorkerPosition();
        this.ShowError("")
        this.forceUpdate();
    }


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
                            <th> <input type="email" id="EmailTextInput" ref={this.inputEmailRef}  defaultValue={this.GetWorkerCountry()} /></th>
                        </tr> 
                        <tr>
                            <th> <label id="CountryTextLabel">Country:</label></th>
                            <th>
                                <select id="CountrySelectInput" ref={this.selectCountryRef} >
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
                                <select id="PositionSelectInput" ref={this.selectPositionRef}>
                                    {this.podrazdelenieOptions.map(podrazdelenieName => (
                                        <option key={podrazdelenieName} value={podrazdelenieName}>
                                            {podrazdelenieName}
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
                    <label id="ErrorTextLabel" class='required' ref={this.errorLabelRef}> Error</label>
                </div>
            </div>
        );
    }
}


