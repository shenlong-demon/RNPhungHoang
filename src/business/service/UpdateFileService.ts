import { BaseService, CONSTANTS, Dto } from '@core/common';

export class UpdateFileService extends BaseService<UpdateFileService> {
  constructor() {
    super();
  }

  public static shared(): UpdateFileService {
    return this.Instance(UpdateFileService);
  }

  async uploadImage(image: string): Promise<Dto<string>> {
    if (!!image) {
    }
    return this.successDto<string>(CONSTANTS.STR_EMPTY);
  }
}
