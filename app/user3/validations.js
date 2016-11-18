import { 
  validatePresence,
  validateFormat,
  validateLength,
} from 'ember-changeset-validations/validators';

export default {
  firstName: [
    validatePresence({ presence: true, message: '{description} is required' }),
    validateLength({ min: 4 })
  ],
  lastName: [
    validatePresence({ presence: true, message: '{description} is required'})
  ],
  country: validatePresence({ presence: true, message: '{description} is required' }),
  town: validatePresence({ presence: true, message: '{description} is required' })
};