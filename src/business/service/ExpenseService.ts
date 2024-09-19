import { BaseService, Dto } from '@core/common';
import { ExpenseRepo } from '@src/business/repository';
import {
  CreateExpenseRequest,
  Expense,
  ExpenseFilterRequest,
} from '@src/business';

export class ExpenseService extends BaseService<ExpenseService> {
  private expenseRepo: ExpenseRepo = ExpenseRepo.shared();

  constructor() {
    super();
  }

  public static shared(): ExpenseService {
    return this.Instance(ExpenseService);
  }

  async getExpensesBy(filter: ExpenseFilterRequest): Promise<Dto<Expense[]>> {
    return this.expenseRepo.getExpensesBy(filter);
  }

  async createExpense(req: CreateExpenseRequest): Promise<Dto<Expense | null>> {
    const dto: Dto<Expense | null> = await this.expenseRepo.createExpense(req);
    return dto;
  }
}
