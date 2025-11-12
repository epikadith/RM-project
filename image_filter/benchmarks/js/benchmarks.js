/**
 * JavaScript Performance Benchmarks
 * Tests for: Complex Math, Raw Speed, Heavy Algorithms
 */

// Utility function to measure execution time
function measureTime(fn, label = '') {
    const startTime = performance.now();
    const result = fn();
    const endTime = performance.now();
    const duration = endTime - startTime;
    return { result, duration, label };
}

// ============================================
// 1. COMPLEX MATH BENCHMARKS
// ============================================

/**
 * Mandelbrot Set Calculation
 * Complex mathematical computation with many floating-point operations
 */
function mandelbrotJS(width, height, maxIterations = 100) {
    const result = new Uint8ClampedArray(width * height);
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cr = (x / width) * 3.5 - 2.5;
            const ci = (y / height) * 2.0 - 1.0;
            
            let zr = 0, zi = 0;
            let iterations = 0;
            
            while (iterations < maxIterations && zr * zr + zi * zi < 4) {
                const temp = zr * zr - zi * zi + cr;
                zi = 2 * zr * zi + ci;
                zr = temp;
                iterations++;
            }
            
            result[y * width + x] = (iterations / maxIterations) * 255;
        }
    }
    
    return result;
}

/**
 * Matrix Multiplication - Heavy floating-point computation
 */
function matrixMultiplicationJS(size) {
    const a = new Float32Array(size * size);
    const b = new Float32Array(size * size);
    const c = new Float32Array(size * size);
    
    // Initialize matrices with random values
    for (let i = 0; i < size * size; i++) {
        a[i] = Math.random();
        b[i] = Math.random();
    }
    
    // Perform multiplication
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let sum = 0;
            for (let k = 0; k < size; k++) {
                sum += a[i * size + k] * b[k * size + j];
            }
            c[i * size + j] = sum;
        }
    }
    
    return c;
}

/**
 * FFT Simulation - Complex number operations
 */
function fftSimulationJS(size) {
    const real = new Float32Array(size);
    const imag = new Float32Array(size);
    
    // Initialize with random data
    for (let i = 0; i < size; i++) {
        real[i] = Math.random();
    }
    
    // Simplified FFT-like processing
    for (let stage = 1; stage < size; stage *= 2) {
        for (let i = 0; i < size; i += stage * 2) {
            for (let j = 0; j < stage; j++) {
                const angle = (-2 * Math.PI * j) / (stage * 2);
                const cos_val = Math.cos(angle);
                const sin_val = Math.sin(angle);
                
                const idx1 = i + j;
                const idx2 = i + j + stage;
                
                const t_real = real[idx2] * cos_val - imag[idx2] * sin_val;
                const t_imag = real[idx2] * sin_val + imag[idx2] * cos_val;
                
                real[idx2] = real[idx1] - t_real;
                imag[idx2] = imag[idx1] - t_imag;
                real[idx1] += t_real;
                imag[idx1] += t_imag;
            }
        }
    }
    
    return { real, imag };
}

// ============================================
// 2. RAW SPEED BENCHMARKS
// ============================================

/**
 * Array Sorting - Tests basic algorithmic speed
 */
function arraySortingJS(size) {
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = Math.random();
    }
    return arr.sort((a, b) => a - b);
}

/**
 * Array Iteration and Arithmetic
 */
function arrayIterationJS(size) {
    const arr = new Float32Array(size);
    
    for (let i = 0; i < size; i++) {
        arr[i] = Math.random();
    }
    
    let sum = 0;
    for (let i = 0; i < size; i++) {
        sum += arr[i] * 1.5 + Math.sqrt(arr[i]);
    }
    
    return sum;
}

/**
 * Memory Operations - Reading and writing large blocks
 */
function memoryOperationsJS(size) {
    const buffer = new Uint8Array(size);
    
    // Fill with pattern
    for (let i = 0; i < size; i++) {
        buffer[i] = (i % 256);
    }
    
    // Read and process
    let checksum = 0;
    for (let i = 0; i < size; i++) {
        checksum = ((checksum + buffer[i]) % 65536);
    }
    
    return checksum;
}

/**
 * Vector Operations - SIMD-like operations on vectors
 */
function vectorOperationsJS(size) {
    const data = new Float32Array(size);
    
    for (let i = 0; i < size; i++) {
        data[i] = ((i % 100) / 100);
    }
    
    let result = 0;
    for (let i = 0; i < size; i += 4) {
        for (let j = 0; j < 4 && i + j < size; j++) {
            const val = data[i + j];
            result += val * val + Math.sin(val);
        }
    }
    
    return result;
}

/**
 * Data Processing - Sorting, filtering, and mapping operations
 */
