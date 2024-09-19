import BaseFacade from '@core/common/models/BaseFacade';
import { Dto } from '@core/common';
import {
  CreateExpenseRequest,
  Expense,
  ExpenseFilterRequest,
  ExpenseService,
} from '@src/business';

export class ExpenseFacade extends BaseFacade<ExpenseFacade> {
  private expenseService: ExpenseService = ExpenseService.shared();

  constructor() {
    super();
  }

  public static shared(): ExpenseFacade {
    return this.Instance(ExpenseFacade);
  }

  async getExpensesBy(filter: ExpenseFilterRequest): Promise<Dto<Expense[]>> {
    const dto: Dto<Expense[]> = await this.expenseService.getExpensesBy(filter);
    return this.populate(dto);
  }

  async createExpense(req: CreateExpenseRequest): Promise<Dto<Expense | null>> {
    const dto: Dto<Expense | null> = await this.expenseService.createExpense(
      req,
    );
    return this.populate(dto);
  }
}
