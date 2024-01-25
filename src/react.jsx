const { createRoot } = ReactDOM;
export const root = createRoot(document.getElementById("app"));

const states = [];
const stateSetters = [];

const effectDepArr = [];

let stateIndex = 0;
let effectIndex = 0;

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

  function dispatch(action) {
    const newState = reducer(state, action);
    setState(newState);
  }

  return [state, dispatch];
}

export const useEffect = (cb, depArr) => {
  if (typeof cb !== "function") {
    throw new TypeError("callback must be a function");
  }

  // 检查是否提供了依赖数组，如果未提供，则每次渲染都执行副作用回调
  if (depArr === undefined) {
    cb();
  }
  // 检查依赖数组的类型是否为数组
  else if (!Array.isArray(depArr)) {
    throw new TypeError("dependencies must be an array");
  } else {
    // 检查依赖数组中的值是否发生了变化
    // 注意，这里是通过将数组直接拿值的方式作比较来检查数组是否变化，而不是数据劫持响应式那一套
    const isChanged = effectDepArr[effectIndex]
      ? depArr.some((dep, index) => dep !== effectDepArr[effectIndex][index])
      : true;

    // 如果依赖数组中的值发生了变化，则执行副作用回调
    isChanged && cb();

    // 将当前依赖数组保存到 effectDepArr 中
    effectDepArr[effectIndex] = depArr;

    // 增加 effectIndex 的值，以便下一个 useEffect 调用使用不同的索引
    effectIndex++;
  }
};

async function render() {
  const App = (await import("./app")).default;

  stateIndex = 0; // 重置状态索引
  effectIndex = 0; // 重置副作用索引
  root.render(<App />);
}
