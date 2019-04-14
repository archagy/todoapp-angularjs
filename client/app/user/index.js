'use strict';

import angular from 'angular';
import routes from './user.routes';
import UserController from './user.controller';
import {UserService} from './user.service';

export default angular.module('todoAngularApp.user', ['ui.router'])
  .config(routes)
  .controller('UserController', UserController)
  .service('UserService', UserService)
  .name;