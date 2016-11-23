import Ember from 'ember';
import { userSchema } from './model';
import UserValidations from './userValidations';

const { get } = Ember;
const { keys } = Object;

export default Ember.Controller.extend({
    UserValidations,
    
    actions: {
        validate: function(/*{ key, newValue, oldValue, changes, content }*/) {
            
        },
        save: function(changeset) {
            
            console.log('save');
			if (changeset && get(changeset, 'isDirty')) {
				let snapshot = changeset.snapshot();

				return changeset
					.cast(keys(userSchema))
					.validate()
					.then(() => {
						if (get(changeset, 'isValid')) {
							changeset.save().then(() => {
                                console.log("Successfully saved");
                            });
						}
					}).catch(() => {
						changeset.restore(snapshot).then(()=> {
                            console.log("Problem saving!");
                        });
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
            if (Ember.get(changeset, 'isDirty')) {
                console.log(property + ' is dirty...so we should save.');
            }
			console.log('Property: ' + property + ' validate: ');
			return changeset.validate(property);
		},
    }
});
