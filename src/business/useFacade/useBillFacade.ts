import { Bill, BillFilterRequest } from '@src/business';
import { useEffect, useRef, useState } from 'react';
import { CONSTANTS, Dto, Logger } from '@core/common';
import { BillFacade } from '@src/business/facade';
import { useDebounce } from '@core/use_hook';

type BillFacadeResult = {
  setSearchText: (searchText: string) => void;
  searchText: string;

  setSelectedDate: (selectedDate: number) => void;
  selectedDate: number;
  reloadBills: () => Promise<void>;
  loadMore: () => Promise<void>;
  clear: () => Promise<void>;
  bills: Bill[];
};

export const useBillFacade = (): BillFacadeResult => {
  const [searchText, setSearchText] = useState<string>(CONSTANTS.STR_EMPTY);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [bills, setBills] = useState<Bill[]>([]);
  const pageIndexRef = useRef<number>(0);
  const facade = BillFacade.shared();
  const inputSearchText = useDebounce(searchText);

  useEffect(() => {
    pageIndexRef.current = 0;
    loadBills();
  }, [inputSearchText, selectedDate]);

  const loadMore = async (): Promise<void> => {
    pageIndexRef.current += 1;
    loadBills();
  };
  const reloadBills = async (): Promise<void> => {
    pageIndexRef.current = 0;
    Logger.log(() => [
      `useBillFacade loadBills reloadBills ${pageIndexRef.current} --> ${inputSearchText}`,
    ]);
    loadBills();
  };
  const clear = async (): Promise<void> => {
    pageIndexRef.current = 0;
    setSearchText(CONSTANTS.STR_EMPTY);
    setSelectedDate(0);
  };
  const loadBills = async (): Promise<void> => {
    Logger.log(() => [
      `useBillFacade loadBills pageIndex ${pageIndexRef.current} --> ${inputSearchText} with date ${selectedDate}`,
    ]);
    const dto: Dto<Bill[]> = await facade.getBillsBy({
      text: inputSearchText,
      date: selectedDate,
      offset: pageIndexRef.current,
    } as BillFilterRequest);
    if (dto.next()) {
      const bs: Bill[] = (dto.data || []) as Bill[];
      if (pageIndexRef.current === 0) {
        setBills(bs);
      } else {
        if (bs.length === 0) {
          pageIndexRef.current -= 1;
        }
        setBills([...bills, ...bs]);
      }
    }
  };
  return {
    setSearchText,
    bills,
    reloadBills,
    loadMore,
    setSelectedDate,
    selectedDate,
    clear,
    searchText,
  };
};
