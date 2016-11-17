import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import address from '../models/address';

export const userSchema = {
    firstName: attr('string'),
    lastName: attr('string'),
    address: attr()
};

export default Model.extend(userSchema);