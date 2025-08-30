-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateKey" DATETIME NOT NULL,
    "question" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answerText" TEXT NOT NULL,
    "dateKeyId" DATETIME NOT NULL,
    CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Answer_dateKeyId_fkey" FOREIGN KEY ("dateKeyId") REFERENCES "Question" ("dateKey") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Connections" (
    "followingId" TEXT NOT NULL,
    "followedById" TEXT NOT NULL,

    PRIMARY KEY ("followingId", "followedById"),
    CONSTRAINT "Connections_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Connections_followedById_fkey" FOREIGN KEY ("followedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PendingConnections" (
    "requesterId" TEXT NOT NULL,
    "requestedId" TEXT NOT NULL,

    PRIMARY KEY ("requesterId", "requestedId"),
    CONSTRAINT "PendingConnections_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PendingConnections_requestedId_fkey" FOREIGN KEY ("requestedId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comments" (
    "commentId" TEXT NOT NULL PRIMARY KEY,
    "commentText" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Comments_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Question_dateKey_key" ON "Question"("dateKey");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_userId_key" ON "Answer"("userId");
