import { ApiResult, BaseRepo, Dto } from '@core/common';
import {
  API_URL,
  CreateExpenseRequest,
  ExpenseFilterRequest,
} from '@src/business';

export class ExpenseRepo extends BaseRepo<ExpenseRepo> {
  constructor() {
    super();
  }

  public static shared(): ExpenseRepo {
    return this.Instance(ExpenseRepo);
  }

  public async getExpensesBy(
    filter: ExpenseFilterRequest,
  ): Promise<Dto<any[]>> {
    const api: ApiResult = await this.api.post(
      API_URL.GET_EXPENSES_BY(),
      filter,
    );
    return this.populate(api);
  }

  async createExpense(req: CreateExpenseRequest): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.post(API_URL.CREATE_EXPENSE(), req);
    return this.populate(api);
  }
}
