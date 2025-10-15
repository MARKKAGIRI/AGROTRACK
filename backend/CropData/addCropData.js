const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function main() {
const crop = await prisma.crops.createMany({
  data: [
    {
      cropName: "Sorghum",
      cropType: "Cereal",
      region: "Semi-arid Kenya",
      growthData: {
        stages: [
          {
            "stage": "00-09",
            "description": "Germination",
            "tasks": ["Land preparation", "Plant on ridges or basins for moisture", "Apply basal DAP fertilizer"]
          },
          {
            "stage": "10-19",
            "description": "Leaf development",
            "tasks": ["Early weeding", "Thin plants to 10–15 cm spacing"]
          },
          {
            "stage": "30-39",
            "description": "Stem elongation",
            "tasks": ["Top-dress with nitrogen (CAN)", "Light irrigation if no rain", "Tie ridges to conserve runoff"]
          },
          {
            "stage": "50-69",
            "description": "Panicle emergence & flowering",
            "tasks": ["Protect panicles from birds & insects", "Scout for pests", "Maintain soil moisture during flowering"]
          },
          {
            "stage": "70-89",
            "description": "Grain development & ripening",
            "tasks": ["Irrigate during grain fill if possible", "Withhold irrigation to hasten drying", "Harvest at hard grain stage (<20% moisture)"]
          }
        ]
      }
    },
    {
      cropName: "Maize",
      cropType: "Cereal",
      region: "Semi-arid Kenya",
      growthData: {
        stages: [
          {
            "stage": "00-09",
            "description": "Germination",
            "tasks": ["Land preparation", "Plant in well-prepared seedbed", "Apply basal DAP fertilizer"]
          },
          { 
            "stage": "10-19",
            "description": "Leaf development",
            "tasks": ["Weed control", "Thin plants to 20-30 cm spacing", "Ensure adequate moisture"]
          },
          {
            "stage": "30-39",
            "description": "Stem elongation",
            "tasks": ["Top-dress with nitrogen (CAN)", "Irrigate if necessary", "Monitor for pests and diseases"]
          },
          { 
            "stage": "50-69",
            "description": "Tasseling & silking",
            "tasks": ["Ensure adequate moisture", "Control pests", "Avoid nitrogen application"]
          },
          {
            "stage": "70-89",
            "description": "Grain filling & maturity",
            "tasks": ["Irrigate if necessary", "Monitor for pests", "Harvest at physiological maturity"]
          }
        ]
      }
    },
    {
      cropName: "Banana",
      cropType: "Fruit",
      region: "Tropical Kenya",
      growthData: {
        stages: [
          {
            "stage": "00-09",
            "description": "Planting",
            "tasks": ["Select healthy suckers", "Prepare planting holes", "Apply organic manure"]
          },
          {
            "stage": "10-19", 
            "description": "Vegetative growth",
            "tasks": ["Weed control", "Mulch to conserve moisture", "Apply nitrogen fertilizer"]
          },
          {
            "stage": "30-39",
            "description": "Flowering",
            "tasks": ["Support plants", "Control pests and diseases", "Ensure adequate moisture"] 
          },
          {
            "stage": "50-69",
            "description": "Fruit development",
            "tasks": ["Irrigate regularly", "Apply potassium fertilizer", "Protect fruits from pests"]
          },
          {
            "stage": "70-89",
            "description": "Harvesting",
            "tasks": ["Harvest when fruits are mature", "Handle fruits carefully", "Post-harvest treatment"]
          }
        ]
      }
    }
  ]
});

crop;
console.log('Crop data added:', crop);


}
main()  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

