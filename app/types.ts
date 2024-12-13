export type Cabins = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  // add other properties as needed
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
