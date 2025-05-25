'use client';

import { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";

type Message = {
  role: "user" | "developer";
  content: string;
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const roadmapPhases = [
    { icon: '🍹', title: 'Phase 1: Spread the Vibe', description: 'Launch. Get the word out. Build the core tribe. Keep it organic, keep it real.' },
    { icon: '🎧', title: 'Phase 2: Amplify Good Times', description: 'Community events (online, maybe IRL if we feel like it). Fun utilities? Perhaps. Partnerships with other chill projects.' },
    { icon: '👑', title: 'Phase 3: Eternal Vibe', description: 'Long-term chill. Sustained community. Maybe a Vibe King lounge in the metaverse. Who knows? We\'re not stressing it.' },
  ];  
  const socialLinks = [
    { icon: '🐦', name: 'X (Twitter)', href: '#' },
    { icon: '✈️', name: 'Telegram', href: '#' },
    { icon: '💬', name: 'Instagram', href: '#' },
  ];
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const [messages, setMessages] = useState<Message[]>([{ role: 'developer', content: 'Sup, bruh? Welcome to $VIBEKING. This is the spot where we keep it cool, stack memes, and let the gains come naturally. No FOMO, no drama. Just good energy, smart moves, and a community that knows how to chill.'}]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const userMessage: Message = { role: "user", content: input };
    const updatedMessages: Message[] = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
  
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages }),
    });
  
    const data: { reply: Message } = await res.json(); // typed reply
    setMessages([...updatedMessages, data.reply]);
    setLoading(false);
  };

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <div className="antialiased">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="placeholder-box w-10 h-10 text-xs">Logo</div>
                <span className="ml-3 font-bold text-xl text-slate-800">Vibe King</span>
              </div>
              <nav className="hidden md:flex space-x-1">
                <a href="#hero" className="px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium">Home</a>
                <a href="#about" className="px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium">The Vibe</a>
                <a href="#chat" className="px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium">Chat</a>
                <a href="#roadmap" className="px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium">Chill Plan</a>
                <a href="#community" className="px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium">Join Tribe</a>
              </nav>
              <div className="md:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="placeholder-box w-8 h-8 text-xs flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500"
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                  aria-label="Toggle menu"
                >
                  Menu
                </button>
              </div>
            </div>
            {isMobileMenuOpen && (
              <div className="md:hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="#hero" className="block px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md text-base font-medium text-center">Home</a>
                    <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md text-base font-medium text-center">The Vibe</a>
                    <a href="#chat" className="block px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md text-base font-medium text-center">Chat</a>
                    <a href="#roadmap" className="block px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md text-base font-medium text-center">Chill Plan</a>
                    <a href="#community" className="block px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md text-base font-medium text-center">Join Tribe</a>
                </div>
              </div>
            )}
          </div>
        </header>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section id="hero" className="wireframe-section text-center relative overflow-hidden min-h-[70vh] flex flex-col items-center justify-center">
        <span className="chaos-element top-10 left-10 transform rotate-[-15deg]">📉</span>
        <span className="chaos-element top-1/4 right-10 transform rotate-[20deg]">🔥</span>
        <span className="chaos-element bottom-10 left-1/4 transform rotate-[10deg]">⚡️</span>
        <span className="chaos-element bottom-1/3 right-1/4 transform rotate-[-5deg]">⚠️</span>
        <span className="chaos-element top-1/2 left-1/3 animate-pulse">💥</span>
        <div className="calm-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Market's Wild? <span className="text-slate-700">Vibe King Stays Cool.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The meme coin for those who are effortlessly composed, even when everything's falling apart.
            Unbothered. Always.
          </p>
          <div className="placeholder-box w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 mx-auto mb-8">
            <p className="text-sm">Vibe King Character Art<br/>(Cool, Unbothered, Surrounded by Abstract Chaos)</p>
          </div>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-md transition-colors duration-150">Get $VIBEKING</button>
          </div>
        </div>
      </section>

      <section id="about" className="wireframe-section">
        <h2 className="text-3xl font-bold mb-6 text-center">What's The Vibe?</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Vibe King ($VIBEKING) isn't just another meme coin. It's a statement. It's for the individuals who navigate the crypto chaos with a calm smirk and an unshakeable composure.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We believe in good times, a strong community, and not sweating the small stuff (or the big stuff, really). If the charts look like a rollercoaster, the Vibe King just enjoys the ride.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Effortlessly Cool: It's not an act, it's a lifestyle.</li>
              <li>Always Composed: Panic? Never heard of it.</li>
              <li>Unbothered by Drama: We just sip our drink.</li>
              <li>Thrives in Chaos: This is where the Vibe King shines.</li>
            </ul>
          </div>
          <div className="placeholder-box w-full h-64 md:h-80">
            <p className="text-sm">Visual: Abstract representation of "Calm in Chaos" or "Vibe King Philosophy"</p>
          </div>
        </div>
      </section>     

      <section id="chat" className="wireframe-section">
        <h2 className="text-3xl font-bold mb-6 text-center">Chat With Vibe King</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The Vibe King is the embodiment of calm, cool, and collected — a seamless blend of Marc Moran’s edgy, unfiltered charisma and Keanu Reeves’ quiet humility. He carries himself with effortless presence. Nothing rattles him; he moves through chaos with a centered stillness that draws people in. He’s been through it, you can tell, but he wears his scars like stories, not burdens. Cool isn’t something he tries to be — it’s just who he is when he’s fully himself: grounded, aware, and completely unbothered.
            </p>            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Talk to Vibe King, your laid-back crypto guide and the smooth-talking soul of $VIBEKING. Whether you’re new to the project, looking for answers, or just vibing, he’s here to keep things clear, calm, and cool. Ask anything — he’s unbothered, unfazed, and fully loaded with good info and better energy.
            </p>
          </div>
          <div className="w-full md:h-136">
            <div className="p-6 max-w-2xl mx-auto">
              <div className="border p-4 rounded-md h-[30vh] overflow-y-auto bg-white border-1 border-[#cbd5e0]">
                {messages.map((m, i) => (
                  <div key={i} className={`mb-3 ${m.role === "user" ? "text-right" : "text-left"}`}>
                    <p className={`inline-block p-2 rounded ${m.role === "user" ? "bg-blue-200" : "bg-gray-100"}`}>
                      {m.content}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex">
                <input
                  className="flex-1 p-2 border rounded border-1 border-[#cbd5e0]"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message..."
                />
                <button 
                  onClick={sendMessage} 
                  className="ml-2 px-4 py-2 rounded border-1 border-[#cbd5e0] bg-slate-700 hover:bg-slate-800 text-white font-semibold"
                  disabled={!input || loading}>
                    {!loading ? 'Vibe' : ''}    

                    <PulseLoader
                      color="#ffffff"
                      loading={loading}
                      size={5}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />                           
                </button>
              </div>
            </div>


          </div>
        </div>
      </section> 

      <section id="roadmap" className="wireframe-section">
        <h2 className="text-3xl font-bold mb-8 text-center">The Chill Roadmap</h2>
        <div className="space-y-8">
          {roadmapPhases.map((phase, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="placeholder-box w-12 h-12 rounded-full text-lg flex-shrink-0 flex items-center justify-center">{phase.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{phase.title}</h3>
                <p className="text-gray-600">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-6 text-gray-600">Timelines are fluid. Good vibes are constant.</p>
      </section>     

      <section id="community" className="wireframe-section text-center">
        <h2 className="text-3xl font-bold mb-6">Join the Vibe Tribe</h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Find your fellow Vibe Kings. Share memes, chat, stay unbothered together.
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {socialLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="placeholder-box w-28 h-28 sm:w-32 sm:h-32 flex flex-col justify-center items-center hover:bg-slate-300 transition-colors"
            >
              <span className="text-3xl">{link.icon}</span>
              <span className="text-sm mt-1">{link.name}</span>
            </a>
          ))}
        </div>
      </section>    
    </main>

    <footer className="bg-slate-800 text-slate-300 py-8 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="placeholder-box w-12 h-12 mx-auto mb-2 text-xs">Logo</div>
        <p className="mb-2">&copy; {currentYear} Vibe King. All Rights Reserved (Loosely).</p>
        <p className="text-xs mb-2">Meme coins are speculative. Invest with chill, not with your rent money.</p>
        <p className="text-xs">Stay cool. Stay Vibe King.</p>
      </div>
    </footer>    
    </>      
  );
}
