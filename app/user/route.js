import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {

        return {
            firstName: 'William',
            lastName: 'Wallace',
            address: {
                country: 'Scotland',
                town: 'Elderslie'
            }
        };

    }
});
