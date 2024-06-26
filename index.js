"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    const renderer = document.getElementById("renderer");
    const goBTN = document.getElementById("go");
    const arrayText = document.getElementById("array");
    const unsortBtn = document.getElementById("unsort");
    const stopBtn = document.getElementById("stop");
    const loadingDiv = document.getElementById("sorting-indicator");
    const rangeSlider = document.getElementById("sleepRange");
    const sleepValue = document.getElementById("Sleepvalue");
    let arr = [
        349, 183, 12, 478, 95, 334, 293, 175, 204, 432, 58, 391, 300, 150, 239, 276, 199, 402, 45, 489,
        217, 380, 165, 456, 117, 318, 267, 210, 178, 123, 307, 364, 221, 498, 136, 450, 242, 19, 375, 287,
        56, 472, 314, 102, 339, 403, 207, 378, 164, 124, 223, 340, 38, 295, 168, 460, 215, 332, 270, 129,
        320, 161, 397, 182, 486, 68, 243, 307, 134, 276, 395, 157, 289, 401, 87, 344, 210, 273, 310, 184,
        230, 482, 94, 315, 141, 378, 288, 197, 456, 139, 324, 241, 187, 465, 176, 299, 206, 481, 108, 350,
        253, 291, 204, 378, 112, 470, 137, 322, 217, 348, 127, 480, 208, 375, 186, 444, 274, 150, 498, 103,
    ];
    var delay = 10;
    rangeSlider.addEventListener("input", (event) => {
        sleepValue.innerHTML = rangeSlider.value;
        delay = parseInt(rangeSlider.value);
    });
    const updateTextArea = () => {
        arrayText.value = arr.toString();
    };
    arrayText.value = arr.toString();
    arrayText.addEventListener("input", (event) => {
        arr = arrayText.value.trim().split(",").map(Number);
        console.log(arr);
        drawAllBlocks(arr, undefined, false);
    });
    var isSorting = false;
    const ctx = renderer === null || renderer === void 0 ? void 0 : renderer.getContext("2d");
    const cHeight = renderer === null || renderer === void 0 ? void 0 : renderer.height;
    const cWidth = renderer === null || renderer === void 0 ? void 0 : renderer.width;
    let stopSorting = false;
    const gap = 50;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    console.log(cHeight, cWidth);
    stopBtn.addEventListener("click", () => {
        if (isSorting) {
            stopSorting = true;
            isSorting = false;
        }
    });
    const updateLoadingDiv = () => {
        if (isSorting) {
            loadingDiv.style.display = "flex";
        }
        else {
            loadingDiv.style.display = "none";
        }
    };
    goBTN === null || goBTN === void 0 ? void 0 : goBTN.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        var selectedValue = document.querySelector('input[name="sort"]:checked');
        if (selectedValue && isSorting === false) {
            stopSorting = false;
            switch (selectedValue.value) {
                case "merge":
                    isSorting = true;
                    updateLoadingDiv();
                    yield mergeSort(arr, 0, arr.length - 1);
                    isSorting = false;
                    updateLoadingDiv();
                    updateTextArea();
                    break;
                case "selection":
                    isSorting = true;
                    updateLoadingDiv();
                    yield selectionSort(arr);
                    isSorting = false;
                    updateLoadingDiv();
                    updateTextArea();
                    break;
                case "bubble":
                    isSorting = true;
                    updateLoadingDiv();
                    yield bubbleSort(arr);
                    isSorting = false;
                    updateLoadingDiv();
                    updateTextArea();
                    break;
                case "insertion":
                    isSorting = true;
                    updateLoadingDiv();
                    yield insertionSort(arr);
                    isSorting = false;
                    updateLoadingDiv();
                    updateTextArea();
                    break;
                default:
                    isSorting = true;
                    yield bubbleSort(arr);
                    isSorting = false;
                    updateTextArea();
                    break;
            }
        }
        else if (selectedValue === null) {
            alert("please select a sorting alorithm");
        }
        else {
            alert("array is already getting sorted");
        }
        // await mergeSort(arr, 0, arr.length - 1);
    }));
    const shuffle = (arr) => {
        let currentIndex = arr.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arr[currentIndex], arr[randomIndex]] = [
                arr[randomIndex], arr[currentIndex]
            ];
        }
    };
    unsortBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        if (isSorting) {
            alert("you can not unsort array while it is getting sorted LMAO");
        }
        else {
            shuffle(arr);
            arrayText.value = arr.toString();
            drawAllBlocks(arr);
        }
    }));
    const drawBlock = (x, height, width, color) => {
        ctx.lineWidth = width;
        ctx.strokeStyle = color !== null && color !== void 0 ? color : "black";
        ctx.beginPath();
        ctx.moveTo(x, cHeight);
        ctx.lineTo(x, cHeight - height);
        ctx.stroke();
    };
    const merge = (arr, start, middle, end) => __awaiter(void 0, void 0, void 0, function* () {
        if (stopSorting) {
            return;
        }
        let n1 = middle - start + 1;
        let n2 = end - middle;
        let arr1 = new Array(n1);
        let arr2 = new Array(n2);
        for (let i = 0; i < n1; i++) {
            arr1[i] = arr[i + start];
        }
        for (let j = 0; j < n2; j++) {
            arr2[j] = arr[j + middle + 1];
        }
        let i = 0;
        let j = 0;
        let k = start;
        while (i < n1 && j < n2) {
            if (arr1[i] >= arr2[j]) {
                arr[k] = arr2[j];
                j++;
                yield drawAllBlocks(arr);
            }
            else {
                arr[k] = arr1[i];
                i++;
                yield drawAllBlocks(arr);
            }
            k++;
        }
        while (i < n1) {
            arr[k] = arr1[i];
            i++;
            k++;
            yield drawAllBlocks(arr);
        }
        while (j < n2) {
            arr[k] = arr2[j];
            j++;
            k++;
            yield drawAllBlocks(arr);
        }
        if (start === 0 && end === arr.length - 1) {
            yield drawAllBlocks(arr, "green");
        }
    });
    const mergeSort = (arr, start, end) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("merge sort called");
        if (start >= end) {
            return;
        }
        let middle = Math.floor(((start + end) / 2));
        yield mergeSort(arr, start, middle);
        yield mergeSort(arr, middle + 1, end);
        yield merge(arr, start, middle, end);
    });
    const selectionSort = (arr) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("selection sort called");
        let n = arr.length;
        for (let i = 0; i < n; i++) {
            let min = arr[i];
            let minIDX = i;
            for (let j = i + 1; j < n; j++) {
                if (stopSorting) {
                    return;
                }
                if (min > arr[j]) {
                    console.log("shuffling");
                    min = arr[j];
                    minIDX = j;
                    yield drawAllBlocks(arr);
                }
            }
            let temp = arr[i];
            arr[i] = arr[minIDX];
            arr[minIDX] = temp;
        }
        console.log(arr);
        yield drawAllBlocks(arr, "green");
    });
    const insertionSort = (arr) => __awaiter(void 0, void 0, void 0, function* () {
        let n = arr.length;
        for (let i = 1; i < n; i++) {
            let j = i - 1;
            let temp = arr[i];
            while (j >= 0 && arr[j] > temp) {
                if (stopSorting) {
                    return;
                }
                arr[j + 1] = arr[j];
                yield drawAllBlocks(arr);
                j--;
            }
            arr[j + 1] = temp;
            yield drawAllBlocks(arr);
        }
        yield drawAllBlocks(arr, "green");
    });
    const bubbleSort = (arr) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("bubble sort called");
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (stopSorting) {
                    isSorting = false;
                    return;
                }
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    yield drawAllBlocks(arr);
                }
            }
        }
        console.log("over here");
        yield drawAllBlocks(arr, "green");
    });
    const drawAllBlocks = (arr_1, color_1, ...args_1) => __awaiter(void 0, [arr_1, color_1, ...args_1], void 0, function* (arr, color, wait = true) {
        ctx.clearRect(0, 0, cWidth, cHeight);
        const totalGapWidth = (arr.length + 1) * gap;
        const availableWidth = cWidth - totalGapWidth;
        const blockWidth = availableWidth / arr.length;
        let x = gap;
        for (let i = 0; i < arr.length; i++) {
            drawBlock(x, arr[i], blockWidth, color);
            x = x + gap + blockWidth;
        }
        if (wait) {
            yield sleep(delay);
        }
    });
    yield drawAllBlocks(arr);
    updateLoadingDiv();
    // await mergeSort(arr, 0, arr.length - 1);
}))();
//# sourceMappingURL=index.js.map