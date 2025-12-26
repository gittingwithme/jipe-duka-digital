import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CurrencyCode = 'KES' | 'USD' | 'EUR' | 'GBP';

interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // Rate from KES
}

const currencies: Record<CurrencyCode, Currency> = {
  KES: { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', rate: 1 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.0077 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.0071 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.0061 },
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (code: CurrencyCode) => void;
  convert: (amountInKES: number) => number;
  format: (amountInKES: number) => string;
  currencies: typeof currencies;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('kifaru-currency');
    if (saved && currencies[saved as CurrencyCode]) {
      return currencies[saved as CurrencyCode];
    }
    return currencies.KES;
  });

  useEffect(() => {
    localStorage.setItem('kifaru-currency', currency.code);
  }, [currency]);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(currencies[code]);
  };

  const convert = (amountInKES: number): number => {
    return amountInKES * currency.rate;
  };

  const format = (amountInKES: number): string => {
    const converted = convert(amountInKES);
    
    if (currency.code === 'KES') {
      return `${currency.symbol} ${converted.toLocaleString('en-KE')}`;
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
    }).format(converted);
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      convert,
      format,
      currencies
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
