// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";
// import * as schema from "@/db/schema";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

// const queryClient = postgres(process.env.DATABASE_URL!, {
//   ssl: "require", // Required for Neon
// });

// export const db = drizzle(queryClient, { schema });
