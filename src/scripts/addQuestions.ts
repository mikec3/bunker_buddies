import { defineScript } from "rwsdk/worker";
import { db, setupDb } from "@/db";

export default defineScript(async ({ env }) => {
  await setupDb(env);

  await db.question.createMany({
    data: [
      {dateKey: new Date("2025-09-13")
        , question: "Sept 13th question"
      }
      , {dateKey: new Date("2025-09-14")
        , question: "Sept 14st question"
      }
      , {dateKey: new Date("2025-09-15")
        , question: "Sept 15th question"
      }
            , {dateKey: new Date("2025-09-16")
        , question: "Sept 16th question"
      }
            , {dateKey: new Date("2025-09-17")
        , question: "Sept 17th question"
      }
            , {dateKey: new Date("2025-09-18")
        , question: "Sept 18th question"
      }
            , {dateKey: new Date("2025-09-19")
        , question: "Sept 19th question"
      }
            , {dateKey: new Date("2025-09-20")
        , question: "Sept 20th question"
      }
            , {dateKey: new Date("2025-09-21")
        , question: "Sept 21th question"
      }
            , {dateKey: new Date("2025-09-22")
        , question: "Sept 22th question"
      }
            , {dateKey: new Date("2025-09-23")
        , question: "Sept 23th question"
      }
                  , {dateKey: new Date("2025-09-24")
        , question: "Sept 24th question"
      }
                  , {dateKey: new Date("2025-09-25")
        , question: "Sept 25th question"
      }
                  , {dateKey: new Date("2025-09-26")
        , question: "Sept 26th question"
      }
                  , {dateKey: new Date("2025-09-27")
        , question: "Sept 27th question"
      }
                  , {dateKey: new Date("2025-09-28")
        , question: "Sept 28th question"
      }
                  , {dateKey: new Date("2025-09-29")
        , question: "Sept 29th question"
      }
                  , {dateKey: new Date("2025-09-30")
        , question: "Sept 30th question"
      }
                  , {dateKey: new Date("2025-10-01")
        , question: "Oct 1 question"
      }
                  , {dateKey: new Date("2025-10-02")
        , question: "Oct 2 question"
      }
                        , {dateKey: new Date("2025-10-03")
        , question: "Oct 3 question"
      }
                        , {dateKey: new Date("2025-10-04")
        , question: "Oct 4 question"
      }
                        , {dateKey: new Date("2025-10-05")
        , question: "Oct 5 question"
      }
                        , {dateKey: new Date("2025-10-06")
        , question: "Oct 6 question"
      }
                        , {dateKey: new Date("2025-10-07")
        , question: "Oct 7 question"
      }
                        , {dateKey: new Date("2025-10-08")
        , question: "Oct 8 question"
      }
                        , {dateKey: new Date("2025-10-09")
        , question: "Oct 9 question"
      }
                        , {dateKey: new Date("2025-10-10")
        , question: "Oct 10 question"
      }
                        , {dateKey: new Date("2025-10-11")
        , question: "Oct 11 question"
      }
                        , {dateKey: new Date("2025-10-12")
        , question: "Oct 12 question"
      }
                        , {dateKey: new Date("2025-10-13")
        , question: "Oct 13 question"
      }

 

    ],
  })

  console.log("🌱 Finished seeding extra questions");
});
