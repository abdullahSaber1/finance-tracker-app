import {SQLiteDatabase} from "react-native-sqlite-storage";
import {Transaction} from "../types";

export const addTransaction = async ({
  db,
  transaction,
}: {
  db: SQLiteDatabase;
  transaction: Transaction;
}) => {
  const insertQuery = `
     INSERT INTO Transactions (type, category, amount, description, date)
     VALUES (?, ?, ?, ?, ?) 
     
   `;
  const values = [
    transaction.type,
    transaction.category,
    transaction.amount,
    transaction.description,
    transaction.date,
  ];
  try {
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw Error("Failed to add transaction");
  }
};

export const getTransactions = async (
  db: SQLiteDatabase,
): Promise<Transaction[]> => {
  try {
    const transactions: Transaction[] = [];
    const results = await db.executeSql("SELECT * FROM Transactions");
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        transactions.push(result.rows.item(index));
      }
    });
    return transactions;
  } catch (error) {
    console.error(error);
    throw Error("Failed to get transactions from database");
  }
};
