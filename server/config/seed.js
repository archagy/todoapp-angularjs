/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import config from './environment/';
import mongoose from 'mongoose';
export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    let id = new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca');
    Thing.find({}).remove()
      .then(() => {
        let thing = Thing.create({
          name: 'Development Tools',
          info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
                + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
                + 'Stylus, Sass, and Less.',
          active: true
        }, {
          name: 'Server and Client integration',
          info: 'Built with a powerful and fun stack: MongoDB, Express, '
                + 'AngularJS, and Node.',
          active: false
        }, {
          name: 'Smart Build System',
          info: 'Build system ignores `spec` files, allowing you to keep '
                + 'tests alongside code. Automatic injection of scripts and '
                + 'styles into your app.html',
          active: true
        }, {
          name: 'Modular Structure',
          info: 'Best practice client and server structures allow for more '
                + 'code reusability and maximum scalability',
          active: true
        }, {
          name: 'Optimized Build',
          info: 'Build process packs up your templates as a single JavaScript '
                + 'payload, minifies your scripts/css/images, and rewrites asset '
                + 'names for caching.',
          active: true
        }, {
          name: 'Deployment Ready',
          info: 'Easily deploy your app to Heroku or Openshift with the heroku '
                + 'and openshift subgenerators',
          active: true
        });
        return thing;
      })
      .then(() => console.log('finished populating things'))
      .catch(err => console.log('error populating things', err));
  
    User.create({_id: id,name:'admin', password:'password'})
  }


}
