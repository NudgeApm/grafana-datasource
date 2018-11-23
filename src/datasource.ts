///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

// import {BackendSrv} from "../../../../public/app/core/services/backend_srv";

import _ from 'lodash';
import moment from 'moment';

export default class NudgeDatasource {
  id: number;
  name: string;
  url: string;

  apps: any[];

  apiKey: any;

  /** @ngInject */
  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.name = instanceSettings.name;
    this.id = instanceSettings.id;

    this.url = instanceSettings.url + '/api';

    this.apiKey = instanceSettings.jsonData.api_key;
  }

  _request(request: any) {
    var options: any = {
      url: request.url,
      params: request.params,
      data: request.data,
      headers: {},
    };

    if (this.apiKey) {
      options.headers['Authorization'] = 'Bearer ' + this.apiKey;
    }
    // else throw ERROR

    return this.backendSrv.datasourceRequest(options).then(result => {
      return {
        response: result.data,
        app: request.app,
      };
    }, function (err) {
      if (err.status != 0 || err.status >= 300) {
        if (err.data && err.data.error) {
          throw { message: 'Nudge response error : ' + err.data.error.title, data: err.data, config: err.config };
        } else {
          throw { message: 'Nudge error : ' + err.message, data: err.data, config: err.config };
        }
      }
    });
  }

  query(options: any) {
    let self = this;
    let appReq = new Array();
    options.targets.forEach(function (target) {
      if (target.app) {
        let appId = target.app.id;
        var request = {
          url: self.url + '/apps/' + appId + '/metrics/timeSeries',
          params: {
            metrics: 'time,count',
            step: options.interval || '1m',
            from: options.range.from.format('X'),
            to: options.range.to.format('X'),
          },
          app: target.app,
        }
        appReq.push(request);
      }
    });

    return this.$q(function (resolve, reject) {
      var mergedResults = {
        data: new Array(),
      }
      var promises = [];
      appReq.forEach(request => {
        promises.push(self._request(request));
      });
      self.$q.all(promises).then((data) => {
        data.forEach(function (result) {
          mergedResults.data.push(self._parseNudgeMetrics(result.app.name, result.response.data));
        });
        resolve(mergedResults);
      });
    });
  }

  _parseNudgeMetrics(appName, data) {

    var grafanaMetrics = [];
    var series = [];
    if (data) {
      for (let metric of data) {
        series.push([(metric[1] / metric[2]), moment(metric[0]).valueOf()]);
      }
    }
    return {
      target: appName,
      datapoints: series,
    };
  }

  getOptions() {
    console.log("Hello there from getOPtions datasource.ts");
  }

  annotationQuery(options) {
    throw new Error("Annotation Support not implemented yet.");
  }

  // TODO use type UUID https://www.npmjs.com/package/@types/uuid
  metricFindQuery(appId) {
    console.log("toggle metricFindQuery from datasource");
    return [];
  }

  testDatasource() {
    let request = {
      url: this.url + '/status/health',
    }
    return this._request(request).then(result => {
      if (result.response.status === 'satisfying') {
        return { status: 'success', message: 'Data source is working' };
      } else {
        return { status: 'error', message: result.error };
      }
    });
  }

  getApplications() {
    let request = {
      url: this.url + "/apps",
    }
    return this._request(request).then(result => {
      if (result && result.response) {
        return result.response;
      } else {
        return [];
      }
    });
  }
}
