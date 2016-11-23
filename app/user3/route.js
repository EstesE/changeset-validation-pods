import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {

        return {
            firstName: 'William',
            lastName: 'Wallace',
            address: {
                country: 'Scotland',
                town: 'Elderslie',
                state: {
                    abbreviation: "AK",
                    name: "Alaska"
                }
            }
        };
    },
    afterModel: function(model, transition) {
        var x = this.deflateObject(model);

        Ember.set(model, 'flatModel', this.deflateObject(model));
    },
    deflateObject: function(ob) {
        var toReturn = {};
        
        for (var i in ob) {
            if (!ob.hasOwnProperty(i)) continue;
            
            if ((typeof ob[i]) == 'object') {
                var flatObject = this.deflateObject(ob[i]);
                for (var x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) continue;
                    // toReturn[i + '.' + x] = flatObject[x];
                    toReturn[i + '$' + x] = flatObject[x];
                }
            } else {
                toReturn[i] = ob[i];
            }
        }
        return toReturn;
    },
});