function dataProcessingJS(iterations) {
    let data = new Uint32Array(1000);
    
    // Fill with pattern
    for (let i = 0; i < 1000; i++) {
        data[i] = ((i * 7) % 1000);
    }
    
    for (let iter = 0; iter < iterations; iter++) {
        // Convert to regular array for sorting
        data = new Uint32Array([...data].sort((a, b) => a - b));
        
        // Perform filtering and mapping
        const filtered = Array.from(data)
            .filter(x => x % 2 === 0)
            .map(x => (x * x) % 1000);
        
        // Copy back to data
        for (let i = 0; i < Math.min(filtered.length, data.length); i++) {
            data[i] = filtered[i];
        }
    }
    
    return data.length;
}

// ============================================
// 3. HEAVY ALGORITHMS BENCHMARKS
// ============================================

/**
 * Prime Number Generation - Sieve of Eratosthenes
 */
function primeGenerationJS(limit) {
    const isPrime = new Uint8Array(limit);
    for (let i = 2; i < limit; i++) {
        isPrime[i] = 1;
    }
    
    for (let i = 2; i * i < limit; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j < limit; j += i) {
                isPrime[j] = 0;
            }
        }
    }
    
    return isPrime;
}

/**
 * Image Processing - Gaussian Blur
 */
function gaussianBlurJS(width, height, imageData) {
    const result = new Uint8ClampedArray(imageData.length);
    const kernel = [
        [1/16, 2/16, 1/16],
        [2/16, 4/16, 2/16],
        [1/16, 2/16, 1/16]
    ];
    
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let sum = 0;
            let count = 0;
            
            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const idx = ((y + ky) * width + (x + kx)) * 4;
                    sum += imageData[idx] * kernel[ky + 1][kx + 1];
                    count++;
                }
            }
            
            const resultIdx = (y * width + x) * 4;
            result[resultIdx] = Math.round(sum);
            result[resultIdx + 1] = Math.round(sum);
            result[resultIdx + 2] = Math.round(sum);
            result[resultIdx + 3] = 255;
        }
    }
    
    return result;
}

/**
 * Recursive Algorithm - Fibonacci calculation (memoized for practical speed)
 */
function fibonacciJS(n) {
    const memo = {};
    
    function fib(num) {
        if (num in memo) return memo[num];
        if (num <= 1) return num;
        memo[num] = fib(num - 1) + fib(num - 2);
        return memo[num];
    }
    
    return fib(n);
}

/**
 * String Processing - Pattern matching and replacement
 */
function stringProcessingJS(iterations) {
    let str = "The quick brown fox jumps over the lazy dog. " * iterations;
    let result = str;
    
    for (let i = 0; i < iterations; i++) {
        result = result
            .replace(/fox/g, 'FOX')
            .replace(/dog/g, 'DOG')
            .split(' ').filter(word => word.length > 3).join(' ');
    }
    
    return result.length;
}

// ============================================
// BENCHMARK RUNNER
// ============================================

const benchmarks = {
    // Complex Math
    'Complex Math: Mandelbrot': () => mandelbrotJS(512, 512, 100),
    'Complex Math: Matrix (128x128)': () => matrixMultiplicationJS(128),
    'Complex Math: FFT Simulation (1024)': () => fftSimulationJS(1024),
    
    // Raw Speed
    'Raw Speed: Array Sort (100k)': () => arraySortingJS(100000),
    'Raw Speed: Array Iteration (1M)': () => arrayIterationJS(1000000),
    'Raw Speed: Memory Operations (10M)': () => memoryOperationsJS(10000000),
    'Raw Speed: Vector Operations (1M)': () => vectorOperationsJS(1000000),
    
    // Heavy Algorithms
    'Heavy: Prime Generation (100k)': () => primeGenerationJS(100000),
    'Heavy: Fibonacci (30)': () => fibonacciJS(30),
    'Heavy: Data Processing (100)': () => dataProcessingJS(100),
};

// Export functions for browser and Node
const benchmarkFunctions = {
    mandelbrotJS,
    matrixMultiplicationJS,
    fftSimulationJS,
    arraySortingJS,
    arrayIterationJS,
    memoryOperationsJS,
    vectorOperationsJS,
    primeGenerationJS,
    gaussianBlurJS,
    fibonacciJS,
    stringProcessingJS,
    dataProcessingJS
};

// Export for use in HTML/Node
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { benchmarks, measureTime, ...benchmarkFunctions };
}

// Make functions available globally in browser
if (typeof window !== 'undefined') {
    window.benchmarkFunctions = benchmarkFunctions;
    window.mandelbrotJS = mandelbrotJS;
    window.matrixMultiplicationJS = matrixMultiplicationJS;
    window.fftSimulationJS = fftSimulationJS;
    window.arraySortingJS = arraySortingJS;
    window.arrayIterationJS = arrayIterationJS;
    window.memoryOperationsJS = memoryOperationsJS;
    window.vectorOperationsJS = vectorOperationsJS;
    window.primeGenerationJS = primeGenerationJS;
    window.gaussianBlurJS = gaussianBlurJS;
    window.fibonacciJS = fibonacciJS;
    window.stringProcessingJS = stringProcessingJS;
    window.dataProcessingJS = dataProcessingJS;
}
