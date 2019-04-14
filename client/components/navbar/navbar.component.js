'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {

  /*@ngInject*/
  constructor($rootScope, $sessionStorage, $window) {
    this.current_user = $rootScope.current_user;
    this.session = $sessionStorage;
  }

  menu = [{
    title: 'Home',
    state: 'main'
  }];
  isCollapsed = true;

  signOut() {
    delete this.current_user;
    delete this.session.current_user;
    location.reload(); 

  }
}
NavbarComponent.$inject = ["$rootScope", "$sessionStorage", "$window"];
export default angular.module('todoAngularApp.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
