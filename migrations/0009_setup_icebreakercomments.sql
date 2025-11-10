-- CreateTable
CREATE TABLE "IceBreakerComments" (
    "commentId" TEXT NOT NULL PRIMARY KEY,
    "commentText" TEXT NOT NULL,
    "iceBreakerId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "upVotes" INTEGER NOT NULL DEFAULT 0,
    "downVotes" INTEGER NOT NULL DEFAULT 0,
    "netVotes" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "IceBreakerComments_iceBreakerId_fkey" FOREIGN KEY ("iceBreakerId") REFERENCES "IceBreakers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IceBreakerComments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
