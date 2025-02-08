import { Component, Input, EventEmitter, Output, OnInit } from "@angular/core";
import { Model } from "survey-core";
import * as SurveyAnalyticsTabulator from "survey-analytics/survey.analytics.tabulator";
import { surveyJson } from "src/app/components/dementia-test/test-schema";
import { dataLocal } from "./sample-data"; // pre-loaded data
import { DataService } from 'src/app/services/data.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: "analytics",
  templateUrl: './provider-view.component.html',
  styleUrls: ['./provider-view.component.scss']
})
export class ProviderViewComponent implements OnInit {

  constructor(
    private dataService: DataService,
  ) {
    
  }
  ngOnInit() {
      const survey = new Model(surveyJson);
      let allData = [];
      
      this.dataService.callGetResults().toPromise().then(data => {
        // grab only the results that contain survey results
        allData = data.filter((obs) => obs.observation && obs.observation.results)
                                    .map((obs) => {obs.observation.results.score=obs.observation.value; return obs.observation.results});
    
      }).catch(error => {
        console.error("Couldn't access data. Loading default data");
        console.error(error);
      }).finally(() => {
        allData.unshift(...dataLocal) // add preloaded data to the top
        var vizPanel = new SurveyAnalyticsTabulator.Tabulator(
          survey,
          allData
        );
        document.getElementById("loadingIndicator").style.display = "none";
        vizPanel.render("surveyDashboardContainer");
      })
  }
}
