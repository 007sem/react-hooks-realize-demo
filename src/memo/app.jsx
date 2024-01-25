import { root, useState, memo } from "./react";

const Child = memo((props) => {
	console.log("child render");

	return <h1>count2: {props.data}</h1>;
});

function App() {
	const [count1, setCount1] = useState(0);
	const [count2, setCount2] = useState(0);

	return (
		<div>
			<h1>count1: {count1}</h1>
			<button onClick={() => setCount1(count1 + 1)}>+</button>
			<Child data={count2} />
			<button onClick={() => setCount2(count2 + 1)}>+</button>
		</div>
	);
}

root.render(<App />);

export default App;
