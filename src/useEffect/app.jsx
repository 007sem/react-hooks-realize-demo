import { root, useState, useEffect } from "./react";

let t = null;

function App() {
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
