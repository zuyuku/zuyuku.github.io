const downloadJson = (data, filename = 'data.json') => {
    // Convert the JavaScript object into a formatted JSON string
    const jsonString = JSON.stringify(data, null, 2);
    
    // Create a Blob containing the JSON data
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger the download and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Free up memory
  
    flashText("Deck exported!");
};