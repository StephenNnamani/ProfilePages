// Function to fetch and display API data - returns a Promise
async function fetchData() {
  const container = document.getElementById('dataContainer');
  container.innerHTML = 'Loading...'; // Show loading state
  
  try {
      // Replace this URL with your actual API endpoint
      const response = await fetch('http://universities.hipolabs.com/search?country=United+Kingdom');
      
      // Check if response is ok
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Return the data and update UI
      container.innerHTML = `
          <h2>API Data</h2>
          <pre>${JSON.stringify(data, null, 2)}</pre>
      `;
      
      return data; // Return the fetched data for awaiting
      
  } catch (error) {
      container.innerHTML = `<p class="error">Error fetching data: ${error.message}</p>`;
      throw error; // Re-throw the error so it can be caught by awaiters
  }
}

// Function to update the UI and handle the refresh
async function updateData() {
  try {
      const data = await fetchData();
      console.log('Data fetched successfully:', data);
  } catch (error) {
      console.error('Update failed:', error);
  }
}

// Function to show when data was last updated
function updateTimestamp() {
  const container = document.getElementById('dataContainer');
  const timestamp = new Date().toLocaleTimeString();
  if (!container.querySelector('.timestamp')) {
      container.insertAdjacentHTML('beforeend', 
          '<p class="timestamp">Last updated: ' + timestamp + '</p>'
      );
  } else {
      container.querySelector('.timestamp').textContent = 
          'Last updated: ' + timestamp;
  }
}

// Initial fetch
updateData();

// Set up refresh every 1 minute (60000 milliseconds)
setInterval(updateData, 60000);

// Update timestamp every second
setInterval(updateTimestamp, 1000);