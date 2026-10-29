import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  Calendar,
  Gift,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Check,
  ChevronRight,
  Music,
  Cake,
  Clock,
  Compass,
  Smile,
  Shield,
  Coffee,
  Sun,
  Award
} from 'lucide-react';

const assets = {
  m1: '/assets/M1.jpeg',
  m1Close: '/assets/M1_close.jpeg',
  m2: '/assets/M2.jpeg',
  m3: '/assets/M3.jpeg',
  m4: '/assets/M4.jpeg',
  m5: '/assets/M5.jpeg',
  m6: '/assets/M6.jpeg',
  d1: '/assets/D1.jpeg',
  audio: '/assets/Ethana%20Thanima%20Vattum%20Bothum%20-%20Magale%20_%20Baththa%20_%20Tamil.mp3',
  audioFallback: '/assets/ma1.mp3'
};

const memories = [
  {
    number: '01',
    title: 'Before Everything Began',
    text: 'I knew Maneeshwari as a college senior, but at first I did not think much about her. I did not expect that she would eventually become such an important person in my life. Sometimes, the people who become closest to us are the people we never expected to become family.',
    type: 'standard'
  },
  {
    number: '02',
    title: 'January 4, Around 7:45 PM',
    marker: 'January 4 · 7:45 PM · The Beginning',
    text: 'The story began around January 4, at approximately 7:45 PM. I was near the idly shop close to my apartment when she saw me and said hi. I said hi back. Another guy asked for her number, and for some reason, I also asked for it. Even I was not sure why I asked. She gave me her number immediately. At the time, it may have seemed like an ordinary moment, but it became the beginning of a bond I would eventually value so much.',
    type: 'marker'
  },
  {
    number: '03',
    title: '“Did You Eat?”',
    text: 'The next day, she asked me whether I had eaten. I said no. She offered to buy me something to eat during the interval after her exam. That small gesture made me genuinely happy. It was not just about the food. It was the feeling that someone was checking on me and caring about whether I had eaten. That moment helped me become attached to her, and our conversations gradually became more important to me.',
    image: assets.m3,
    caption: 'M3: The simple gesture that sparked a lifelong sibling bond.',
    type: 'photo'
  },
  {
    number: '04',
    title: 'Someone I Can Tell Everything To',
    text: 'As time passed, I started sharing the things happening in my life with her. When I feel low or confused, her advice helps me feel better. Sometimes, simply explaining my problems to her makes me feel relieved. She became someone I could talk to honestly and someone whose words could help me see things differently. Our relationship slowly changed from a college senior and junior into an elder sister and younger brother. I believe a genuine bond does not need a blood relationship. Sometimes, people become family because of the care, understanding, and trust they give each other.',
    type: 'standard'
  },
  {
    number: '05',
    title: 'Her Advice, My Mistakes, and Our Little Fights',
    text: 'She has advised me about many things and tried to guide me. But sometimes, I forgot her advice and did things she disliked. This led to arguments between us. When she became upset, I would try to calm her down. Sometimes, my attempts only irritated her more. Later, she would explain the reason behind her anger in a way I could understand. I gradually learned from those conversations and changed some of my behavior.',
    type: 'standard'
  },
  {
    number: '06',
    title: 'The Short Scooter Rides',
    text: 'Sometimes, she would come to see me, and we would go on short rides on her scooter. These were simple moments, but they became special memories for me.',
    image: assets.m4,
    caption: 'M4: Unforgettable scooter rides & candid little moments.',
    type: 'photo'
  },
  {
    number: '07',
    title: 'The Birthday Message I Never Expected',
    text: 'She once sent me a short birthday message filled with affection. I did not expect that message, and it made me extremely happy. Sometimes, even a few words from the right person can mean more than a long message from anyone else.',
    type: 'standard'
  },
  {
    number: '08',
    title: '“Neeyum Naanum Aalu”',
    text: 'She once told me a story that referred to the two of us and included the words: “Neeyum naanum aalu.” It was funny, and it became one of those little moments I remember because it felt unique to our bond.',
    playful: true,
    type: 'playful'
  },
  {
    number: '09',
    title: 'Rose Milk, Shared Food, and Her Tiffin Box',
    text: 'She shows me a kind of interest and care that I do not always experience from other people. When I ask her for rose milk, she buys it for me. She also shares her food with me. I take care of her tiffin box and keep it safe. These small things may seem ordinary to someone else, but to me, they are some of the most meaningful parts of our relationship.',
    type: 'standard'
  },
  {
    number: '10',
    title: 'When She Refuses to Send Photos',
    text: 'There is also a funny side to our relationship. Whenever I ask her to send me her photos, she can be reluctant to send them. I still ask, she still teases me, and it has become one of our favorite sibling traditions! 😂',
    playful: true,
    type: 'playful'
  },
  {
    number: '11',
    title: 'The Phone Call After My Bike Fall',
    text: 'There was a time when we were fighting and she was not talking to me. Then I fell from my bike and sent her a photograph showing what had happened. Even though she was upset with me, she immediately called to ask what had happened. That moment showed me that, even when she is angry, she still cares about me.',
    type: 'reflective'
  },
  {
    number: '12',
    title: 'Her Last Day at College',
    text: 'One of the memories I value most is her last day at college. She called me onto the college bus and asked me to sit beside her. She spoke to me, gave me advice, and explained why she had been fighting with me. She told me that my bad behavior had hurt and upset her. That conversation helped me understand her feelings better. It was not simply a goodbye conversation. It was a moment when I understood how much she cared about my behavior and the person I was becoming.',
    type: 'reflective'
  },
  {
    number: '13',
    title: 'Learning Not to Skip Meals',
    text: 'After her last day at college, I began eating regularly instead of skipping meals. Sometimes I might still miss a meal if I sleep for too long, but I have made an effort to eat properly. Her care and advice influenced this change in my routine.',
    type: 'standard'
  },
  {
    number: '14',
    title: 'Her Offer Letter',
    text: 'When she received her offer letter, I felt so happy that my eyes filled with tears. That moment made me realize how special our bond had become. Her happiness felt important to me, and seeing her move forward in life made me genuinely proud of her.',
    type: 'proud'
  },
  {
    number: '15',
    title: 'The Magic of Meeting Her',
    text: 'Maneeshwari entering my life feels like a kind of magic. What started as a simple hello became a relationship I never expected to value so deeply. Our bond has continued well so far, and I hope it continues for a long time without breaking. She has become one of the best parts of my life. I do not need a blood relationship to consider her my sister. The care, guidance, memories, and affection we have shared are what make this relationship meaningful to me.',
    type: 'standard'
  }
];

