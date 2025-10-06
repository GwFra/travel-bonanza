import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { s3Files } from "@/lib/db/schema";
import { auth } from "@/auth";

export const POST = auth(async function (request) {
  if (!request.auth || !request.auth.user) {
    return new NextResponse(null, { status: 500 });
  }
  const { user } = request.auth;
  const { id } = user;
  // Path to file in s3 bucket
  const { objectUrl } = await request.json();
  try {
    const result = await db
      .insert(s3Files)
      .values({
        objectKey: "",
        fileUrl: objectUrl,
        userId: id!,
      })
      .returning();
    console.log(result);
    return new NextResponse(null, { status: 201 });
  } catch (e) {
    return NextResponse.json({
      code: 0,
      message: e instanceof Error ? e.message : e?.toString(),
    });
  }
});
