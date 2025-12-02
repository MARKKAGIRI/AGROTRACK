const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

async function main() {
  const cropsData = [
    {
      cropName: "Coffee",
      cropType: "Coffea arabica",
      region: "Central Kenya",
      growthData: {
        stages: [
          {
            code: "00-09",
            description:
              "Germination: seed swells, radicle emerges, seedling breaks through soil surface.",
            tasks: [
              "Select quality parchment seeds",
              "Pre-germinate in sand beds with adequate moisture",
              "Maintain shade (50-75%) for seedlings",
            ],
            duration_days: "30-45",
          },
          {
            code: "10-19",
            description:
              "Leaf development: cotyledons unfold, first true leaves (butterfly stage) appear and expand.",
            tasks: [
              "Transplant to nursery bags when 2-4 leaves develop",
              "Apply foliar fertilizer",
              "Control damping-off disease",
            ],
            duration_days: "60-90",
          },
          {
            code: "20-29",
            description:
              "Formation of primary branches (orthotropic shoot growth).",
            tasks: [
              "Transplant to field when 6-8 months old",
              "Apply organic manure and NPK fertilizer",
              "Establish proper spacing (2.5m x 2.5m)",
            ],
            duration_days: "180-270",
          },
          {
            code: "30-39",
            description:
              "Branch elongation: plagiotropic (horizontal) branches develop and extend.",
            tasks: [
              "Prune suckers and maintain single stem",
              "Mulch around base to conserve moisture",
              "Control Coffee Berry Disease (CBD)",
            ],
            duration_days: "365-540",
          },
          {
            code: "50-59",
            description:
              "Inflorescence emergence: flower buds appear in leaf axils (pin-head stage).",
            tasks: [
              "Ensure adequate soil moisture for bud development",
              "Apply boron and zinc foliar spray",
              "Monitor for thrips and other pests",
            ],
            duration_days: "14-21",
          },
          {
            code: "60-69",
            description:
              "Flowering: white fragrant flowers open (anthesis), self-pollination occurs.",
            tasks: [
              "Reduce irrigation slightly during flowering",
              "Avoid pesticide application during peak bloom",
              "Monitor weather for optimal pollination",
            ],
            duration_days: "7-10",
          },
          {
            code: "70-79",
            description:
              "Fruit development: berries expand from pin-head to full size (green stage).",
            tasks: [
              "Apply potassium-rich fertilizer for fruit development",
              "Maintain consistent irrigation",
              "Control Coffee Berry Borer (CBB)",
            ],
            duration_days: "120-150",
          },
          {
            code: "80-89",
            description:
              "Ripening: berries change from green to yellow, then red (cherry stage).",
            tasks: [
              "Monitor for optimal harvest time (deep red color)",
              "Prepare for selective hand-picking",
              "Continue pest and disease management",
            ],
            duration_days: "30-60",
          },
          {
            code: "90-99",
            description:
              "Senescence and harvest: berries fully ripe, ready for harvest.",
            tasks: [
              "Harvest red cherries selectively (multiple pickings)",
              "Process immediately after picking",
              "Apply post-harvest fertilizer for next season",
            ],
            duration_days: "60-90",
          },
        ],
      },
    },
    {
      cropName: "Tomato",
      cropType: "Lycopersicon esculentum",
      region: "Central Kenya",
      growthData: {
        stages: [
          {
            code: "00-09",
            description:
              "Germination: seed imbibes water, radicle emerges, cotyledons break soil surface.",
            tasks: [
              "Sow seeds in seedbed or trays with sterile media",
              "Maintain temperature 20-25°C and adequate moisture",
              "Provide shade to prevent drying",
            ],
            duration_days: "5-10",
          },
          {
            code: "10-19",
            description:
              "Leaf development: cotyledons expand, first true leaves appear and unfold.",
            tasks: [
              "Transplant seedlings to larger containers when 2-3 leaves form",
              "Apply starter fertilizer (high phosphorus)",
              "Harden off seedlings before field transplanting",
            ],
            duration_days: "14-21",
          },
          {
            code: "21-29",
            description:
              "Formation of side shoots: axillary shoots develop from leaf axils.",
            tasks: [
              "Transplant to field/greenhouse at 4-6 weeks",
              "Install stakes or trellises for support",
              "Remove lower side shoots (suckers) for indeterminate types",
            ],
            duration_days: "7-14",
          },
          {
            code: "30-39",
            description:
              "Stem elongation: main stem grows rapidly, nodes and internodes increase.",
            tasks: [
              "Tie plants to support structures",
              "Apply nitrogen fertilizer for vegetative growth",
              "Maintain consistent irrigation",
            ],
            duration_days: "14-21",
          },
          {
            code: "50-59",
            description:
              "Inflorescence emergence: flower buds visible, first flower cluster (truss) appears.",
            tasks: [
              "Switch to high potassium fertilizer",
              "Monitor for early blight and late blight",
              "Control whiteflies and aphids",
            ],
            duration_days: "7-10",
          },
          {
            code: "60-69",
            description:
              "Flowering: flowers open on first and subsequent trusses.",
            tasks: [
              "Ensure proper pollination (vibrate flowers if in greenhouse)",
              "Maintain temperature 18-27°C for fruit set",
              "Continue disease and pest monitoring",
            ],
            duration_days: "7-14",
          },
          {
            code: "71-79",
            description:
              "Fruit development: fruits enlarge, green tomatoes reach full size.",
            tasks: [
              "Apply calcium to prevent blossom-end rot",
              "Increase potassium fertilizer for fruit quality",
              "Maintain even soil moisture to prevent cracking",
            ],
            duration_days: "21-35",
          },
          {
            code: "81-89",
            description:
              "Ripening: fruits begin color change (breaker stage) to full red ripeness.",
            tasks: [
              "Harvest fruits at desired ripeness stage",
              "Reduce irrigation slightly before harvest",
              "Monitor for fruit flies and other pests",
            ],
            duration_days: "7-14",
          },
          {
            code: "97-99",
            description:
              "Senescence: plant productivity declines, final harvest completed.",
            tasks: [
              "Complete final harvest",
              "Remove and destroy plant debris to prevent disease carryover",
              "Prepare field for next planting cycle",
            ],
            duration_days: "7-14",
          },
        ],
      },
    },
    {
      cropName: "Cabbage",
      cropType: "Brassica oleracea var. capitata",
      region: "Central Kenya",
      growthData: {
        stages: [
          {
            code: "00-09",
            description:
              "Germination: seed swells, radicle emerges, hypocotyl breaks soil surface.",
            tasks: [
              "Sow seeds in nursery beds with fine tilth",
              "Maintain moisture and temperature 18-20°C",
              "Protect seedbed from heavy rain",
            ],
            duration_days: "4-7",
          },
          {
            code: "10-19",
            description:
              "Leaf development (seedling stage): cotyledons unfold, first true leaves appear.",
            tasks: [
              "Thin seedlings to proper spacing in nursery",
              "Apply light fertilizer (CAN or NPK)",
              "Control aphids and flea beetles",
            ],
            duration_days: "21-28",
          },
          {
            code: "20-29",
            description:
              "Rosette formation: leaves develop in circular pattern without head formation.",
            tasks: [
              "Transplant to main field at 4-6 weeks (4-6 true leaves)",
              "Space plants 45cm x 45cm or 60cm x 60cm",
              "Apply basal fertilizer and irrigate immediately",
            ],
            duration_days: "14-21",
          },
          {
            code: "40-49",
            description:
              "Head development begins: inner leaves start to fold and overlap (folding stage).",
            tasks: [
              "Top-dress with nitrogen fertilizer",
              "Maintain consistent soil moisture",
              "Control cabbage worms and cutworms",
            ],
            duration_days: "14-21",
          },
          {
            code: "41-49",
            description:
              "Head formation (heading stage): leaves tightly fold, compact head develops.",
            tasks: [
              "Apply second nitrogen top-dressing",
              "Monitor for diamond-back moth larvae",
              "Control aphids and thrips",
            ],
            duration_days: "21-35",
          },
          {
            code: "80-89",
            description:
              "Maturity: head reaches full size and firmness, ready for harvest.",
            tasks: [
              "Reduce irrigation before harvest",
              "Check head firmness by pressing gently",
              "Plan harvest based on market demand",
            ],
            duration_days: "7-14",
          },
          {
            code: "90-99",
            description:
              "Harvest and senescence: heads harvested, outer leaves may begin to yellow.",
            tasks: [
              "Harvest by cutting head with sharp knife",
              "Leave 2-3 wrapper leaves for protection",
              "Remove crop residue and prepare field for rotation",
            ],
            duration_days: "7-10",
          },
        ],
      },
    },
  ];

  for (const crop of cropsData) {
    await prisma.crops.create({
      data: crop,
    });
  }

  console.log("✅ Coffee, Tomato, and Cabbage successfully seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });