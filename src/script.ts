const display = document.getElementById("display") as HTMLInputElement;
const buttons = document.querySelectorAll("button");

let currentInput: string = "";
let operator: string | null = null;
let previousInput: string = "";
let isResultDisplayed: boolean = false; // 計算結果が表示されたかどうか

// ボタンのクリック処理
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (!value) return;

    if (value === "C") {
      clearDisplay();
    } else if (value === "=") {
      calculate();
    } else if (["+", "-", "*", "/"].includes(value)) {
      setOperator(value);
    } else {
      appendNumber(value);
    }
  });
});

// 数字を追加
function appendNumber(num: string) {
  if (isResultDisplayed) {
    currentInput = ""; // 計算結果が表示された後はリセット
    isResultDisplayed = false;
  }
  currentInput += num;
  updateDisplay();
}

// 演算子を設定
function setOperator(op: string) {
  if (currentInput === "") return;

  if (operator) {
    calculate(); // 連続計算
  }

  operator = op;
  previousInput = currentInput;
  currentInput = "";
}

// 計算実行
function calculate() {
  if (!previousInput || !currentInput || !operator) return;

  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  let result: number;

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
  isResultDisplayed = true;
  updateDisplay();
}

// 画面をクリア
function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = null;
  isResultDisplayed = false;
  updateDisplay();
}

// 表示を更新
function updateDisplay() {
  display.value = currentInput;
}
