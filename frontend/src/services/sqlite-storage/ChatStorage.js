import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabaseSync('agrotrack_v2.db');

// 2. Initialize Tables
export const initDB = () => {
  try {
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
    console.log('SQLite Initialized Successfully');
  } catch (error) {
    console.error('SQLite Init Failed:', error);
  }
};

// 3. Create Session
export const createSession = async (sessionId, firstMessageText) => {
  try {
    const title = firstMessageText.length > 30 ? firstMessageText.substring(0, 30) + '...' : firstMessageText;
    
    // runSync is instant and robust
    db.runSync(
      'INSERT INTO sessions (id, title, lastMessage, timestamp) VALUES (?, ?, ?, ?)',
      [sessionId, title, firstMessageText, Date.now()]
    );
  } catch (error) {
    console.error('Create Session Error:', error);
  }
};

// 4. Get All Sessions
export const getSessions = async () => {
  try {
    // getAllSync returns the array directly
    return db.getAllSync('SELECT * FROM sessions ORDER BY timestamp DESC');
  } catch (error) {
    console.error('Get Sessions Error:', error);
    return [];
  }
};

// 5. Add Message
export const addMessageToDB = async (message, sessionId) => {
  try {
    // Insert Message
    db.runSync(
      'INSERT INTO messages (id, sessionId, text, sender, image, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
      [message.id, sessionId, message.text, message.sender, message.image || null, Date.now()]
    );

    // Update Session's last message
    db.runSync(
      'UPDATE sessions SET lastMessage = ?, timestamp = ? WHERE id = ?',
      [message.text, Date.now(), sessionId]
    );
  } catch (error) {
    console.error('Add Message Error:', error);
  }
};

// 6. Get Messages for a Session
export const getMessagesForSession = async (sessionId) => {
  try {
    return db.getAllSync(
      'SELECT * FROM messages WHERE sessionId = ? ORDER BY timestamp ASC',
      [sessionId]
    );
  } catch (error) {
    console.error('Get Messages Error:', error);
    return [];
  }
};