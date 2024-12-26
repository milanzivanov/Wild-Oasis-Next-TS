import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

type Props = {
  params: Promise<{ cabinId: string }>;
};

export async function GET(request: Request, { params }: Props) {
  
  const { cabinId } = await params;

  try {
    const [cabin, bookedDates] = await Promise.all([getCabin(cabinId), getBookedDatesByCabinId(cabinId)]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({message: "Cabin not found"})
  }
}