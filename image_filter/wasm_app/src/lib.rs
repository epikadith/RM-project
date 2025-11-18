use wasm_bindgen::prelude::*;
use js_sys::Math;

// --- TEST 1: Dynamic Matrix Multiplication (N x N) ---
// Complexity: O(N^3) - Extremely CPU Intensive
#[wasm_bindgen]
pub fn multiply_matrices_dynamic(data_a: &[f64], data_b: &[f64], n: usize) -> Vec<f64> {
    let mut result = vec![0.0; n * n];
    for i in 0..n {
        for j in 0..n {
            let mut sum = 0.0;
            for k in 0..n {
                sum += data_a[i * n + k] * data_b[k * n + j];
            }
            result[i * n + j] = sum;
        }
    }
    result
}

// --- TEST 2: Image Processing (Greyscale) ---
// Complexity: O(N) - Memory & Bridge Intensive
#[wasm_bindgen]
pub fn grayscale_image(data: &[u8]) -> Vec<u8> {
    let mut new_data = data.to_vec();
    for i in (0..new_data.len()).step_by(4) {
        let r = new_data[i] as f32;
        let g = new_data[i + 1] as f32;
        let b = new_data[i + 2] as f32;
        let gray = (0.299 * r + 0.587 * g + 0.114 * b) as u8;
        new_data[i] = gray;
        new_data[i + 1] = gray;
        new_data[i + 2] = gray;
    }
    new_data
}

// --- TEST 3: Merge Sort (Large Dataset) ---
// Complexity: O(N log N) - Recursion & Memory Intensive
#[wasm_bindgen]
pub fn sort_array(data: &[i32]) -> Vec<i32> {
    let mut arr = data.to_vec();
    let len = arr.len();
    merge_sort_helper(&mut arr, 0, len - 1);
    arr
}

fn merge_sort_helper(arr: &mut [i32], left: usize, right: usize) {
    if left < right {
        let mid = left + (right - left) / 2;
        merge_sort_helper(arr, left, mid);
        merge_sort_helper(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

fn merge(arr: &mut [i32], left: usize, mid: usize, right: usize) {
    let n1 = mid - left + 1;
    let n2 = right - mid;
    let left_arr = arr[left..=mid].to_vec();
    let right_arr = arr[mid+1..=right].to_vec();

    let (mut i, mut j, mut k) = (0, 0, left);
    while i < n1 && j < n2 {
        if left_arr[i] <= right_arr[j] {
            arr[k] = left_arr[i];
            i += 1;
        } else {
            arr[k] = right_arr[j];
            j += 1;
        }
        k += 1;
    }
    while i < n1 { arr[k] = left_arr[i]; i += 1; k += 1; }
    while j < n2 { arr[k] = right_arr[j]; j += 1; k += 1; }
}

// --- TEST 4: K-Means Clustering (Data Science) ---
// Complexity: Iterative Calculation - Math Heavy
#[wasm_bindgen]
pub fn k_means_clustering(points: &[f64], k: usize, iterations: usize) -> Vec<f64> {
    let n = points.len() / 2; // Each point has (x, y)
    // 1. Initialize centroids randomly (take first K points for simplicity in benchmark)
    let mut centroids = points[0..k*2].to_vec();
    
    for _ in 0..iterations {
        // 2. Assign points to clusters
        let mut assignments = vec![0; n];
        let mut cluster_sums = vec![0.0; k * 2];
        let mut cluster_counts = vec![0; k];

        for i in 0..n {
            let px = points[2*i];
            let py = points[2*i+1];
            
            let mut min_dist = f64::MAX;
            let mut best_cluster = 0;

            for c in 0..k {
                let cx = centroids[2*c];
                let cy = centroids[2*c+1];
                let dist = (px - cx).powi(2) + (py - cy).powi(2); // Squared Euclidean
                if dist < min_dist {
                    min_dist = dist;
                    best_cluster = c;
                }
            }
            assignments[i] = best_cluster;
            cluster_sums[2*best_cluster] += px;
            cluster_sums[2*best_cluster+1] += py;
            cluster_counts[best_cluster] += 1;
        }

        // 3. Update centroids
        for c in 0..k {
            if cluster_counts[c] > 0 {
                centroids[2*c] = cluster_sums[2*c] / cluster_counts[c] as f64;
                centroids[2*c+1] = cluster_sums[2*c+1] / cluster_counts[c] as f64;
            }
        }
    }
    centroids
}