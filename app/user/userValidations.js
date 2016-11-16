import { 
  validatePresence,
  validateFormat
} from 'ember-changeset-validations/validators';

export default {
  firstName: [
    validatePresence({ presence: true, message: '{description} is required' }),
  ],
  lastName: [
    validatePresence({ presence: true, message: '{description} is required'})
  ],
  address: {
    country: validatePresence({ presence: true, message: '{description} is required' }),
    town: validatePresence({ presence: true, message: '{description} is required' })
  }
};