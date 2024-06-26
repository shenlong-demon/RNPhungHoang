import { BaseService, CONSTANTS, Dto } from '@core/common';
import { File } from "@core/models";

export class UpdateFileService extends BaseService<UpdateFileService> {
  constructor() {
    super();
  }

  public static shared(): UpdateFileService {
    return this.Instance(UpdateFileService);
  }

  async uploadImage(imageFile?: File): Promise<Dto<string>> {
    if (!!imageFile) {

    }
    return this.successDto<string>(CONSTANTS.STR_EMPTY);
  }
}
