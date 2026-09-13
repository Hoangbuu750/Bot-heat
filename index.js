const http = require("http");
const Discord = require("discord.js-selfbot-v13");

// ================= [1. SERVER HTTP ĐỂ PING HEARTBEAT] =================
// Dùng cổng do môi trường cấp (hoặc mặc định 3000) để ping giữ bot online
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Heartbeat OK - Account is Online!");
}).listen(PORT, () => {
  console.log(`[Keep-Alive] Server lắng nghe tại port ${PORT}`);
});

// ================= [2. KHỞI TẠO DISCORD CLIENT] =================
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false,
});

client.on("ready", async () => {
  console.clear();
  console.log(`[Selfbot] Đã đăng nhập: ${client.user.tag}`);

  // Thiết lập trạng thái: status: "online" | "idle" | "dnd"
  // name: Tên game muốn hiển thị (ví dụ: "Minecraft", "Genshin Impact",...)
  client.user.setPresence({
    status: "online",
    activities: [
      {
        name: "Minecraft", // Tên game hiển thị "Đang chơi ..."
        type: "PLAYING",   // PLAYING, STREAMING, LISTENING, WATCHING, COMPETING
      },
    ],
  });

  console.log("[Status] Đã kích hoạt trạng thái Online & Đang chơi game.");
});

// Tự động kết nối lại nếu bị ngắt kết nối WebSocket
client.on("disconnect", () => {
  console.warn("[Warning] Mất kết nối Discord, đang thử kết nối lại...");
});

// ================= [3. ĐĂNG NHẬP BẰNG TOKEN] =================
const token = process.env.TOKEN || "DÁN_TOKEN_CỦA_BẠN_VÀO_ĐÂY";
client.login(token);
