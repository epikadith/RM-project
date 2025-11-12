/* tslint:disable */
/* eslint-disable */
export function grayscale(pixels: Uint8Array): Uint8Array;
/**
 * Mandelbrot Set Calculation
 */
export function mandelbrot_wasm(width: number, height: number, max_iterations: number): Uint8Array;
/**
 * Matrix Multiplication
 */
export function matrix_multiplication_wasm(size: number): Float32Array;
/**
 * FFT Simulation - Complex number operations
 */
export function fft_simulation_wasm(size: number): Float32Array;
/**
 * Array Iteration and Arithmetic
 */
export function array_iteration_wasm(size: number): number;
/**
 * Memory Operations
 */
export function memory_operations_wasm(size: number): number;
/**
 * Vector Operations - SIMD friendly
 */
export function vector_operations_wasm(size: number): number;
/**
 * Prime Number Generation - Sieve of Eratosthenes
 */
export function prime_generation_wasm(limit: number): Uint8Array;
/**
 * Gaussian Blur
 */
export function gaussian_blur_wasm(width: number, height: number, image_data: Uint8Array): Uint8Array;
/**
 * Recursive Fibonacci (memoized simulation via iteration)
 */
export function fibonacci_wasm(n: number): bigint;
/**
 * String-like processing with sorting
 */
export function data_processing_wasm(iterations: number): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly grayscale: (a: number, b: number) => [number, number];
  readonly mandelbrot_wasm: (a: number, b: number, c: number) => [number, number];
  readonly matrix_multiplication_wasm: (a: number) => [number, number];
  readonly fft_simulation_wasm: (a: number) => [number, number];
  readonly array_iteration_wasm: (a: number) => number;
  readonly memory_operations_wasm: (a: number) => number;
  readonly vector_operations_wasm: (a: number) => number;
  readonly prime_generation_wasm: (a: number) => [number, number];
  readonly gaussian_blur_wasm: (a: number, b: number, c: number, d: number) => [number, number];
  readonly fibonacci_wasm: (a: number) => bigint;
  readonly data_processing_wasm: (a: number) => number;
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
