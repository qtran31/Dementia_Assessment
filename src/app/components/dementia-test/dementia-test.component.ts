import {Component, OnInit} from '@angular/core';
// import {FhirClientService} from "../../services/fhir-client.service";
import {UtilsService} from "../../services/utils.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Model } from "survey-core";
import { surveyJson } from "./test-schema";
import { Observation } from 'src/app/domain/observation';
import { Patient } from 'src/app/domain/patient';
import { DataService } from 'src/app/services/data.service';
import { CodeableConcept } from 'src/app/domain/codeableConcept';

@Component({
  selector: 'app-dementia-test',
  templateUrl: './dementia-test.component.html',
  styleUrls: ['./dementia-test.component.scss']
})

export class DementiaTestComponent implements OnInit{
  isLoading: boolean = false;
  observation: any;
  surveyModel: Model;

  constructor(
    private dataService: DataService,
    // private fhirClient: FhirClientService,
    private utilsService: UtilsService){
    // this.fhirClient.readyClient();
  }

  uploadResults(observation) {
    this.dataService.callCreatePatient(observation).subscribe(observation => {
      this.observation = observation;
    });
  }

  gradeResults(results) {

    //normally max 22, above 17 is normal
    //In this case, max is 12 and normal is 9

    let grade = 0;

    //Grading date entry (Question 2)
    if(results["question16"]) {
      let currentDate = new Date();
      let userDate = new Date(results["question16"].replace(/-/g, '\/'));
  
      if(currentDate.getFullYear() == userDate.getFullYear()) {
        grade += 1;
      }
  
      if(currentDate.getMonth() == userDate.getMonth()) {
        grade += 1;
      }
  
      if(Math.abs(currentDate.getDate() - userDate.getDate()) <= 3) {
        grade += 1;
  
        if(currentDate.getDate() == userDate.getDate()) {
          grade += 1;
        }
      }  
    }

    //Grading pictures (Questions 18 and 19)
    if(!(results["question18"] === undefined)
    && results["question18"].toUpperCase() == "DICE"){
      grade += 1;
    }

    if(!(results["question19"] === undefined)
    && results["question19"].toUpperCase() == "PRETZEL"){
      grade += 1;
    }

    //Q22. Quarters
    if(!(results["question22"] === undefined)
    && results["question22"] == 35) {
      grade += 1;
    }

    //Q23. Change
    if(!(results["question23"] === undefined)
    && results["question23"] == 3.05) {
      grade += 1;
    }

    //Q27. Vegetables
    if(!(results["question27"] === undefined)
    && Object.keys(results["question27"]).length > 9) {
      grade += 1;

      if(Object.keys(results["question27"]).length == 12) {
        grade += 1;
      }
    }

    //Q32. I am done
    if(!(results["question32"] === undefined)
    &&results["question32"] == "I am done") {
      grade += 2;
    }
    else if (!(results["question32"] === undefined)
    &&results["question32"].includes("done")) {
      grade += 1;
    }

    return grade;
  }

  buildResources(results, grade) {

    const obs = new Observation();
    const patient = new Patient();
    const code = new CodeableConcept();

    //Building Patient FHIR resource
    patient.name = results["question1"]
    patient.dob = results["question2"]
    patient.gender = results["question4"];
    
    //Building Observation FHIR resource
    obs.subject = patient;

    code.text = "12345";
    obs.code = code;

    obs.status = "Preliminary";
    obs.value = grade;

    obs.results = results;

    return obs;
  }

  processResults = (sender) => {
    let results = JSON.stringify(sender.data);
    results = JSON.parse(results);
    console.log("results: ", results);

    //Grade the Test and assign a score    
    const grade = this.gradeResults(results);
    console.log("Grade Processed. Result: ", grade);

    //Build fhir resources
    const obs = this.buildResources(results, grade);
    console.log("Obervation Resource Created: ", obs);

    //Upload Results
    this.uploadResults(obs);
    console.log("uploaded results");

  }

  ngOnInit(): void {
    this.isLoading = true;

    const survey = new Model(surveyJson);
    survey.onComplete.add(this.processResults);
    this.surveyModel = survey;
  }
}