'use strict';

export function UserService($resource) {
  'ngInject';

  return $resource('/api/users/:id/:controller', {
    id: '@_id',
    index: {
      method: 'GET',
      params: {
      }
    }
  });
}