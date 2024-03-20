import {BaseService, Dto, Sdo} from '@core/common';
import {Group} from '@src/business';
import {GroupRepo} from "@src/business/repository";

export class GroupService extends BaseService<GroupService> {
    private groupRepo: GroupRepo = GroupRepo.shared();
    constructor() {
        super();
    }
    public static shared(): GroupService {
        return this.Instance(GroupService);
    }

    async getGroups(): Promise<Dto<Group[]>> {
        const sdo: Sdo<any[]> = await this.groupRepo.getGroups();
        return this.populate<Group[]>(sdo);
    }
}
