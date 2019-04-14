'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('user', {
      url: '/user',
       template: require('./user.html'),
       controller: 'UserController',
       controllerAs: 'user',
    });
}
