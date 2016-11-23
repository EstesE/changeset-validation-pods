import Ember from 'ember';
import Changeset from 'ember-changeset';

const { Component, get } = Ember;

export default Ember.Component.extend({
    
    iterate: function(obj, stack) {
        var ret = {};
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] == "object") {
                    this.iterate(obj[property], stack + '.' + property);
                } else {
                    ret[property] = obj[property];
                }
            }
        }
        return ret;
    },

    init() {
        this._super(...arguments);
        let validator = get(this, 'validate');
        var flatModel = this.get('model.flatModel');
        this.changeset = new Changeset(flatModel, validator);
    }
});
