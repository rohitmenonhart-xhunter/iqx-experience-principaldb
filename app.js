// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWyppoxNYit2j9pQbWixDTPa-mVvxOVYA",
    authDomain: "principal-chat27.firebaseapp.com",
    databaseURL: "https://principal-chat27-default-rtdb.firebaseio.com",
    projectId: "principal-chat27",
    storageBucket: "principal-chat27.appspot.com",
    messagingSenderId: "1058840071207",
    appId: "1:1058840071207:web:dd70f67debeebc870fd202",
    measurementId: "G-84MNRVMXTG"
  };

// Initialize Firebase
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Reference to the complaints in the database
const complaintsRef = database.ref('complaints');

// Function to fetch and display complaints
function displayComplaints() {
    complaintsRef.on('value', function(snapshot) {
        const complaints = snapshot.val();
        let tableRows = '';
        let index = 1;
        for (let key in complaints) {
            if (complaints.hasOwnProperty(key)) {
                const { issue, role, secret_key } = complaints[key]; // Destructuring to get issue, role, and secret_key
                tableRows += `
                    <tr>
                        <td>${index}</td>
                        <td>${issue}</td>
                        <td>${role}</td>
                        <td>${secret_key}</td>
                        <td><button onclick="deleteComplaint('${key}')">Delete</button></td>
                    </tr>
                `;
                index++;
            }
        }
        document.getElementById('complaintsBody').innerHTML = tableRows;
    });
}

// Function to delete a complaint
function deleteComplaint(key) {
    if (confirm(`Are you sure you want to delete complaint '${key}'?`)) {
        complaintsRef.child(key).remove()
            .then(function() {
                console.log(`Complaint '${key}' deleted successfully.`);
            })
            .catch(function(error) {
                console.error(`Error deleting complaint: ${error}`);
            });
    }
}

// Display complaints initially
displayComplaints();