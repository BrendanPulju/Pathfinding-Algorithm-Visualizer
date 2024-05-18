import React from 'react';

function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#0FA3B1', 
      color: 'white', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '10px' 
    }}>
      <div>
        <span>Brendan Pulju | </span>
        <span>Email: brendanpulju@gmail.com | </span>
        <span><a href="https://github.com/BrendanPulju/algorithm-visualization-tool">View Source Code on GitHub</a></span>
      </div>
      <div>
        <span>Project completed: May 2024</span>
        {/* Add more content here */}
      </div>
    </footer>
  );
}

export default Footer;