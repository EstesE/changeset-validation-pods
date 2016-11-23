import Ember from 'ember';
import { userSchema } from './model';
import Validations from './validations';

const { get } = Ember;
const { keys } = Object;

export default Ember.Controller.extend({
    Validations,


    inflateObject: function(ob) {
        debugger;
        var toReturn = {};
        
        for (var i in ob) {
            if (i.indexOf('$') > -1) {
                var parts = i.split('$')
                var value = ob[i];
                var myObj = {};
                var temp = {};
                debugger;
                var rv = {};
                for (var k = 0; k < parts.length; ++k) {
                    if (k === parts.length) {
                        rv[parts[k]] = value;
                    } else {
                        var pre = parts[k-1];
                        if(typeof pre != 'undefined' ){
                            rv[pre][parts[k]] = { value };
                        } else {
                            rv[parts[k]] = {};
                        }
                    }
                    // rv[parts] += 'test';
                }
                debugger;
            } else {
                toReturn[i] = ob[i];
            }

            // if (!ob.hasOwnProperty(i)) continue;
            
            // if ((typeof ob[i]) == 'object') {
            //     var flatObject = this.inflateObject(ob[i]);
            //     for (var x in flatObject) {
            //         if (!flatObject.hasOwnProperty(x)) continue;
            //         // toReturn[i + '.' + x] = flatObject[x];
            //         toReturn[i + '$' + x] = flatObject[x];
            //     }
            // } else {
            //     toReturn[i] = ob[i];
            // }
        }
        // return toReturn;
    },


    
    actions: {
        validate: function({ key, newValue, oldValue, changes, content }) {
            // debugger;
            console.log(key + ' changed from: (' + oldValue + ') to (' + newValue + ')');
        },
        save: function(changeset, x) {
            console.log('save');
            debugger;
            var inflateObject = this.inflateObject;
            let controller = this;
			if (changeset && get(changeset, 'isDirty')) {
				let snapshot = changeset.snapshot();
                changeset.inflateObject = inflateObject;
				return changeset
					.cast(keys(userSchema))
					.validate()
					.then(() => {
						if (get(changeset, 'isValid')) {
							changeset.save().then((val) => {
                                console.log("Successfully saved");
                                debugger;
                                var myModel = val.inflateObject(val._content);
                                debugger;
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
			// debugger;
            if (Ember.get(changeset, 'isDirty')) {
                console.log(property + ' is dirty...so we should save.');
            }
			console.log('Property: ' + property + ' validate: ');
			return changeset.validate(property);
		},
    }
});
