# Performance Visualization Guide

## Overview

The benchmark UI has been enhanced with **interactive charts and real-time visualizations** to compare JavaScript and WebAssembly performance across different tasks.

## New Visualization Features

### 📊 Chart Types

#### 1. **Overall Performance Comparison (Bar Chart)**
- Shows execution time (ms) for each benchmark
- Side-by-side comparison of JavaScript vs WebAssembly
- Easy identification of which implementation is faster for each task
- **Color coding**: 
  - 🔵 Blue = JavaScript
  - 🔴 Red = WebAssembly

#### 2. **WASM Speedup Factor (Horizontal Bar Chart)**
- Displays the speedup ratio (JS time / WASM time)
- Values > 1 mean WASM is faster; < 1 mean JS is faster
- Color-coded by winner:
  - 🟢 Green = JS is faster
  - 🟠 Orange = WASM is faster

#### 3. **Execution Time Radar (Multi-axis Chart)**
- Shows performance across all benchmarks simultaneously
- Helps visualize overall trends
- Lower values in the radar = better performance
- Overlapping areas show relative performance differences

#### 4. **Performance by Category (Doughnut Chart)**
- Breaks down wins by test category:
  - Complex Math (Mandelbrot, Matrix, FFT)
  - Raw Speed (Array Iteration, Memory, Vector Operations)
  - Heavy Algorithms (Primes, Fibonacci, Data Processing)
- Visual ratio of WASM vs JavaScript wins

### 📈 Key Metrics Dashboard

Below the charts, you'll see:
- **Avg JS Time**: Average execution time across all JavaScript tests
- **Avg WASM Time**: Average execution time across all WebAssembly tests
- **Total Tests**: Number of benchmarks completed
- **Overall Winner**: Which implementation is faster on average
- **Min Time**: Fastest execution time across all tests
- **Max Time**: Slowest execution time across all tests

## How to Use

### Running Benchmarks and Viewing Charts

1. **Open the benchmark page**: http://localhost:3000/benchmark.html

2. **Run individual benchmarks**:
   - Click "Run JS" or "Run WASM" for any benchmark
   - Results appear in the chart automatically

3. **View all charts at once**:
   - Scroll down to the "Performance Visualizations" section
   - Charts update in real-time as you run tests

4. **Control chart updates**:
   - 🔄 **Refresh Charts** - Manually update visualizations
   - 🗑️ **Clear Data** - Reset all results and charts

### Interpreting the Charts

**Performance Comparison Chart**:
- Shorter bars = faster execution
- Compare JS (blue) and WASM (red) bars side-by-side

**Speedup Factor Chart**:
- Bars extending right = faster performance
- Green = JavaScript advantage
- Orange = WebAssembly advantage

**Radar Chart**:
- Smaller area closer to center = better performance
- More compact shape = more consistent performance

**Category Chart**:
- Shows distribution of wins across test categories
- Helpful for understanding which implementation excels in which domain

## Benchmarks Included

### Complex Math (3 tests)
- **Mandelbrot Set**: 512x512 computation with 100 iterations
- **Matrix Multiplication**: 128x128 matrix operations
- **FFT Simulation**: 1024-sample fast Fourier transform

### Raw Speed (3 tests)
- **Array Iteration**: 1M element array operations
- **Memory Operations**: 10M byte buffer processing
- **Vector Operations**: SIMD-like vector computations (1M elements)

### Heavy Algorithms (3 tests)
- **Prime Generation**: Sieve of Eratosthenes (100k limit)
- **Fibonacci**: Recursive computation (n=30)
- **Data Processing**: 100 iterations of sorting, filtering, mapping

## Export Options

After running benchmarks, save your results:

1. **💾 Save as JSON**
   - Complete data with timestamps
   - Detailed results for each test run
   - Suitable for further analysis

2. **📊 Save as CSV**
   - Spreadsheet-compatible format
   - Easy import to Excel/Google Sheets
   - Columns: Benchmark, Implementation, Duration, Timestamp

3. **📄 Save as HTML**
   - Standalone report document
   - Includes performance comparison table
   - Visual summary with winner indicators

## Performance Tips

### For Best Results:
- Run benchmarks in a quiet environment (fewer background processes)
- Run each benchmark multiple times (click buttons again) for stability
- Use the CLI tool (`benchmark-js.js`) for multi-iteration testing:
  ```powershell
  node .\benchmark-js.js --iterations 5 --verbose --export results.json
  ```

### Interpreting Results:
- **Single runs** show instantaneous performance
- **Multiple runs** in browser show consistency
- **CLI with multiple iterations** provides statistical significance
- Look for patterns across categories, not just individual tests

## Browser Compatibility

Charts are powered by **Chart.js 4.4.0**, which works in:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Most modern browsers

## Technical Details

- Charts update automatically when benchmarks complete
- All chart instances are managed dynamically
- Responsive design adapts to screen size
- Real-time metric calculations

## Example Workflow

1. Open http://localhost:3000/benchmark.html
2. Run "Mandelbrot" JS test → See bar chart update
3. Run "Mandelbrot" WASM test → See both bars in comparison
4. Run additional benchmarks → More data in all visualizations
5. Review metrics dashboard for overall insights
6. Click "Save as JSON" to export results
7. Use "Clear Data" to reset and start fresh

---

**Note**: WebAssembly tests require the WASM module to be initialized on first run, so the first WASM test may take slightly longer. Subsequent tests are faster.
