import { 
  validatePresence,
  validateFormat,
  validateLength,
} from 'ember-changeset-validations/validators';

const { assign } = Ember;

export const UserValidations = {
  firstName: [
    validatePresence({ presence: true, message: '{description} is required' }),
    validateLength({ min: 4 })
  ],
  lastName: [
    validatePresence({ presence: true, message: '{description} is required'})
  ]
};

export const AddressValidations = {
  country: validatePresence({ presence: true, message: '{description} is required' }),
  town: validatePresence({ presence: true, message: '{description} is required' })
};

export default assign({}, UserValidations, AddressValidations);