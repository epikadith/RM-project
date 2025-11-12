/**
 * Command-line Benchmark Runner
 * Run WASM vs JS benchmarks from the CLI with detailed logging
 * 
 * Usage:
 *   node benchmark-cli.js                 # Run all benchmarks
 *   node benchmark-cli.js --benchmark mandelbrot  # Run specific test
 *   node benchmark-cli.js --iterations 3  # Run each test 3 times
 *   node benchmark-cli.js --export results.json  # Export results
 */

const fs = require('fs');
const path = require('path');
const benchmarks = require('./benchmarks/js/benchmarks.js');

// Parse command line arguments
function parseArgs() {
    const args = {
        benchmark: null,
        iterations: 1,
        export: null,
        verbose: process.argv.includes('--verbose')
    };

    for (let i = 2; i < process.argv.length; i++) {
        if (process.argv[i] === '--benchmark' && i + 1 < process.argv.length) {
            args.benchmark = process.argv[++i];
        } else if (process.argv[i] === '--iterations' && i + 1 < process.argv.length) {
            args.iterations = parseInt(process.argv[++i]);
        } else if (process.argv[i] === '--export' && i + 1 < process.argv.length) {
            args.export = process.argv[++i];
        }
    }

    return args;
}

// Load WASM module
async function loadWasm() {
    try {
        const wasmPath = path.join(__dirname, 'wasm_app', 'pkg', 'image_filter_wasm.js');
        const init = require(wasmPath);
        // Initialize WASM
        return init;
    } catch (e) {
        console.error('❌ Failed to load WASM module:');
        console.error('   Make sure to run: wasm-pack build --release');
        console.error(`   Error: ${e.message}`);
        process.exit(1);
    }
}

// Run JS benchmark
function runJSBenchmark(benchmarkName, iterations = 1) {
    const results = [];
    
    for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        
        switch (benchmarkName) {
            case 'mandelbrot':
                benchmarks.mandelbrotJS(512, 512, 100);
                break;
            case 'matrix':
                benchmarks.matrixMultiplicationJS(128);
                break;
            case 'fft':
                benchmarks.fftSimulationJS(1024);
                break;
            case 'iteration':
                benchmarks.arrayIterationJS(1000000);
                break;
            case 'memory':
                benchmarks.memoryOperationsJS(10000000);
                break;
            case 'primes':
                benchmarks.primeGenerationJS(100000);
                break;
            case 'fib':
                benchmarks.fibonacciJS(30);
                break;
            default:
                throw new Error(`Unknown benchmark: ${benchmarkName}`);
        }
        
        const duration = performance.now() - startTime;
        results.push(duration);
    }
    
    return results;
}

// Run WASM benchmark
async function runWasmBenchmark(benchmarkName, iterations = 1, wasmModule) {
    const results = [];
    
    for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        
        switch (benchmarkName) {
            case 'mandelbrot':
                wasmModule.mandelbrot_wasm(512, 512, 100);
                break;
            case 'matrix':
                wasmModule.matrix_multiplication_wasm(128);
                break;
            case 'fft':
                wasmModule.fft_simulation_wasm(1024);
                break;
            case 'iteration':
                wasmModule.array_iteration_wasm(1000000);
                break;
            case 'memory':
                wasmModule.memory_operations_wasm(10000000);
                break;
            case 'primes':
                wasmModule.prime_generation_wasm(100000);
                break;
            case 'fib':
                wasmModule.fibonacci_wasm(30);
                break;
            default:
                throw new Error(`Unknown benchmark: ${benchmarkName}`);
        }
        
        const duration = performance.now() - startTime;
        results.push(duration);
    }
    
    return results;
}

// Calculate statistics
function calculateStats(results) {
    const sorted = results.sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const avg = results.reduce((a, b) => a + b) / results.length;
    const median = sorted[Math.floor(sorted.length / 2)];
    
    // Calculate standard deviation
    const variance = results.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / results.length;
    const stdDev = Math.sqrt(variance);
    
    return { min, max, avg, median, stdDev, count: results.length };
}

// Format output
function formatStats(stats) {
    return {
        min: `${stats.min.toFixed(2)}ms`,
        max: `${stats.max.toFixed(2)}ms`,
        avg: `${stats.avg.toFixed(2)}ms`,
        median: `${stats.median.toFixed(2)}ms`,
        stdDev: `${stats.stdDev.toFixed(2)}ms`,
        samples: stats.count
    };
}

