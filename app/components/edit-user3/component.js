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
                    console.log(property + "   " + obj[property]);
                    // debugger;
                    ret[property] = obj[property];
                }
            }
        }
        return ret;
    },

    // //
    // flattenObject: function(ob) {
    //     var toReturn = {};
        
    //     for (var i in ob) {
    //         if (!ob.hasOwnProperty(i)) continue;
            
    //         if ((typeof ob[i]) == 'object') {
    //             var flatObject = this.flattenObject(ob[i]);
    //             for (var x in flatObject) {
    //                 if (!flatObject.hasOwnProperty(x)) continue;
                    
    //                 toReturn[i + '.' + x] = flatObject[x];
    //             }
    //         } else {
    //             toReturn[i] = ob[i];
    //         }
    //     }
    //     return toReturn;
    // },
    //

    init() {
        this._super(...arguments);
        // var myModel = this.iterate(this.model, '');
        // var myModel = this.flattenObject(this.model);
        // let model = get(this, 'model');
        // debugger;
        // this.set('model', myModel);
        let validator = get(this, 'validate');
        var flatModel = this.get('model.flatModel');
        this.changeset = new Changeset(flatModel, validator);        
        // debugger;
    }
});
