"use client";

import React, { createContext, useState, useContext } from "react";

// Define a type for the range object
type Range = {
  from: Date | undefined;
  to: Date | undefined;
};

// Define a type for the context value
type ReservationContextType = {
  range: Range;
  setRange: React.Dispatch<React.SetStateAction<Range>>;
  resetRange: () => void;
};

// Create context with the correct type
const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<Range>({
    from: undefined,
    to: undefined
  });

  const resetRange = (): void => {
    setRange({ from: undefined, to: undefined });
  };

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("Context is used outside of provider");
  }
  return context;
}

export { ReservationProvider, useReservation };
