use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn grayscale(mut pixels: Vec<u8>) -> Vec<u8> {
    // pixels is a flat array of RGBA values [R, G, B, A, R, G, B, A, ...]
    // Each pixel is 4 bytes (R, G, B, A)

    // Ensure the length is a multiple of 4 (RGBA)
    if pixels.len() % 4 != 0 {
        // Handle error or just return original. For simplicity, we'll assume valid input.
        return pixels;
    }

    // Iterate over the pixels, 4 bytes at a time
    // i represents the index of the Red component for each pixel
    for i in (0..pixels.len()).step_by(4) {
        let r = pixels[i] as f32;
        let g = pixels[i + 1] as f32;
        let b = pixels[i + 2] as f32;

        // Grayscale formula (luminance method)
        // Convert to f32 for calculation, then back to u8 for storage
        let gray = (0.299 * r + 0.587 * g + 0.114 * b).round() as u8;

        pixels[i] = gray;     // Set Red
        pixels[i + 1] = gray; // Set Green
        pixels[i + 2] = gray; // Set Blue
        // Alpha (pixels[i+3]) remains unchanged
    }

    pixels
}

// ============================================
// 1. COMPLEX MATH BENCHMARKS
// ============================================

/// Mandelbrot Set Calculation
#[wasm_bindgen]
pub fn mandelbrot_wasm(width: usize, height: usize, max_iterations: u32) -> Vec<u8> {
    let mut result = vec![0u8; width * height];
    
    for y in 0..height {
        for x in 0..width {
            let cr = (x as f32 / width as f32) * 3.5 - 2.5;
            let ci = (y as f32 / height as f32) * 2.0 - 1.0;
            
            let mut zr = 0.0;
            let mut zi = 0.0;
            let mut iterations = 0u32;
            
            while iterations < max_iterations && zr * zr + zi * zi < 4.0 {
                let temp = zr * zr - zi * zi + cr;
                zi = 2.0 * zr * zi + ci;
                zr = temp;
                iterations += 1;
            }
            
            result[y * width + x] = ((iterations as f32 / max_iterations as f32) * 255.0) as u8;
        }
    }
    
    result
}

/// Matrix Multiplication
#[wasm_bindgen]
pub fn matrix_multiplication_wasm(size: usize) -> Vec<f32> {
    let mut a = vec![0.0f32; size * size];
    let mut b = vec![0.0f32; size * size];
    let mut c = vec![0.0f32; size * size];
    
    // Initialize with simple pattern (more predictable than random)
    for i in 0..size * size {
        a[i] = ((i as f32) % 100.0) / 100.0;
        b[i] = ((i as f32) % 50.0) / 50.0;
    }
    
    // Perform multiplication
    for i in 0..size {
        for j in 0..size {
            let mut sum = 0.0;
            for k in 0..size {
                sum += a[i * size + k] * b[k * size + j];
            }
            c[i * size + j] = sum;
        }
    }
    
    c
}

/// FFT Simulation - Complex number operations
#[wasm_bindgen]
pub fn fft_simulation_wasm(size: usize) -> Vec<f32> {
    let mut real = vec![0.0f32; size];
    let mut imag = vec![0.0f32; size];
    
    // Initialize with pattern
    for i in 0..size {
        real[i] = ((i as f32) % 100.0) / 100.0;
    }
    
    // Simplified FFT-like processing
    let mut stage = 1;
    while stage < size {
        let mut i = 0;
        while i < size {
            for j in 0..stage {
                let angle = (-2.0 * std::f32::consts::PI * j as f32) / (stage as f32 * 2.0);
                let cos_val = angle.cos();
                let sin_val = angle.sin();
                
                let idx1 = i + j;
                let idx2 = i + j + stage;
                
                let t_real = real[idx2] * cos_val - imag[idx2] * sin_val;
                let t_imag = real[idx2] * sin_val + imag[idx2] * cos_val;
                
                real[idx2] = real[idx1] - t_real;
                imag[idx2] = imag[idx1] - t_imag;
                real[idx1] += t_real;
                imag[idx1] += t_imag;
            }
            i += stage * 2;
        }
        stage *= 2;
    }
    
    // Return interleaved real and imag
    let mut result = vec![0.0f32; size * 2];
    for i in 0..size {
        result[2 * i] = real[i];
        result[2 * i + 1] = imag[i];
    }
    result
}

