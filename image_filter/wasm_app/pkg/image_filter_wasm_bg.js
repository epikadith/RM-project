let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
 * @param {Uint8Array} pixels
 * @returns {Uint8Array}
 */
export function grayscale(pixels) {
    const ptr0 = passArray8ToWasm0(pixels, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.grayscale(ptr0, len0);
    var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v2;
}

/**
 * Mandelbrot Set Calculation
 * @param {number} width
 * @param {number} height
 * @param {number} max_iterations
 * @returns {Uint8Array}
 */
export function mandelbrot_wasm(width, height, max_iterations) {
    const ret = wasm.mandelbrot_wasm(width, height, max_iterations);
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
}

let cachedFloat32ArrayMemory0 = null;

function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}
/**
 * Matrix Multiplication
 * @param {number} size
 * @returns {Float32Array}
 */
export function matrix_multiplication_wasm(size) {
    const ret = wasm.matrix_multiplication_wasm(size);
    var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
}

/**
 * FFT Simulation - Complex number operations
 * @param {number} size
 * @returns {Float32Array}
 */
export function fft_simulation_wasm(size) {
    const ret = wasm.fft_simulation_wasm(size);
    var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
}

/**
 * Array Iteration and Arithmetic
 * @param {number} size
 * @returns {number}
 */
export function array_iteration_wasm(size) {
    const ret = wasm.array_iteration_wasm(size);
    return ret;
}

/**
 * Memory Operations
 * @param {number} size
 * @returns {number}
 */
export function memory_operations_wasm(size) {
    const ret = wasm.memory_operations_wasm(size);
    return ret >>> 0;
}

/**
 * Vector Operations - SIMD friendly
 * @param {number} size
 * @returns {number}
 */
export function vector_operations_wasm(size) {
    const ret = wasm.vector_operations_wasm(size);
    return ret;
}

/**
 * Prime Number Generation - Sieve of Eratosthenes
 * @param {number} limit
 * @returns {Uint8Array}
 */
export function prime_generation_wasm(limit) {
    const ret = wasm.prime_generation_wasm(limit);
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
}

/**
 * Gaussian Blur
 * @param {number} width
 * @param {number} height
 * @param {Uint8Array} image_data
 * @returns {Uint8Array}
 */
export function gaussian_blur_wasm(width, height, image_data) {
    const ptr0 = passArray8ToWasm0(image_data, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.gaussian_blur_wasm(width, height, ptr0, len0);
    var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v2;
}

/**
 * Recursive Fibonacci (memoized simulation via iteration)
 * @param {number} n
 * @returns {bigint}
 */
export function fibonacci_wasm(n) {
    const ret = wasm.fibonacci_wasm(n);
    return BigInt.asUintN(64, ret);
}

/**
 * String-like processing with sorting
 * @param {number} iterations
 * @returns {number}
 */
export function data_processing_wasm(iterations) {
    const ret = wasm.data_processing_wasm(iterations);
    return ret >>> 0;
}

export function __wbindgen_init_externref_table() {
    const table = wasm.__wbindgen_externrefs;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

