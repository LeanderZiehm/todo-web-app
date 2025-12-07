import React, { useState } from 'react';

function MyForm({ submitFunction }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (typeof inputValue === 'string') {
      submitFunction(inputValue);
      setInputValue(''); // optional: clear input after submit
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="inputText"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
