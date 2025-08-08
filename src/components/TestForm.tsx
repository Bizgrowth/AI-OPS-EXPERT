import React, { useState } from 'react';

const TestForm: React.FC = () => {
  const [testValue, setTestValue] = useState('');

  return (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      right: '20px', 
      background: 'white', 
      padding: '20px', 
      border: '2px solid red',
      zIndex: 9999
    }}>
      <h3 style={{ color: 'black', marginBottom: '10px' }}>Test Form</h3>
      <input
        type="text"
        value={testValue}
        onChange={(e) => setTestValue(e.target.value)}
        placeholder="Can you type here?"
        style={{
          padding: '10px',
          border: '1px solid black',
          background: 'white',
          color: 'black',
          width: '200px'
        }}
      />
      <p style={{ color: 'black', marginTop: '10px' }}>Value: {testValue}</p>
    </div>
  );
};

export default TestForm;