import { defineScript } from "rwsdk/worker";
import { db, setupDb } from "@/db";

export default defineScript(async ({ env }) => {
  await setupDb(env);

await db.connections.createMany({
        data: [
      {followingId: "ea6c9f79-66eb-43d5-b4d1-7ac6ffc966c2"
        , followedById: "fff74b4f-dc59-4abc-9183-e6244bb35a28"
      }
      , {followingId: "fff74b4f-dc59-4abc-9183-e6244bb35a28"
        , followedById: "ea6c9f79-66eb-43d5-b4d1-7ac6ffc966c2"
      }
    ]
})


  console.log("🌱 Finished seeding connection!");
});