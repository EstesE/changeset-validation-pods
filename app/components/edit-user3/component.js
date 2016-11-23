import Ember from 'ember';
import Changeset from 'ember-changeset';
import Validations from 'changeset-validation-pods/user3/validations';
import lookupValidator from 'ember-changeset-validations';

export default Ember.Component.extend({
    Validations,

    init() {
        this._super(...arguments);
        this.changeset = new Changeset(this.get('model.flatModel'), lookupValidator(Validations), Validations);
    }
});
