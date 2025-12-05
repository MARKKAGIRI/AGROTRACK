const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient();

// Increase timeout for remote Neon DB connections (default is 5s, usually too short for cloud)
jest.setTimeout(30000); 

beforeAll(async () => {
  // Establish connection to the Neon Test Branch
  await prisma.$connect();
});

afterEach(async () => {
  // Delete data after every test so the next test starts fresh.
  // We use a transaction to ensure atomicity.
    
  const deleteTransactions = [
    prisma.cropCycle.deleteMany(),
    prisma.farm.deleteMany(),
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