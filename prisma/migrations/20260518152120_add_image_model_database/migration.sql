-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Targets" (
    "id" SERIAL NOT NULL,
    "gameId" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "nameId" INTEGER NOT NULL,

    CONSTRAINT "Targets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Name" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Name_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NameOnGame" (
    "nameId" INTEGER NOT NULL,
    "gameId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "NameOnGame_nameId_gameId_key" ON "NameOnGame"("nameId", "gameId");

-- AddForeignKey
ALTER TABLE "Targets" ADD CONSTRAINT "Targets_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Targets" ADD CONSTRAINT "Targets_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "Name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NameOnGame" ADD CONSTRAINT "NameOnGame_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "Name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NameOnGame" ADD CONSTRAINT "NameOnGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
