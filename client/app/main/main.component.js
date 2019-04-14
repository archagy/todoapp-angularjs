import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import { isEmpty } from 'lodash';

export class MainController {

  awesomeThings = [];
  newThing = '';
  user = {};
  /*@ngInject*/
  constructor($http, $rootScope, $sessionStorage) {
    this.$http = $http;
    this.showError = false;
    this.current_user = $rootScope.current_user;
    this.session = $sessionStorage;
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
      });
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }

  login() {

    this.$http.post('/api/users/', this.user)
    .then(response => {
      if(isEmpty(response.data)) {
        this.showError = true;
      } else {
        this.session.current_user = response.data[0];
        this.current_user = response.data[0];
      }
    })
  }
}

export default angular.module('todoAngularApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
