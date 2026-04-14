import React, { createContext, useState, ReactNode } from 'react';

export const CurrencyContext = createContext({
  currency: 'USD',
  setCurrency: (cur: string) => {},
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState('USD');

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};
