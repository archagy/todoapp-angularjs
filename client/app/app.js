'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';


import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import {permission, uiPermission} from 'angular-permission';

import {
  routeConfig
} from './app.config';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import user from './user'
const ngStorage = (() => 'ngStorage')(require('ngstorage'));
import Modal from '../components/modal/modal.service';


import './app.css';

angular.module('todoAngularApp', [ngCookies, ngResource, ngSanitize, ngStorage, uiRouter, uiBootstrap, navbar,
  footer, main, constants, util, user, Modal
])
  .config(routeConfig)
  .run(['$rootScope','$sessionStorage' ,function($rootScope, $sessionStorage) {
  	$rootScope.current_user = $sessionStorage.current_user;
  	
	if($rootScope.current_user) {
  			console.log('user logged in');
  		} else {
  			console.log('user is not login in');	
  		}
  }]); 
  
  	
  

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['todoAngularApp'], {
      strictDi: false
    });
  });
