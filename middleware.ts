// import { NextResponse } from "next/server";

// export function middleware(req: unknown) {
//   console.log("middleware", req);

//   return NextResponse.redirect(new URL("/about", req.url));
// }

import {auth} from "./app/_lib/auth"; 
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};