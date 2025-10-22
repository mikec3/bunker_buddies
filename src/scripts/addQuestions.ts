import { defineScript } from "rwsdk/worker";
import { db, setupDb } from "@/db";

export default defineScript(async ({ env }) => {
  await setupDb(env);

  await db.question.createMany({
    data: [
      {dateKey: new Date("2025-10-15")
        , question: "Oct 15 question"
      }
                  , {dateKey: new Date("2025-10-16")
        , question: "Oct 16 question"
      }
                        , {dateKey: new Date("2025-10-17")
        , question: "Oct 17 question"
      }
                        , {dateKey: new Date("2025-10-18")
        , question: "Oct 18 question"
      }
                        , {dateKey: new Date("2025-10-19")
        , question: "Oct 19 question"
      }
                        , {dateKey: new Date("2025-10-20")
        , question: "Oct 20 question"
      }
                        , {dateKey: new Date("2025-10-21")
        , question: "Oct 21 question"
      }
                        , {dateKey: new Date("2025-10-22")
        , question: "Oct 22 question"
      }
                        , {dateKey: new Date("2025-10-23")
        , question: "Oct 23 question"
      }
                        , {dateKey: new Date("2025-10-24")
        , question: "Oct 24 question"
      }
                        , {dateKey: new Date("2025-10-25")
        , question: "Oct 25 question"
      }
                        , {dateKey: new Date("2025-10-26")
        , question: "Oct 26 question"
      }
                        , {dateKey: new Date("2025-10-27")
        , question: "Oct 27 question"
      }
    ],
  })

  console.log("🌱 Finished seeding extra questions");
});
