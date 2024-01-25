import { root, useState } from "./react";

function App() {
	const [ count, setCount ] = useState(0)
	const [ count2, setCount2 ] = useState(0)

	return (
		<div>
			{/* -----------------useState--------------- */}
			 <div>
                <h1>{ count }</h1>
                <button onClick={ () => setCount(count + 1) }>+</button>
                <button onClick={ () => setCount(count - 1) }>-</button>
            </div>
            <div>
                <h1>{ count2 }</h1>
                <button onClick={ () => setCount2(count2 + 1) }>+</button>
                <button onClick={ () => setCount2(count2 - 1) }>-</button>
            </div> 
		</div>
	);
}

root.render(<App />);

export default App;
