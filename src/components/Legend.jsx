import React from 'react';

function Legend() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: 'green', marginRight: '5px' }}></div>
          <p>Start Node</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: 'red', marginRight: '5px' }}></div>
          <p>End Node</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#0C3547', marginRight: '5px' }}></div>
          <p>Wall Node</p>
        </div>
      </div>
      <p style={{ marginTop: '10px' }}>
        Click and drag to move 
        <span style={{ color: 'green', fontWeight: 'bold' }}> Start</span> and 
        <span style={{ color: 'red', fontWeight: 'bold' }}> End</span> nodes. Click nodes to create and clear 
        <span style={{ color: '#0C3547', fontWeight: 'bold' }}> Walls</span>.
      </p>
    </div>
  );
}

export default Legend;