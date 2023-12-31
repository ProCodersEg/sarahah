var firebaseConfig = {
	apiKey: "AIzaSyBEtXBiFXnk3jPmb6wdfW4SOvMXJQIjCzg",
	authDomain: "saraha-5e7fd.firebaseapp.com",
	databaseURL: "https://saraha-5e7fd-default-rtdb.firebaseio.com/",
	projectId: "saraha-5e7fd",
	storageBucket: "saraha-5e7fd.appspot.com",
	messagingSenderId: "942089850758",
	appId: "1:942089850758:web:bc767461bc426a904e2607"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const serverKey = "AAAA21juT4Y:APA91bEUomQIsA6OcAaQI8lxcstgH4RMVrLyD4vgoU_lTqrO86vrCEJ1sT-f6e8IS0zacaQ8_jYXVCxVLfUiOb8ZA9kvci4NA1kGl1f32Ybx--DCIhFL5itdZl7eWb-iX_nyxHhc3ktP";
// Replace with your actual Firebase Cloud Messaging server key
// Function to get URL parameters
function getURLParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}



// Fetch the user ID from the URL
var username = getURLParameter('user_id');


function getInputVal(id) {
	return document.getElementById(id).value;
}

document.getElementById('contact-form').addEventListener('submit', submitForm);

function submitForm(e) {
	e.preventDefault();

	// Get the input values within the submitForm function
	var name = getInputVal('name');
	var message = getInputVal('message'); // Get the message input value

	console.log('Name:', name);
	console.log('Message:', message);


	// Show the loading dialog
	var loadingDialog = document.getElementById('loading-dialog');
	if (loadingDialog) {
		loadingDialog.style.display = 'block';
	}

	// Set a 5-second delay for demonstration purposes
	setTimeout(function() {
		// Call the saveMessage function with the name and message values
		saveMessage(name, message);
	}, 100); // 4000 milliseconds (4 seconds) delay
}


// Function to fetch the user ID based on the username
function fetchUserIdByUsername(username) {
	return new Promise(function(resolve, reject) {
		var usersRef = firebase.database().ref('users');

		// Query the database to find the user with the given username
		usersRef.orderByChild('username').equalTo(username).once('value', function(snapshot) {
			if (snapshot.exists()) {
				// User with the given username found, get the user ID
				var userId = Object.keys(snapshot.val())[0]; // Assuming usernames are unique
				console.log('User ID for username', username, 'is', userId);
				resolve(userId); // Resolve the promise with the userId


			} else {
				reject(new Error('User not found')); // Reject the promise if the user is not found
			}
		});
	});
}


// Example usage:
fetchUserIdByUsername(username)
	.then(function(userId) {
		// Use the retrieved userId here
		console.log('User ID is', userId);
		// You can place the rest of your code here
		var userNameRef = firebase.database().ref('users/' + userId + '/name');
		// Fetch the user's name and set it as the placeholder for the textarea
		userNameRef.once('value', function(snapshot) {

			var userName = snapshot.val();
			if (userName) {
				// Update the textarea's placeholder with the retrieved username userName
				document.getElementById('message').placeholder = `Type your message to "${userName}" send privately here...`;
				document.getElementById('userName').textContent = `${userName}`;
			} else {
				// Handle the case where the username is not found
				document.getElementById('message').placeholder = `Type your message to this user...`;
				document.getElementById('userName').textContent = `Tell your openion honsetly`;
			}
		});

	})
	.catch(function(error) {
		console.error('Error:', error.message);
		document.getElementById('message').placeholder = `Something went whrong...`;
		document.getElementById('userName').textContent = `Tell your openion honsetly`;

		var submitButton = document.querySelector('button[type="submit"]');
		if (submitButton) {
			submitButton.disabled = true;
		}
		var invalidUserIdToast = document.getElementById('invalid-user-id-toast');
		if (invalidUserIdToast) {
			invalidUserIdToast.style.display = 'block';
			// Hide the toast message after 3 seconds (3000 milliseconds)
			setTimeout(function() {
				invalidUserIdToast.style.display = 'none';
			}, 3000);
		}
	});



