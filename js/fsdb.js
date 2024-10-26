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
const app = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();

let messaging;
if (firebase.messaging.isSupported()) {
    messaging = app.messaging();
}

// Replace with your actual Firebase Cloud Messaging server key
const serverKey = "AAAA21juT4Y:APA91bEUomQIsA6OcAaQI8lxcstgH4RMVrLyD4vgoU_lTqrO86vrCEJ1sT-f6e8IS0zacaQ8_jYXVCxVLfUiOb8ZA9kvci4NA1kGl1f32Ybx--DCIhFL5itdZl7eWb-iX_nyxHhc3ktP";


// Function to get URL parameter
function getURLParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Fetch the user ID from the URL
const username = getURLParameter('id');

// Function to get input value by ID
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Event listener for form submission
document.getElementById('contact-form').addEventListener('submit', submitForm);

// Function to handle form submission
function submitForm(e) {
    e.preventDefault();

    const name = getInputVal('name');
    const message = getInputVal('message');

    console.log('Name:', name);
    console.log('Message:', message);

    // Show the loading dialog
    const loadingDialog = document.getElementById('loading-dialog');
    if (loadingDialog) {
        loadingDialog.style.display = 'block';
    }

    // Delay for demonstration purposes
    setTimeout(() => {
        saveMessage(name, message);
    }, 4000);
}

// Function to fetch user ID by username
function fetchUserIdByUsername(username) {
    return new Promise((resolve, reject) => {
        const usersCollection = firestore.collection('users');
        usersCollection.where('username', '==', username).limit(1).get()
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    const userId = doc.id;
                    //console.log('User ID for username', username, 'is', userId);
                    resolve(userId);
                } else {
                    reject(new Error('User not found'));
                }
            })
            .catch(error => {
                console.error('Error fetching user document:', error);
                reject(error);
            });
    });
}

// Function to increment or create the visits field
function incrementVisitsCount(userId) {
    var userDocRef = firestore.collection('users').doc(userId);

    // Check if the document exists
    userDocRef.get()
        .then(function(doc) {
            if (doc.exists) {
                // Document exists, update the visits field
                var existingVisits = doc.data().visitsCount || 0;
                userDocRef.update({
                    visitsCount: existingVisits + 1
                })
                .then(function() {
                    // Visits field updated successfully
                    console.log('Visits updated successfully');
                })
                .catch(function(error) {
                    console.error("Error updating visits:", error);
                });
            } else {
                // Document doesn't exist, create it with visits field
                userDocRef.set({
                    visitsCount: 1
                })
                .then(function() {
                    // Document and visits field created successfully
                    console.log('Document and visits field created successfully');
                })
                .catch(function(error) {
                    console.error("Error creating document and visits field:", error);
                });
            }
        })
        .catch(function(error) {
            console.error("Error checking document existence:", error);
        });
}


// Fetch and display user details
fetchUserIdByUsername(username)
    .then(userId => {
        const userDocRef = firestore.collection('users').doc(userId);

        userDocRef.get()
            .then(doc => {
                if (doc.exists) {
                    const { name: userName, status: bio, photoUrl: profilePhoto } = doc.data();

                    const profilePhotoElement = document.getElementById('profilePhoto');
                    if (profilePhoto) {
                        profilePhotoElement.src = profilePhoto;
                    } else {
                        profilePhotoElement.style.display = 'none';
                    }

                    var visitsCount = doc.data().visitsCount || 0; // Initialize to 0 if not present
					// Update the visitsCount field in your HTML
					document.getElementById('visits').textContent = `Visits : ${visitsCount}`;
					// Call the function with the user's userId
					incrementVisitsCount(userId);

                    const bioElement = document.getElementById('bio');
                    if (bio) {
                        bioElement.innerHTML = `&ldquo;${bio}&rdquo;`;
                    } else {
                        bioElement.textContent = 'Be Honest';
                    }

                    const messageElement = document.getElementById('message');
                    const userNameElement = document.getElementById('userName');
                    if (userName) {
                        messageElement.placeholder = `Type your message to "${userName}" send privately here...`;
                        userNameElement.textContent = userName;
                    } else {
                        messageElement.placeholder = 'Type your message to this user...';
                        userNameElement.textContent = 'Be Honest';
                    }
                } else {
                    console.error("User document not found in Firestore");
                }
            })
            .catch(error => {
                console.error("Error fetching user document:", error);
            });
    })
    .catch(error => {
        console.error('Error:', error.message);
        document.getElementById('message').placeholder = 'Something went wrong...';
        document.getElementById('bio').textContent = 'Oops';
        document.getElementById('userName').textContent = 'Be Honest';
        document.getElementById('profilePhoto').style.display = 'none';

        const submitButton = document.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
        }

        const invalidUserIdToast = document.getElementById('invalid-user-id-toast');
        if (invalidUserIdToast) {
            invalidUserIdToast.style.display = 'block';
            setTimeout(() => {
                invalidUserIdToast.style.display = 'none';
            }, 3000);
        }
    });

