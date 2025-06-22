-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_todoItems" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clerkUserId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 3,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_todoItems" ("clerkUserId", "createdAt", "description", "dueDate", "id", "priority", "title", "updatedAt") SELECT "clerkUserId", "createdAt", "description", "dueDate", "id", "priority", "title", "updatedAt" FROM "todoItems";
DROP TABLE "todoItems";
ALTER TABLE "new_todoItems" RENAME TO "todoItems";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