function saveMessage(name, message) {
	fetchUserIdByUsername(username)
		.then(function(userId) {
			// Use the retrieved userId here
			console.log('User ID is', userId);
			// You can place the rest of your code here

			// Create a reference to the user's messages in the database
			var userMessagesRef = firebase.database().ref('allSecrets/' + userId + '/secrets');
			var newMessageRef = userMessagesRef.push();
			
			// Get the current timestamp (milliseconds since epoch) for the message
			var messageTimestamp = Date.now();

			// Create a message object to save in the database
			var messageData = {
				name: name,
				message: message,
				timestamp: messageTimestamp // Add the timestamp to the message data
			};

			// Set the message object in the newMessageRef
			newMessageRef.set(messageData, function(error) {
				if (error) {
					console.error("Error saving message:", error);
				} else {
					console.log("Message saved successfully");
					// Show the loading dialog
					var loadingDialog = document.getElementById('loading-dialog');
					if (loadingDialog) {
						loadingDialog.style.display = 'none';
					}
					showSuccessToast(); // Show the success toast message
					// Call the function to reset the character counter to 500
					updateCharacterCount();
					document.getElementById('contact-form').reset();
					sendNotificationToUser(userId);
					// You can add any code here that you want to run after a successful save
					// For example, you can clear the message input field or display a success message.
				}
			});
		})
		.catch(function(error) {
			console.error('Error:', error.message);
		});
}



function updateCharacterCount() {
	var textarea = document.getElementById('message');
	var charCount = document.getElementById('char-count');
	var maxLength = 500;
	var remainingChars = maxLength - textarea.value.length;
	charCount.textContent = 'Characters remaining: ' + remainingChars;
}

// Function to show the success toast message
function showSuccessToast() {
	var toastMessage = document.getElementById('toast-message');
	toastMessage.style.display = 'block';
	// Hide the toast message after 3 seconds (3000 milliseconds)
	setTimeout(function() {
		toastMessage.style.display = 'none';
	}, 2500); // Change 3000 to the desired toast display duration in milliseconds (3 seconds)
}

// Function to insert the selected emoji into the input field at the cursor position
function sendemoji(emoji) {
	var messageInput = document.getElementById('message');
	var startPos = messageInput.selectionStart;
	var endPos = messageInput.selectionEnd;
	var text = messageInput.value;
	var newText = text.substring(0, startPos) + emoji + text.substring(endPos, text.length);
	messageInput.value = newText;
	messageInput.focus();
	messageInput.setSelectionRange(startPos + emoji.length, startPos + emoji.length);
}
//send notification
function sendNotificationToUser(userId) {
	// Assuming you have the user's UID stored in userId
	var userFCMTokenRef = firebase.database().ref('users/' + userId + '/token');
	// Fetch the user's FCM token from the database
	userFCMTokenRef.once('value', function(snapshot) {
		var userFCMToken = snapshot.val();
		if (userFCMToken) {
			// Create the notification object
			const notification = {
				to: userFCMToken, // FCM token from the database
				notification: {
					title: "New Message",
					body: "You have a new message from a friend!",
				},
			};
			sendNotification(notification);
		} else {
			// Handle the case where the FCM token is not found in the database
			console.error("FCM token not found for user");
		}
	});
}

// Function to send the notification (you can define this elsewhere in your code)
function sendNotification(notification) {
	const options = {
		method: "POST",
		headers: {
			Authorization: `key=${serverKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(notification),
	};
	fetch("https://fcm.googleapis.com/fcm/send", options).then((response) => response.json()).then((data) => {
		console.log("Successfully sent notification:", data);
	}).catch((error) => {
		console.error("Error sending notification:", error);
	});
}
// end send notification