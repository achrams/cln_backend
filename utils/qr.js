// generateQR.js
const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");
const { bucket } = require("../firebase.js");
const { v4: uuidv4 } = require("uuid");

const qrSize = 600;

const generateQRCodeWithLogo = async (token) => {
  try {
    // canvas fresh tiap call (penting, jangan global)
    const canvas = createCanvas(qrSize, qrSize);
    const ctx = canvas.getContext("2d");

    // generate QR
    await QRCode.toCanvas(canvas, token, {
      width: qrSize,
      errorCorrectionLevel: "H",
      margin: 1,
      scale: 4,
      color: {
        dark: "#ffffffff",
        light: "#040404",
      },
    });

    // load logo (pakai path absolute biar aman)
    const logo = await loadImage(require("path").join(__dirname, "cln.png"));

    const logoSize = qrSize / 4;

    ctx.drawImage(
      logo,
      qrSize / 2 - logoSize / 2,
      qrSize / 2 - logoSize / 2,
      logoSize,
      logoSize,
    );

    // buffer (tidak simpan ke disk)
    const buffer = canvas.toBuffer("image/png");

    // upload ke firebase
    const filename = `qr/${uuidv4()}.png`;
    const file = bucket.file(filename);

    const tokenDownload = uuidv4();

    await file.save(buffer, {
      metadata: {
        contentType: "image/png",
        firebaseStorageDownloadTokens: tokenDownload,
      },
    });

    // public URL
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filename)}?alt=media&token=${tokenDownload}`;

    return {
      status: 200,
      url,
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      message: "Failed generate QR",
    };
  }
};

module.exports = generateQRCodeWithLogo;
