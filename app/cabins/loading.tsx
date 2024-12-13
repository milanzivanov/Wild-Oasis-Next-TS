import Spinner from "@/app/_components/Spinner";

function Loading() {
  return (
    <div className="grid items-center justify-center">
      <p className="text-xl text-peimary-200">Loading cabins</p>
      <Spinner />;
    </div>
  );
}
export default Loading;
