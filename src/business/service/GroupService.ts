import {BaseService, Dto} from '@core/common';
import {Group} from '@src/business';
import {GroupRepo} from '@src/business/repository';

export class GroupService extends BaseService<GroupService> {
  private groupRepo: GroupRepo = GroupRepo.shared();

  constructor() {
    super();
  }

  public static shared(): GroupService {
    return this.Instance(GroupService);
  }

  async getGroups(): Promise<Dto<Group[]>> {
    const dto: Dto<Group[]> = await this.groupRepo.getGroups();
    return dto;
  }
}
