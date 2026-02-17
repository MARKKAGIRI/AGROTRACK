import * as SQLite from "expo-sqlite";
import axios from "axios";
import { API_URL } from "@env";

let dbInstance = null;

const getDB = () => {
  if (!dbInstance) {
    dbInstance = SQLite.openDatabaseSync("agrotrack_v2.db");
  }
  return dbInstance;
};

// 2. Initialize Tables
export const initDB = () => {
  try {
    const db = getDB();
    // execSync is safer here
    db.execSync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT,
        lastMessage TEXT,
        timestamp INTEGER,
        unread INTEGER DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY NOT NULL,
        sessionId TEXT,
        text TEXT,
        sender TEXT,
        image TEXT,
        timestamp INTEGER,
        FOREIGN KEY (sessionId) REFERENCES sessions (id)
      );
    `);
  } catch (error) {
    console.error("SQLite Init Failed:", error);
  }
};

// 3. Create Session
export const createSession = async (sessionId, firstMessageText) => {
  try {
    const title =
      firstMessageText.length > 30
        ? firstMessageText.substring(0, 30) + "..."
        : firstMessageText;
    const db = getDB();
    // runSync is instant and robust
    db.runSync(
      "INSERT INTO sessions (id, title, lastMessage, timestamp) VALUES (?, ?, ?, ?)",
      [sessionId, title, firstMessageText, Date.now()],
    );
  } catch (error) {
    console.error("Create Session Error:", error);
  }
};

// 4. Get All Sessions
export const getSessions = async () => {
  try {
    const db = getDB();
    // getAllSync returns the array directly
    return db.getAllSync("SELECT * FROM sessions ORDER BY timestamp DESC");
  } catch (error) {
    console.error("Get Sessions Error:", error);
    return [];
  }
};

// 5. Add Message
export const addMessageToDB = async (message, sessionId) => {
  try {
    const db = getDB();
    // Insert Message
    db.runSync(
      "INSERT INTO messages (id, sessionId, text, sender, image, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
      [
        message.id,
        sessionId,
        message.text,
        message.sender,
        message.image || null,
        Date.now(),
      ],
    );

    // Update Session's last message
    db.runSync(
      "UPDATE sessions SET lastMessage = ?, timestamp = ? WHERE id = ?",
      [message.text, Date.now(), sessionId],
    );
  } catch (error) {
    console.error("Add Message Error:", error);
  }
};

// 6. Get Messages for a Session
export const getMessagesForSession = async (sessionId) => {
  try {
    const db = getDB();
    return db.getAllSync(
      "SELECT * FROM messages WHERE sessionId = ? ORDER BY timestamp ASC",
      [sessionId],
    );
  } catch (error) {
    console.error("Get Messages Error:", error);
    return [];
  }
};

export const syncMessagesForSession = async (sessionId, token) => {
  try {
    const response = await axios.get(`${API_URL}/sessions/${sessionId}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const serverMessages = response.data;

    if (serverMessages && serverMessages.length > 0) {
      const db = getDB();

      db.withTransactionSync(() => {
        serverMessages.forEach((msg) => {
          db.runSync(
            `INSERT OR REPLACE INTO messages (id, sessionId, text, sender, image, timestamp) VALUES (?, ?, ?, ?, ?, ?)`,
            [
              msg.id,
              sessionId,
              msg.text,
              msg.sender, // 'user' or 'bot'
              msg.image || null,
              new Date(msg.timestamp).getTime(),
            ],
          );
        });
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Sync Messages Failed:", error);
    return false;
  }
};


export const syncSessionsWithServer = async (userId, token) => {
  try {
    const url = `${API_URL}/sessions/${userId}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const serverSessions = response.data;

    if (!Array.isArray(serverSessions)) {
      console.error("API Error: Expected array of sessions", serverSessions);
      return false;
    }

    if (serverSessions.length > 0) {
      const db = getDB();

      db.withTransactionSync(() => {
        serverSessions.forEach(session => {
          const timeValue = new Date(session.timestamp).getTime();

          db.runSync(
            `INSERT OR REPLACE INTO sessions (id, title, lastMessage, timestamp) VALUES (?, ?, ?, ?)`,
            [
              session.id.toString(), 
              session.title || "New Chat", 
              session.lastMessage || "", 
              timeValue
            ]
          );
        });
      });
      return true;
    } else {
      return true;
    }

  } catch (error) {
    console.error("[SESSION SYNC FAILED]:", error.message);
    return false;
  }
};
