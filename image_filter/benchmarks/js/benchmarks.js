// ============================================
// 4. GENERALIZED & REAL-WORLD BENCHMARKS
// ============================================

// --- 1. HELPER: DATA GENERATION ---

function generateMatrix(n) {
    const data = new Float64Array(n * n);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 100;
    return data;
}

function generateRandomArray(size) {
    const data = new Int32Array(size);
    for (let i = 0; i < size; i++) data[i] = Math.floor(Math.random() * 100000);
    return data;
}

function generatePoints(count) {
    const data = new Float64Array(count * 2);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 1000;
    return data;
}

async function fetchRealImage(width, height) {
    // Use random seed to ensure same image across runs if needed, 
    // but for now random is fine as we generate new inputs per suite run.
    const url = `https://picsum.photos/${width}/${height}`;
    console.log(`Downloading image from: ${url}...`);
    
    const img = new Image();
    img.crossOrigin = "Anonymous"; 
    img.src = url;
    
    return new Promise((resolve, reject) => {
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(ctx.getImageData(0, 0, width, height));
        };
        img.onerror = reject;
    });
}

// --- 2. JS IMPLEMENTATIONS (Optimized for Fairness) ---

function jsMultiplyMatrix(a, b, n) {
    const res = new Float64Array(n * n);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let sum = 0.0;
            for (let k = 0; k < n; k++) sum += a[i*n+k] * b[k*n+j];
            res[i*n+j] = sum;
        }
    }
    return res;
}

// UPDATED: Works with TypedArrays (Int32Array) to match Wasm's raw memory model
function jsMergeSort(arr) {
    // If input is a TypedArray, we need to handle slicing carefully to avoid 
    // converting to standard Arrays which would be unfair (slow).
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = jsMergeSort(arr.slice(0, mid));
    const right = jsMergeSort(arr.slice(mid));

    return mergeInt32(left, right);
}

function mergeInt32(left, right) {
    let i = 0, j = 0, k = 0;
    const result = new Int32Array(left.length + right.length);

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result[k++] = left[i++];
        } else {
            result[k++] = right[j++];
        }
    }
    while (i < left.length) result[k++] = left[i++];
    while (j < right.length) result[k++] = right[j++];
    
    return result;
}

function jsKMeans(points, k, iterations) {
    const n = points.length / 2;
    let centroids = points.slice(0, k * 2); 
    
    for (let iter = 0; iter < iterations; iter++) {
        let sums = new Float64Array(k * 2);
        let counts = new Int32Array(k);
        
        for (let i = 0; i < n; i++) {
            let px = points[2*i], py = points[2*i+1];
            let minDist = Infinity, bestC = 0;
            
            for (let c = 0; c < k; c++) {
                let dist = (px - centroids[2*c])**2 + (py - centroids[2*c+1])**2;
                if (dist < minDist) { minDist = dist; bestC = c; }
            }
            sums[2*bestC] += px; sums[2*bestC+1] += py;
            counts[bestC]++;
        }
        for (let c = 0; c < k; c++) {
            if (counts[c] > 0) {
                centroids[2*c] = sums[2*c] / counts[c];
                centroids[2*c+1] = sums[2*c+1] / counts[c];
            }
        }
    }
    return centroids;
}

function jsGrayscale(rawBytes) {
    const jsResult = new Uint8ClampedArray(rawBytes);
    for(let i=0; i<jsResult.length; i+=4) {
            let g = 0.299*jsResult[i] + 0.587*jsResult[i+1] + 0.114*jsResult[i+2];
            jsResult[i]=g; jsResult[i+1]=g; jsResult[i+2]=g;
    }
    return jsResult;
}

// --- EXPORTS ---
if (typeof window !== 'undefined') {
    window.generateMatrix = generateMatrix;
    window.generateRandomArray = generateRandomArray;
    window.generatePoints = generatePoints;
    window.fetchRealImage = fetchRealImage;
    
    window.jsMultiplyMatrix = jsMultiplyMatrix;
    window.jsMergeSort = jsMergeSort;
    window.jsKMeans = jsKMeans;
    window.jsGrayscale = jsGrayscale;
}