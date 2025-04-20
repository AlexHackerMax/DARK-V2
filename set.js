const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVBmeUNMcVRSTm9kU1I5K0F1SzU1alRVYXcrRFJPTjl4Um8yMmdxTTAwcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaTBrdStOWXM0Ky93aFcvSytZRzRtNWxVNjBlcEJWcFE3OVRudklPb0ZIcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBUHo4cTVHT1h4M2RQdFQ0TDdRU24wTTViM0J3TGEreW9DNjBtU3ZVQm1FPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1MmNDcVNkbWFYSWkyamRRMVpybERnSGNkV1lsNE1sR3dPQUdYWEFsK2k0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldDRmR3R3I5dzA4ajVRUVJzKzVwYTNmYk9XOG93WjJ3aEpvWGpwNTVMRlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhINnJJUmlXcFVoQnMyYXZCa3BTdUE3SHNhci9JUmpLVkhybGt6eGNoMTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUZma3pLbURTd0FOb1o1THdHTXpMNlhLZFY2U0FSTnV5T2k0ZFdiVmUzOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiand1LzlHOG4ydmg0UitJRmlMSTRUZ1JzNGtseWM0dFdiR2MvY0FNRU5nVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IiswYzhsMW9JVHB1ejNSNis2U0FuSjNOTzZLK0xGMlRJajdCL2ZPM3JvN2R4aUNhVldwVnMxRGc2aDU3OEZvOTVwMHpjMjNUMnBialRodXVxUWk1cGdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI4LCJhZHZTZWNyZXRLZXkiOiIwemVWdDNWOVlQVjl4Y1ZTdzErWnp5em1VNDJPMGpnVzY1Rm1DeGRNWnNNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJoQ1diUm1jRlNsMmNTN285TzVfMUhnIiwicGhvbmVJZCI6IjNjYjIzMTg3LTkzNzQtNDQ0ZC1hZDBkLTFmMGE1MGYzZmM2YyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvcDhQbzNuWVY0RFl2YUt5cE1TellDRXBFbU09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieGJsMy80c2lhbXJ3MmlGVlhTaUdDY2JqdjlRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjdCWjk0NzJDIiwibWUiOnsiaWQiOiIyMzQ3MDMwNjI2MDQ4OjM5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkMwZGUgQnIzNGtlciJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT0RNZ0k0RUVNQ3hrc0FHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWjc2R2RzaDZjcHZaRmIxM0hrWnYzUHVaQmJsZUhQMUIwRmlWdDl2L3ZRRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoibHVIamFaRVptczM5SUYxRzUwL08wbDRNVW8zemtWaGh1bWJxWXFnRE4ycnpaUUdOaFVnaHMwZHIrek94bWJyMGJZSlJvU1J3bzIxWjNxajA4OVU3RGc9PSIsImRldmljZVNpZ25hdHVyZSI6IkxBcHRnYllYRDRqRGhqZVk5MENDT2lmcEI3Sjh2RER2UXN6MDU3dEg0SCtCYmFRQkV4Vko2L2RXNVBUUEY0SGxtZ3pHclVlODYwUHZDTklVaDBQVWpBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0NzAzMDYyNjA0ODozOUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXZStobmJJZW5LYjJSVzlkeDVHYjl6N21RVzVYaHo5UWRCWWxiZmIvNzBCIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1MTMxNzI3fQ==',
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
