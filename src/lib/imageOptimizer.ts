/**
 * Client-side Image to WebP Converter & Compressor
 * Automatically converts heavy JPG, PNG, and camera photos to high-efficiency WebP.
 * - Downscales ultra-large camera resolutions (e.g. 8000x6000) to max 1920px (preserving aspect ratio)
 * - Compresses using HTML5 Canvas to WebP format with high visual fidelity (quality: 0.82)
 * - Typically achieves 80% to 95% file size reduction
 */
export async function convertToWebP(
  file: File,
  options: { maxDim?: number; quality?: number } = {}
): Promise<File> {
  const { maxDim = 1920, quality = 0.82 } = options;

  // If already WebP and reasonably sized (under 250KB), no need to re-encode
  if (file.type === 'image/webp' && file.size <= 250 * 1024) {
    return file;
  }

  // Ensure browser supports Canvas and FileReader
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Downscale large dimensions while preserving aspect ratio
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }

        // High quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Try converting to WebP
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }

            // Create WebP file name (e.g. "photo.jpg" -> "photo.webp")
            const baseName = file.name.replace(/\.[^.]+$/, '');
            const webpFileName = `${baseName}.webp`;

            const webpFile = new File([blob], webpFileName, {
              type: 'image/webp',
              lastModified: Date.now(),
            });

            console.log(
              `[ImageOptimizer] "${file.name}" (${(file.size / 1024).toFixed(1)} KB) ➔ "${webpFileName}" (${(webpFile.size / 1024).toFixed(1)} KB) [${((1 - webpFile.size / file.size) * 100).toFixed(0)}% saved]`
            );

            resolve(webpFile);
          },
          'image/webp',
          quality
        );
      };

      img.onerror = () => resolve(file);
      img.src = e.target?.result as string;
    };

    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}
