// firebase.js
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "cln-mobile",
    private_key_id: "dc7382b5e0a192b7e5968c693dff65037122bb15",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDcao8vY78FSvuU\nR80TMpTeEIWOUB2tk59qELG4XWJOz/bQxkFvHCFP3u8/axx9BrrwntrikrNa1fSj\nFWdSZEwgv0rSsM6VKwc6p+IEORIoofF2qcTwMzyygFXAcYNnsI1BwtK4U4qwV/6l\nAaP0dW6GVIc8JJhemQqIu0YnQNM43GyOgaWR9cfKiWhc7ov9LJI9sFGi6koGn97Y\nG+8KYh9MJs2EhFl8gu4BI6anh5TOuFJoGX1wThkCjVBncU+3GnhQKVEnj7o85MjG\nnRMJeZWjAofEdAYPqY0efAZlY1sm0N+UWBlHNqae4ubKDoiy3OKc4Wv3PJLGiAp8\ndxtJ/wdrAgMBAAECggEAZVdJBgziYtia2w44J7912rPV9By5yHi7LtUGITIuZPYR\nEORWaXORjVt+vLXOn11czgz7rnispfMBS4onuyYKKnRJPp20Hblu1XUi4bYrtyre\nDiT4O0gTfC6tPpHyTNZL3BRrNfyTI4kRt2QNsfPcIT7z/p8Ev1m2Ei+ojZusgdNc\nH2E5o5IPxsFa9Qt5no61bquoLAQLoSnRGarN63T04V06YZ9XgbSTWLD3mdKuh5fy\niuQgzc5QzpF/irqZH5NflQo/hV9xrz5bITaL96ieSRtzIjQIpbCCsj/BYKEdcU2h\n/pKOndWr5diyZHRynUocxqyzKHlVel0B49aGEF0lwQKBgQD4YajPjAFe3Wp1PSEQ\n/BAAmmFXuZAqxwrcqLosdrpZUM70nsPzHc4CaCPKv6GirJfyc+XuLYa6A8bOJemh\n+dzeFEkYvkRcCyg1vPlUxyVs571RyfgR001pM00Dyt97GGCwCRYx+yLiTimbD+Q4\n1h5j/Nt61efR0hUUT9Fp0PAXIwKBgQDjLU+z5ZIZq0jfBPgBbVAwvQZlioBbWv6l\nG5qnB9sEoNOM62DT7MIhjZy5y+BNMMlS+2IeuVsTk+B0Wsu3KxJzQD6FSTBBwtAp\nsQeT3NBr3m3JFI6Njlper+3VGJLpldZqO3VyY7o9IcDN4BnfKD/9RqrQ1eq1KkIf\n7u3b0373GQKBgC876y1k85HFy4v2Dwa62JQ0x5Q2Lqtj5LXnxFfWUEPR8Tllw9/E\n6Dte8IeK/8L+zXqG/c/YiolvVGw5m395E76L3wa8kCVs3b2ybTvpDz3xp/gYz3sc\nUtlRrzCscOlozmJLqBPjLVQaByF82SrR1T+wg1CNwyMMr4OIVkuoNzA/AoGAKgs7\nwf6N0IRbwzKnN5Rkj/Cb23ULlly73hDCyYDxruSY4m65h988ens780LhK0gJKntt\nyGPjkDcBBme7ZhXpnzzXlVFbRgBpCB5EWcA3Lo+G3/0W+OnMndOPf63BmstpWFXS\nwa3lTOUPSsrb3uoTFavbdzTv8EF25XQRv2pgCBkCgYEA89cx+x0UoYHiNmy/waUi\n4AZaAR9H0wTli46g9zaI2BkYtaRVZu+njWSjhxmcvb2GrQQyGg07bH+EMdeny+p1\n7VmPdvujjzcJmsCYB+hEb5FdxK8/MLDzPQVqQJN4e2qrAieF7asaCTzLxddYFZuo\nSIc7ox4fSb8pvRMHXqzcgXg=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-fbsvc@cln-mobile.iam.gserviceaccount.com",
    client_id: "112093547266478332104",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40cln-mobile.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  }),
  storageBucket: "cln-mobile.firebasestorage.app",
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
