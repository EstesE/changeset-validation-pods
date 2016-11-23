import DS from 'ember-data';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export const userSchema = {
    firstName: attr('string'),
    lastName: attr('string'),
    country: attr('string'),
    town: attr('string'),
    name: attr('string'),
    abbreviation: attr('string')
};

export default Model.extend(userSchema);