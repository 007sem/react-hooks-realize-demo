const { createRoot } = ReactDOM;
export const root = createRoot(document.getElementById("app"));

const states = [];
const stateSetters = [];
const memoArr = [];
const callbackArr = [];

let stateIndex = 0;
let memoIndex = 0;
let callbackIndex = 0;

function createState(initialState) {
	return states[stateIndex] ? states[stateIndex] : initialState;
}
function createStateSetter(index) {
	return (newState) => {
		if (typeof newState == "function") {
			// 将函数执行并且将形参绑定到对应的值上
			states[index] = newState(states[index]);
		} else {
			states[index] = newState; // 直接覆盖
		}
		render(); // 每次修改值重新渲染
	};
}

export const useState = (initialState) => {
	states[stateIndex] = createState(initialState, stateIndex);

	if (!stateSetters[stateIndex]) {
		stateSetters.push(createStateSetter(stateIndex));
	}

	const _state = states[stateIndex];
	const _setter = stateSetters[stateIndex];

	stateIndex++;

	return [_state, _setter];
};

export const useMemo = (cb, depArr) => {
	if (memoArr[memoIndex]) {
		const [_memo, _depArr] = memoArr[index];
		const isFullySame = depArr.every((dep, index) => {
			dep == _depArr[index];
		});

		if (isFullySame) {
			return _memo;
		} else {
			return setNewMemo(cb, depArr);
		}
	} else {
		return setNewMemo(cb, depArr);
	}

	function setNewMemo(cb, depArr) {
		const memo = cb();
		memoArr[memoIndex] = [cb, depArr];
		memoIndex++;
		return memo;
	}
};

export const useCallback = (cb, depArr) => {
	if (callbackArr[callbackIndex]) {
		const [_cb, _depArr] = callbackArr[callbackIndex];
		const isFullySame = depArr.every((dep, index) => {
			dep === _depArr[index];
		});
		if (isFullySame) {
			return _cb;
		} else {
			return setNewCallback(cb, depArr);
		}
	} else {
		return setNewCallback(cb, depArr);
	}

	function setNewCallback(cb, depArr) {
		callbackArr[callbackIndex] = [cb, depArr];
		callbackIndex++;
		return cb;
	}
};

async function render() {
	const App = (await import("./app")).default;

	stateIndex = 0; // 重置状态索引
	memoIndex = 0;
	callbackIndex = 0;
	root.render(<App />);
}
