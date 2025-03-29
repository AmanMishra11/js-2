// Sample JSON data for chat - expanded with famous guitarists
const chatData = {
    contacts: [
      {
        id: 1,
        name: "Alice Johnson",
        image: "https://via.placeholder.com/50?text=AJ",
        status: "Online",
        lastMessage: "Hey, how are you doing?",
        lastMessageTime: "10:30 AM",
        messages: [
          {
            id: 1,
            sender: "Alice Johnson",
            content: "Hey, how are you doing?",
            time: "10:25 AM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "I'm good, thanks! How about you?",
            time: "10:26 AM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Alice Johnson",
            content: "Doing well! Just working on that project we discussed.",
            time: "10:28 AM",
            type: "received",
          },
          {
            id: 4,
            sender: "You",
            content: "Great! Let me know if you need any help.",
            time: "10:30 AM",
            type: "sent",
          },
        ],
      },
      {
        id: 2,
        name: "Bob Smith",
        image: "https://via.placeholder.com/50?text=BS",
        status: "Last seen 2 hours ago",
        lastMessage: "Can we meet tomorrow?",
        lastMessageTime: "Yesterday",
        messages: [
          {
            id: 1,
            sender: "Bob Smith",
            content: "Hey, are you free tomorrow?",
            time: "Yesterday, 8:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "I should be free in the afternoon. What's up?",
            time: "Yesterday, 8:20 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Bob Smith",
            content: "Can we meet tomorrow? I need to discuss the new project.",
            time: "Yesterday, 8:25 PM",
            type: "received",
          },
        ],
      },
      {
        id: 3,
        name: "Carol Williams",
        image: "https://via.placeholder.com/50?text=CW",
        status: "Online",
        lastMessage: "The meeting is at 3 PM",
        lastMessageTime: "Yesterday",
        messages: [
          {
            id: 1,
            sender: "Carol Williams",
            content: "Hi there! Just a reminder about our team meeting.",
            time: "Yesterday, 2:00 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "Thanks for the reminder. What time is it again?",
            time: "Yesterday, 2:05 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Carol Williams",
            content: "The meeting is at 3 PM in the main conference room.",
            time: "Yesterday, 2:10 PM",
            type: "received",
          },
        ],
      },
      {
        id: 4,
        name: "David Brown",
        image: "https://via.placeholder.com/50?text=DB",
        status: "Last seen yesterday",
        lastMessage: "Check out this article",
        lastMessageTime: "Monday",
        messages: [
          {
            id: 1,
            sender: "David Brown",
            content: "Hey, have you seen this article about the new tech trends?",
            time: "Monday, 11:30 AM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "No, I haven't. Can you share it?",
            time: "Monday, 11:45 AM",
            type: "sent",
          },
          {
            id: 3,
            sender: "David Brown",
            content: "Check out this article: https://example.com/tech-trends-2023",
            time: "Monday, 12:00 PM",
            type: "received",
          },
        ],
      },
      {
        id: 5,
        name: "Emma Davis",
        image: "https://via.placeholder.com/50?text=ED",
        status: "Online",
        lastMessage: "Let's catch up soon!",
        lastMessageTime: "Sunday",
        messages: [
          {
            id: 1,
            sender: "Emma Davis",
            content: "Hi! It's been a while since we caught up.",
            time: "Sunday, 3:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "Yes, it has been! How have you been?",
            time: "Sunday, 3:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Emma Davis",
            content: "I've been great! Let's catch up soon!",
            time: "Sunday, 3:45 PM",
            type: "received",
          },
        ],
      },
      // Adding 20 famous guitarists as contacts
      {
        id: 6,
        name: "Eric Clapton",
        image: "https://via.placeholder.com/50?text=EC",
        status: "Online",
        lastMessage: "Layla is my best song!",
        lastMessageTime: "Saturday",
        messages: [
          {
            id: 1,
            sender: "Eric Clapton",
            content: "Hey, have you heard my latest album?",
            time: "Saturday, 1:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "Not yet, but I'm a big fan of your work!",
            time: "Saturday, 1:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Eric Clapton",
            content: "Layla is my best song! What do you think?",
            time: "Saturday, 1:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 7,
        name: "John Mayer",
        image: "https://via.placeholder.com/50?text=JM",
        status: "Last seen 3 hours ago",
        lastMessage: "Gravity is a powerful force",
        lastMessageTime: "Friday",
        messages: [
          {
            id: 1,
            sender: "John Mayer",
            content: "Hey, I'm working on a new song.",
            time: "Friday, 5:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "That's awesome! What's it about?",
            time: "Friday, 5:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "John Mayer",
            content: "Gravity is a powerful force, both in physics and emotions.",
            time: "Friday, 5:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 8,
        name: "Jimi Hendrix",
        image: "https://via.placeholder.com/50?text=JH",
        status: "Offline",
        lastMessage: "Purple Haze all in my brain",
        lastMessageTime: "Thursday",
        messages: [
          {
            id: 1,
            sender: "Jimi Hendrix",
            content: "Hey, I just wrote a new song.",
            time: "Thursday, 9:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "What's it called?",
            time: "Thursday, 9:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Jimi Hendrix",
            content: "Purple Haze all in my brain, lately things don't seem the same.",
            time: "Thursday, 9:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 9,
        name: "Jimmy Page",
        image: "https://via.placeholder.com/50?text=JP",
        status: "Online",
        lastMessage: "Stairway to Heaven is epic",
        lastMessageTime: "Wednesday",
        messages: [
          {
            id: 1,
            sender: "Jimmy Page",
            content: "Did you listen to the new remaster?",
            time: "Wednesday, 11:15 AM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "Not yet, which album?",
            time: "Wednesday, 11:30 AM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Jimmy Page",
            content: "Stairway to Heaven is epic in the new remaster. You should check it out!",
            time: "Wednesday, 11:45 AM",
            type: "received",
          },
        ],
      },
      {
        id: 10,
        name: "Stevie Ray Vaughan",
        image: "https://via.placeholder.com/50?text=SRV",
        status: "Last seen 1 day ago",
        lastMessage: "Texas Flood is coming",
        lastMessageTime: "Tuesday",
        messages: [
          {
            id: 1,
            sender: "Stevie Ray Vaughan",
            content: "Hey, I'm playing a show next week.",
            time: "Tuesday, 2:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "That's great! Where at?",
            time: "Tuesday, 2:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Stevie Ray Vaughan",
            content: "Texas Flood is coming to the main stage. You should come!",
            time: "Tuesday, 2:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 11,
        name: "B.B. King",
        image: "https://via.placeholder.com/50?text=BBK",
        status: "Offline",
        lastMessage: "The thrill is gone",
        lastMessageTime: "Monday",
        messages: [
          {
            id: 1,
            sender: "B.B. King",
            content: "Blues is feeling good about feeling bad.",
            time: "Monday, 4:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "That's profound! How's Lucille doing?",
            time: "Monday, 4:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "B.B. King",
            content: "The thrill is gone, but Lucille still sings beautifully.",
            time: "Monday, 4:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 12,
        name: "Eddie Van Halen",
        image: "https://via.placeholder.com/50?text=EVH",
        status: "Online",
        lastMessage: "Jump! Go ahead and jump!",
        lastMessageTime: "Sunday",
        messages: [
          {
            id: 1,
            sender: "Eddie Van Halen",
            content: "I just invented a new guitar technique.",
            time: "Sunday, 7:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "That's amazing! What is it?",
            time: "Sunday, 7:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Eddie Van Halen",
            content: "Jump! Go ahead and jump! It's all in the fingers.",
            time: "Sunday, 7:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 13,
        name: "Carlos Santana",
        image: "https://via.placeholder.com/50?text=CS",
        status: "Last seen 5 hours ago",
        lastMessage: "Smooth collaboration coming up",
        lastMessageTime: "Saturday",
        messages: [
          {
            id: 1,
            sender: "Carlos Santana",
            content: "I'm thinking of a new collaboration.",
            time: "Saturday, 8:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "With who?",
            time: "Saturday, 8:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Carlos Santana",
            content: "Smooth collaboration coming up with Rob Thomas again. What do you think?",
            time: "Saturday, 8:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 14,
        name: "David Gilmour",
        image: "https://via.placeholder.com/50?text=DG",
        status: "Online",
        lastMessage: "Comfortably Numb solo is timeless",
        lastMessageTime: "Friday",
        messages: [
          {
            id: 1,
            sender: "David Gilmour",
            content: "What's your favorite Pink Floyd song?",
            time: "Friday, 9:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "Comfortably Numb, especially for that solo!",
            time: "Friday, 9:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "David Gilmour",
            content: "Comfortably Numb solo is timeless, I agree. It's my favorite to play live.",
            time: "Friday, 9:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 15,
        name: "Slash",
        image: "https://via.placeholder.com/50?text=SL",
        status: "Last seen 2 days ago",
        lastMessage: "Sweet Child O' Mine riff",
        lastMessageTime: "Thursday",
        messages: [
          {
            id: 1,
            sender: "Slash",
            content: "I was just practicing some old riffs.",
            time: "Thursday, 10:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "Which ones?",
            time: "Thursday, 10:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Slash",
            content: "Sweet Child O' Mine riff still feels fresh after all these years.",
            time: "Thursday, 10:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 16,
        name: "Mark Knopfler",
        image: "https://via.placeholder.com/50?text=MK",
        status: "Online",
        lastMessage: "Sultans of Swing fingerpicking",
        lastMessageTime: "Wednesday",
        messages: [
          {
            id: 1,
            sender: "Mark Knopfler",
            content: "Do you play with a pick or fingers?",
            time: "Wednesday, 3:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "I use both, but I'm trying to improve my fingerpicking.",
            time: "Wednesday, 3:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Mark Knopfler",
            content: "Sultans of Swing fingerpicking technique took me years to perfect. Keep practicing!",
            time: "Wednesday, 3:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 17,
        name: "Joe Satriani",
        image: "https://via.placeholder.com/50?text=JS",
        status: "Last seen 1 hour ago",
        lastMessage: "Surfing with the Alien",
        lastMessageTime: "Tuesday",
        messages: [
          {
            id: 1,
            sender: "Joe Satriani",
            content: "I'm teaching a new masterclass next month.",
            time: "Tuesday, 5:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "What techniques will you be covering?",
            time: "Tuesday, 5:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Joe Satriani",
            content: "Surfing with the Alien techniques and some new legato exercises. You should join!",
            time: "Tuesday, 5:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 18,
        name: "Angus Young",
        image: "https://via.placeholder.com/50?text=AY",
        status: "Online",
        lastMessage: "Highway to Hell tour dates",
        lastMessageTime: "Monday",
        messages: [
          {
            id: 1,
            sender: "Angus Young",
            content: "We're going on tour again!",
            time: "Monday, 6:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "That's awesome! Where are you playing?",
            time: "Monday, 6:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Angus Young",
            content: "Highway to Hell tour dates will be announced next week. Stay tuned!",
            time: "Monday, 6:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 19,
        name: "Tom Morello",
        image: "https://via.placeholder.com/50?text=TM",
        status: "Last seen 4 hours ago",
        lastMessage: "Killing in the Name riff",
        lastMessageTime: "Sunday",
        messages: [
          {
            id: 1,
            sender: "Tom Morello",
            content: "I'm experimenting with some new sounds.",
            time: "Sunday, 7:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "What kind of effects are you using?",
            time: "Sunday, 7:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Tom Morello",
            content: "Killing in the Name riff with a new whammy pedal setting. It's revolutionary!",
            time: "Sunday, 7:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 20,
        name: "Kirk Hammett",
        image: "https://via.placeholder.com/50?text=KH",
        status: "Online",
        lastMessage: "Enter Sandman solo practice",
        lastMessageTime: "Saturday",
        messages: [
          {
            id: 1,
            sender: "Kirk Hammett",
            content: "Wah pedal died during practice today.",
            time: "Saturday, 8:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "Oh no! Do you have a backup?",
            time: "Saturday, 8:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Kirk Hammett",
            content: "Enter Sandman solo practice isn't the same without it. Ordering a new one now!",
            time: "Saturday, 8:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 21,
        name: "Brian May",
        image: "https://via.placeholder.com/50?text=BM",
        status: "Last seen 6 hours ago",
        lastMessage: "Bohemian Rhapsody guitar parts",
        lastMessageTime: "Friday",
        messages: [
          {
            id: 1,
            sender: "Brian May",
            content: "I'm restoring my Red Special guitar.",
            time: "Friday, 9:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "That's amazing! How's it going?",
            time: "Friday, 9:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Brian May",
            content: "Bohemian Rhapsody guitar parts will sound even better now. The restoration is going well!",
            time: "Friday, 9:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 22,
        name: "Jack White",
        image: "https://via.placeholder.com/50?text=JW",
        status: "Online",
        lastMessage: "Seven Nation Army bassline",
        lastMessageTime: "Thursday",
        messages: [
          {
            id: 1,
            sender: "Jack White",
            content: "Did you know Seven Nation Army doesn't use a bass guitar?",
            time: "Thursday, 10:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "Really? How did you get that sound?",
            time: "Thursday, 10:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Jack White",
            content: "Seven Nation Army bassline is actually a guitar with an octave pedal. Simple but effective!",
            time: "Thursday, 10:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 23,
        name: "Gary Moore",
        image: "https://via.placeholder.com/50?text=GM",
        status: "Last seen 2 days ago",
        lastMessage: "Still Got The Blues tone",
        lastMessageTime: "Wednesday",
        messages: [
          {
            id: 1,
            sender: "Gary Moore",
            content: "What's your favorite blues song?",
            time: "Wednesday, 11:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "I love 'Still Got The Blues' - your tone on that is incredible!",
            time: "Wednesday, 11:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Gary Moore",
            content: "Still Got The Blues tone came from a Les Paul and a Marshall amp. Sometimes simplicity is best.",
            time: "Wednesday, 11:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 24,
        name: "Jeff Beck",
        image: "https://via.placeholder.com/50?text=JB",
        status: "Online",
        lastMessage: "Cause We've Ended As Lovers",
        lastMessageTime: "Tuesday",
        messages: [
          {
            id: 1,
            sender: "Jeff Beck",
            content: "I never use a pick anymore.",
            time: "Tuesday, 12:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "Your finger control is amazing! How long did it take to develop?",
            time: "Tuesday, 12:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Jeff Beck",
            content:
              "Cause We've Ended As Lovers was a breakthrough for my fingerstyle technique. It took years of practice.",
            time: "Tuesday, 12:45 PM",
            type: "received",
          },
        ],
      },
      {
        id: 25,
        name: "Ritchie Blackmore",
        image: "https://via.placeholder.com/50?text=RB",
        status: "Last seen 3 days ago",
        lastMessage: "Smoke on the Water riff origin",
        lastMessageTime: "Monday",
        messages: [
          {
            id: 1,
            sender: "Ritchie Blackmore",
            content: "Do you know the story behind Smoke on the Water?",
            time: "Monday, 1:15 PM",
            type: "received",
          },
          {
            id: 2,
            sender: "You",
            content: "Something about a fire in Montreux, right?",
            time: "Monday, 1:30 PM",
            type: "sent",
          },
          {
            id: 3,
            sender: "Ritchie Blackmore",
            content:
              "Smoke on the Water riff origin was indeed the fire at the Montreux Casino. We watched it burn from our hotel!",
            time: "Monday, 1:45 PM",
            type: "received",
          },
        ],
      },
    ],
  }
  
  // DOM elements
  const chatList = document.getElementById("chat-list")
  const chatArea = document.getElementById("chat-area")
  const chatContainer = document.getElementById("chat-container")
  const emptyMessage = document.getElementById("empty-chat-message")
  const chatMessages = document.getElementById("chat-messages")
  const chatProfileName = document.getElementById("chat-profile-name")
  const chatProfileStatus = document.getElementById("chat-profile-status")
  const chatProfileImg = document.getElementById("chat-profile-img")
  const searchInput = document.getElementById("search-input")
  const themeToggle = document.getElementById("theme-toggle")
  const bgToggle = document.getElementById("bg-toggle")
  const messageInput = document.getElementById("message-input")
  const sendButton = document.getElementById("send-button")
  const loadingIndicator = document.getElementById("loading-indicator")
  
  // Current active chat
  let activeChat = null
  
  // Initialize the chat application
  function initChat() {
    renderChatList(chatData.contacts)
    setupEventListeners()
    checkResponsive()
  }
  
  // Render the list of chat contacts
  function renderChatList(contacts) {
    chatList.innerHTML = ""
  
    contacts.forEach((contact) => {
      const chatItem = document.createElement("div")
      chatItem.classList.add("chat-item")
      chatItem.dataset.id = contact.id
  
      chatItem.innerHTML = `
              <div class="chat-item-img">
                  <img src="${contact.image}" alt="${contact.name}">
              </div>
              <div class="chat-item-info">
                  <div class="chat-item-header">
                      <div class="chat-item-name">${contact.name}</div>
                      <div class="chat-item-time">${contact.lastMessageTime}</div>
                  </div>
                  <div class="chat-item-message">${contact.lastMessage}</div>
              </div>
          `
  
      chatList.appendChild(chatItem)
    })
  }
  
  // Load and display a specific chat
  function loadChat(contactId) {
    const contact = chatData.contacts.find((c) => c.id === Number.parseInt(contactId))
  
    if (!contact) return
  
    // Update active chat
    activeChat = contact
  
    // Update chat header
    chatProfileName.textContent = contact.name
    chatProfileStatus.textContent = contact.status
    chatProfileImg.src = contact.image
  
    // Clear previous messages
    chatMessages.innerHTML = ""
  
    // Add messages
    contact.messages.forEach((message) => {
      const messageElement = document.createElement("div")
      messageElement.classList.add("message", message.type)
  
      messageElement.innerHTML = `
              <div class="message-content">${message.content}</div>
              <div class="message-time">${message.time}</div>
          `
  
      chatMessages.appendChild(messageElement)
    })
  
    // Scroll to bottom of messages
    chatMessages.scrollTop = chatMessages.scrollHeight
  
    // Show chat container, hide empty message
    emptyMessage.style.display = "none"
    chatContainer.style.display = "flex"
  
    // Update active chat item in the list
    document.querySelectorAll(".chat-item").forEach((item) => {
      item.classList.remove("active")
    })
  
    const activeChatItem = document.querySelector(`.chat-item[data-id="${contactId}"]`)
    if (activeChatItem) {
      activeChatItem.classList.add("active")
    }
  
    // For mobile: hide sidebar, show chat area
    if (window.innerWidth <= 768) {
      document.querySelector(".sidebar").classList.add("hidden")
      chatArea.classList.add("active")
  
      // Add back button if it doesn't exist
      if (!document.querySelector(".back-button")) {
        const backButton = document.createElement("button")
        backButton.classList.add("back-button")
        backButton.innerHTML = '<i class="fas fa-arrow-left"></i>'
        backButton.addEventListener("click", goBack)
  
        document.querySelector(".chat-header-info").insertAdjacentElement("beforebegin", backButton)
      }
    }
  }
  
  // Go back to chat list (mobile view)
  function goBack() {
    document.querySelector(".sidebar").classList.remove("hidden")
    chatArea.classList.remove("active")
  }
  
  // Send a new message
  function sendMessage() {
    const messageText = messageInput.value.trim()
  
    if (!messageText || !activeChat) return
  
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`
  
    // Create new message
    const newMessage = {
      id: activeChat.messages.length + 1,
      sender: "You",
      content: messageText,
      time: timeString,
      type: "sent",
    }
  
    // Add to messages array
    activeChat.messages.push(newMessage)
  
    // Update last message in chat list
    activeChat.lastMessage = messageText
    activeChat.lastMessageTime = "Just now"
  
    // Update UI
    const messageElement = document.createElement("div")
    messageElement.classList.add("message", "sent")
  
    messageElement.innerHTML = `
          <div class="message-content">${messageText}</div>
          <div class="message-time">${timeString}</div>
      `
  
    chatMessages.appendChild(messageElement)
  
    // Clear input
    messageInput.value = ""
  
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight
  
    // Update chat list
    renderChatList(chatData.contacts)
  
    // Re-highlight active chat
    const activeChatItem = document.querySelector(`.chat-item[data-id="${activeChat.id}"]`)
    if (activeChatItem) {
      activeChatItem.classList.add("active")
    }
  }
  
  // Search contacts
  function searchContacts(query) {
    query = query.toLowerCase()
  
    const filteredContacts = chatData.contacts.filter(
      (contact) => contact.name.toLowerCase().includes(query) || contact.lastMessage.toLowerCase().includes(query),
    )
  
    renderChatList(filteredContacts)
  }
  
  // Toggle dark/light theme
  function toggleTheme() {
    document.body.classList.toggle("dark-theme")
  
    // Update icon
    if (document.body.classList.contains("dark-theme")) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    }
  }
  
  // Toggle chat background with Unsplash API
  // function toggleBackground() {
  //   // Show loading indicator
  //   loadingIndicator.style.display = "block"
  
  //   // Fetch a random image from Unsplash
  //   fetch("https://api.unsplash.com/photos/random?query=texture&orientation=landscape", {
  //     headers: {
  //       Authorization: "-8p6nqia8eVyAI5dm0FT6hydcP4u9iyPgiJcN_7-Vi0", // Replace with your actual Unsplash API key
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch image")
  //       }
  //       return response.json()
  //     })
  //     .then((data) => {
  //       // Set the background image
  //       chatMessages.style.backgroundImage = `url(${data.urls.regular})`
  //       chatMessages.style.backgroundSize = "cover"
  //       chatMessages.style.backgroundPosition = "center"
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching background:", error)
  
  //       // Fallback to predefined backgrounds if API fails
  //       const backgrounds = [
  //         "#e5ddd5", // Default
  //         "linear-gradient(to right, #8e2de2, #4a00e0)", // Purple gradient
  //         "linear-gradient(to right, #ff416c, #ff4b2b)", // Red gradient
  //         "linear-gradient(to right, #56ccf2, #2f80ed)", // Blue gradient
  //         "url(https://i.pinimg.com/originals/8f/ba/cb/8fbacbd464e996966eb9d4a6b7a9c21e.jpg)", // Pattern
  //       ]
  
  //       const currentBg = chatMessages.style.background
  //       let nextBgIndex = 0
  
  //       for (let i = 0; i < backgrounds.length; i++) {
  //         if (currentBg.includes(backgrounds[i])) {
  //           nextBgIndex = (i + 1) % backgrounds.length
  //           break
  //         }
  //       }
  
  //       chatMessages.style.background = backgrounds[nextBgIndex]
  //     })
  //     .finally(() => {
  //       // Hide loading indicator
  //       loadingIndicator.style.display = "none"
  //     })
  // }
  document.getElementById("bg-toggle").addEventListener("click", function () {
    const loadingIndicator = document.getElementById("loading-indicator");
    loadingIndicator.style.display = "block"; // Show loading indicator
    const count = 3;
    const apiKey = "-8p6nqia8eVyAI5dm0FT6hydcP4u9iyPgiJcN_7-Vi0"; // Replace this with your actual API key
    fetch(`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`) // Modify as per API docs
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch image");
            }
            return response.json(); // If API returns JSON, else use `.text()` or `.blob()`
        })
        .then(data => {
            const imageUrl = data.image_url; // Adjust based on API response format
            document.body.style.backgroundImage = `url(${imageUrl})`;
        })
        .catch(error => {
            console.error("Error fetching background:", error);
            alert("Failed to load background image.");
        })
        .finally(() => {
            setTimeout(() => {
                loadingIndicator.style.display = "none"; // Hide loading indicator
            }, 1000);
        });
});

  function checkResponsive() {
    if (window.innerWidth <= 768) {
      chatArea.classList.remove("active")
    } else {
      document.querySelector(".sidebar").classList.remove("hidden")
      chatArea.classList.remove("active")
      const backButton = document.querySelector(".back-button")
      if (backButton) {
        backButton.remove()
      }
    }
  }

  function setupEventListeners() {

    chatList.addEventListener("click", (e) => {
      const chatItem = e.target.closest(".chat-item")
      if (chatItem) {
        loadChat(chatItem.dataset.id)
      }
    })

    searchInput.addEventListener("input", (e) => {
      searchContacts(e.target.value)
    })

    themeToggle.addEventListener("click", toggleTheme)

    bgToggle.addEventListener("click", toggleBackground)

    sendButton.addEventListener("click", sendMessage)
  
    messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage()
      }
    })

    window.addEventListener("resize", checkResponsive)
  }
  
  document.addEventListener("DOMContentLoaded", initChat)
  
  