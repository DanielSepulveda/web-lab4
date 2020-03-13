const INITIAL_STATE = {
	result: null,
	lastOperator: null,
	operation: []
};

class Calculator {
	constructor() {
		this.state = INITIAL_STATE;
	}

	calculate(v) {
		let compute = this.state.result;
		switch (this.state.lastOperator) {
			case "+":
				compute += v;
				break;
			case "-":
				compute -= v;
				break;
			case "*":
				compute *= v;
				break;
			case "/":
				compute /= v;
				break;
			case "=":
				compute = v;
				break;
			default:
				throw new Error("Operator not supported");
		}
		return compute;
	}

	add(value) {
		if (!isNaN(value)) {
			this.state.operation.push(value);
			if (this.state.result === null) {
				this.state.result = value;
			} else {
				const res = this.calculate(value);
				this.state.result = res;
			}
			this.state.operation.push("+");
			this.state.lastOperator = "+";
		}
	}

	sub(value) {
		if (!isNaN(value)) {
			this.state.operation.push(value);
			if (this.state.result === null) {
				this.state.result = value;
			} else {
				const res = this.calculate(value);
				this.state.result = res;
			}
			this.state.operation.push("-");
			this.state.lastOperator = "-";
		}
	}

	mult(value) {
		if (!isNaN(value)) {
			this.state.operation.push(value);
			if (this.state.result === null) {
				this.state.result = value;
			} else {
				const res = this.calculate(value);
				this.state.result = res;
			}
			this.state.operation.push("*");
			this.state.lastOperator = "*";
		}
	}

	div(value) {
		if (!isNaN(value)) {
			this.state.operation.push(value);
			if (this.state.result === null) {
				this.state.result = value;
			} else {
				const res = this.calculate(value);
				this.state.result = res;
			}
			this.state.operation.push("/");
			this.state.lastOperator = "/";
		}
	}

	getResult(value) {
		const res = this.calculate(value);
		this.state.operation.push(value, "=", res);
		const operation = this.state.operation.join(" ");
		this.state.result = res;
		this.state.lastOperator = "=";
		this.state.operation = [];

		return { res, operation };
	}

	reset() {
		this.state = INITIAL_STATE;
	}
}

function getElements() {
	const input = document.querySelector(".inputNumber");
	const reset = document.querySelector(".resetButton");
	const equal = document.querySelector(".equalButton");
	const add = document.querySelector("#addButton");
	const sub = document.querySelector("#substractButton");
	const mult = document.querySelector("#multiplicationButton");
	const div = document.querySelector("#divisionButton");
	const result = document.querySelector("#resultValue");
	const log = document.querySelector("#logInformation");

	return {
		input,
		reset,
		equal,
		add,
		sub,
		mult,
		div,
		result,
		log
	};
}

function init() {
	const calculator = new Calculator();
	const elements = getElements();

	elements.log.value;

	//* Clears Input
	const clearInput = () => {
		elements.input.value = null;
		elements.input.focus();
	};

	//* Reset Calculator
	elements.reset.onclick = function() {
		calculator.reset();
		elements.result.value = "";
		elements.log.value = "";
		clearInput();
	};

	//* Return result
	elements.equal.onclick = function() {
		const value = parseFloat(elements.input.value);
		const { res, operation } = calculator.getResult(value);
		elements.result.value = res;
		elements.input.value = res;
		elements.log.value += operation + "\n";
	};

	//* Add
	elements.add.onclick = function() {
		const value = parseFloat(elements.input.value);
		calculator.add(value);
		clearInput();
	};

	//* Substract
	elements.sub.onclick = function() {
		const value = parseFloat(elements.input.value);
		calculator.sub(value);
		clearInput();
	};

	//* Multiply
	elements.mult.onclick = function() {
		const value = parseFloat(elements.input.value);
		calculator.mult(value);
		clearInput();
	};

	//* Divide
	elements.div.onclick = function() {
		const value = parseFloat(elements.input.value);
		calculator.div(value);
		clearInput();
	};
}

window.onload = init;
