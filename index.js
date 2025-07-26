tailwind.config = {
    darkMode: 'class'
}

function toggleTheme() {
      const html = document.documentElement;
      const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
      html.classList.toggle('dark');
      localStorage.setItem('theme', newTheme);
      updateButtonText();
    }

    function updateButtonText() {
      const modeIndicator = document.getElementById('modeIndicator');
      const isDark = document.documentElement.classList.contains('dark');
      modeIndicator.textContent = isDark ? 'Current mode: Dark' : 'Current mode: Light';
    }

    // Initialize theme
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
    updateButtonText();

const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chat = document.getElementById('chat');


function addMessage(text, isUser) {
  const msgDiv = document.createElement('div');
  msgDiv.className = isUser
    ? 'flex justify-end'
    : 'flex items-start space-x-2';

  const bubble = document.createElement('div');
  bubble.className = isUser
    ? 'bg-blue-500 text-white px-4 py-2 rounded-xl'
    : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-xl';

  bubble.textContent = text;
  msgDiv.appendChild(bubble);
  chat.appendChild(msgDiv);
  chat.scrollTop = chat.scrollHeight;
}

async function botReply(userMsg) {
  let reply = "";
  try {
    const response = await fetch("https://242851c81df5.ngrok-free.app/chat", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: userMsg })
    });
    const data = await response.json();
    reply = data.response;
  } catch (error) {
    reply = "Bot Error Occurred!";
  }
  addMessage(reply, false);
}


sendBtn.addEventListener('click', async () => {
  const msg = userInput.value.trim();
  if (msg) {
    userInput.value = '';
    addMessage(msg, true);
    await botReply(msg);
    
  }
});

userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendBtn.click();
});