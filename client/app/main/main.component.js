import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routing from './main.routes';
import { isEmpty, filter, map, match } from 'lodash';


export class MainController {

  awesomeThings = [];
  newThing = '';
  user = {};
  cancelClick=false;
  clicked=false;

  /*@ngInject*/
  constructor($http, $rootScope, $sessionStorage, $timeout, $uibModal, $uibModalInstance) {
    this.$http = $http;
    this.$timeout = $timeout;
    this.showError = false;
    this.current_user = $rootScope.current_user;
    this.session = $sessionStorage;
    this.status = true;
    this.search = '';
    this.$Modal = $uibModal;
    this.$modalInstance = $uibModalInstance;
    this.showDelete = false;
    

  }

  $onInit() {
    this.$http.get(`/api/things/user/${this.current_user._id}`)
      .then(response => {
        this.awesomeThings = response.data;
      });
  }

  addThing() {
    let vm = this;
    this.scenario = 'save';
    this.openModal(vm);
  }

  setActive(thing_update, updated) {
    if (this.clicked) {
        this.cancelClick = true;
        return;
    }

    this.clicked = true;

    this.$timeout(function () {
        if (this.cancelClick) {
            this.cancelClick = false;
            this.clicked = false;
            return;
        }

        thing_update.active = !thing_update.active;
        this.$http.put(`/api/things/${thing_update._id}`, {$set: {'active': thing_update.active}});

        
        this.cancelClick = false;
        this.clicked = false;
    }.bind(this), 500);
  }

  doubleClick(thing) {
      let vm = this;
      this.original = thing;
      this.scenario = 'update'
      this.openModal(vm);
  }

  openModal(vm){
    this.myModalInstance = this.$Modal.open({
        template: `<div class="modal-header">
            <h3 class="modal-title">Update Task</h3>
        </div>

        <div class="modal-body">
            <strong> Name: </strong> <br>
            <input type="text" ng-model="modalCtrl.original.name" /> <br> <br>
            
            <strong>Description: </strong> <br>
            <textarea rows="4" cols="50" type="text" ng-model="modalCtrl.original.info"> </textarea>
        </div>

        <div class="modal-footer">
            <button class="btn btn-primary" type="button" ng-click="modalCtrl.save(modalCtrl.scenario)">OK</button>
            <button class="btn btn-warning" type="button" ng-click="modalCtrl.closeModal()">Cancel</button>
        </div>`,
        controller: function () {
          return vm;
        },
        controllerAs: 'modalCtrl'
    });
  }

  closeModal() {
    this.myModalInstance.dismiss();
  }

  isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }

  save(scenario) {
    if(this.isBlank(this.original.name) || this.isBlank(this.original.info)) {
      alert('Please fill all the fields');
      return;
    }
    switch(scenario){
    case 'update':
      let newMap = map(this.awesomeThings, (thing)=> {
         if(this.original._id === thing._id) {
           this.original.created_at = new Date().toISOString();
           return this.original;
         } else {
           return thing;
         }
      });

      this.awesomeThings = newMap;
      this.$http.put(`/api/things/${this.original._id}`, {$set: {
        'name': this.original.name,
        'info': this.original.info,
        'created_at': this.original.created_at
        }
        }).then(()=>{
          this.myModalInstance.dismiss();
        });
        break;
      case 'save':
        this.original.created_at = new Date().toISOString();
        this.original.active = false;
        this.original._userId = this.current_user._id;
        this.$http.post('/api/things/create', this.original).then((res)=>{
          if(res.data) {
            console.log(res)
            this.awesomeThings.push(res.data);
            this.myModalInstance.dismiss();
          }
        })
        break;
    }
  }

  deleteThing(thing_delete) {
    let newThings = filter(this.awesomeThings, (thing)=>{
       return thing_delete !== thing
    });
    
    this.awesomeThings = newThings;
    this.$http.delete(`/api/things/${thing_delete._id}`); 
    
  }

  login() {
    this.$http.post('/api/users/', this.user)
    .then(response => {
      if(isEmpty(response.data)) {
        this.showError = true;
      } else {
        this.session.current_user = response.data[0];
        this.current_user = response.data[0];
        location.reload();
      }
    })
  }

  register() {
    //to do validate if the user exists.
    this.$http.post('/api/users/register', this.user)
    .then(response => {
      if(isEmpty(response.data)) {
        this.showError = true;
      } else {
        this.session.current_user = response.data;
        this.current_user = response.data;
        location.reload();
      }
    })
  }

  changeStatus() {
    if(this.status) {
      this.status = false;
    } else {
      this.status = true;
    }
  }
}

MainController.$inject = ["$http", "$rootScope", "$sessionStorage", "$timeout","$uibModal"];
export default angular.module('todoAngularApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
