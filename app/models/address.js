import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export const addressSchema = {
    country: attr('string'),
    town: attr('string')
};

export default Model.extend(addressSchema);