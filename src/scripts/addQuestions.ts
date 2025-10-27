import { defineScript } from "rwsdk/worker";
import { db, setupDb } from "@/db";

export default defineScript(async ({ env }) => {
  await setupDb(env);

  await db.question.createMany({
    data: [

     {dateKey: new Date("2025-10-24")
        , question: "Which Halloween costume do you hate to see and why?"
      }
                        , {dateKey: new Date("2025-10-25")
        , question: "What have you said on the internet that would get you fired today?"
      }
                        , {dateKey: new Date("2025-10-26")
        , question: "How much more money do you need to be happy?"
      }
                        , {dateKey: new Date("2025-10-27")
        , question: "If someone leaves a bowl of candy out on Halloween, do you take more than 1?"
      }
                        , {dateKey: new Date("2025-10-28")
        , question: "If you had to drop a million in one day, where you going?"
      }
                        , {dateKey: new Date("2025-10-29")
        , question: "Who would you murder if you could get away with it?"
      }
                        , {dateKey: new Date("2025-10-30")
        , question: "Who do you owe a phone call to?"
      }
    ],
  })

  console.log("🌱 Finished seeding extra questions");
});
