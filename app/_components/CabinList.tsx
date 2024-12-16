// import { unstable_noStore as noStore } from "next/cache";
import { Cabin } from "@/app/types";
import CabinCard from "../_components/CabinCard";

import { getCabins } from "../_lib/data-service";

type CabinListProps = {
  filter: string;
};

async function CabinList({ filter }: CabinListProps) {
  // noStore();

  const cabins = await getCabins();

  if (!cabins) {
    return null;
  }

  let displayCabins;

  if (filter === "all") {
    displayCabins = cabins;
  }
  if (filter === "small") {
    displayCabins = cabins.filter(
      (cabin) => cabin.maxCapacity !== null && cabin.maxCapacity <= 3
    );
  }
  if (filter === "medium") {
    displayCabins = cabins.filter(
      (cabin) =>
        cabin.maxCapacity !== null &&
        cabin.maxCapacity >= 4 &&
        cabin.maxCapacity <= 7
    );
  }
  if (filter === "large") {
    displayCabins = cabins.filter(
      (cabin) => cabin.maxCapacity !== null && cabin.maxCapacity >= 8
    );
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins?.map((cabin) => (
        <CabinCard cabin={cabin as Cabin} key={cabin.id} />
      ))}
    </div>
  );
}
export default CabinList;
