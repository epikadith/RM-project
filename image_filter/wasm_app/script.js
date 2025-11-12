import init, { grayscale } from './pkg/image_filter_wasm.js'; // Import WASM functions

document.addEventListener('DOMContentLoaded', async () => {
    const imageInput = document.getElementById('imageInput');
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    const imageCanvas = document.getElementById('imageCanvas');
    const ctx = imageCanvas.getContext('2d');
    const timeTakenSpan = document.getElementById('timeTaken');

    let currentImage = null;

    // Initialize WASM module
    try {
        await init();
        console.log('WASM module initialized successfully.');
    } catch (e) {
        console.error('Error initializing WASM module:', e);
        alert('Failed to load WebAssembly module. Check console for details.');
        return; // Stop if WASM fails to load
    }

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
            applyGrayscaleFilterWASM(currentImage);
        }
    });

    function drawImageOnCanvas(img) {
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        ctx.drawImage(img, 0, 0);
    }

    // --- Core WebAssembly Grayscale Filter Logic ---
    function applyGrayscaleFilterWASM(img) {
        drawImageOnCanvas(img); // Redraw original image first
        const imageData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
        let pixels = new Uint8Array(imageData.data); // Copy to a new Uint8Array for WASM

        console.time('WASM Filter Execution');
        const startTime = performance.now();

        // Call the Rust WASM function
        // Note: wasm-bindgen handles the memory transfer for Vec<u8> automatically.
        // It copies the JS Uint8Array to WASM memory, runs the function,
        // and then copies the resulting Vec<u8> back to JS as a new Uint8Array.
        pixels = grayscale(pixels);

        const endTime = performance.now();
        console.timeEnd('WASM Filter Execution');

        // Put the modified pixels back to the canvas
        imageData.data.set(pixels); // Use .set() to efficiently copy back
        ctx.putImageData(imageData, 0, 0);
        timeTakenSpan.textContent = `${(endTime - startTime).toFixed(2)} ms`;
    }
});