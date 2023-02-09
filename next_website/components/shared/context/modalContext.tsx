import { createContext, ReactNode, ElementType, useState, useMemo, useCallback } from 'react';

interface ModalsDispatchContextType {
  openModal: (Component: ElementType, props?: any) => void;
  closeModal: (Component: ElementType) => void;
}

type ModalsStateContextType = { Component: ElementType; props: any }[];

export const ModalsDispatchContext = createContext<ModalsDispatchContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export const ModalsStateContext = createContext<ModalsStateContextType>([]);

export const ModalsProvider = ({ children }: { children: ReactNode }) => {
  const [openedModals, setOpenedModals] = useState<ModalsStateContextType>([]);

  const openModal = useCallback((Component: ElementType, props?: any) => {
    setOpenedModals((modals) => [...modals, { Component, props }]);
  }, []);

  const closeModal = useCallback((Component: ElementType) => {
    setOpenedModals((modals) => modals.filter((modal) => modal.Component !== Component));
  }, []);

  const dispatch = useMemo(() => ({ openModal, closeModal }), [openModal, closeModal]);

  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchContext.Provider value={dispatch}>{children}</ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};
