var firebaseConfig = {
    apiKey: "AIzaSyBEtXBiFXnk3jPmb6wdfW4SOvMXJQIjCzg",
    authDomain: "saraha-5e7fd.firebaseapp.com",
    databaseURL: "https://saraha-5e7fd-default-rtdb.firebaseio.com/",
    projectId: "saraha-5e7fd",
    storageBucket: "saraha-5e7fd.appspot.com",
    messagingSenderId: "942089850758",
    appId: "1:942089850758:web:bc767461bc426a904e2607"
};

const app = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();
let messaging;

if (firebase.messaging.isSupported()) {
    messaging = app.messaging();
}

// Replace with your actual Firebase Cloud Messaging server key
const serverKey = "AAAA21juT4Y:APA91bEUomQIsA6OcAaQI8lxcstgH4RMVrLyD4vgoU_lTqrO86vrCEJ1sT-f6e8IS0zacaQ8_jYXVCxVLfUiOb8ZA9kvci4NA1kGl1f32Ybx--DCIhFL5itdZl7eWb-iX_nyxHhc3ktP";

unction getURLParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

const username = getURLParameter('id');

function getInputVal(id) {
    return document.getElementById(id).value;
}

document.getElementById('contact-form').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    const name = getInputVal('name');
    const message = getInputVal('message');

    const loadingDialog = document.getElementById('loading-dialog');
    if (loadingDialog) {
        loadingDialog.style.display = 'block';
    }

    setTimeout(function() {
        saveMessage(name, message);
    }, 4000);
}

function fetchUserIdByUsername(username) {
    return new Promise(function(resolve, reject) {
        const usersCollection = firebase.firestore().collection('users');
        usersCollection.where('username', '==', username).limit(1).get()
            .then(function(querySnapshot) {
                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    const userId = doc.id;
                    console.log('User ID for username', username, 'is', userId);
                    resolve(userId);
                } else {
                    reject(new Error('User not found'));
                }
            })
            .catch(function(error) {
                console.error('Error fetching user document:', error);
                reject(error);
            });
    });
}

fetchUserIdByUsername(username)
    .then(function(userId) {
        const usersCollection = firebase.firestore().collection('users');
        const userDocRef = usersCollection.doc(userId);

        userDocRef.get()
            .then(function(doc) {
                if (doc.exists) {
                    const userName = doc.data().name;
                    const bio = doc.data().status;
                    const profilePhoto = doc.data().photoUrl;

                    const profilePhotoElement = document.getElementById('profilePhoto');
                    if (profilePhoto) {
                        profilePhotoElement.src = `${profilePhoto}`;
                    } else {
                        profilePhotoElement.style.display = 'none';
                    }

                    const bioElement = document.getElementById('bio');
                    if (bio) {
                        bioElement.innerHTML = `&ldquo;${bio}&rdquo;`;
                    } else {
                        bioElement.textContent = ` Be Honest `;
                    }

                    const messageElement = document.getElementById('message');
                    const userNameElement = document.getElementById('userName');
                    if (userName) {
                        messageElement.placeholder = `Type your message to "${userName}" send privately here...`;
                        userNameElement.textContent = `${userName}`;
                    } else {
                        messageElement.placeholder = `Type your message to this user...`;
                        userNameElement.textContent = ` Be Honest `;
                    }
                } else {
                    console.error("User document not found in Firestore");
                }
            })
            .catch(function(error) {
                console.error("Error fetching user document:", error);
            });
    })
    .catch(function(error) {
        console.error('Error:', error.message);
        document.getElementById('message').placeholder = `Something went wrong...`;
        document.getElementById('bio').textContent = `Oops`;
        document.getElementById('userName').textContent = ` Be Honest `;
        document.getElementById('profilePhoto').style.display = `none`;

        const submitButton = document.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
        }

        const invalidUserIdToast = document.getElementById('invalid-user-id-toast');
        if (invalidUserIdToast) {
            invalidUserIdToast.style.display = 'block';
            setTimeout(function() {
                invalidUserIdToast.style.display = 'none';
            }, 3000);
        }
    });

function saveMessage(name, message) {
    fetchUserIdByUsername(username)
        .then(function(userId) {
            const userMessagesCollection = firebase.firestore().collection('users').doc(userId).collection('secrets');
            const messageTimestamp = Date.now();

            const messageData = {
                name: name,
                message: message,
                timestamp: messageTimestamp,
                isNew: true,
                isPinned: false
            };

            userMessagesCollection.add(messageData)
                .then(function(docRef) {
                    console.log("Message saved successfully with ID: ", docRef.id);
                    const loadingDialog = document.getElementById('loading-dialog');
                    if (loadingDialog) {
                        loadingDialog.style.display = 'none';
                    }
                    showSuccessToast();
                    updateCharacterCount();
                    document.getElementById('contact-form').reset();
                    sendNotificationToUser(userId);
                })
                .catch(function(error) {
                    console.error("Error saving message:", error);
                });
        })
        .catch(function(error) {
            console.error('Error:', error.message);
        });
}

function updateCharacterCount() {
    const textarea = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const maxLength = 500;
    const remainingChars = maxLength - textarea.value.length;
    charCount.textContent = 'Characters remaining: ' + remainingChars;
}

function showSuccessToast() {
    const toastMessage = document.getElementById('toast-message');
    toastMessage.style.display = 'block';
    setTimeout(function() {
        toastMessage.style.display = 'none';
    }, 2500);
}

function sendemoji(emoji) {
    const messageInput = document.getElementById('message');
    const startPos = messageInput.selectionStart;
    const endPos = messageInput.selectionEnd;
    const text = messageInput.value;
    const newText = text.substring(0, startPos) + emoji + text.substring(endPos, text.length);
    messageInput.value = newText;
    messageInput.focus();
    messageInput.setSelectionRange(startPos + emoji.length, startPos + emoji.length);
}

function sendNotificationToUser(userId) {
    const usersCollection = firebase.firestore().collection('users');

    usersCollection.doc(userId).get()
        .then(function(doc) {
            if (doc.exists) {
                const userFCMToken = doc.data().token;
                const notificationsOn = doc.data().notificationsOn;

                if (notificationsOn === true && userFCMToken) {
                    const notification = {
                        to: userFCMToken,
                        notification: {
                            title: "New Message",
                            body: "You have a new message from a friend!",
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
        .catch(function(error) {
            console.error("Error fetching user document:", error);
        });
}

function sendNotification(notification) {
    const options = {
        method: "POST",
        headers: {
            Authorization: `key=${serverKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
    };
    fetch("https://fcm.googleapis.com/fcm/send", options)
        .then((response) => response.json())
        .then((data) => {
            console.log("Successfully sent notification:", data);
        })
        .catch((error) => {
            console.error("Error sending notification:", error);
        });
}
