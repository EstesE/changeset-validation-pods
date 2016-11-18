import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('user');
  this.route('automobile');
  this.route('loading');
  this.route('user2');
  this.route('user3');
});

export default Router;
