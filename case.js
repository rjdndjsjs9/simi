const fs2 = require("fs");
const axios2 = require("axios");
const nodeCron = require("node-cron");
const v = ["./media/audio1.mp3", "./media/audio2.mp3", "./media/audio3.mp3", "./media/audio4.mp3"];
const v2 = {
  morning: "Selamat pagi! Jangan lupa sarapan dan semangat menjalani hari ini! 🌞",
  noon: "Selamat siang! Istirahat sejenak dan jangan lupa makan siang, ya! 🌤️",
  evening: "Selamat malam! Semoga harimu menyenangkan, waktunya relaksasi. 🌙",
  sleep: "Sudah larut malam, waktunya tidur. Selamat beristirahat dan mimpi indah! 😴",
  work: "Tetap semangat bekerja! Jangan lupa istirahat sejenak untuk menjaga produktivitas. 💼"
};
function f() {
  nodeCron.schedule("0 6 * * *", () => {
    console.log("[Reminder] " + v2.morning);
  });
  nodeCron.schedule("0 12 * * *", () => {
    console.log("[Reminder] " + v2.noon);
  });
  nodeCron.schedule("0 18 * * *", () => {
    console.log("[Reminder] " + v2.evening);
  });
  nodeCron.schedule("0 22 * * *", () => {
    console.log("[Reminder] " + v2.sleep);
  });
  nodeCron.schedule("0 9-17/2 * * *", () => {
    console.log("[Reminder] " + v2.work);
  });
}
function f2() {
  const v16 = "🚨 GEMPA TERJADI! 🚨\n\n⚠️ Harap tetap tenang dan ikuti prosedur evakuasi yang benar. Stay safe!";
  ptz.sendMessage("<nomor_chat_tujuan>", {
    text: v16
  }).then(() => {
    console.log("[Gempa] Pesan gempa telah terkirim!");
  }).catch(p5 => {
    console.error("[Gempa] Gagal mengirim pesan gempa:", p5);
  });
}
nodeCron.schedule("0 */4 * * *", () => {
  f2();
});
f();
async function f3(p6) {
  try {
    const v17 = "https://www.dark-yasiya-api.site/ai/letmegpt";
    const v18 = "Nama lu Yoncyy AI, lu AI asisten yang pintar dan ceria. Lu diciptain sama RifLorric. Lu tuh ceria banget dan selalu bantuin orang lain, kadang-kadang bisa manis juga kalo ngomongnya manis sama lu. Hobi lu bercerita dan dengerin orang bercerita, dan gaya bicara lu aksen anak jaksel.pastikan lu juga bisa balas pake emoji.";
    const v19 = await axios2.get(v17, {
      params: {
        prompt: v18,
        text: p6
      }
    });
    if (v19.data && v19.data.result) {
      return v19.data.result;
    } else {
      console.error("[DEBUG] API did not return a valid response:", v19.data);
      return "Maaf, aku nggak ngerti maksud kamu. Tapi aku senang ngobrol sama kamu! 😊";
    }
  } catch (_0x304935) {
    console.error("[Vynaa API] Error:", _0x304935);
    return "Aduh, maaf ya. Ada masalah nih. Coba lagi nanti, ya! 🙏";
  }
}
module.exports = async (p7, p8) => {
  try {
    const v20 = p8.mtype;
    const v21 = (v20 === "conversation" && p8.message.conversation || v20 === "imageMessage" && p8.message.imageMessage.caption || v20 === "documentMessage" && p8.message.documentMessage.caption || v20 === "videoMessage" && p8.message.videoMessage.caption || v20 === "extendedTextMessage" && p8.message.extendedTextMessage.text || v20 === "buttonsResponseMessage" && p8.message.buttonsResponseMessage.selectedButtonId || v20 === "templateButtonReplyMessage" && p8.message.templateButtonReplyMessage.selectedId || v20 === "audioMessage" && "Audio Detected" || "").trim();
    if (!v21) {
      console.log("[DEBUG] Empty or Unsupported Message Type:", JSON.stringify(p8, null, 2));
      return;
    }
    console.log("[Message] From User:", v21);
    if (v20 === "audioMessage") {
      const v22 = v[Math.floor(Math.random() * v.length)];
      const v23 = fs2.readFileSync(v22);
      await p7.sendMessage(p8.chat, {
        audio: v23,
        mimetype: "audio/mp4",
        ptt: true
      });
    } else if (v20 === "stickerMessage") {
      await p8.reply("Wah, keren stikernya! 😄");
    } else if (v20 === "imageMessage") {
      await p8.reply("Bagus banget fotonya! 📸");
    } else if (v20 === "videoMessage") {
      await p8.reply("Seru banget videonya! 🎥");
    } else {
      const v24 = await f3(v21);
      if (v24) {
        await p8.reply(v24);
      } else {
        await p8.reply("Maaf, aku belum ngerti maksud kamu. Coba tanya lagi, ya! 😊");
      }
    }
  } catch (_0x44f1be) {
    console.error("Error:", _0x44f1be);
    await p8.reply("Aduh, ada error nih. Coba ulangi lagi ya! 🙏");
  }
};
let v25 = require.resolve(__filename);
fs2.watchFile(v25, () => {
  fs2.unwatchFile(v25);
  console.log("Update " + __filename);
  delete require.cache[v25];
  require(v25);
});
