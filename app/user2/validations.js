import { 
  validatePresence,
  validateFormat,
  validateLength,
} from 'ember-changeset-validations/validators';
import UserValidations from './userValidations';
import AddressValidations from './addressValidations';

const { assign } = Ember;


export default assign({}, UserValidations, AddressValidations);