// Function to save the message
function saveMessage(name, message, username) {
    // Display loading dialog while the message is being saved
    const loadingDialog = document.getElementById('loading-dialog');
    if (loadingDialog) {
        loadingDialog.style.display = 'block';
    }

    // Fetch userId based on username
    fetchUserIdByUsername(username)
        .then(userId => {
            const userMessagesCollection = firestore.collection('users').doc(userId).collection('secrets');
            const messageTimestamp = Date.now();

            // Message data with placeholder for ID (will be updated after doc creation)
            const messageData = {
                name,
                message,
                timestamp: messageTimestamp,
                isNew: true,
                isPinned: false,
		fav: false,
                id: "" // Temporary placeholder for ID field
            };

            // Add the message to Firestore
            return userMessagesCollection.add(messageData)
                .then(docRef => {
                    // Update message data with document ID
                    return docRef.update({ id: docRef.id }).then(() => docRef);
                });
        })
        .then(docRef => {
            // Successfully saved message with ID
            console.log("Message saved successfully with ID: ", docRef.id);

            // Hide the loading dialog
            if (loadingDialog) {
                loadingDialog.style.display = 'none';
            }

            // Show success notification to the user
            showSuccessToast();
            updateCharacterCount();

            // Reset the form
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                contactForm.reset();
            }

            // Send notification to the user
            sendNotificationToUser(docRef.id);
        })
        .catch(error => {
            console.error("Error saving message:", error);

            // Hide loading dialog and show an error message if any error occurs
            if (loadingDialog) {
                loadingDialog.style.display = 'none';
            }
            showErrorToast("Failed to save message. Please try again later.");
        });
}


// Function to update the character count
function updateCharacterCount() {
    const textarea = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const maxLength = 500;
    const remainingChars = maxLength - textarea.value.length;
    charCount.textContent = 'Characters remaining: ' + remainingChars;
}

// Function to show the success toast message
function showSuccessToast() {
    const toastMessage = document.getElementById('toast-message');
    toastMessage.style.display = 'block';
    setTimeout(() => {
        toastMessage.style.display = 'none';
    }, 2500);
}

// Function to insert emoji into the input field at the cursor position
function sendemoji(emoji) {
    const messageInput = document.getElementById('message');
    const startPos = messageInput.selectionStart;
    const endPos = messageInput.selectionEnd;
    const text = messageInput.value;
    const newText = text.substring(0, startPos) + emoji + text.substring(endPos);
    messageInput.value = newText;
    messageInput.focus();
    messageInput.setSelectionRange(startPos + emoji.length, startPos + emoji.length);
}

function sendNotificationToUser(userId) {
  const usersCollection = firestore.collection('users');

  usersCollection.doc(userId).get()
    .then(doc => {
      if (doc.exists) {
        const { token: userFCMToken, notificationsOn } = doc.data();

        if (notificationsOn === true && userFCMToken) {
          const notification = {
            to: userFCMToken,
            notification: {
              title: "سر جديد",
              body: "لقد استقبلت سر جديد اضغط للمعاينه",
              channel_id: "channel_id",
              icon: "icon", // Use the correct small icon name
              image: "https://www.sarhne.com/blog/media/2021-11-27-2149488.webp" // URL to the large icon
            },
          };
          sendNotification(notification);
        } else {
          console.log("Notifications are turned off for the user or FCM token not found.");
        }
      } else {
        console.error("User document not found in Firestore");
      }
    })
    .catch(error => {
      console.error("Error fetching user document:", error);
    });
}



function sendNotification(notification) {
    const options = {
        method: "POST",
        headers: {
            Authorization: `key=${serverKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(notification)
    };
    fetch("https://fcm.googleapis.com/fcm/send", options)
        .then(response => response.json())
        .then(data => {
            console.log("Successfully sent notification:", data);
        })
        .catch(error => {
            console.error("Error sending notification:", error);
        });
}
