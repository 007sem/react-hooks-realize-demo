import { root, useState, useReducer, useEffect } from "./react";

let t = null;

function App() {
	// const [ count, setCount ] = useState(0)
	// const [ count2, setCount2 ] = useState(0)

	// function countReducer(count, { type, payload }) {
	//     switch (type) {
	//     case "PLUS":
	//         return count + payload;
	//     case "MINUS":
	//         return count - payload;
	//     case "TIMES":
	//         return count * payload;
	//     case "DIV":
	//         return count / payload;
	//     default:
	//         return count;
	//     }
	// }
	// const [count, dispatch] = useReducer(countReducer, 0);

	const [count, setCount] = useState(0);
	const [second, setSecond] = useState(0);
	useEffect(() => {
		console.log("useEffect");

		t = setInterval(() => {
			setSecond((second) => second + 1);
		}, 1000);

		//页面卸载时
		return () => {
			clearInterval(t);
			t = null;
		};
	}, []);

	useEffect(() => {
		setSecond(count);
	}, [count]);

	return (
		<div>
			{/* -----------------useState--------------- */}
			{/* <div>
                <h1>{ count }</h1>
                <button onClick={ () => setCount(count + 1) }>+</button>
                <button onClick={ () => setCount(count - 1) }>-</button>
            </div>
            <div>
                <h1>{ count2 }</h1>
                <button onClick={ () => setCount2(count2 + 1) }>+</button>
                <button onClick={ () => setCount2(count2 - 1) }>-</button>
            </div> */}

			{/* -----------------useReducer--------------- */}
			{/* <div>
                <h1>{ count }</h1>
                <button onClick={() => dispatch({ type: "PLUS", payload: 1 })}>+</button>
                <button onClick={() => dispatch({ type: "MINUS", payload: 1 })}>-</button>
            </div> */}

			{/* -----------------useEffect--------------- */}

			<div>
				<h1>{count}</h1>
				<h1>{second}s</h1>
				<button onClick={() => setCount(count + 1)}>+</button>
				<button onClick={() => setCount(count - 1)}>-</button>
			</div>
		</div>
	);
}

root.render(<App />);

export default App;
