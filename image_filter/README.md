# WASM vs JavaScript Performance Benchmarks

This project provides a comprehensive performance comparison between WebAssembly (WASM) and JavaScript implementations across multiple categories:

- **Complex Math**: Mandelbrot, Matrix Multiplication, FFT
- **Raw Speed**: Array Iteration, Memory Operations, Vector Operations
- **Heavy Algorithms**: Prime Generation, Fibonacci, Data Processing

## Project Structure

```
image_filter/
├── benchmark.html              # Interactive benchmark UI
├── server.js                   # Node.js HTTP server
├── server.py                   # Python HTTP server
├── benchmarks/
│   ├── js/
│   │   └── benchmarks.js      # JavaScript benchmark implementations
│   └── wasm/
│       └── benchmarks.wasm    # (Generated WASM binary)
├── wasm_app/
│   ├── src/
│   │   └── lib.rs            # Rust WASM implementations
│   ├── Cargo.toml            # Rust package config
│   └── pkg/                  # (Generated WASM package)
├── js_app/                   # Original image filter JS app
└── wasm_app/                 # Original image filter WASM app
```

## Setup & Installation

### Prerequisites

- **Node.js** (v14+) - For running the Node server
- **Python 3** - For running the Python server
- **Rust** (for rebuilding WASM)
  ```bash
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```
- **wasm-pack** (for WASM compilation)
  ```bash
  curl https://rustwasm.org/wasm-pack/installer/init.sh -sSf | sh
  ```

### Installation Steps

1. **Navigate to project directory**
   ```bash
   cd c:\Users\user\Desktop\RM\image_filter
   ```

2. **Build the WASM module** (if you modified Rust code)
   ```bash
   cd wasm_app
   wasm-pack build --release
   cd ..
   ```

3. **Choose and start a server** (see options below)

## Running the Benchmarks

### Option 1: Node.js Server (Recommended)

```bash
node server.js
```

Then open: **http://localhost:3000/benchmark.html**

### Option 2: Python HTTP Server

```bash
python server.py
```

Or with custom port:
```bash
python server.py --port 8080
```

Then open: **http://localhost:3000/benchmark.html** (or your custom port)

### Option 3: Python Built-in Simple Server

```bash
cd c:\Users\user\Desktop\RM\image_filter
python -m http.server 3000
```

Then open: **http://localhost:3000/benchmark.html**

## Benchmark Categories

### 1. Complex Math Operations

These tests measure performance on computationally intensive mathematical operations:

#### Mandelbrot Set (512x512, 100 iterations)
- Calculates the Mandelbrot set for a complex plane region
- Heavy use of floating-point arithmetic and loops
- **Relevance**: Tests recursive/iterative mathematical computation

#### Matrix Multiplication (128×128)
- Performs full matrix-matrix multiplication
- **Relevance**: Tests nested loops and numerical stability

#### FFT Simulation (1024 samples)
- Simplified Fast Fourier Transform implementation
- Complex number operations and trigonometric functions
- **Relevance**: Tests signal processing capabilities

### 2. Raw Speed Operations

These tests measure low-level performance:

#### Array Iteration (1M elements)
- Iterates through 1 million floating-point values
- Performs arithmetic operations: `arr[i] * 1.5 + sqrt(arr[i])`
- **Relevance**: Tests basic loop speed and memory access patterns

#### Memory Operations (10M bytes)
- Fills and reads a 10MB buffer
- Performs checksum calculation
- **Relevance**: Tests memory bandwidth and cache efficiency

#### Vector Operations (1M elements) - WASM only
- SIMD-friendly chunk processing
- **Relevance**: Tests modern CPU vector capabilities

### 3. Heavy Algorithms

These tests measure complex algorithmic performance:

#### Prime Generation (100k limit)
- Sieve of Eratosthenes algorithm
- **Relevance**: Tests integer operations and array manipulation

#### Fibonacci (n=30)
- Iterative Fibonacci calculation
- **Relevance**: Tests integer arithmetic

#### Data Processing (100 iterations)
- Sorting and filtering operations
- **Relevance**: Tests collection operations and allocations

## Understanding Results

### Performance Metrics

The benchmark page displays:

- **Individual Times**: Execution time in milliseconds (ms)
- **Winner**: Which implementation is faster and by how much (X× speedup)
- **Summary Statistics**:
  - Total tests run
  - Number of wins for each implementation
  - Average speedup ratio

### When WASM Excels

WASM typically performs better for:
- ✅ Computationally intensive algorithms
- ✅ Heavy mathematical operations
- ✅ Large-scale data processing
- ✅ CPU-bound operations
- ✅ Native C/Rust code efficiency

