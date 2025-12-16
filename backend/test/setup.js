const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient();

// Increase timeout for remote Neon DB connections (default is 5s, usually too short for cloud)
jest.setTimeout(30000); 

beforeAll(async () => {
  // Establish connection to the Neon Test Branch
  await prisma.$connect();
});

afterEach(async () => {
 
    
  const deleteTransactions = [
    prisma.notification.deleteMany(),
    prisma.task.deleteMany(),
    prisma.revenue.deleteMany(),
    prisma.expense.deleteMany(),
    prisma.cropCycle.deleteMany(),
    prisma.farm.deleteMany(),
    // prisma.crops.deleteMany(),
    prisma.user.deleteMany(),
  ];

  if (deleteTransactions.length > 0) {
    await prisma.$transaction(deleteTransactions);
  }
});

afterAll(async () => {
  // Close connection to free up resources on Neon
  await prisma.$disconnect();
});

module.exports = prisma;