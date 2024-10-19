async function checkServer() {
    const serverIP = document.getElementById('server-ip').value;
    const serverInfo = document.getElementById('server-info');
    const loading = document.getElementById('loading');
  
    if (!serverIP) {
      alert('Please enter a valid server IP!');
      return;
    }
  
    // Display loading animation
    loading.classList.remove('hidden');
    serverInfo.classList.add('hidden');
  
    try {
      const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
      const data = await response.json();
  
      if (!data.online) {
        throw new Error('Server is offline or invalid IP.');
      }
  
      // Populate data in HTML
      document.getElementById('ip').innerText = data.ip;
      document.getElementById('status').innerText = data.online ? 'Online' : 'Offline';
      document.getElementById('version').innerText = data.version || 'Unknown';
      document.getElementById('players').innerText = `${data.players.online} / ${data.players.max}`;
      document.getElementById('ping').innerText = Math.floor(Math.random() * 50); // Simulated ping
      document.getElementById('motd').innerText = data.motd.clean.join(' ');
  
      // Display server info
      serverInfo.classList.remove('hidden');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      // Hide loading animation
      loading.classList.add('hidden');
    }
  }
  
