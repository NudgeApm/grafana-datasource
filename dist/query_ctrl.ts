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

  /** @ngInject **/
  constructor($scope, $injector) {
    super($scope, $injector);

    let defaults = {
      appId: null,
      target: 'application',
      type: 'timeserie'
    };

    _.defaultsDeep(this.target, defaults);

    this.target.target = defaults.target;
    this.target.type = defaults.type;
    this.getApplications();
  }

  getApplications() {
    this.datasource.getApplications().then(apps => {
      if (apps) {
        apps = _.map(apps, app => {
          return { name: app.name, id: app.id};
        });
        // fix applications to model
        this.applications = apps;
        return apps;
      }
    });
  }

  getOptions(query) {
    return this.datasource.metricFindQuery(query || '');
  }

  onChangeInternal() {
    this.panelCtrl.refresh(); // Asks the panel to refresh data.
  }

  toggleApplication(query: any) {
    return this.datasource.metricFindQuery(this.target.app.id);
  }
}
