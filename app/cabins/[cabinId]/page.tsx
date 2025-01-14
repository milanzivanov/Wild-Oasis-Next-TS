import { getCabin, getCabins } from "@/app/_lib/data-service";
import Reservation from "@/app/_components/Reservation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";
import { Cabin as CabinType } from "@/app/types";

type Props = {
  params: Promise<{ cabinId: string }>;
};

export async function generateMetadata({ params }: Props) {
  const cabin = await getCabin((await params).cabinId);

  return {
    title: `Cabin ${cabin?.name}`
  };
}

// lockaly it si workin but in production it dos not
export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: cabin.id.toString() }));
  return ids;
}

export default async function Page({ params }: Props) {
  const { cabinId } = await params;

  const cabin = await getCabin(cabinId);

  const cabinData: CabinType = {
    id: cabin.id,
    created_at: cabin.created_at,
    name: cabin.name!,
    discount: cabin.discount!,
    image: cabin.image!,
    maxCapacity: cabin.maxCapacity!,
    regularPrice: cabin.regularPrice!,
    description: cabin.description!
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="max-w-6xl mx-auto mt-8">
        <Cabin cabin={cabinData} />

        <div>
          <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
            Reserve {cabinData.name} today. Pay on arrival.
          </h2>

          <Suspense fallback={<Spinner />}>
            <Reservation cabin={cabinData} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
