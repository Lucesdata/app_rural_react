import React from 'react';

const TestApp = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#ff0000',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      zIndex: 9999
    }}>
      <div>
        <h1>Test App is Working!</h1>
        <p>If you can see this, React is rendering correctly.</p>
      </div>
    </div>
  );
};

export default TestApp;
