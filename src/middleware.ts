import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

// API에서도 확인
export async function middleware(req: NextRequest) {
  // nextauth에서 제공해주는 getToken()
  const token = await getToken({ req });

  // token이 없고 api 요청이라면 바로 error, route handler에게 도달하지 않음
  if (!token) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return new NextResponse("Authentication Error", { status: 401 });
    }

    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/auth/signin`, origin);
    signInUrl.searchParams.append(
      "callbackUrl",
      `${basePath}${pathname}${search}`,
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  // matcher에 있는 경로(페이지)에서는 꼭 middleware 거쳐가도록 설정
  // page뿐만 아니라 middleware 검사를 원하는 모든 라우터 핸들러 명시
  matcher: ["/api/list", "/api/record", "/user/:path*", "/list", "/record"],
};
