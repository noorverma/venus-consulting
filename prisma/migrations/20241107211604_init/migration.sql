-- CreateTable
CREATE TABLE "Survey" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "experienceRating" TEXT NOT NULL,
    "usefulFeatures" TEXT NOT NULL,
    "improvementSuggestions" TEXT NOT NULL,
    "additionalComments" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
