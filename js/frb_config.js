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

// Function to get URL parameters
function getURLParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}


// Function to check if the user_id is valid
function isUserIdValid(userId) {
	// Check if userId is missing or empty
	if (!userId) {
		return false;
	}

	// Assuming you have a reference to your Firebase database
	var usersRef = firebase.database().ref('users');

	// Check if userId exists in the database
	return usersRef.child(userId).once('value')
		.then(function(snapshot) {
			return snapshot.exists();
		});
}



// Fetch the user ID from the URL
var userId = getURLParameter('user_id');


// Check if the user_id is valid
isUserIdValid(userId)
	.then(function(isValid) {
		// Disable the submit button and prevent form submission if user_id is not valid
		if (!isValid) {
			var submitButton = document.querySelector('button[type="submit"]');
			if (submitButton) {
				submitButton.disabled = true;
			}
			showInvalidUserIdToast(); // Show the invalid user_id toast message
		} else {
			// Assuming you have the user's UID stored in userId
			var userNameRef = firebase.database().ref('users/' + userId + '/name');
			// Fetch the user's name and set it as the placeholder for the textarea
			userNameRef.once('value', function(snapshot) {
				// ...
			});
		}
	});


// Assuming you have the user's UID stored in userId
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



// Create a reference to the user's messages in the database
var userMessagesRef = firebase.database().ref('users/' + userId + '/messages');

document.getElementById('contact-form').addEventListener('submit', submitForm);

function submitForm(e) {
	e.preventDefault();


	// Get the input values within the submitForm function
	var name = getInputVal('name');
	var message = getInputVal('message');

	saveMessage(name, message);
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

function getInputVal(id) {
	return document.getElementById(id).value;
}


function saveMessage(name, message) {
	var newMessageRef = userMessagesRef.push();
	// Get the current timestamp (milliseconds since epoch)
	var timestamp = Date.now();

	newMessageRef.set({
		name: name,
		message: message,
		sendDate: timestamp // Add the timestamp to the message data
	}, function(error) {
		if (error) {
			console.error("Error saving message:", error);
		} else {
			console.log("Message saved successfully");

			// Show the loading dialog
			var loadingDialog = document.getElementById('loading-dialog');

			if (loadingDialog) {
				loadingDialog.style.display = 'block';
			}



			// Set a 5-second delay for demonstration purposes
			setTimeout(function() {

				// After 5 seconds, hide the loading dialog

				if (loadingDialog) {
					loadingDialog.style.display = 'none';
				}

				showSuccessToast(); // Show the success toast message
				// Call the function to reset the character counter to 500
				updateCharacterCount();
				document.getElementById('contact-form').reset();
			}, 4000); // 3000 milliseconds (5 seconds) delay

			// You can add any code here that you want to run after a successful save
			// For example, you can clear the message input field or display a success message.
		}
	});

}

function updateCharacterCount() {
	var textarea = document.getElementById('message');
	var charCount = document.getElementById('char-count');
	var maxLength = 500;

	var remainingChars = maxLength - textarea.value.length;

	charCount.textContent = 'Characters remaining: ' + remainingChars;
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


// Function to show the invalid user_id toast message
function showInvalidUserIdToast() {
	var invalidUserIdToast = document.getElementById('invalid-user-id-toast');
	if (invalidUserIdToast) {
		invalidUserIdToast.style.display = 'block';
		// Hide the toast message after 3 seconds (3000 milliseconds)
		setTimeout(function() {
			invalidUserIdToast.style.display = 'none';
		}, 3000);
	}
}
