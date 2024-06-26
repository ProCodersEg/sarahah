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
const auth = app.auth();

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

// Event listener for form submission
document.getElementById('contact-form').addEventListener('submit', submitForm);

// Function to handle form submission
async function submitForm(e) {
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

    try {
        // Save the message
        await saveMessage(name, message);
    } catch (error) {
        console.error('Error saving message:', error);
        // Handle error: show error message, log, etc.
    } finally {
        if (loadingDialog) {
            loadingDialog.style.display = 'none';
        }
    }
}

// Function to fetch user ID by username
async function fetchUserIdByUsername(username) {
    try {
        const usersCollection = firestore.collection('users');
        const querySnapshot = await usersCollection.where('username', '==', username).limit(1).get();
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const userId = doc.id;
            return userId;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error fetching user document:', error);
        throw error;
    }
}

// Function to save the message in Firestore
async function saveMessage(name, message) {
    const user = auth.currentUser;

    if (!user) {
        throw new Error('User not authenticated');
    }

    try {
        // Check if user exists in 'users' collection
        const userDoc = await firestore.collection('users').doc(user.uid).get();

        if (userDoc.exists) {
            // User exists in 'users' collection
            const userData = userDoc.data();
            const country = await getBrowserCountry(); // Get browser country

            // Prepare message data with additional fields
            const messageData = {
                name,
                message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                isNew: true,
                isPinned: false,
                secretSender: userData.name,
                secretSenderPhotoUrl: userData.photoUrl,
                country,
            };

            // Save message in 'secrets' collection under the user's document
            const userMessagesCollection = firestore.collection('users').doc(user.uid).collection('secrets');
            await userMessagesCollection.add(messageData);

            // Additional actions (e.g., UI updates, notifications)
            showSuccessToast();
            updateCharacterCount();
            clearForm();
            sendNotificationToUser(user.uid);
        } else {
            // User not found in 'users' collection, check 'anonymousUsers' collection
            const anonUserDoc = await firestore.collection('anonymousUsers').doc(user.uid).get();

            if (!anonUserDoc.exists) {
                // User not found in either collection, create in 'anonymousUsers' collection
                const country = await getBrowserCountry(); // Get browser country
                await firestore.collection('anonymousUsers').doc(user.uid).set({
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    country,
                });

                console.log('New user created in anonymousUsers collection');
            }
        }
    } catch (error) {
        console.error('Error saving message:', error);
        throw error;
    }
}

// Function to get browser country using Geolocation API
function getBrowserCountry() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                fetch(`https://geocode.xyz/${latitude},${longitude}?json=1`)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.country) {
                            resolve(data.country);
                        } else {
                            resolve('Unknown');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching geolocation data:', error);
                        resolve('Unknown');
                    });
            }, error => {
                console.error('Geolocation error:', error);
                resolve('Unknown');
            });
        } else {
            resolve('Unknown');
        }
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

// Function to send notification to user using FCM
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
                            title: "New Secret Received",
                            body: "You have received a new secret. Click to view.",
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

// Function to send notification using FCM
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
