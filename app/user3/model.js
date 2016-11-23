import DS from 'ember-data';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export const userSchema = {
    'firstName': attr('string'),
    'lastName': attr('string'),
    'address$country': attr('string'),
    'address$town': attr('string'),
    'address$state$name': attr('string'),
    'address$state$abbreviation': attr('string')
};

export default Model.extend(userSchema);