### When JavaScript Performs Well

JavaScript may perform comparably or better for:
- ✅ Short operations (startup overhead negligible)
- ✅ Operations already optimized in JS engines
- ✅ Cases where native implementations exist
- ✅ Single operations (JIT compilation time negligible)

## Interpreting Portability

This benchmark suite also tests **portability**:

### JavaScript Portability
- ✅ Runs on all browsers
- ✅ Runs on all Node.js versions
- ✅ No compilation required
- ✅ Cross-platform without modification

### WASM Portability
- ✅ Runs on all modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Runs on Node.js (v8+)
- ✅ WebAssembly is standardized
- ⚠️ Requires compilation (wasm-pack)
- ⚠️ Larger initial download (WASM binary)

## Building & Modifying

### Modify JavaScript Benchmarks

Edit `benchmarks/js/benchmarks.js` and refresh the browser.

### Modify WASM Benchmarks

1. Edit `wasm_app/src/lib.rs`
2. Recompile:
   ```bash
   cd wasm_app
   wasm-pack build --release
   cd ..
   ```
3. Refresh the browser

## Advanced Usage

### Batch Testing

To run all benchmarks at once and save results:

```javascript
// In browser console:
runAllBenchmarks();
```

Results will be logged to browser console:
```
Benchmark Results: {
  comparisons: [...],
  wasmWins: N,
  jsWins: N,
  avgSpeedup: X.XX
}
```

### Export Results

Results are logged to the browser console. To save:

1. Right-click → Inspect → Console
2. Copy the logged results
3. Save to file or share

### Custom Benchmarks

To add a new benchmark:

1. **Add to JS (`benchmarks/js/benchmarks.js`)**:
   ```javascript
   function myTestJS(size) {
       // implementation
       return result;
   }
   ```

2. **Add to WASM (`wasm_app/src/lib.rs`)**:
   ```rust
   #[wasm_bindgen]
   pub fn my_test_wasm(size: usize) -> result_type {
       // implementation
   }
   ```

3. **Add to benchmark.html** under appropriate section

## Performance Tuning Tips

### For WASM
- Use `--release` flag when building: `wasm-pack build --release`
- Minimize data copying between JS and WASM
- Batch operations to reduce JS/WASM overhead
- Use typed arrays (Float32Array, etc.)

### For JavaScript
- Use typed arrays instead of regular arrays
- Minimize function calls in hot loops
- Use `Math` functions (JIT optimized)
- Avoid dynamic property access

## Troubleshooting

### WASM Module Not Loading

Error: "WASM module not loaded"

**Solution**:
```bash
cd wasm_app
wasm-pack build --release
cd ..
```

Ensure `wasm_app/pkg/` directory contains compiled files.

### Port Already in Use

Error: "Port 3000 already in use"

**Solution - Node**:
```bash
# Use a different port
node server.js --port 8080
```

**Solution - Python**:
```bash
python server.py --port 8080
```

### File Not Found Errors

Ensure you're running the server from the project root directory:
```bash
cd c:\Users\user\Desktop\RM\image_filter
```

### Benchmark Takes Too Long

Some benchmarks (Mandelbrot, Matrix Multiplication) may take several seconds on slower machines. This is normal.

## Performance Expectations

Approximate expected times on modern hardware (Intel i7/Ryzen 5):

| Benchmark | JS (ms) | WASM (ms) | Winner |
|-----------|---------|----------|--------|
| Mandelbrot | 800-1200 | 200-400 | WASM (2-4×) |
| Matrix Mult | 150-300 | 80-150 | WASM (1.5-2×) |
| FFT Sim | 30-60 | 10-20 | WASM (2-3×) |
| Array Iter | 100-200 | 50-100 | WASM (1.5-2×) |
| Memory Ops | 80-150 | 40-80 | WASM (1.5-2×) |
| Prime Gen | 200-400 | 100-200 | WASM (1.5-3×) |

*Actual times vary based on machine specs and browser/Node.js version.*

## Resources

- [WebAssembly Documentation](https://webassembly.org/)
- [wasm-pack Guide](https://rustwasm.org/docs/wasm-pack/)
- [Benchmarking Best Practices](https://easyperf.net/blog/)
- [WASM Performance](https://mrale.ph/blog/2015/01/24/understanding-performance.html)

## License

This project is provided as-is for educational and comparison purposes.

## Contributing

Feel free to add more benchmarks or improve existing implementations!

### To Add a Benchmark:

1. Create both JS and WASM implementations
2. Add UI cards to `benchmark.html`
3. Document expected results
4. Test on multiple machines
5. Update this README

---

Happy Benchmarking! 🚀
