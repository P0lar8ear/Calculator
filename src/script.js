// HTML要素の取得
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let currentInput = "";
let operator = null;
let previousInput = "";
// ボタンのクリック処理
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");
        if (!value)
            return;
        if (value === "C") {
            clearDisplay();
        }
        else if (value === "=") {
            calculate();
        }
        else if (["+", "-", "*", "/"].includes(value)) {
            setOperator(value);
        }
        else {
            appendNumber(value);
        }
    });
});
// 数字を追加
function appendNumber(num) {
    currentInput += num;
    updateDisplay();
}
// 演算子を設定
function setOperator(op) {
    if (currentInput === "")
        return;
    if (operator) {
        calculate(); // 連続計算
    }
    operator = op;
    previousInput = currentInput;
    currentInput = "";
}
// 計算実行
function calculate() {
    if (!previousInput || !currentInput || !operator)
        return;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result;
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num2 !== 0 ? num1 / num2 : NaN;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = null;
    previousInput = "";
    updateDisplay();
}
// 画面をクリア
function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = null;
    updateDisplay();
}
// 表示を更新
function updateDisplay() {
    display.value = currentInput;
}
