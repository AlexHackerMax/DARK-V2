const { zokou } = require("../framework/zokou");
const { format } = require("../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require("../set");

zokou({ 
    nomCom: "sc", 
    categorie: "General",
    reaction: "📂" 
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, mybotpic } = commandeOptions;
    
    const mode = s.MODE.toLowerCase() === "yes" ? "public" : "private";
    moment.tz.setDefault('Etc/GMT');
    const time = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    const repoInfo = `
*DARK-MD REPOSITORY*

🔗 *GitHub Link:*
https://github.com/darkdev-tech/DARK-V2

📢 *WhatsApp Channel:*
https://whatsapp.com/channel/...

🖥️ *System Info:*
- Time: ${time} (GMT)
- Date: ${date}
- RAM: ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
- Mode: ${mode}

👨‍💻 *Developers:*
- @254107065646 (xh_clinton)
- @254107065646 (Toxic-MD)
    `;

    try {
        const media = mybotpic();
        
        if (media.match(/\.(mp4|gif|jpeg|png|jpg)$/i)) {
            await zk.sendMessage(
                dest,
                { 
                    [media.match(/\.(mp4|gif)$/i) ? 'video' : 'image']: { url: media },
                    caption: repoInfo,
                    mentions: [
                        '254107065646@s.whatsapp.net',
                        '254107065646@s.whatsapp.net'
                    ]
                },
                { quoted: ms }
            );
        } else {
            await repondre(repoInfo);
        }
    } catch (error) {
        console.error("Error:", error);
        repondre("❌ Failed to load repository info");
    }
});