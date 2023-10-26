/*
  Warnings:

  - You are about to drop the column `birth_data` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "birth_data",
ADD COLUMN     "birth_date" TEXT;
