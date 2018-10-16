import NudgeDatasource from './datasource';
import {NudgeQueryCtrl} from './query_ctrl';
import {NudgeConfigCtrl} from './config_ctrl';

class NudgeAnnotationsQueryCtrl {
  static templateUrl = 'partials/annotations.editor.html';
}

class NudgeQueryOptionsCtrl {
  static templateUrl = 'partials/query.editor.html';
}

export {
  NudgeDatasource as Datasource,
  NudgeQueryCtrl as QueryCtrl,
  NudgeQueryOptionsCtrl as QueryOptionsCtrl,
  NudgeConfigCtrl as ConfigCtrl,
  NudgeAnnotationsQueryCtrl as AnnotationsQueryCtrl,
};