// ============================================
// 2. RAW SPEED BENCHMARKS
// ============================================

/// Array Iteration and Arithmetic
#[wasm_bindgen]
pub fn array_iteration_wasm(size: usize) -> f32 {
    let mut arr = vec![0.0f32; size];
    
    for i in 0..size {
        arr[i] = ((i as f32) % 100.0) / 100.0;
    }
    
    let mut sum = 0.0;
    for i in 0..size {
        sum += arr[i] * 1.5 + arr[i].sqrt();
    }
    
    sum
}

/// Memory Operations
#[wasm_bindgen]
pub fn memory_operations_wasm(size: usize) -> u32 {
    let mut buffer = vec![0u8; size];
    
    // Fill with pattern
    for i in 0..size {
        buffer[i] = (i % 256) as u8;
    }
    
    // Read and process
    let mut checksum = 0u32;
    for i in 0..size {
        checksum = ((checksum + buffer[i] as u32) % 65536);
    }
    
    checksum
}

/// Vector Operations - SIMD friendly
#[wasm_bindgen]
pub fn vector_operations_wasm(size: usize) -> f32 {
    let mut data = vec![0.0f32; size];
    
    for i in 0..size {
        data[i] = ((i as f32) % 100.0) / 100.0;
    }
    
    let mut result = 0.0;
    for chunk in data.chunks(4) {
        for val in chunk {
            result += val * val + val.sin();
        }
    }
    
    result
}

// ============================================
// 3. HEAVY ALGORITHMS BENCHMARKS
// ============================================

/// Prime Number Generation - Sieve of Eratosthenes
#[wasm_bindgen]
pub fn prime_generation_wasm(limit: usize) -> Vec<u8> {
    let mut is_prime = vec![1u8; limit];
    is_prime[0] = 0;
    is_prime[1] = 0;
    
    for i in 2..((limit as f32).sqrt() as usize + 1) {
        if is_prime[i] != 0 {
            for j in (i * i..limit).step_by(i) {
                is_prime[j] = 0;
            }
        }
    }
    
    is_prime
}

/// Gaussian Blur
#[wasm_bindgen]
pub fn gaussian_blur_wasm(width: usize, height: usize, image_data: &[u8]) -> Vec<u8> {
    let mut result = vec![0u8; image_data.len()];
    
    let kernel = [
        [1.0/16.0, 2.0/16.0, 1.0/16.0],
        [2.0/16.0, 4.0/16.0, 2.0/16.0],
        [1.0/16.0, 2.0/16.0, 1.0/16.0],
    ];
    
    for y in 1..(height - 1) {
        for x in 1..(width - 1) {
            let mut sum = 0.0;
            
            for ky in 0..3 {
                for kx in 0..3 {
                    let y_off = y + ky - 1;
                    let x_off = x + kx - 1;
                    let idx = (y_off * width + x_off) * 4;
                    sum += image_data[idx] as f32 * kernel[ky][kx];
                }
            }
            
            let result_idx = (y * width + x) * 4;
            result[result_idx] = sum.round() as u8;
            result[result_idx + 1] = sum.round() as u8;
            result[result_idx + 2] = sum.round() as u8;
            result[result_idx + 3] = 255;
        }
    }
    
    result
}

/// Recursive Fibonacci (memoized simulation via iteration)
#[wasm_bindgen]
pub fn fibonacci_wasm(n: u32) -> u64 {
    if n <= 1 {
        return n as u64;
    }
    
    let mut a = 0u64;
    let mut b = 1u64;
    
    for _ in 2..=n {
        let temp = a + b;
        a = b;
        b = temp;
    }
    
    b
}

/// String-like processing with sorting
#[wasm_bindgen]
pub fn data_processing_wasm(iterations: u32) -> usize {
    let mut data = vec![0u32; 1000];
    
    // Fill with pattern
    for i in 0..1000 {
        data[i] = ((i as u32 * 7) % 1000);
    }
    
    for _ in 0..iterations {
        // Perform sorting-like operations
        data.sort_unstable();
        
        // Perform filtering-like operations
        let filtered: Vec<u32> = data.iter()
            .filter(|&&x| x % 2 == 0)
            .map(|&x| x * x)
            .collect();
        
        // Fold back to data
        for (i, val) in filtered.iter().enumerate() {
            if i < data.len() {
                data[i] = *val % 1000;
            }
        }
    }
    
    data.len()
}