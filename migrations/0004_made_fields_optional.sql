-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Answer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answerText" TEXT NOT NULL,
    "dateKeyId" DATETIME,
    CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Answer_dateKeyId_fkey" FOREIGN KEY ("dateKeyId") REFERENCES "Question" ("dateKey") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Answer" ("answerText", "createdAt", "dateKeyId", "id", "userId") SELECT "answerText", "createdAt", "dateKeyId", "id", "userId" FROM "Answer";
DROP TABLE "Answer";
ALTER TABLE "new_Answer" RENAME TO "Answer";
CREATE UNIQUE INDEX "Answer_userId_key" ON "Answer"("userId");
CREATE TABLE "new_Comments" (
    "commentId" TEXT NOT NULL PRIMARY KEY,
    "commentText" TEXT NOT NULL,
    "answerId" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Comments_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comments" ("answerId", "commentId", "commentText", "userId") SELECT "answerId", "commentId", "commentText", "userId" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
