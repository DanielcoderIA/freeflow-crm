import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Esto deja pasar a todo el mundo sin revisar el login
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};