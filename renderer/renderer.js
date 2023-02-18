function listdir() {
    api.send('listdir', { // Send a message to the main process on channel 'listdir'
        message: 'Hello from the renderer process!' // Message to send, can be a string, dictionary, array, etc.
    }); // Send a message to the main process
}
api.toRenderer('listdir', (event, data) => { // Listen for a message on channel 'listdir', sent from the main process
    console.log(data); // Log the data
    let element = document.getElementById('directory')
    element.innerHTML = 'Contents: ' + data.files.join(', '); // Display the files in the list
    element.style.display = 'block'; // Display the list
});