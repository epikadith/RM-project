document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    const imageCanvas = document.getElementById('imageCanvas');
    const ctx = imageCanvas.getContext('2d');
    const timeTakenSpan = document.getElementById('timeTaken');

    let currentImage = null;

    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    currentImage = img;
                    drawImageOnCanvas(img);
                    applyFilterBtn.disabled = false;
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            currentImage = null;
            ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
            applyFilterBtn.disabled = true;
            timeTakenSpan.textContent = 'N/A';
        }
    });

    applyFilterBtn.addEventListener('click', () => {
        if (currentImage) {
            applyGrayscaleFilterJS(currentImage);
        }
    });

    function drawImageOnCanvas(img) {
        // Set canvas dimensions to match image
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        ctx.drawImage(img, 0, 0);
    }

    // --- Core JavaScript Grayscale Filter Logic ---
    function applyGrayscaleFilterJS(img) {
        drawImageOnCanvas(img); // Redraw original image first
        const imageData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
        const pixels = imageData.data; // This is a Uint8ClampedArray

        console.time('JS Filter Execution');
        const startTime = performance.now();

        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];     // Red
            const g = pixels[i + 1]; // Green
            const b = pixels[i + 2]; // Blue
            // const a = pixels[i + 3]; // Alpha - not changed for grayscale

            // Grayscale formula: Luminance method (average is simpler but less accurate)
            const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

            pixels[i] = gray;     // Set Red
            pixels[i + 1] = gray; // Set Green
            pixels[i + 2] = gray; // Set Blue
            // pixels[i + 3] remains alpha
        }

        const endTime = performance.now();
        console.timeEnd('JS Filter Execution');

        ctx.putImageData(imageData, 0, 0);
        timeTakenSpan.textContent = `${(endTime - startTime).toFixed(2)} ms`;
    }
});