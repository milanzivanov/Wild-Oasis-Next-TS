// Let's imagine your colleague already built this component 😃

"use client";
import { getCountries } from "@/app/_lib/data-service";
// import { SelectCountryProps } from "@/app/types";

import { useEffect, useState } from "react";

function SelectCountry({
  defaultCountry,
  name,
  id,
  className
}: {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
}) {
  const [countries, setCountries] = useState<{ name: string; flag: string }[]>(
    []
  );
  const [flag, setFlag] = useState<string>("");

  useEffect(
    function () {
      // Fetch countries on component mount
      async function fetchCoutres() {
        const result = await getCountries();
        setCountries(result);

        // Set the flag for the default country
        const defaultFlag =
          result.find(
            (country: { name: string; flag: string }) =>
              country.name === defaultCountry
          )?.flag ?? "";
        setFlag(defaultFlag);
      }

      fetchCoutres();
    },
    [defaultCountry]
  );

  return (
    <select
      name={name}
      id={id}
      // Encode BOTH the country name and the flag into the value
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

// function SelectCountry({
//   defaultCountry,
//   name,
//   id,
//   className
// }: {
//   defaultCountry: string;
//   name: string;
//   id: string;
//   className: string;
// }): Promise<SelectCountryProps> {
//   const countries = getCountries();
//   const flag =
//     countries.find(
//       (country: { name: string; flag: string }) =>
//         country.name === defaultCountry
//     )?.flag ?? "";

//   return (
//     <select
//       name={name}
//       id={id}
//       // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
//       defaultValue={`${defaultCountry}%${flag}`}
//       className={className}
//     >
//       <option value="">Select country...</option>
//       {countries.map((c) => (
//         <option key={c.name} value={`${c.name}%${c.flag}`}>
//           {c.name}
//         </option>
//       ))}
//     </select>
//   );
// }

export default SelectCountry;
