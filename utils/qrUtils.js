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
    logoHeight,
    qrShape,
    frameEnabled,
    frameStyle,
    frameColor,
    frameText,
    frameTextColor,
    framePosition,
    framePadding,
    frameFont,
    frameImage
  } = options;

  const normalizedValue = value.trim();
  if (!normalizedValue) {
    throw new Error('QR content is empty');
  }

  const qrValue = options.type === 'email' && !normalizedValue.toLowerCase().startsWith('mailto:')
    ? `mailto:${normalizedValue}`
    : normalizedValue;

  const qrInfo = QRCode.create(qrValue, { errorCorrectionLevel: errorCorrectionLevel || 'H' });
  const qrSize = qrInfo.modules.size;
  const baseSize = 1024;
  const cellSize = baseSize / qrSize;
  const qrCanvas = document.createElement('canvas');
  qrCanvas.width = baseSize;
  qrCanvas.height = baseSize;
  const context = qrCanvas.getContext('2d');

  context.fillStyle = bgColor;
  context.fillRect(0, 0, baseSize, baseSize);

  const drawRealQRCode = async () => {
    const qrBoxSize = qrShape === 'whatsapp'
      ? baseSize * 0.52
      : qrShape === 'instagram'
        ? baseSize * 0.62
        : qrShape === 'heart'
          ? baseSize * 0.50
          : qrShape === 'circle'
            ? baseSize * 0.64
            : baseSize * 0.72;
    const qrBoxX = (baseSize - qrBoxSize) / 2;
    const qrBoxY = qrShape === 'whatsapp'
      ? baseSize * 0.22
      : (baseSize - qrBoxSize) / 2;
    const moduleSize = qrBoxSize / qrSize;

    const coreCanvas = document.createElement('canvas');
    coreCanvas.width = Math.round(qrBoxSize);
    coreCanvas.height = Math.round(qrBoxSize);

    await new Promise((resolve, reject) => {
      QRCode.toCanvas(coreCanvas, qrValue, {
        errorCorrectionLevel: errorCorrectionLevel || 'H',
        width: Math.round(qrBoxSize),
        margin: 1,
        color: {
          dark: color,
          light: bgColor
        }
      }, (error) => error ? reject(error) : resolve());
    });

    context.drawImage(coreCanvas, qrBoxX, qrBoxY, qrBoxSize, qrBoxSize);

    if (qrShape === 'square') {
      return;
    }

    const shapePath = new Path2D();
    if (qrShape === 'circle') {
      shapePath.arc(baseSize / 2, baseSize / 2, baseSize / 2 - 28, 0, Math.PI * 2);
    } else if (qrShape === 'heart') {
      const cx = baseSize / 2;
      shapePath.moveTo(cx, 940);
      shapePath.bezierCurveTo(180, 760, 70, 600, 70, 400);
      shapePath.bezierCurveTo(70, 170, 300, 80, cx, 300);
      shapePath.bezierCurveTo(724, 80, 954, 170, 954, 400);
      shapePath.bezierCurveTo(954, 600, 844, 760, cx, 940);
      shapePath.closePath();
    } else if (qrShape === 'whatsapp') {
      shapePath.arc(500, 455, 425, 0, Math.PI * 2);
      shapePath.moveTo(75, 980);
      shapePath.lineTo(195, 680);
      shapePath.lineTo(415, 825);
      shapePath.closePath();
    } else if (qrShape === 'instagram') {
      shapePath.roundRect(80, 80, 864, 864, 145);
    } else {
      shapePath.rect(0, 0, baseSize, baseSize);
    }

    context.save();
    const realShape = shapePath;
    context.clip(realShape);

    if (qrShape === 'whatsapp') {
      context.fillStyle = color;
      context.beginPath();
      context.moveTo(75, 980);
      context.lineTo(195, 680);
      context.lineTo(415, 825);
      context.closePath();
      context.fill();
    }

    const extraModules = Math.ceil((baseSize - qrBoxSize) / (2 * moduleSize));
    const readPatternModule = (row, col) => {
      const sourceRow = ((row % qrSize) + qrSize) % qrSize;
      const sourceCol = ((col % qrSize) + qrSize) % qrSize;
      return qrInfo.modules.data[String(sourceRow * qrSize + sourceCol)] === 1;
    };

    for (let row = -extraModules; row < qrSize + extraModules; row++) {
      for (let col = -extraModules; col < qrSize + extraModules; col++) {
        const centerX = qrBoxX + (col + 0.5) * moduleSize;
        const centerY = qrBoxY + (row + 0.5) * moduleSize;
        const isInsideShape = context.isPointInPath(realShape, centerX, centerY);
        const isRealQRCell = row >= 0 && row < qrSize && col >= 0 && col < qrSize;

        if (!isInsideShape || isRealQRCell || !readPatternModule(row, col)) continue;

        context.fillStyle = color;
        context.fillRect(
          qrBoxX + col * moduleSize,
          qrBoxY + row * moduleSize,
          moduleSize,
          moduleSize
        );
      }
    }

    if (qrShape === 'whatsapp') {
      const iconColor = bgColor;
      context.save();
      context.strokeStyle = iconColor;
      context.lineWidth = 8;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.beginPath();
      context.arc(512, 470, 70, -2.35, 0.65);
      context.stroke();
      context.beginPath();
      context.moveTo(468, 520);
      context.lineTo(440, 555);
      context.lineTo(490, 538);
      context.stroke();
      context.restore();
    }

    if (qrShape === 'instagram') {
      const iconColor = bgColor;
      context.save();
      context.strokeStyle = iconColor;
      context.lineWidth = 8;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.beginPath();
      context.roundRect(390, 390, 244, 244, 58);
      context.stroke();
      context.lineWidth = 8;
      context.beginPath();
      context.arc(512, 512, 62, 0, Math.PI * 2);
      context.stroke();
      context.fillStyle = iconColor;
      context.beginPath();
      context.arc(610, 410, 10, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    context.restore();
  };

  await drawRealQRCode();

  let finalCanvas = qrCanvas;
  let qrOriginX = 0;
  let qrOriginY = 0;

  if (frameEnabled && frameStyle && frameStyle !== 'none') {
    const padding = Number(framePadding) || 60;
    const caption = (frameText || 'Scan Me').trim() || 'Scan Me';
    const textColor = frameTextColor || '#ffffff';
    const fillColor = frameColor || '#0f172a';
    const position = framePosition || 'bottom';
    const bannerHeight = frameImage ? 140 : 76;

    if (frameImage) {
      const customFrameImage = new Image();
      customFrameImage.src = frameImage;

      await new Promise((resolve) => {
        customFrameImage.onload = () => {
          const frameCanvas = document.createElement('canvas');
          const gap = Math.max(4, padding * 0.04);
          const frameHeight = Math.max(110, Math.round(baseSize * 0.18));
          frameCanvas.width = baseSize;
          frameCanvas.height = baseSize + frameHeight + gap * 2;
          const frameContext = frameCanvas.getContext('2d');
          frameContext.fillStyle = bgColor;
          frameContext.fillRect(0, 0, frameCanvas.width, frameCanvas.height);

          const imgHeight = frameHeight;
          const imgY = position === 'top' ? 0 : frameCanvas.height - imgHeight - gap;
          const qrY = position === 'top' ? imgHeight + gap : gap;

          frameContext.drawImage(customFrameImage, 0, imgY, frameCanvas.width, imgHeight);

          if (caption) {
            frameContext.fillStyle = textColor;
            frameContext.textAlign = 'center';
            frameContext.textBaseline = 'middle';
            frameContext.font = `700 ${Math.max(18, Math.round(frameHeight * 0.26))}px ${frameFont || 'Arial'}`;
            frameContext.fillText(caption, frameCanvas.width / 2, imgY + imgHeight / 2 + 2);
          }

          frameContext.drawImage(qrCanvas, 0, qrY);
          finalCanvas = frameCanvas;
          qrOriginX = 0;
          qrOriginY = qrY;
          resolve();
        };
      });
    } else if (position === 'top' || position === 'bottom') {
      const canvas = document.createElement('canvas');
      const verticalGap = Math.max(4, padding * 0.03);
      canvas.width = qrCanvas.width;
      canvas.height = qrCanvas.height + bannerHeight + verticalGap * 2;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const bannerY = position === 'top' ? 0 : canvas.height - bannerHeight - verticalGap;
      const qrY = position === 'top' ? bannerHeight + verticalGap : verticalGap;

      ctx.fillStyle = fillColor;
      if (frameStyle === 'rounded') {
        ctx.beginPath();
        ctx.roundRect(0, bannerY, canvas.width, bannerHeight, 24);
        ctx.fill();
      } else if (frameStyle === 'double') {
        ctx.beginPath();
        ctx.roundRect(0, bannerY, canvas.width, bannerHeight, 22);
        ctx.fill();
        ctx.fillStyle = bgColor;
        ctx.beginPath();
        ctx.roundRect(12, bannerY + 10, canvas.width - 24, bannerHeight - 20, 18);
        ctx.fill();
        ctx.fillStyle = fillColor;
      } else {
        ctx.fillRect(0, bannerY, canvas.width, bannerHeight);
      }

      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `700 ${Math.max(24, Math.round(qrCanvas.width / 26))}px ${frameFont || 'Arial'}`;
      ctx.fillText(caption, canvas.width / 2, bannerY + bannerHeight / 2);

      ctx.drawImage(qrCanvas, 0, qrY);
      finalCanvas = canvas;
      qrOriginX = 0;
      qrOriginY = qrY;
    } else {
      const frameCanvas = document.createElement('canvas');
      const border = Math.max(24, padding * 0.45);
      const captionHeight = 72;
      frameCanvas.width = qrCanvas.width + border * 2;
      frameCanvas.height = qrCanvas.height + border * 2 + captionHeight;
      const frameContext = frameCanvas.getContext('2d');

      frameContext.fillStyle = bgColor;
      frameContext.fillRect(0, 0, frameCanvas.width, frameCanvas.height);

      const frameBoxX = border * 0.35;
      const frameBoxY = border * 0.35;
      const frameBoxW = frameCanvas.width - border * 0.7;
      const frameBoxH = frameCanvas.height - border * 1.5 - captionHeight;

      frameContext.fillStyle = fillColor;
      if (frameStyle === 'rounded') {
        frameContext.beginPath();
        frameContext.roundRect(frameBoxX, frameBoxY, frameBoxW, frameBoxH, 60);
        frameContext.fill();
      } else if (frameStyle === 'double') {
        frameContext.beginPath();
        frameContext.roundRect(frameBoxX, frameBoxY, frameBoxW, frameBoxH, 64);
        frameContext.fill();

        frameContext.fillStyle = bgColor;
        frameContext.beginPath();
        frameContext.roundRect(frameBoxX + 20, frameBoxY + 20, frameBoxW - 40, frameBoxH - 40, 46);
        frameContext.fill();
        frameContext.fillStyle = fillColor;
      } else {
        frameContext.fillRect(frameBoxX, frameBoxY, frameBoxW, frameBoxH);
      }

      qrOriginX = border;
      qrOriginY = border;
      frameContext.drawImage(qrCanvas, qrOriginX, qrOriginY);

      const captionY = frameCanvas.height - captionHeight / 2;
      frameContext.fillStyle = fillColor;
      frameContext.fillRect(0, frameCanvas.height - captionHeight, frameCanvas.width, captionHeight);
      frameContext.fillStyle = textColor;
      frameContext.textAlign = 'center';
      frameContext.textBaseline = 'middle';
      frameContext.font = `700 ${Math.max(26, Math.round(frameCanvas.width / 18))}px ${frameFont || 'Arial'}`;
      frameContext.fillText(caption, frameCanvas.width / 2, captionY);

      finalCanvas = frameCanvas;
    }
  }

  if (!logo) {
    return finalCanvas.toDataURL('image/png');
  }

  const logoImage = new Image();
  logoImage.src = logo;

  return new Promise((resolve) => {
    logoImage.onload = () => {
      const x = qrOriginX + (qrCanvas.width - logoWidth * 2) / 2;
      const y = qrOriginY + (qrCanvas.height - logoHeight * 2) / 2;
      const w = logoWidth * 2;
      const h = logoHeight * 2;

      const logoContext = finalCanvas.getContext('2d');
      logoContext.fillStyle = bgColor;
      logoContext.beginPath();
      logoContext.roundRect(x - 10, y - 10, w + 20, h + 20, 20);
      logoContext.fill();

      logoContext.drawImage(logoImage, x, y, w, h);
      resolve(finalCanvas.toDataURL('image/png'));
    };
  });
}