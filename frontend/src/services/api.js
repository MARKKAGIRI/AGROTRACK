let mockDatabase = [
//   {
//     id: "1",
//     type: "Expense",
//     amount: 1200,
//     category: "Seeds",
//     note: "Maize seeds",
//     date: new Date().toISOString(),
//     season: "Long Rains 2026",
//   },
];

export const api = {
  // GET: Simulate fetching data from a server
  getTransactions: async () => {
    console.log("Fetching from mock DB...");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockDatabase]);
      }, 800); // 0.8 second delay
    });
  },

  // POST: Simulate saving data to a server
  addTransaction: async (newTransaction) => {
    console.log("Saving to mock DB...", newTransaction);
    return new Promise((resolve) => {
      setTimeout(() => {
        mockDatabase = [newTransaction, ...mockDatabase];
        resolve(newTransaction);
      }, 800);
    });
  },
};