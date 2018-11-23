///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import {QueryCtrl} from 'app/plugins/sdk';
import './css/query_editor.css!';

type application = {
  name: string;
  id: number;
}

export class NudgeQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';

  type: any;
  applications: any[];
  app: any; // TODO use application type
  isMetricVisible: boolean;
  metrics: any;

  /** @ngInject **/
  constructor($scope, $injector) {
    super($scope, $injector);

    let defaults = {
      appId: null,
      target: 'application',
      type: 'timeserie'
    };

    this.metrics = [ 
      { value: 'gen_overview', label: 'App global response time'},
      { value: 'gen_count', label: 'App global count'}
    ];

    _.defaultsDeep(this.target, defaults);

    this.target.target = defaults.target;
    this.target.type = defaults.type;
    this.getApplications();
    this.toggleMetric();
  }

  getApplications() {
    this.datasource.getApplications().then(apps => {
      if (apps) {
        apps = _.map(apps, app => {
          return { name: app.name, id: app.id};
        });
        // set applications to model
        this.applications = apps;
        return apps;
      }
    });
  }

  getOptions(query) {
    return this.datasource.metricFindQuery(query || '');
  }

  // Gets list of metric namespaces from datasource to populate the Metric Value dropdown
  getMetricValues() {
    let values: string[] = ["General", "Count"];
    return values;
  }

  // Shows the second operand selection if the operator is defined
  toggleMetric() {
    console.log("echo from toggleOperand2 query_ctrl");
    console.log("value of " + this.metrics.value);
    console.log("label  " + this.metrics.value);
    if (this.target.app != "") {
      this.isMetricVisible = true;
    } else {
      this.isMetricVisible = false;
      this.refresh();
      console.log("refreeeesh");
      
      //return [];
    }
    this.refresh();
  }

  onChangeInternal() {
    console.log("onChangeInternal refreeeesh");
    this.panelCtrl.refresh(); // Asks the panel to refresh data.
  }

  toggleApplication() {
    console.log("apps: " + this.applications);
    this.refresh();
    this.datasource.metricFindQuery(this.target.app.id);
  }
}
