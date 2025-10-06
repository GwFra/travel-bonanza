import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@/auth";

export const GET = auth(async function (request) {
  if (!request.auth) {
    return new NextResponse(null, { status: 500 });
  }
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const s3BucketName = process.env.AWS_S3_BUCKET_NAME;

  if (!accessKeyId || !secretAccessKey || !s3BucketName) {
    console.log("Missing creds");
    return new NextResponse(null, { status: 500 });
  }

  const searchParams = request.nextUrl.searchParams;
  const fileName = searchParams.get("fileName");
  const contentType = searchParams.get("contentType");
  if (!fileName || !contentType) {
    console.log(fileName);
    console.log(contentType);
    console.log("Missing search params");
    return new NextResponse(null, { status: 500 });
  }
  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
  const command = new PutObjectCommand({
    Bucket: s3BucketName,
    Key: fileName,
    ContentType: contentType,
  });
  const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
  if (signedUrl) return NextResponse.json({ signedUrl });
  return new NextResponse(null, { status: 500 });
});
