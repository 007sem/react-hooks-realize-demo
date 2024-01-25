import { root, useReducer } from "./react";

function App() {
	function countReducer(count, { type, payload }) {
		switch (type) {
			case "PLUS":
				return count + payload;
			case "MINUS":
				return count - payload;
			case "TIMES":
				return count * payload;
			case "DIV":
				return count / payload;
			case "INPUT":
				return count = payload;
			default:
				return count;
		}
	}
	const [count, dispatch] = useReducer(countReducer, 0);

	return (
		<div>
			{/* -----------------useReducer--------------- */}
			<div>
				<h1>{count}</h1>
				<button onClick={() => dispatch({ type: "PLUS", payload: 1 })}>
					+
				</button>
				<button onClick={() => dispatch({ type: "MINUS", payload: 1 })}>
					-
				</button>
				<button onClick={() => dispatch({ type: "TIMES", payload: 2 })}>
					*2
				</button>
				<button onClick={() => dispatch({ type: "DIV", payload: 2 })}>
					/2
				</button>
				<input type="number" onChange={(e)=> dispatch({ type: "INPUT", payload: e.target.value })}/>
			</div>
		</div>
	);
}

root.render(<App />);

export default App;
