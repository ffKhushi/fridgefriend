const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API key

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
    if (!data.choices || !data.choices[0]) {
      throw new Error("No response from AI. Check your API key or input.");
    }
    document.getElementById("response").innerText =
      data.choices[0].message.content.trim();
  })
  .catch(err => {
    document.getElementById("response").innerText = "Error: " + err.message;
  });
}
