const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0xZNmFFTXBJQzUrVHJQL3p6Z3BGZnlGekNhVTVicGhBRWVCKzlHcUwwTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibkZMTGdwSW9seFZ6dURNeXNlWHJPWlBJbm5uOWdnOStRNHd1NDRValhWTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhRzdhbzZ1K2dSWTdWWkU0b1lzNUpGRXFqYTk1enROeEZiZ1dZRS9nVDF3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrczJ6VGthQUlQOW9SM1VVeTJhNzN4b0RGMlY2TTZTSzhXaVBFKzdQR2hrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNLRW5XVlRPSXJNNUxkZC9ZR0tHblpMb3NmSG1xdERFYkFvbVppaTUwWEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxoTVpjSzlLajdxSjRpRE8vTWNDVTFYY3RpYWVVbkZreTduMWVJWVUzelE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUhKUlhkRWk0QithODA3SkN5Tms4Y1U1Qm9SUW1PVlE5MjFaZyt3Q25Xcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoialNlNEFIMklOYTl1ZzBiN0VBUFJ2VnZqb2JQWjh1cUZzSThRSFA1QzlYND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRmQ3cwQUFqcmUvTVJ3dnlFOTBYRTRzS3ZGOXI0MzVpdVc5amhIdzdhSE9vNFdtTWRISXF3bVdFeGsxZmNtVTZ2aWR1NVpjeHBYS1BCenRUbjh1VGlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODEsImFkdlNlY3JldEtleSI6IlJLelZkcW9mYUtCS2NqNFhBOFhtUEZGcHVFSytjZEwyWExOa0YrbGlDVWc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlZhU1A1TVBBUlJDdE1jQV9zbVo3WlEiLCJwaG9uZUlkIjoiN2U3YWQ5OGEtOWNmMS00ZjZkLWFhYjctMmNiMWIxZTFhMDAzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkgveHJjZWRnbnJMdXQ3YTQ1RS9UUkpkVkxhVT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4ci9ueGUxajhzYS9XMnF6WEdtVHhsYlhscmc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiR1RSODZWNEgiLCJtZSI6eyJpZCI6IjIzNDcwMzA2MjYwNDg6MzdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQzBkZSBCcjM0a2VyIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNON01nSTRFRUoyUWhzQUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJaNzZHZHNoNmNwdlpGYjEzSGtadjNQdVpCYmxlSFAxQjBGaVZ0OXYvdlFFPSIsImFjY291bnRTaWduYXR1cmUiOiJlaDN1TFVYdXkwcm1pbEtLVnpBV0VNb25OV2tudTNhbnNmanN2MDh6U3R2eStLTEtrcURwRllPSkNzeUI3dUMyMTQrUWNTMWh2bzYxNjI5VTArSEpEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoicjFONE0rY0paVDVsK0RCa2N5ZlRpOHBLTVlZNzhSOGNxT2I0WXFmaHdlNUFZTzAwNHZYeEVPYU9zdWZrWmVtclZpWlNiN1JHdjJIWUNCNzRDK2VHZ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDMwNjI2MDQ4OjM3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldlK2huYkllbktiMlJXOWR4NUdiOXo3bVFXNVhoejlRZEJZbGJmYi83MEIifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDQ5MzA4NTl9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "C0D3 BR34K3R",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2347030626048",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
