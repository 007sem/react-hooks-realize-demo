const { createRoot } = ReactDOM;
export const root = createRoot(document.getElementById("app"));

const states = [];
const stateSetters = [];

let stateIndex = 0;

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
		render();
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

export function useReducer(reducer, initialState) {
	const [state, setState] = useState(initialState);

	// action = { type, payload }
	function dispatch(action) {
		const newState = reducer(state, action);
		setState(newState);
	}

	return [state, dispatch];
}

async function render() {
	const App = (await import("./app")).default;

	stateIndex = 0; // 重置状态索引
	root.render(<App />);
}
