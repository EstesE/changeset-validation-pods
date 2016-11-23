import Ember from 'ember';
import Changeset from 'ember-changeset';
import Validations from 'changeset-validation-pods/user3/validations';
import lookupValidator from 'ember-changeset-validations';

const { Component, get } = Ember;

export default Ember.Component.extend({
    Validations,
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
        var flatModel = this.get('model.flatModel');
        this.changeset = new Changeset(flatModel, lookupValidator(Validations), Validations);
    }
});
