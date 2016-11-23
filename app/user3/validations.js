import { 
  validatePresence,
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
  address$country: validatePresence({ presence: true, message: 'Country is required' }),
  address$town: validatePresence({ presence: true, message: 'Town is required' }),
  address$state$name: validatePresence({ presence: true, message: 'State Name is required' }),
  address$state$abbreviation: validatePresence({ presence: true, message: 'State Abbreviation is required' })
};