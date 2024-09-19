import {
  BillFilterRequest,
  CreateExpenseRequest,
  Expense,
} from '@src/business';
import { useEffect, useRef, useState } from 'react';
import { CONSTANTS, Dto, Logger } from '@core/common';
import { ExpenseFacade } from '@src/business/facade';
import { useDebounce } from '@core/use_hook';

type ExpenseFacadeResult = {
  setSearchText: (searchText: string) => void;
  searchText: string;
  setSelectedDate: (selectedDate: number) => void;
  selectedDate: number;
  reloadData: () => Promise<void>;
  loadMore: () => Promise<void>;
  clear: () => Promise<void>;
  data: Expense[];

  createExpense: (name: string, total: number) => Promise<Dto<Expense | null>>;
};

export const useExpenseFacade = (): ExpenseFacadeResult => {
  const [searchText, setSearchText] = useState<string>(CONSTANTS.STR_EMPTY);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [data, setData] = useState<Expense[]>([]);
  const pageIndexRef = useRef<number>(0);
  const facade = ExpenseFacade.shared();
  const inputSearchText = useDebounce(searchText);

  useEffect(() => {
    pageIndexRef.current = 0;
    loadData();
  }, [inputSearchText, selectedDate]);

  const loadMore = async (): Promise<void> => {
    pageIndexRef.current += 1;
    loadData();
  };
  const reloadData = async (): Promise<void> => {
    pageIndexRef.current = 0;
    Logger.log(() => [
      `useExpenseFacade loadBills reloadBills ${pageIndexRef.current} --> ${inputSearchText}`,
    ]);
    loadData();
  };
  const clear = async (): Promise<void> => {
    pageIndexRef.current = 0;
    setSearchText(CONSTANTS.STR_EMPTY);
    setSelectedDate(0);
  };
  const loadData = async (): Promise<void> => {
    Logger.log(() => [
      `useExpenseFacade loadBills pageIndex ${pageIndexRef.current} --> ${inputSearchText} with date ${selectedDate}`,
    ]);
    const dto: Dto<Expense[]> = await facade.getExpensesBy({
      text: inputSearchText,
      date: selectedDate,
      offset: pageIndexRef.current,
    } as BillFilterRequest);
    if (dto.next()) {
      const dt: Expense[] = (dto.data || []) as Expense[];
      if (pageIndexRef.current === 0) {
        setData(dt);
      } else {
        if (dt.length === 0) {
          pageIndexRef.current -= 1;
        }
        setData([...data, ...dt]);
      }
    }
  };
  const createExpense = async (
    name: string,
    total: number,
  ): Promise<Dto<Expense | null>> => {
    const dto: Dto<Expense | null> = await facade.createExpense({
      note: name,
      total,
    } as CreateExpenseRequest);
    if (dto.next() && dto.data) {
      const dt: Expense = dto.data;
      setData([dt, ...data]);
    }
    return dto;
  };

  return {
    setSearchText,
    data,
    reloadData,
    loadMore,
    setSelectedDate,
    selectedDate,
    clear,
    searchText,
    createExpense,
  };
};
