import { 
  validatePresence,
  validateLength,
} from 'ember-changeset-validations/validators';
import addressValidations from './addressValidations';

export default {
  firstName: [
    validatePresence({ presence: true, message: '{description} is required' }),
    validateLength({ min: 4 })
  ],
  lastName: [
    validatePresence({ presence: true, message: '{description} is required'})
  ],
  address: addressValidations
  // address: {
  //   country: validatePresence({ presence: true, message: '{description} is required' }),
  //   town: validatePresence({ presence: true, message: '{description} is required' })
  // }
};