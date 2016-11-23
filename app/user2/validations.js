import Ember from 'ember';
import UserValidations from './userValidations';
import AddressValidations from './addressValidations';

const { assign } = Ember;


export default assign({}, UserValidations, AddressValidations);