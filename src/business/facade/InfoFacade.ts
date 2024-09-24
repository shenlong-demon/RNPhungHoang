import BaseFacade from '@core/common/models/BaseFacade';
import { InfoRepo } from '@src/business/repository/InfoRepo';
import { JSONUtility } from '@core/common';

export class InfoFacade extends BaseFacade<InfoFacade> {
  constructor() {
    super();
  }

  public static shared(): InfoFacade {
    return this.Instance(InfoFacade);
  }

  public async getInfo(): Promise<string> {
    const data: any = await InfoRepo.shared().getInfo();
    try {
      return `${data?.version}`;
    } catch (ex) {}
    return JSONUtility.stringify(data);
  }
}
