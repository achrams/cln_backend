// generateQR.js
const QRCode = require("qrcode");
const { bucket } = require("../firebase.js");
const { v4: uuidv4 } = require("uuid");

const generateQRCode = async (token) => {
  try {
    // 🔥 generate QR jadi buffer langsung (tanpa canvas)
    const buffer = await QRCode.toBuffer(token, {
      width: 600,
      errorCorrectionLevel: "H",
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });

    const filename = `qr/${uuidv4()}.png`;
    const file = bucket.file(filename);

    const tokenDownload = uuidv4();

    // upload ke firebase
    await file.save(buffer, {
      metadata: {
        contentType: "image/png",
        firebaseStorageDownloadTokens: tokenDownload,
      },
    });

    // public URL
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
      filename,
    )}?alt=media&token=${tokenDownload}`;

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

module.exports = generateQRCode;