const littleThings = [
  { icon: '🍲', text: 'Her asking whether I have eaten, every single day.' },
  { icon: '🥪', text: 'Her offering to buy me food during exam intervals.' },
  { icon: '🍱', text: 'Her sharing her home-cooked food with me.' },
  { icon: '🥛', text: 'The sweet rose milk she buys whenever I ask.' },
  { icon: '🔒', text: 'The way I carefully protect and keep her tiffin box safe.' },
  { icon: '💡', text: 'Her calm guidance and advice whenever I feel low.' },
  { icon: '🛵', text: 'Our joyful short scooter rides and breezy conversations.' },
  { icon: '💌', text: 'Her unexpected birthday message that made my day.' },
  { icon: '😄', text: 'The hilarious “Neeyum naanum aalu” story.' },
  { icon: '📸', text: 'Her playful reluctance whenever I ask her to send photos.' },
  { icon: '📞', text: 'Her immediate concerned phone call when I fell from my bike.' },
  { icon: '🚌', text: 'Her heartfelt conversation with me on the college bus.' },
  { icon: '📜', text: 'Tears of pride and happiness when she received her offer letter.' }
];

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/* ==========================================================================
   PAGE 1: OPENING SURPRISE SCREEN
   ========================================================================== */
function OpeningScreen({ onOpenSurprise }) {
  return (
    <div className="opening-screen">
      <div className="opening-container">
        <div className="opening-left">
          <div className="opening-eyebrow">
            <Sparkles size={24} className="text-orange-500" />
            <span>A Little Birthday Surprise</span>
          </div>

          <h1 className="opening-title">
            For <span>Maneeshwari</span>
          </h1>

          <p className="opening-intro">
            “Some people enter our lives unexpectedly and slowly become a part of our hearts.
            This little surprise is for someone who became much more than just a college senior.”
          </p>

          <div className="opening-date-card">
            <span className="date-icon">🗓️</span>
            <div className="date-text">
              <span className="date-label">Birthday Celebration</span>
              <span className="date-value">06 NOVEMBER 2026</span>
            </div>
          </div>

          <div>
            <button className="btn-primary" onClick={onOpenSurprise}>
              <Gift size={20} />
              <span>OPEN YOUR SURPRISE</span>
              <ChevronRight size={18} />
            </button>
          </div>

          <p className="opening-subnote">
            Made with affection, gratitude & endless sibling teasing ✨
          </p>
        </div>

        <div className="opening-right">
          <div className="opening-photo-frame">
            <img
              src={assets.m2}
              alt="Maneeshwari Akka in her opening birthday portrait"
              loading="eager"
            />
            <div className="opening-badge-floater">
              <Heart size={18} fill="#c2410c" color="#c2410c" />
              <span>My Akka, Always</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   PAGE 2: BIRTHDAY REVEAL SCREEN (TIMED 4 SECONDS ANIMATION)
   ========================================================================== */
function RevealScreen({ onProceedToQuestion }) {
  const [isCelebrating, setIsCelebrating] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(4);

  useEffect(() => {
    // Canvas confetti burst left and right for 4 seconds
    const end = Date.now() + 4000;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }
      confetti({
        startVelocity: 35,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random() * 0.3, y: Math.random() * 0.5 },
        colors: ['#f97316', '#ea580c', '#fbbf24', '#fbcfe8', '#fdba74']
      });
      confetti({
        startVelocity: 35,
        spread: 360,
        ticks: 60,
        origin: { x: 0.7 + Math.random() * 0.3, y: Math.random() * 0.5 },
        colors: ['#f97316', '#ea580c', '#fbbf24', '#fbcfe8', '#fdba74']
      });
    }, 400);

    const countdown = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsCelebrating(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, []);

  return (
    <div className="reveal-screen">
      {isCelebrating && (
        <div className="fireworks-overlay" aria-hidden="true">
          {/* Vaana Vedikai - Sky Rockets Left & Right */}
          <div className="vaana-vedikai-left">
            <div className="rocket-shot"></div>
            <div className="rocket-shot"></div>
            <div className="rocket-shot"></div>
            <div className="burst-sparks">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <div key={angle} className="spark-ray" style={{ '--angle': `${angle}deg` }} />
              ))}
            </div>
          </div>
          <div className="vaana-vedikai-right">
            <div className="rocket-shot"></div>
            <div className="rocket-shot"></div>
            <div className="rocket-shot"></div>
            <div className="burst-sparks">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <div key={angle} className="spark-ray" style={{ '--angle': `${angle}deg` }} />
              ))}
            </div>
          </div>

          {/* Busvanam - Flowerpot Ground Fountain Crackers */}
          <div className="busvanam-left">
            <div className="fountain-cone"></div>
            {[-25, -15, 0, 15, 25].map((rot, idx) => (
              <div key={idx} className="fountain-sparks" style={{ '--rot': `${rot}deg` }} />
            ))}
          </div>
          <div className="busvanam-right">
            <div className="fountain-cone"></div>
            {[-25, -15, 0, 15, 25].map((rot, idx) => (
              <div key={idx} className="fountain-sparks" style={{ '--rot': `${rot}deg` }} />
            ))}
          </div>

          {/* Floating Balloons */}
          <div className="balloon-stream">
            <div className="balloon" style={{ color: '#ea580c', background: 'radial-gradient(circle at 30% 30%, #fdba74, #ea580c)' }}>
              <div className="balloon-string"></div>
            </div>
            <div className="balloon" style={{ color: '#c2410c', background: 'radial-gradient(circle at 30% 30%, #f97316, #c2410c)', animationDelay: '0.4s' }}>
              <div className="balloon-string"></div>
            </div>
            <div className="balloon" style={{ color: '#d97706', background: 'radial-gradient(circle at 30% 30%, #fde047, #d97706)', animationDelay: '0.8s' }}>
              <div className="balloon-string"></div>
            </div>
            <div className="balloon" style={{ color: '#f43f5e', background: 'radial-gradient(circle at 30% 30%, #fca5a5, #f43f5e)', animationDelay: '0.2s' }}>
              <div className="balloon-string"></div>
            </div>
          </div>
        </div>
      )}

      <div className="reveal-container">
        <div className="reveal-grid">
          <div className="reveal-photo-wrapper">
            <div className="reveal-photo-card">
              <img
                src={assets.m1Close}
                alt="Maneeshwari Akka in her birthday celebration portrait"
              />
            </div>
          </div>

          <div className="reveal-content">
            <div className="opening-eyebrow">
              <Sparkles size={20} />
              <span>Today is All About You</span>
            </div>

            <h1 className="reveal-wish-header">
              HAPPY BIRTHDAY <span>MANEESH AKKA</span>
            </h1>

            <div className="reveal-date-highlight">
              <Calendar size={20} />
              <span>06 NOVEMBER 2026</span>
            </div>

            <p className="reveal-message-text">
              To the college senior who became my elder sister by heart.
              May this year shower you with endless happiness, warmth, and every wonderful blessing in life!
            </p>

            <div className="reveal-actions">
              {isCelebrating ? (
                <div className="timer-pill">
                  <Sparkles size={16} />
                  <span>Celebration in progress... ({secondsLeft}s)</span>
                </div>
              ) : (
                <button className="btn-primary" onClick={onProceedToQuestion}>
                  <span>Continue to Your Surprise</span>
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   PAGE 3: PERSONAL QUESTION SCREEN
   ========================================================================== */
function QuestionScreen({ onGoForSurprise }) {
  const [selectedChoice, setSelectedChoice] = useState(null);

  return (
    <div className="question-screen">
      <div className="question-card">
        <div className="question-eyebrow">
          <Sparkles size={22} className="inline mr-2" />
          One Tiny Question First
        </div>

        <h2 className="question-title">Before You See Your Surprise</h2>
        <p className="question-subtitle">Who do you like the most?</p>

        <div className="choice-grid">
          <button
            className={`choice-btn ${selectedChoice === 'dhana' ? 'selected' : ''}`}
            onClick={() => setSelectedChoice('dhana')}
          >
            <span className="emoji">👦🏻</span>
            <span>Dhana</span>
          </button>

          <button
            className={`choice-btn ${selectedChoice === 'future_husband' ? 'selected' : ''}`}
            onClick={() => setSelectedChoice('future_husband')}
          >
            <span className="emoji">💍</span>
            <span>Future Husband</span>
          </button>
        </div>

        {selectedChoice === 'future_husband' && (
          <div className="response-box teasing">
            <p>“There’s still plenty of time for that! 😂 Choose the other option for now! ❤️”</p>
          </div>
        )}

        {selectedChoice === 'dhana' && (
          <div className="response-box appreciated">
            <p>
              “Awww! ❤️ Thank you so much! Did you choose me because you think I’m a good boy? 😂
              Your affection means so much to me, Akka!”
            </p>
            <button className="btn-primary" onClick={onGoForSurprise}>
              <Gift size={20} />
              <span>GO FOR SURPRISE</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   PAGE 4: OUR STORY TIMELINE (ALL 15 SPECIFIC MEMORIES)
   ========================================================================== */
function StorySection() {
  return (
    <section className="section-wrapper" id="story">
      <div className="section-header">
        <div className="section-eyebrow">
          <Sparkles size={20} />
          <span>Our Journey & Sibling Memories</span>
        </div>
        <h2 className="section-title">HOW A COLLEGE SENIOR BECAME MY AKKA</h2>
        <p className="section-desc">
          Some people enter our lives as strangers, become important through little moments,
          and eventually feel like family. Here is our story from the very beginning.
        </p>
      </div>

      <div className="timeline-container">
        <div className="timeline-track" aria-hidden="true" />

        {memories.map((item, index) => {
          const isEven = index % 2 === 1;
          return (
            <div
              key={item.number}
              className={`timeline-item ${isEven ? 'even' : ''}`}
            >
              <div className="timeline-dot" aria-hidden="true" />
              <div
                className={`timeline-card ${
                  item.type === 'playful'
                    ? 'playful-card'
                    : item.type === 'reflective'
                    ? 'reflective-card'
                    : item.type === 'proud'
                    ? 'proud-card'
                    : ''
                }`}
              >
                <div className="timeline-card-header">
                  <span className="timeline-num">Memory {item.number}</span>
                  {item.playful && <span title="Sibling banter">😄</span>}
                </div>

                {item.marker && (
                  <div className="timeline-marker-badge">
                    <Clock size={14} />
                    <span>{item.marker}</span>
                  </div>
                )}

                <h3 className="timeline-card-title">{item.title}</h3>
                <p className="timeline-card-text">{item.text}</p>

                {item.image && (
                  <div className="timeline-photo-frame">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <p className="timeline-photo-caption">{item.caption}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ==========================================================================
   PAGE 5: CAKE-CUTTING CELEBRATION
   ========================================================================== */
function CakeSection() {
  const [isCut, setIsCut] = useState(false);
  const [isCutting, setIsCutting] = useState(false);

  const handleCutCake = () => {
    if (isCut) return;
    setIsCutting(true);
    setTimeout(() => {
      setIsCut(true);
      setIsCutting(false);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ea580c', '#f97316', '#fbbf24', '#fbcfe8']
      });
    }, 1100);
  };

  return (
    <section className="section-wrapper cake-section" id="cake">
      <div className="section-header">
        <div className="section-eyebrow">
          <Cake size={20} />
          <span>Interactive Celebration</span>
        </div>
        <h2 className="section-title">MAKE A WISH, MANEESH AKKA!</h2>
        <p className="section-desc">
          Click the button or knife below to cut the birthday cake and make your wish!
        </p>
      </div>

      <div className="cake-celebration-container">
        <div className={`cake-interactive-stage ${isCutting ? 'cutting-animation' : ''}`}>
          {/* Animated Knife */}
          <div className="knife-tool">
            <svg viewBox="0 0 40 120" width="40" height="120">
              <path d="M15 0 L25 0 L25 50 L20 115 L15 50 Z" fill="#94a3b8" />
              <rect x="13" y="0" width="14" height="35" rx="3" fill="#78350f" />
              <line x1="20" y1="35" x2="20" y2="105" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Three Flickering Candles */}
          <div className="candles-row">
            {[1, 2, 3].map((candle) => (
              <div key={candle} className="candle">
                <div className="candle-flame"></div>
                <div className="smoke-puff">💨</div>
              </div>
            ))}
          </div>

          {/* Cake Layers & Plate */}
          <div className={`cake-wrapper ${isCut ? 'cake-cut-active' : ''}`}>
            <svg viewBox="0 0 320 200" width="320" height="200">
              {/* Plate */}
              <ellipse cx="160" cy="180" rx="140" ry="18" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="3" />
              <ellipse cx="160" cy="178" rx="125" ry="12" fill="#e2e8f0" />

              {/* Left Cake Half */}
              <g className="cake-left">
                {/* Bottom Layer Left */}
                <path d="M40 140 Q160 160 160 140 L160 165 Q160 185 40 165 Z" fill="#fed7aa" />
                <path d="M40 115 L160 115 L160 145 Q100 160 40 145 Z" fill="#fdba74" />
                {/* Frosting drips */}
                <path d="M40 115 C60 130 70 120 90 130 C110 120 130 135 160 115 Z" fill="#fff7ed" />
                {/* Top Layer Left */}
                <path d="M60 85 L160 85 L160 115 Q110 125 60 115 Z" fill="#fb923c" />
                <ellipse cx="110" cy="85" rx="50" ry="16" fill="#fff7ed" stroke="#fcdfcb" strokeWidth="2" />
                <circle cx="85" cy="83" r="5" fill="#f43f5e" />
                <circle cx="130" cy="85" r="5" fill="#f43f5e" />
              </g>

              {/* Right Cake Half */}
              <g className="cake-right">
                {/* Bottom Layer Right */}
                <path d="M160 140 Q160 160 280 140 L280 165 Q160 185 160 165 Z" fill="#fed7aa" />
                <path d="M160 115 L280 115 L280 145 Q220 160 160 145 Z" fill="#fdba74" />
                {/* Frosting drips */}
                <path d="M160 115 C190 135 210 120 230 130 C250 120 270 130 280 115 Z" fill="#fff7ed" />
                {/* Top Layer Right */}
                <path d="M160 85 L260 85 L260 115 Q210 125 160 115 Z" fill="#fb923c" />
                <ellipse cx="210" cy="85" rx="50" ry="16" fill="#fff7ed" stroke="#fcdfcb" strokeWidth="2" />
                <circle cx="185" cy="85" r="5" fill="#f43f5e" />
                <circle cx="235" cy="83" r="5" fill="#f43f5e" />
              </g>
            </svg>
          </div>
        </div>

        {!isCut ? (
          <button className="btn-primary" onClick={handleCutCake} disabled={isCutting}>
            <Cake size={20} />
            <span>{isCutting ? 'Cutting the Cake...' : 'Cut the Birthday Cake 🎂'}</span>
          </button>
        ) : (
          <div className="cake-message-reveal">
            <p className="cake-wish-quote">
              “May this new chapter of your life bring you happiness, peace, success, and countless
              reasons to smile. You deserve all the good things life has to offer. Happy Birthday, Akka! ❤️”
            </p>
            <p className="cake-wish-author">— Your Thambi, Dhana</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ==========================================================================
   PAGE 6: THE LITTLE THINGS THAT MEAN SO MUCH (GRATITUDE & PHOTOS M5, M6)
   ========================================================================== */
function LittleThingsSection() {
  return (
    <section className="section-wrapper" id="little-things">
      <div className="section-header">
        <div className="section-eyebrow">
          <Heart size={20} className="text-orange-500" />
          <span>Everyday Sibling Care</span>
        </div>
        <h2 className="section-title">THE LITTLE THINGS THAT MEAN SO MUCH</h2>
        <p className="section-desc">
          Not grand gestures. Just a hundred small ways you have made me feel cared for,
          teased, guided, and loved like a real brother.
        </p>
      </div>

      <div className="little-things-grid">
        <div className="gratitude-cards-list">
          {littleThings.map((item, idx) => (
            <div key={idx} className="gratitude-card-item">
              <div className="gratitude-icon-bubble">{item.icon}</div>
              <p className="gratitude-text">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="photo-scrapbook-column">
          {/* M5 Photograph in polaroid frame */}
          <div className="scrapbook-polaroid tilt-left">
            <div className="polaroid-tape" />
            <img
              src={assets.m5}
              alt="M5: Shared photo with Dhana and Maneeshwari, original HOME memory preserved"
              loading="lazy"
            />
            <p className="polaroid-caption">M5: Moments that feel like home 🏡</p>
          </div>

          {/* M6 Photograph in polaroid frame */}
          <div className="scrapbook-polaroid tilt-right">
            <div className="polaroid-tape" />
            <img
              src={assets.m6}
              alt="M6: Dhana and Maneeshwari together outside beneath the trees"
              loading="lazy"
            />
            <p className="polaroid-caption">M6: Sibling smiles & endless memories ✨</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   PAGE 6B: THE SPECIAL HEARTBEAT MOMENT
   ========================================================================== */
function HeartbeatSection() {
  const [isSpecial, setIsSpecial] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSpecial((prev) => !prev);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="heartbeat-container" id="heartbeat">
      <div className="heartbeat-badge">
        <Sparkles size={16} />
        <span>A Little Scientific Observation</span>
      </div>

      <div className={`heart-pulse-visual ${isSpecial ? 'pulse-special' : 'pulse-normal'}`}>
        <Heart size={40} fill={isSpecial ? '#c2410c' : '#ea580c'} />
      </div>

      <p className="heartbeat-phase-label">
        {isSpecial ? 'But whenever I talk to you…' : 'Normally, my heartbeat goes…'}
      </p>

      <div className="heartbeat-words-main">
        {isSpecial ? (
          <span>Maneesh… Maneesh… Maneesh… Maneesh… ❤️</span>
        ) : (
          <span>Lap tap… lap tap… lap tap…</span>
        )}
      </div>

      <button className="heartbeat-toggle-btn" onClick={() => setIsSpecial((prev) => !prev)}>
        (Click here to test the heartbeat rhythm 🩺)
      </button>
    </div>
  );
}

/* ==========================================================================
   PAGE 7: THE COMPLETE BIRTHDAY LETTER
   ========================================================================== */
function LetterSection() {
  return (
    <section className="letter-section" id="letter">
      <div className="section-header">
        <div className="section-eyebrow">
          <Sparkles size={20} />
          <span>From the Bottom of My Heart</span>
        </div>
        <h2 className="section-title">A Letter for My Dearest Akka</h2>
      </div>

      <article className="letter-parchment">
        <div className="letter-header-row">
          <span className="letter-date-stamp">06 NOVEMBER 2026</span>
          <div className="letter-wax-seal" title="Sister & Brother Bond">❤️</div>
        </div>

        <div className="letter-salutation">
          To My Dearest Maneeshwari Akka ❤️
        </div>

        <div className="letter-body">
          <div className="letter-subhead">
            Happy Birthday, Akka! 🎂✨
          </div>

          <p>
            On your special day, I wish you a life filled with happiness, peace, success, and countless beautiful memories. May every dream you carry in your heart slowly become a reality, and may every new chapter bring you closer to the life you wish for.
          </p>

          <p>
            I hope your career takes you to wonderful places, your hard work brings you the success you deserve, and you always find reasons to be proud of yourself. May you meet people who appreciate your kindness, respect your efforts, and encourage you to become everything you dream of being.
          </p>

          <p>
            Akka, never forget to take care of yourself while chasing your dreams. You deserve peaceful days, genuine smiles, endless laughter, and people who make you feel valued. Even when life becomes difficult, believe in yourself and remember that you are capable of achieving wonderful things.
          </p>

          <p>
            I hope your future is brighter than you imagine, your worries become lighter, and your happiness grows with every passing year. May you experience beautiful adventures, achieve your biggest goals, and build a life that makes you genuinely happy.
          </p>

          <div className="letter-highlight-wishes">
            You deserve not just a beautiful birthday, but a beautiful life. ❤️
          </div>

          <p>
            No matter where life takes you, keep smiling, keep dreaming, and never stop believing in yourself. I will always wish for your happiness and celebrate the wonderful things you achieve.
          </p>

          <div className="letter-subhead">
            Happy Birthday once again, Maneeshwari Akka! ❤️🎂
          </div>

          <p>
            May this new chapter bring you everything your heart has been waiting for and even more beautiful things you never expected.
          </p>
        </div>

        <div className="letter-signoff">
          <span className="letter-signoff-intro">
            With lots of love and the best wishes for your future,
          </span>
          <span className="letter-signoff-name">Your Thambi, Dhana ❤️</span>
          <p className="letter-ps">
            *P.S. May your happiness last longer than a day and your dreams keep growing forever. ♾️❤️*
          </p>
        </div>
      </article>
    </section>
  );
}

/* ==========================================================================
   PAGE 8: PERSONAL AUDIO SECTION (IMMEDIATELY AFTER LETTER)
   ========================================================================== */
function AudioSection() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.warn('Audio play attempt failed, trying fallback source:', err);
        if (audio.src !== window.location.origin + assets.audioFallback) {
          audio.src = assets.audioFallback;
          audio.play().catch((e) => {
            console.error('Playback error:', e);
            setHasError(true);
          });
        } else {
          setHasError(true);
        }
      });
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const seekTime = Number(e.target.value);
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleReplay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => setHasError(true));
  };

  return (
    <section className="audio-section" id="song">
      <div className="audio-player-card">
        <audio
          ref={audioRef}
          src={assets.audio}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onError={() => {
            if (audioRef.current && audioRef.current.src !== window.location.origin + assets.audioFallback) {
              audioRef.current.src = assets.audioFallback;
            } else {
              setHasError(true);
            }
          }}
        />

        <p className="audio-section-text">
          “Some songs hold feelings that words can never fully explain. ❤️ This one has a personal connection,
          so I wanted you to listen to it as a little piece of my heart, made especially for this surprise. 🎧💗”
        </p>

        <div className="audio-controls-row">
          <button
            className="audio-play-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause song' : 'Play song'}
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: 3 }} />}
          </button>

          <div className="audio-track-details">
            <div className="audio-song-title">
              <Music size={18} className="text-orange-600" />
              <span>Ethana Thanima Vattum Bothum</span>
              {isPlaying && (
                <div className="playing-waveform" aria-hidden="true">
                  <span className="wave-bar"></span>
                  <span className="wave-bar"></span>
                  <span className="wave-bar"></span>
                  <span className="wave-bar"></span>
                </div>
              )}
            </div>

            <div className="audio-seekbar-wrap">
              <input
                type="range"
                className="audio-seeker"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
              />
              <div className="audio-timestamps">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          <button
            className="audio-replay-btn"
            onClick={handleReplay}
            title="Replay from start"
            aria-label="Replay song"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        {hasError && (
          <p className="mt-4 text-center text-sm text-red-600">
            Audio file is loading locally. If audio doesn't start, please click play again.
          </p>
        )}
      </div>
    </section>
  );
}

/* ==========================================================================
   PAGE 9: EXACT FINAL SEQUENCE
   Step 1: Best Wishes, By Dhana.
   Step 2: D1 — Solo beach photograph
   Step 3: THROUGH THICK AND THIN, TOGETHER FOREVER. ♾️❤️
   ========================================================================== */
function FinalSection() {
  return (
    <section className="final-sequence-wrapper" id="final-wish">
      {/* Step 1: Best Wishes, By Dhana */}
      <div className="final-signoff-heading">
        <span className="final-signoff-kicker">With All My Affection & Sibling Bond</span>
        <h2 className="final-signoff-text">Best Wishes, By Dhana</h2>
      </div>

      {/* Step 2: D1 Solo Beach Photograph */}
      <div className="final-photo-container">
        <div className="final-photo-frame">
          <img
            src={assets.d1}
            alt="Dhana standing peacefully by the sea, his solo beach photograph"
            loading="lazy"
          />
          <p className="final-photo-caption">D1: Always your little brother, standing by you.</p>
        </div>
      </div>

      {/* Step 3: Final Forever Message */}
      <div className="final-forever-banner">
        <div className="forever-shine-glow" aria-hidden="true" />
        <div className="forever-crest">
          <Sparkles size={18} />
          <span>A PROMISE FOR A LIFETIME</span>
          <Sparkles size={18} />
        </div>
        <h2 className="final-forever-text">
          THROUGH THICK AND THIN, TOGETHER FOREVER. ♾️❤️
        </h2>
        <p className="final-forever-subtext">
          My sister by heart, today and always.
        </p>
        <div className="forever-stars-divider">
          <span>✧</span>
          <Heart size={16} fill="#fed7aa" color="#fed7aa" />
          <span>✧</span>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   MAIN EXPERIENCE WRAPPER
   ========================================================================== */
function MainExperience() {
  return (
    <div className="main-experience">
      <nav className="site-navbar">
        <div className="navbar-inner">
          <div className="nav-brand">
            <span className="title">MANEESHWARI AKKA</span>
            <span className="date">06 NOVEMBER 2026</span>
          </div>
          <div className="nav-links">
            <a href="#story" className="nav-link">Our Story</a>
            <a href="#cake" className="nav-link">Cake Cutting</a>
            <a href="#little-things" className="nav-link">Little Things</a>
            <a href="#heartbeat" className="nav-link">Heartbeat</a>
            <a href="#letter" className="nav-link">Letter</a>
            <a href="#song" className="nav-link">Song</a>
            <a href="#final-wish" className="nav-link">Final Wish</a>
          </div>
        </div>
      </nav>

      <StorySection />
      <CakeSection />
      <LittleThingsSection />
      <HeartbeatSection />
      <LetterSection />
      <AudioSection />
      <FinalSection />
    </div>
  );
}

/* ==========================================================================
   APP COMPONENT — STATE CONTROLLER
   ========================================================================== */
export default function App() {
  // Navigation states: 'opening' -> 'reveal' -> 'question' -> 'experience'
  const [currentStep, setCurrentStep] = useState('opening');

  const handleOpenSurprise = () => {
    setCurrentStep('reveal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToQuestion = () => {
    setCurrentStep('question');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoForSurprise = () => {
    setCurrentStep('experience');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root">
      {currentStep === 'opening' && (
        <OpeningScreen onOpenSurprise={handleOpenSurprise} />
      )}

      {currentStep === 'reveal' && (
        <RevealScreen onProceedToQuestion={handleProceedToQuestion} />
      )}

      {currentStep === 'question' && (
        <QuestionScreen onGoForSurprise={handleGoForSurprise} />
      )}

      {currentStep === 'experience' && (
        <MainExperience />
      )}
    </div>
  );
}
