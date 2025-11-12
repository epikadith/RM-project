# Quick Start Guide - WASM vs JS Benchmarks

## ⚡ 5-Minute Setup

### Step 1: Install Prerequisites

**Windows PowerShell:**

```powershell
# Install Rust (required for WASM compilation)
irm https://rustup.rs -outfile rustup-init.exe; .\rustup-init.exe

# Install wasm-pack
curl https://rustwasm.org/wasm-pack/installer/init.sh -sSf | sh
```

**Or use Node.js server without recompiling WASM:**

```powershell
# Just ensure Node.js is installed (check: node --version)
node --version
```

### Step 2: Navigate to Project

```powershell
cd "c:\Users\user\Desktop\RM\image_filter"
```

### Step 3: Choose Your Server

#### Option A: Node.js (Recommended - Fastest)
```powershell
node server.js
```
Open: **http://localhost:3000/benchmark.html**

#### Option B: Python
```powershell
python server.py
```
Open: **http://localhost:3000/benchmark.html**

#### Option C: Python Built-in
```powershell
python -m http.server 3000
```
Open: **http://localhost:3000/benchmark.html**

### Step 4: Run Benchmarks

Click individual "Run JS" or "Run WASM" buttons, or use browser console:
```javascript
runAllBenchmarks()  // Run all tests at once
```

## 📊 Running Different Benchmark Types

### 1. Complex Math
- **Mandelbrot Set**: Tests recursive mathematical computation
- **Matrix Multiplication**: Tests nested loops and floating-point ops
- **FFT Simulation**: Tests signal processing

### 2. Raw Speed
- **Array Iteration**: 1M element processing
- **Memory Operations**: 10M byte buffer
- **Vector Operations**: SIMD-friendly operations

### 3. Heavy Algorithms
- **Prime Generation**: Sieve of Eratosthenes (100k)
- **Fibonacci**: n=30 calculation
- **Data Processing**: Sorting and filtering

## 🖥️ CLI Mode (For Advanced Users)

Run benchmarks from command line with detailed statistics:

```powershell
# Run all benchmarks
node benchmark-cli.js

# Run specific benchmark
node benchmark-cli.js --benchmark mandelbrot

# Run each test 5 times for better statistics
node benchmark-cli.js --iterations 5

# Export results to JSON
node benchmark-cli.js --iterations 5 --export results.json

# Verbose output with standard deviation
node benchmark-cli.js --verbose
```

## 📈 Understanding Results

### Quick Interpretation

| Result | Meaning |
|--------|---------|
| WASM (2×) | WASM is 2 times faster |
| JS (1.5×) | JavaScript is 1.5 times faster |
| Summary shows WASM: 5 wins, JS: 2 wins | WASM wins most tests |

### When WASM Wins
- ✅ Complex mathematical operations
- ✅ Large data processing
- ✅ CPU-intensive algorithms
- ✅ Native code efficiency

### When JS Wins
- ✅ Short/trivial operations
- ✅ Already JIT-optimized JS operations
- ✅ Operations with native browser/Node.js implementations

## 🔧 Modifying & Rebuilding

### Edit JavaScript Benchmarks

1. Open `benchmarks/js/benchmarks.js`
2. Modify or add functions
3. Refresh browser - changes appear immediately ✓

### Edit WASM Benchmarks

1. Open `wasm_app/src/lib.rs`
2. Modify functions
3. Rebuild:
   ```powershell
   cd wasm_app
   wasm-pack build --release
   cd ..
   ```
4. Refresh browser

## 📁 File Structure

```
image_filter/
├── benchmark.html           ← Interactive browser UI
├── benchmark-cli.js         ← CLI runner
├── server.js               ← Node.js server
├── server.py               ← Python server
├── benchmarks/
│   └── js/
│       └── benchmarks.js    ← JS implementations
└── wasm_app/
    ├── src/lib.rs          ← Rust/WASM implementations
    └── pkg/                ← Compiled WASM (auto-generated)
```

## 🐛 Troubleshooting

### WASM Not Loading
```
Error: "WASM module not loaded"
Solution:
cd wasm_app
wasm-pack build --release
cd ..
```

### Port Already in Use
```powershell
# Use different port with Python
python server.py --port 8080

# Then open: http://localhost:8080/benchmark.html
```

### Benchmarks Run Very Slowly
- Normal on first run (WASM compilation)
- Subsequent runs faster
- Try smaller datasets in benchmarks.js

### Can't Find Python
```powershell
python --version  # Check if installed
python3 --version # Try python3 instead
```

## 🚀 Next Steps

1. **Run all benchmarks** - Click "Run" buttons or use console
2. **Analyze results** - See which implementation wins
3. **Explore differences** - Check console logs for detailed timing
4. **Modify tests** - Add your own benchmarks
5. **Export results** - Use `--export` flag to save data

## 📚 Key Takeaways

- **WASM** excels at: Math, algorithms, data processing
- **JS** excels at: Quick operations, browser integration
- **Hybrid approach**: Use both for optimal performance
- **Portability**: JS in browser, WASM for intensive operations

## 💡 Tips

- Use `--verbose` flag for detailed stats
- Run multiple iterations (`--iterations 10`) for accuracy
- Check browser console logs for additional info
- Export results as JSON for analysis

## 📞 Need Help?

1. Check README.md for comprehensive documentation
2. Review browser console for error messages
3. Ensure WASM is properly compiled
4. Verify server is running on correct port
5. Check file permissions and paths

---

**Ready? Let's benchmark!** 🏃‍♂️

```powershell
cd c:\Users\user\Desktop\RM\image_filter
node server.js
```

Then open: http://localhost:3000/benchmark.html
