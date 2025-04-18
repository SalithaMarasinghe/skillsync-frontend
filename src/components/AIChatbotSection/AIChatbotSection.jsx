import React, { useState, useRef, useEffect } from "react";

const initialMessages = [
  { from: "bot", text: "Hi! I'm your AI assistant. How can I help you today?" },
];

const AIChatbotSection = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    // Simulate AI response (replace with real API call if needed)
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: `You asked: "${input}". (AI answer here)` },
      ]);
    }, 800);
    setInput("");
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-blue-200 flex flex-col h-full w-full">
      <h3 className="text-lg font-semibold text-blue-700 mb-2 p-4 border-b">AI Chatbot</h3>
      <div className="flex-1 overflow-y-auto mb-2 px-4 py-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded px-3 py-2 max-w-xs text-sm ${
                msg.from === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form className="flex mt-auto p-4 border-t" onSubmit={handleSend}>
        <input
          type="text"
          className="flex-1 border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r font-semibold"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChatbotSection;
