'use strict';



export default class UserController {
  /*@ngInject*/
  constructor(UserService) {
  	this.users = UserService.query();
  	
    this.message = 'Hello wey';
  }
}