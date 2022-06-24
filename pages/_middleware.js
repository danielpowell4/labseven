import { NextResponse } from "next/server";
export async function middleware(request, _ev) {
  const url = request.nextUrl.clone();
  if (url.pathname === "/") {
    url.pathname = "/products";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}
