import Ember from 'ember';
import { userSchema } from './model';
import UserValidations from './userValidations';

const { get } = Ember;
const { keys } = Object;

export default Ember.Controller.extend({

     userCountry: Ember.computed('component.model.address.country', function() {
        let component = this;
        return component.model.address.country;
    }),

    actions: {
        save: function(changeset) {
            debugger;
            console.log('save');
            let controller = this;
			if (changeset && get(changeset, 'isDirty')) {
				let snapshot = changeset.snapshot();

				return changeset
					.cast(keys(userSchema))
					.validate()
					.then(() => {
						if (get(changeset, 'isValid')) {
							changeset.execute();
                            console.log("Successfully saved");
						}
					}).catch(() => {
						changeset.restore(snapshot);
					});
			} else {
				console.log("Not dirty...no need to save");
			}
        },
        back: function() {
            this.transitionToRoute('application');
        },
        reset: function() {
            console.log('reset');
        },
        validateProperty(changeset, property) {
			debugger;
            if (Ember.get(changeset, 'isDirty')) {
                console.log(property + ' is dirty...so we should save.');
            }
			console.log('Property: ' + property + ' validate: ');
			return changeset.validate(property);
		},
    }
});
