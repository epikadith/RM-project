#!/usr/bin/env node
/**
 * Simple Benchmark Runner - runs JavaScript only for now
 * WASM benchmarks can be tested in the browser
 */

const fs = require('fs');
const path = require('path');

// Load JavaScript benchmarks
const { benchmarks, measureTime, mandelbrotJS, matrixMultiplicationJS, fftSimulationJS, 
    arraySortingJS, arrayIterationJS, memoryOperationsJS, vectorOperationsJS,
    primeGenerationJS, gaussianBlurJS, fibonacciJS, stringProcessingJS, dataProcessingJS } = require('./benchmarks/js/benchmarks.js');

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

// Run JS benchmark
function runJSBenchmark(benchmarkName, iterations = 1) {
    const results = [];
    
    for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        
        switch (benchmarkName) {
            case 'mandelbrot':
                mandelbrotJS(512, 512, 100);
                break;
            case 'matrix':
                matrixMultiplicationJS(128);
                break;
            case 'fft':
                fftSimulationJS(1024);
                break;
            case 'iteration':
                arrayIterationJS(1000000);
                break;
            case 'memory':
                memoryOperationsJS(10000000);
                break;
            case 'vector':
                vectorOperationsJS(1000000);
                break;
            case 'primes':
                primeGenerationJS(100000);
                break;
            case 'fib':
                fibonacciJS(30);
                break;
            case 'data':
                dataProcessingJS(100);
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
function main() {
    const args = parseArgs();
    
    console.log('\n' + '='.repeat(60));
    console.log('⚡ JavaScript Performance Benchmarks');
    console.log('   (WASM benchmarks available in browser at http://localhost:3000/benchmark.html)');
    console.log('='.repeat(60) + '\n');

    const benchmarkList = [
        'mandelbrot', 'matrix', 'fft', 'iteration', 'memory', 'vector', 'primes', 'fib', 'data'
    ];

    const selectedBenchmarks = args.benchmark 
        ? [args.benchmark]
        : benchmarkList;

    const results = [];

    for (const benchmarkName of selectedBenchmarks) {
        console.log(`📊 ${benchmarkName.toUpperCase()}`);
        console.log('-'.repeat(60));

        try {
            console.log(`  🟨 Running (${args.iterations} iteration${args.iterations > 1 ? 's' : ''})...`);
            const jsResults = runJSBenchmark(benchmarkName, args.iterations);
            const jsStats = calculateStats(jsResults);
            const jsFormatted = formatStats(jsStats);
            
            console.log(`     Min:    ${jsFormatted.min}`);
            console.log(`     Avg:    ${jsFormatted.avg}`);
            console.log(`     Max:    ${jsFormatted.max}`);
            console.log(`     Median: ${jsFormatted.median}`);
            if (args.verbose) {
                console.log(`     Std Dev: ${jsFormatted.stdDev}`);
            }

            results.push({
                benchmark: benchmarkName,
                js: jsStats
            });

            console.log();

        } catch (error) {
            console.error(`  ❌ Error: ${error.message}\n`);
        }
    }

    // Summary
    console.log('='.repeat(60));
    console.log('📈 SUMMARY');
    console.log('='.repeat(60) + '\n');

    console.log(`Total benchmarks: ${results.length}`);
    console.log(`Average JS time: ${(results.reduce((s, r) => s + r.js.avg, 0) / results.length).toFixed(2)}ms\n`);

    console.log('Detailed Results:');
    console.log('-'.repeat(60));
    console.log(
        String('Benchmark').padEnd(15) +
        String('Min (ms)').padEnd(12) +
        String('Avg (ms)').padEnd(12) +
        'Max (ms)'
    );
    console.log('-'.repeat(60));

    results.forEach(r => {
        console.log(
            String(r.benchmark).padEnd(15) +
            String(r.js.min.toFixed(2)).padEnd(12) +
            String(r.js.avg.toFixed(2)).padEnd(12) +
            r.js.max.toFixed(2)
        );
    });

    console.log('-'.repeat(60) + '\n');

    // Export if requested
    if (args.export) {
        const exportData = {
            timestamp: new Date().toISOString(),
            type: 'JavaScript benchmarks',
            iterations: args.iterations,
            results: results.map(r => ({
                benchmark: r.benchmark,
                min: r.js.min,
                avg: r.js.avg,
                max: r.js.max,
                median: r.js.median,
                stdDev: r.js.stdDev
            }))
        };

        fs.writeFileSync(args.export, JSON.stringify(exportData, null, 2));
        console.log(`✓ Results exported to: ${args.export}\n`);
    }

    console.log('✓ Benchmark complete!\n');
    console.log('💡 Tip: Open http://localhost:3000/benchmark.html to compare with WASM\n');
}

// Run
try {
    main();
} catch (err) {
    console.error('\n❌ Fatal error:', err.message);
    console.error(err.stack);
    process.exit(1);
}
