-- CreateTable
CREATE TABLE "Proposal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "industry" TEXT NOT NULL,
    "revenue" TEXT NOT NULL,
    "pain_points" TEXT NOT NULL,
    "proposal_text" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
