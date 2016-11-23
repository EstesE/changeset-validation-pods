import { 
  validatePresence,
} from 'ember-changeset-validations/validators';

export default {
  country: validatePresence({ presence: true, message: '{description} is required' }),
  town: validatePresence({ presence: true, message: '{description} is required' })
};