// Main function
async function main() {
    const args = parseArgs();
    
    console.log('\n' + '='.repeat(60));
    console.log('⚡ WASM vs JavaScript Performance Benchmark CLI');
    console.log('='.repeat(60) + '\n');

    const benchmarkList = [
        'mandelbrot', 'matrix', 'fft', 'iteration', 'memory', 'primes', 'fib'
    ];

    const selectedBenchmarks = args.benchmark 
        ? [args.benchmark]
        : benchmarkList;

    // Load WASM module
    console.log('📦 Loading WASM module...');
    const wasmModule = await loadWasm();
    console.log('✓ WASM module loaded successfully\n');

    const results = [];

    for (const benchmarkName of selectedBenchmarks) {
        console.log(`\n📊 Running: ${benchmarkName.toUpperCase()}`);
        console.log('-'.repeat(60));

        try {
            // Run JS
            console.log(`  🟨 JavaScript (${args.iterations} iteration${args.iterations > 1 ? 's' : ''})...`);
            const jsResults = runJSBenchmark(benchmarkName, args.iterations);
            const jsStats = calculateStats(jsResults);
            const jsFormatted = formatStats(jsStats);
            console.log(`     ✓ Min: ${jsFormatted.min} | Avg: ${jsFormatted.avg} | Max: ${jsFormatted.max}`);
            if (args.verbose) {
                console.log(`     σ: ${jsFormatted.stdDev}`);
            }

            // Run WASM
            console.log(`  🟦 WebAssembly (${args.iterations} iteration${args.iterations > 1 ? 's' : ''})...`);
            const wasmResults = await runWasmBenchmark(benchmarkName, args.iterations, wasmModule);
            const wasmStats = calculateStats(wasmResults);
            const wasmFormatted = formatStats(wasmStats);
            console.log(`     ✓ Min: ${wasmFormatted.min} | Avg: ${wasmFormatted.avg} | Max: ${wasmFormatted.max}`);
            if (args.verbose) {
                console.log(`     σ: ${wasmFormatted.stdDev}`);
            }

            // Compare
            const speedup = jsStats.avg / wasmStats.avg;
            const winner = speedup > 1 ? 'WASM' : 'JavaScript';
            const ratio = speedup > 1 ? speedup : 1 / speedup;
            
            console.log(`\n  🏆 Winner: ${winner} (${ratio.toFixed(2)}× faster)`);

            results.push({
                benchmark: benchmarkName,
                js: jsStats,
                wasm: wasmStats,
                speedup: speedup,
                winner: winner,
                ratio: ratio
            });

        } catch (error) {
            console.error(`  ❌ Error: ${error.message}`);
        }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📈 SUMMARY');
    console.log('='.repeat(60) + '\n');

    const wasmWins = results.filter(r => r.winner === 'WASM').length;
    const jsWins = results.filter(r => r.winner === 'JavaScript').length;
    const avgSpeedup = results.reduce((sum, r) => sum + r.ratio, 0) / results.length;

    console.log(`Total benchmarks: ${results.length}`);
    console.log(`WASM wins: ${wasmWins}`);
    console.log(`JavaScript wins: ${jsWins}`);
    console.log(`Average speedup: ${avgSpeedup.toFixed(2)}×\n`);

    // Summary table
    console.log('Detailed Results:');
    console.log('-'.repeat(60));
    console.log(
        String('Benchmark').padEnd(15) +
        String('JS (ms)').padEnd(12) +
        String('WASM (ms)').padEnd(12) +
        String('Winner').padEnd(15) +
        'Speedup'
    );
    console.log('-'.repeat(60));

    results.forEach(r => {
        console.log(
            String(r.benchmark).padEnd(15) +
            String(r.js.avg.toFixed(2)).padEnd(12) +
            String(r.wasm.avg.toFixed(2)).padEnd(12) +
            String(r.winner).padEnd(15) +
            `${r.ratio.toFixed(2)}×`
        );
    });

    console.log('-'.repeat(60) + '\n');

    // Export if requested
    if (args.export) {
        const exportData = {
            timestamp: new Date().toISOString(),
            iterations: args.iterations,
            summary: {
                total: results.length,
                wasmWins,
                jsWins,
                avgSpeedup
            },
            results: results.map(r => ({
                benchmark: r.benchmark,
                js: r.js,
                wasm: r.wasm,
                speedup: r.speedup.toFixed(2),
                winner: r.winner
            }))
        };

        fs.writeFileSync(args.export, JSON.stringify(exportData, null, 2));
        console.log(`✓ Results exported to: ${args.export}\n`);
    }

    console.log('✓ Benchmark complete!\n');
}

// Run
main().catch(err => {
    console.error('\n❌ Fatal error:', err.message);
    process.exit(1);
});
