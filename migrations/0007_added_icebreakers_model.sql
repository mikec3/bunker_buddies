-- CreateTable
CREATE TABLE "IceBreakers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "iceBreaker" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "IceBreakers_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
