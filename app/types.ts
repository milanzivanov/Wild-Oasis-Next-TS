export type Cabin = {
  created_at: string;
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

export type Booking = {
  id: number;
  guestId: number | null;
  startDate: string | null;
  endDate: string | null;
  numNights: number   | null;
  totalPrice: number | null;
  numGuests: number | null;
  status?: string | null;
  created_at: string;
  cabins: { 
    name: string | null; 
    image: string | null; } | null
};

export type SelectCountryProps = {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
};

export type SettingsProps =  {
  id: number;
  created_at: string;
  minBookingLength: number; 
  maxBookingLength: number;
  breakfastPrice: number; 
}

export type Guest = {
  id?: number;
  created_at?: string;
  fullName?: string;
  email?: string;
  nationalID?: string;
  nationality?: string;
  countryFlag?: string;
};