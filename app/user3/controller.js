import Ember from 'ember';
import { userSchema } from './model';

import isBuffer from 'npm:is-buffer';

const { get } = Ember;
const { keys } = Object;

export default Ember.Controller.extend({

    unflatten: function (target, opts) {
        var _this = this;
        opts = opts || {}

        var delimiter = opts.delimiter || '.'
        var overwrite = opts.overwrite || false
        var result = {}

        var isbuffer = isBuffer(target)
        if (isbuffer || Object.prototype.toString.call(target) !== '[object Object]') {
            return target;
        }

        // safely ensure that the key is
        // an integer.
        function getkey(key) {
            var parsedKey = Number(key)

            return (
                isNaN(parsedKey) ||
                key.indexOf('.') !== -1
            ) ? key
                : parsedKey
        }

        Object.keys(target).forEach(function (key) {
            var split = key.split(delimiter)
            var key1 = getkey(split.shift())
            var key2 = getkey(split[0])
            var recipient = result

            while (key2 !== undefined) {
                var type = Object.prototype.toString.call(recipient[key1])
                var isobject = (
                    type === "[object Object]" ||
                    type === "[object Array]"
                )

                // do not write over falsey, non-undefined values if overwrite is false
                if (!overwrite && !isobject && typeof recipient[key1] !== 'undefined') {
                    return;
                }

                if ((overwrite && !isobject) || (!overwrite && recipient[key1] == null)) {
                    recipient[key1] = (
                        typeof key2 === 'number' &&
                            !opts.object ? [] : {}
                    )
                }

                recipient = recipient[key1]
                if (split.length > 0) {
                    key1 = getkey(split.shift())
                    key2 = getkey(split[0])
                }
            }

            // unflatten again for 'messy objects'
            recipient[key1] = _this.unflattenObject(target[key], opts);
        })

        return result;
    },
    
    actions: {
        validate: function ({ key, newValue, oldValue, changes, content }) {
            debugger;
            console.log(key + ' changed from: (' + oldValue + ') to (' + newValue + ')');
        },
        save: function (changeset) {
            console.log('save');
            var unflattenObject = this.unflatten;
            let controller = this;
            if (changeset && get(changeset, 'isDirty')) {
                let snapshot = changeset.snapshot();
                changeset.unflattenObject = unflattenObject;
                changeset.controller = controller;
                return changeset
                    .cast(keys(userSchema))
                    .validate()
                    .then(() => {
                        if (get(changeset, 'isValid')) {
                            changeset.save().then((val) => {
                                console.log("Successfully saved");
                                var flatModel = val._content;
                                var myModel = val.unflattenObject(val._content, { delimiter: "$" });
                                Ember.set(val.controller, 'model', myModel);
                                Ember.set(val.controller.model, 'flatModel', flatModel);
                                delete val.controller;
                            });
                        }
                    }).catch(() => {
                        changeset.restore(snapshot).then(() => {
                            console.log("Problem saving!");
                        });
                    });
            } else {
                console.log("Not dirty...no need to save");
            }
        },
        back: function () {
            this.transitionToRoute('application');
        },
        reset: function (changeset) {
            return changeset.rollback();
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
