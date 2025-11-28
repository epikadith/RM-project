import * as wasm from "./image_filter_wasm_bg.wasm";
export * from "./image_filter_wasm_bg.js";
import { __wbg_set_wasm } from "./image_filter_wasm_bg.js";
__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
