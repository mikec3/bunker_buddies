-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_IceBreakers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "iceBreaker" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upVotes" INTEGER NOT NULL DEFAULT 0,
    "downVotes" INTEGER NOT NULL DEFAULT 0,
    "netVotes" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "IceBreakers_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_IceBreakers" ("authorId", "createdAt", "iceBreaker", "id") SELECT "authorId", "createdAt", "iceBreaker", "id" FROM "IceBreakers";
DROP TABLE "IceBreakers";
ALTER TABLE "new_IceBreakers" RENAME TO "IceBreakers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
