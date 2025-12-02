const { PrismaClient } = require('../src/generated/prisma')

// We create a new instance. Because we load .env.test via the script (see step 2),
// this instance connects to your Neon TEST branch.
const prisma = new PrismaClient();

// Increase timeout for remote Neon DB connections (default is 5s, usually too short for cloud)
jest.setTimeout(30000); 

beforeAll(async () => {
  // Establish connection to the Neon Test Branch
  await prisma.$connect();
});

afterEach(async () => {
  // CLEANUP: Delete data after every test so the next test starts fresh.
  // We use a transaction to ensure atomicity.
  
  // ⚠️ UPDATE THIS LIST: Add your table names here in reverse order of dependency.
  // e.g., if 'Order' has 'User', delete 'Order' first.
  const deleteTransactions = [
    // prisma.orderItem.deleteMany(),
    // prisma.order.deleteMany(),
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

// Optional: Export prisma if you want to use this specific instance in your tests
module.exports = prisma;