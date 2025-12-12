// prisma/seedCrop.js
// Run this using: npx prisma db seed

const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

async function main() {
  // await prisma.crops.create({
  //   data: {
  //     cropName: "Maize",
  //     cropType: "Cereal",
  //     region: "East Africa / Kenya",
  //     growthData: {
  //       idealConditions: {
  //         temperature: {
  //           min: 18,
  //           max: 30,
  //           optimalRange: "20–27°C",
  //         },
  //         rainfall: {
  //           min: 500,
  //           max: 800,
  //           unit: "mm per season",
  //           notes:
  //             "Well-distributed rainfall is crucial during germination and flowering",
  //         },
  //         soil: {
  //           type: "Well-drained loam or sandy loam",
  //           phRange: "5.5–7.0",
  //           organicMatter: "High organic matter preferred",
  //           fertilityNotes: "Requires nitrogen-rich soils for optimal growth",
  //         },
  //         sunlight: "Full sun (6–8 hours daily)",
  //         altitude: "0–2500m",
  //       },
  //       growthStages: [
  //         {
  //           stage: "Land Preparation",
  //           durationDays: "7–14 days",
  //           tasks: [
  //             "Plough the land to 15–25 cm depth",
  //             "Harrow to break clods and level field",
  //             "Incorporate organic manure (5–10 tons/ha)",
  //             "Test soil pH and correct with lime if needed",
  //           ],
  //         },
  //         {
  //           stage: "Planting",
  //           durationDays: "1–3 days",
  //           tasks: [
  //             "Select certified maize seeds (hybrid or OPV)",
  //             "Plant at 2–3 cm depth, 75 cm between rows, 25–30 cm between plants",
  //             "Apply basal fertilizer (DAP or NPK 10-26-10) at 50 kg/acre",
  //             "Ensure first rains have started or irrigate lightly",
  //           ],
  //         },
  //         {
  //           stage: "Germination",
  //           durationDays: "5–10 days",
  //           tasks: [
  //             "Monitor moisture levels to ensure seed emergence",
  //             "Inspect for early pests (cutworms, armyworms)",
  //             "Apply light irrigation if soil dries",
  //             "Remove weeds around emerging seedlings",
  //           ],
  //         },
  //         {
  //           stage: "Vegetative Growth",
  //           durationDays: "20–30 days",
  //           tasks: [
  //             "First top-dressing with CAN fertilizer (50–100 kg/acre)",
  //             "Perform first weeding and soil earthing up",
  //             "Scout for pests like fall armyworm",
  //             "Maintain moderate watering schedule",
  //           ],
  //         },
  //         {
  //           stage: "Tasseling and Pollination",
  //           durationDays: "20–25 days",
  //           tasks: [
  //             "Second top-dressing with urea (20–30 kg/acre)",
  //             "Check for nutrient deficiencies (yellowing leaves → nitrogen issue)",
  //             "Ensure adequate water during flowering",
  //             "Monitor for stem borers and fungal diseases",
  //           ],
  //         },
  //         {
  //           stage: "Grain Filling",
  //           durationDays: "20–30 days",
  //           tasks: [
  //             "Irrigate if rainfall is inadequate",
  //             "Observe for fungal infections (e.g., gray leaf spot)",
  //             "Control late pests where necessary",
  //             "Reduce nitrogen input and maintain stable moisture",
  //           ],
  //         },
  //         {
  //           stage: "Maturity",
  //           durationDays: "15–20 days",
  //           tasks: [
  //             "Check moisture content (should be ~20–25%)",
  //             "Stop irrigation 2 weeks before harvest",
  //             "Inspect for cob pests",
  //             "Prepare labor and tools for harvesting",
  //           ],
  //         },
  //         {
  //           stage: "Harvesting",
  //           durationDays: "5–10 days",
  //           tasks: [
  //             "Harvest cobs when husks are dry and kernels fully formed",
  //             "Dry cobs to 13–14% moisture for storage",
  //             "Shell grains and treat for storage pests",
  //             "Store in airtight bags or granaries",
  //           ],
  //         },
  //       ],
  //       seasonLengthDays: "110–160",
  //       commonPests: ["Fall armyworm", "Stem borer", "Cutworms", "Aphids"],
  //       commonDiseases: [
  //         "Gray leaf spot",
  //         "Maize streak virus",
  //         "Northern leaf blight",
  //         "Ear rot",
  //       ],
  //     },
  //   },
  // });

  await prisma.crops.create({
  data: {
    cropName: "Beans",
    cropType: "Legume",
    region: "East Africa / Kenya",
    growthData: {
      idealConditions: {
        temperature: {
          min: 15,
          max: 28,
          optimalRange: "18–24°C",
        },
        rainfall: {
          min: 300,
          max: 600,
          unit: "mm per season",
          notes:
            "Beans require well-distributed rainfall especially during flowering and pod filling. Avoid waterlogging.",
        },
        soil: {
          type: "Well-drained loam or sandy loam",
          phRange: "6.0–7.0",
          organicMatter: "Medium to high organic matter",
          fertilityNotes:
            "Beans fix nitrogen but still benefit from moderate phosphorus during early growth.",
        },
        sunlight: "Full sun (6+ hours per day)",
        altitude: "600–2000m",
      },

      growthStages: [
        {
          stage: "Land Preparation",
          durationDays: "7–10 days",
          tasks: [
            "Clear field and remove weeds",
            "Plough soil to 15–20 cm depth",
            "Break clods and level field",
            "Mix in farmyard manure (5 tons/acre)",
          ],
        },
        {
          stage: "Planting",
          durationDays: "1–3 days",
          tasks: [
            "Select clean, certified bean seeds",
            "Sow seeds 3–5 cm deep, 45 cm between rows, 10–15 cm between plants",
            "Apply basal fertilizer (DAP or NPK 10-26-10) at 20–40 kg/acre",
            "Ensure the soil is moist but not waterlogged",
          ],
        },
        {
          stage: "Germination",
          durationDays: "4–8 days",
          tasks: [
            "Monitor seedlings for uniform emergence",
            "Light irrigation if soil dries",
            "Check for early pests like bean fly",
            "Remove weeds around young seedlings",
          ],
        },
        {
          stage: "Vegetative Growth",
          durationDays: "15–25 days",
          tasks: [
            "Perform first weeding",
            "Apply top-dressing (low-nitrogen fertilizers only if needed)",
            "Scout for aphids and bean fly",
            "Ensure moderate and consistent moisture",
          ],
        },
        {
          stage: "Flowering",
          durationDays: "10–20 days",
          tasks: [
            "Ensure no moisture stress during flowering",
            "Monitor for fungal diseases like anthracnose",
            "Avoid heavy nitrogen fertilizer to prevent excessive leaves",
            "Light irrigation early morning if rainfall is low",
          ],
        },
        {
          stage: "Pod Formation",
          durationDays: "15–25 days",
          tasks: [
            "Irrigate moderately (avoid waterlogging)",
            "Control pests like pod borers",
            "Check for root rot and remove infected plants",
            "Stop nitrogen fertilizer completely",
          ],
        },
        {
          stage: "Maturity",
          durationDays: "10–15 days",
          tasks: [
            "Reduce irrigation to reduce disease risk",
            "Check pods for maturity and dryness",
            "Start preparing for harvest",
            "Avoid handling wet plants to reduce disease spread",
          ],
        },
        {
          stage: "Harvesting",
          durationDays: "3–7 days",
          tasks: [
            "Harvest when 80–90% of pods are dry",
            "Uproot plants or pick pods manually",
            "Dry beans on a clean mat to 12–13% moisture",
            "Store in airtight bags",
          ],
        },
      ],

      seasonLengthDays: "60–90",
      commonPests: ["Bean fly", "Aphids", "Pod borers", "Whiteflies"],
      commonDiseases: ["Anthracnose", "Root rot", "Angular leaf spot", "Rust"],
    },
  },
});

  
  console.log("Crop seeded successfully.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
