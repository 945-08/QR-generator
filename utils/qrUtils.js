/**
 * Utility to generate QR Code with optional logo overlay
 * @param {Object} options - QR Configuration options
 * @returns {Promise<string>} Data URL of the final image
 */
async function generateQRCodeUrl(options) {
  const {
    value,
    color,
    bgColor,
    margin,
    errorCorrectionLevel,
    logo,
    logoWidth,
    logoHeight
  } = options;

  // 1. Generate Base QR Code
  const qrCanvas = document.createElement('canvas');
  await QRCode.toCanvas(qrCanvas, value, {
    width: 1024,
    margin: margin,
    color: {
      dark: color,
      light: bgColor
    },
    errorCorrectionLevel: errorCorrectionLevel
  });

  if (!logo) {
    return qrCanvas.toDataURL('image/png');
  }

  // 2. Add Logo if exists
  const context = qrCanvas.getContext('2d');
  const logoImage = new Image();
  logoImage.src = logo;

  return new Promise((resolve) => {
    logoImage.onload = () => {
      const x = (qrCanvas.width - logoWidth * 2) / 2;
      const y = (qrCanvas.height - logoHeight * 2) / 2;
      const w = logoWidth * 2;
      const h = logoHeight * 2;

      // Draw background for logo to make it stand out
      context.fillStyle = bgColor;
      context.beginPath();
      context.roundRect(x - 10, y - 10, w + 20, h + 20, 20);
      context.fill();

      // Draw logo
      context.drawImage(logoImage, x, y, w, h);
      resolve(qrCanvas.toDataURL('image/png'));
    };
  });
}