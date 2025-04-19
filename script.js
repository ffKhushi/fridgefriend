const apiKey = "YOUR_OPENAI_API_KEY"; // Replace this with your OpenAI API key

function getRecipe() {
  const input = document.getElementById("ingredients").value;
  const prompt = `Suggest 2 simple Indian recipes using only these ingredients: ${input}. Reply in Hindi.`;

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("response").innerText =
      data.choices[0].message.content.trim();
  })
  .catch(err => {
    document.getElementById("response").innerText = "Error: " + err.message;
  });
}

function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "hi-IN";
  recognition.onresult = function(event) {
    document.getElementById("ingredients").value = event.results[0][0].transcript;
  };
  recognition.start();
}