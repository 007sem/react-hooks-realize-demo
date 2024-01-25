import { root, useState, useMemo, useCallback } from "./react";

const Child = memo((props) => {
	console.log("child render");

	return (
		<div>
			<h1>count2: {props.value}</h1>
			<button onClick={props.callback}> + </button>
		</div>
	);
});

function App() {
	const [count1, setCount1] = useState(0);
	const [count2, setCount2] = useState(0);

	const object = useMemo(() => ({ value: count2 }), [count2]);

	const callback = useCallback(() => {
		console.log("callback invoked");
		setCount2(count2 + 1);
	}, []);

	return (
		<div>
			<h1>count1: {count1}</h1>
			<button onClick={() => setCount1(count1 + 1)}>+</button>

			<Child value={object.value} callback={callback} />
		</div>
	);
}

root.render(<App />);

export default App;
