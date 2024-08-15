import { Bill } from '@src/business';
import { useEffect, useRef, useState } from 'react';
import { CONSTANTS, Dto, Logger } from '@core/common';
import { BillFacade } from '@src/business/facade';

type BillFacadeResult = {
  setSearchText: (searchText: string) => void;
  reloadBills: () => Promise<void>;
  loadMore: () => Promise<void>;
  bills: Bill[];
};

export const useBillFacade = (): BillFacadeResult => {
  const [searchText, setSearchText] = useState<string>(CONSTANTS.STR_EMPTY);
  const [bills, setBills] = useState<Bill[]>([]);
  const pageIndexRef = useRef<number>(0);
  const facade = BillFacade.shared();
  useEffect(() => {
    pageIndexRef.current = 0;
    loadBills();
  }, [searchText]);

  const loadMore = async (): Promise<void> => {
    pageIndexRef.current += 1;
    loadBills();
  };
  const reloadBills = async (): Promise<void> => {
    pageIndexRef.current = 0;
    Logger.log(() => [
      `useBillFacade loadBills reloadBills ${pageIndexRef.current} --> ${searchText}`,
    ]);
    loadBills();
  };
  const loadBills = async (): Promise<void> => {
    Logger.log(() => [
      `useBillFacade loadBills pageIndex ${pageIndexRef.current} --> ${searchText}`,
    ]);
    const dto: Dto<Bill[]> = await facade.getBillsBy({
      text: searchText,
      offset: pageIndexRef.current,
    });
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
  return { setSearchText, bills, reloadBills, loadMore };
};
