import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account"
};

async function Page() {
  const session = await auth();
  console.log(session);
  const firstName = session?.user?.name?.split(" ")[0];
  return (
    <h2 className="text-2xl font-semibold text-accent-400 mb-7">
      Welcome, {firstName}
    </h2>
  );
}
export default Page;
