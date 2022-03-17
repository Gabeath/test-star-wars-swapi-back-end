import SWApi from '@mechanisms/swapi';

import BusinessError, { ValidationCodeError } from '@utilities/errors/business';

export default class PeopleService {
  static async getPeople(page: number) {
    if (page < 0) {
      throw new BusinessError(ValidationCodeError.INVALID_PARAMS, {
        message: 'page_can_not_be_negative',
      });
    }

    return SWApi.getPeople(page);
  }
}
