import { useState } from 'react';

export function App() {
  const [times, setTimes] = useState(0);

  return (
    <div>
      <h1>Hello {times}</h1>
      <button onClick={() => setTimes(times => times + 1)}>ADD</button>
    </div>
  );
}
