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
  guestId: number;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status: string;
  created_at: string;
  cabins: {
    name: string;
    image: string;
  };
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
