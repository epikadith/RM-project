# How to Run the WASM vs JS Benchmarks

This guide covers all methods to run the performance benchmarks comparing WebAssembly and JavaScript implementations.

## Prerequisites

Before running benchmarks, ensure you have:

- **Node.js** (v14+) - [Download](https://nodejs.org/)
  ```powershell
  node --version
  ```

- **Python 3** (optional, for Python server)
  ```powershell
  python --version
  ```

- **Rust & wasm-pack** (only if rebuilding WASM)
  - See "Rebuilding WASM" section below

## Directory Setup

```powershell
cd c:\Users\user\Desktop\RM\image_filter
```

Verify these files exist:
- ✓ `benchmark.html`
- ✓ `server.js`
- ✓ `server.py`
- ✓ `benchmark-cli.js`
- ✓ `benchmarks/js/benchmarks.js`
- ✓ `wasm_app/pkg/` (compiled WASM)

---

## Method 1: Node.js Server (Recommended)

### Browser-Based Benchmarks

**Start Server:**
```powershell
node server.js
```

**Output:**
```
========================================
🚀 Performance Benchmark Server Started
========================================

📍 Server running at: http://localhost:3000
📍 Benchmark tests: http://localhost:3000/benchmark.html

Press Ctrl+C to stop the server
```

**Open Browser:**
- Navigate to: **http://localhost:3000/benchmark.html**

**Run Tests:**
1. Click individual "Run JS" or "Run WASM" buttons
2. Results display immediately with timing and winner
3. Browser console shows detailed results

**Stop Server:**
- Press `Ctrl+C` in terminal

---

## Method 2: Python Server

### Browser-Based Benchmarks

**Start Server (Port 3000):**
```powershell
python server.py
```

**Start Server (Custom Port):**
```powershell
python server.py --port 8080
```

**Output:**
```
==================================================
🚀 Performance Benchmark Server Started
==================================================

📍 Server running at: http://localhost:3000
📍 Benchmark tests: http://localhost:3000/benchmark.html
📁 Serving from: c:\Users\user\Desktop\RM\image_filter

Press Ctrl+C to stop the server
```

**Open Browser:**
- Navigate to: **http://localhost:3000/benchmark.html** (or your custom port)

**Stop Server:**
- Press `Ctrl+C` in terminal

---

## Method 3: Python Built-in HTTP Server

### Quick Browser-Based Benchmarks

```powershell
python -m http.server 3000
```

**Open Browser:**
- Navigate to: **http://localhost:3000/benchmark.html**

**Note:** This is simpler but has less logging than `server.py`

---

## Method 4: Command-Line Benchmarks

### Terminal-Based Testing with Statistics

**Run All Benchmarks:**
```powershell
node benchmark-cli.js
```

**Output:**
```
============================================================
⚡ WASM vs JavaScript Performance Benchmark CLI
============================================================

📦 Loading WASM module...
✓ WASM module loaded successfully

📊 Running: MANDELBROT
------------------------------------------------------------
  🟨 JavaScript (1 iteration)...
     ✓ Min: 856.45ms | Avg: 856.45ms | Max: 856.45ms
  🟦 WebAssembly (1 iteration)...
     ✓ Min: 215.32ms | Avg: 215.32ms | Max: 215.32ms

  🏆 Winner: WASM (3.98× faster)

[... more benchmarks ...]

📈 SUMMARY
============================================================

Total benchmarks: 7
WASM wins: 5
JavaScript wins: 2
Average speedup: 2.15×

Detailed Results:
------------------------------------------------------------
Benchmark       JS (ms)      WASM (ms)    Winner          Speedup
------------------------------------------------------------
mandelbrot      856.45       215.32       WASM            3.98×
matrix          245.67       118.92       WASM            2.06×
fft             52.34        18.76        WASM            2.79×
iteration       156.23       89.45        WASM            1.75×
memory          121.45       71.23        WASM            1.70×
primes          312.56       156.78       WASM            1.99×
fib             5.23         2.15         WASM            2.43×
------------------------------------------------------------
```

### Run Specific Benchmark:
```powershell
node benchmark-cli.js --benchmark mandelbrot
```

**Available benchmarks:** mandelbrot, matrix, fft, iteration, memory, primes, fib

### Run Multiple Iterations (Better Statistics):
```powershell
node benchmark-cli.js --iterations 5
```

Shows min, max, average, median, and standard deviation.

### Verbose Output:
```powershell
node benchmark-cli.js --verbose
```

Includes standard deviation for each test.

### Export Results as JSON:
```powershell
node benchmark-cli.js --export results.json
```

Creates `results.json` with all timing data and statistics.

**Exported JSON format:**
```json
{
  "timestamp": "2025-01-15T10:30:45.123Z",
  "iterations": 1,
  "summary": {
    "total": 7,
    "wasmWins": 5,
    "jsWins": 2,
    "avgSpeedup": 2.15
  },
  "results": [
    {
      "benchmark": "mandelbrot",
      "js": { "min": 856.45, "max": 856.45, "avg": 856.45, ... },
      "wasm": { "min": 215.32, "max": 215.32, "avg": 215.32, ... },
      "speedup": "3.98",
      "winner": "WASM"
    }
  ]
}
```

### NPM Scripts (Using package.json):
```powershell
# Run server
npm run server

# Run all benchmarks (CLI)
npm run benchmark

# Run specific benchmarks
npm run benchmark:mandelbrot
npm run benchmark:matrix
npm run benchmark:fft
npm run benchmark:iteration
npm run benchmark:memory
npm run benchmark:primes
npm run benchmark:fib

# Run with 3 iterations each
npm run benchmark:all

# Export results
npm run benchmark:export

# Verbose mode
npm run benchmark:verbose
```

---

## Browser UI Features

### Interactive Benchmark Interface

When you open `http://localhost:3000/benchmark.html`:

**For Each Benchmark:**
- 🟨 "Run JS" button - Tests JavaScript implementation
- 🟦 "Run WASM" button - Tests WASM implementation
- Shows timing for each (milliseconds)
- Displays winner with speedup ratio

**Summary Section:**
- Total tests run
- Number of WASM wins
- Number of JS wins
- Average speedup ratio
- Console logs all results

**Browser Developer Tools:**
- Press `F12` → Console tab
- View detailed logs and results
- Can copy results for documentation

---

## Benchmark Categories

### Complex Math (CPU-Intensive)
- **Mandelbrot Set** - 512×512 image, 100 iterations
- **Matrix Multiplication** - 128×128 matrices
- **FFT Simulation** - 1024 samples

### Raw Speed (Loop Performance)
- **Array Iteration** - 1M element processing
- **Memory Operations** - 10M byte buffer
- **Vector Operations** - SIMD-friendly operations (WASM only)

### Heavy Algorithms
- **Prime Generation** - Sieve up to 100k
- **Fibonacci** - Calculate F(30)
- **Data Processing** - Sorting/filtering with allocations

---

## Performance Results Guide

### What to Expect

| Category | Typical Winner | Speedup |
|----------|---|---|
| Mandelbrot | WASM | 3-5× |
| Matrix | WASM | 1.5-2× |
| FFT | WASM | 2-3× |
| Array Iteration | WASM | 1.5-2× |
| Memory Ops | WASM | 1.5-2× |
| Prime Gen | WASM | 1.5-3× |
| Fibonacci | WASM | 2-3× |

*Times vary by CPU, browser, and system load*

### Reading Results

**Example Result:**
```
Mandelbrot: WASM (3.98× faster)
```
Meaning: WASM version runs 3.98 times faster than JavaScript

---

## Combining Results

### Compare Multiple Runs

**Run multiple times and export:**
```powershell
# First run
node benchmark-cli.js --iterations 3 --export run1.json

# Second run (later)
node benchmark-cli.js --iterations 3 --export run2.json

# Compare in spreadsheet or analysis tool
```

### Tracking Performance Over Time

```powershell
# Date format in export
$date = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
node benchmark-cli.js --iterations 5 --export "results_$date.json"
```

---

## Troubleshooting

### WASM Module Not Found

**Error:**
```
❌ Failed to load WASM module
```

**Solution:**
```powershell
cd wasm_app
wasm-pack build --release
cd ..
```

Then restart server.

### Port Already in Use

**Error:**
```
EADDRINUSE: Port 3000 already in use
```

**Solution:**
```powershell
# Use different port
node server.js --port 8080
# or
python server.py --port 8080
```

### Benchmarks Run Very Slowly

**Cause:** First WASM load or background processes
**Solution:** Run again - subsequent runs are faster

### File Not Found Errors

**Ensure you're in correct directory:**
```powershell
cd c:\Users\user\Desktop\RM\image_filter
dir benchmark.html  # Should exist
```

---

## Advanced Usage

### Modify and Test Benchmarks

**JavaScript benchmarks:**
1. Edit `benchmarks/js/benchmarks.js`
2. Refresh browser or restart CLI
3. Results update immediately

**WASM benchmarks:**
1. Edit `wasm_app/src/lib.rs`
2. Run: `npm run wasm:build`
3. Refresh browser or restart CLI

### Auto-Run in Browser

In browser console:
```javascript
runAllBenchmarks()  // Runs all tests automatically
```

### View Results in Console

Browser console shows:
```javascript
Benchmark Results: {
  comparisons: ["mandelbrot", "matrix", ...],
  wasmWins: 5,
  jsWins: 2,
  avgSpeedup: 2.15
}
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Start server | `node server.js` |
| Run all benchmarks | `node benchmark-cli.js` |
| Run with 5 iterations | `node benchmark-cli.js --iterations 5` |
| Export results | `node benchmark-cli.js --export results.json` |
| Run one benchmark | `node benchmark-cli.js --benchmark mandelbrot` |
| Using npm | `npm run benchmark` |
| Rebuild WASM | `npm run wasm:build` |
| Python server | `python server.py` |
| Python built-in | `python -m http.server 3000` |

---

## Next Steps

1. **Run benchmarks** using one of the methods above
2. **Analyze results** to understand WASM vs JS tradeoffs
3. **Export data** for further analysis
4. **Modify benchmarks** to test your own algorithms
5. **Integrate learnings** into your projects

**Happy Benchmarking!** 🚀
