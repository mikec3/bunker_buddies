import { defineScript } from "rwsdk/worker";
import { db, setupDb } from "@/db";

export default defineScript(async ({ env }) => {
  await setupDb(env);

  // order matters, will error if you try to delete a parent relationship first.
  await db.$executeRawUnsafe(`\
    DELETE FROM Credential;
    DELETE FROM User;
    DELETE FROM Answer;
    DELETE FROM Comments;
    DELETE FROM Connections;
    DELETE FROM PendingConnections;
    DELETE FROM Question;
    DELETE FROM sqlite_sequence;
  `);

  await db.user.create({
    data: {
      id: "1",
      username: "testuser",
    },
  });

  await db.question.createMany({
    data: [
      {dateKey: new Date("2025-08-31")
        , question: "August 31st question"
      }
      , {dateKey: new Date("2025-09-01")
        , question: "Sept 1st question"
      }
      , {dateKey: new Date("2025-09-02")
        , question: "Sept 2nd question"
      }
            , {dateKey: new Date("2025-09-03")
        , question: "Sept 3rd question"
      }
            , {dateKey: new Date("2025-09-04")
        , question: "Sept 4th question"
      }
            , {dateKey: new Date("2025-09-05")
        , question: "Sept 5th question"
      }
            , {dateKey: new Date("2025-09-06")
        , question: "Sept 6th question"
      }
            , {dateKey: new Date("2025-09-07")
        , question: "Sept 7th question"
      }
            , {dateKey: new Date("2025-09-08")
        , question: "Sept 8th question"
      }
            , {dateKey: new Date("2025-09-09")
        , question: "Sept 9th question"
      }
            , {dateKey: new Date("2025-09-10")
        , question: "Sept 10th question"
      }
    ],
  })

  console.log("🌱 Finished seeding");
});
