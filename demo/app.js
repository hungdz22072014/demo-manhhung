/**
 * ==========================================================================
 * CAN-TIN THÔNG MINH - ỨNG DỤNG MÔ PHỎNG 3 NHIỆM VỤ GIAO TIẾP
 * Kịch bản: Gọi món ➔ Hỏi giá & Thanh toán ➔ Cảm ơn
 * ==========================================================================
 */

// Bảng ánh xạ chữ số tiếng Việt sang số nguyên
const WORD_TO_NUM = {
  'một': 1, 'mot': 1, '1': 1,
  'hai': 2, '2': 2, 'đôi': 2, 'cặp': 2,
  'ba': 3, '3': 3,
  'bốn': 4, 'bon': 4, 'tư': 4, '4': 4,
  'năm': 5, 'nam': 5, '5': 5,
  'sáu': 6, 'sau': 6, '6': 6,
  'bảy': 7, 'bay': 7, '7': 7,
  'tám': 8, 'tam': 8, '8': 8,
  'chín': 9, 'chin': 9, '9': 9,
  'mười': 10, 'muoi': 10, '10': 10
};

// Danh mục món ăn có trong thực đơn Can-tin
const MENU_ITEMS = [
  { 
    id: 'banh_mi', 
    name: 'Bánh mì kẹp thịt', 
    price: 20000, 
    keywords: ['bánh mì', 'banh mi', 'bánh mỳ', 'banh my', 'ổ bánh', 'bánh mì kẹp', 'bánh mì thịt', 'bánh mì chả', 'bánh mì que'] 
  },
  { 
    id: 'sua', 
    name: 'Sữa tươi tiệt trùng', 
    price: 5000, 
    keywords: ['sữa tươi', 'sua tuoi', 'sữa', 'sua', 'hộp sữa', 'bịch sữa', 'sữa tiệt trùng', 'milo'] 
  },
  { 
    id: 'xoi', 
    name: 'Xôi xéo ruốc', 
    price: 15000, 
    keywords: ['xôi xéo', 'xoi xeo', 'xôi', 'xoi', 'xôi ruốc', 'gói xôi', 'suất xôi', 'phần xôi', 'hộp xôi'] 
  },
  { 
    id: 'xuc_xich', 
    name: 'Xúc xích nướng', 
    price: 10000, 
    keywords: ['xúc xích', 'xuc xich', 'cây xúc xích', 'que xúc xích', 'cây xúc'] 
  },
  { 
    id: 'nuoc', 
    name: 'Nước suối đóng chai', 
    price: 5000, 
    keywords: ['nước suối', 'nuoc suoi', 'nước khoáng', 'nuoc khoang', 'nước lọc', 'nuoc loc', 'chai nước', 'chai nuoc', 'nước đóng chai'] 
  }
];

// Trạng thái ứng dụng
const AppState = {
  currentScreen: 'start', // 'start' | 'dialogue' | 'summary'
  currentStep: 1, // 1: Gọi món, 2: Hỏi giá, 3: Cảm ơn
  chatHistory: [],
  isTyping: false,
  isAutoDemo: false,
  soundEnabled: true,
  orderedItems: [], // Danh sách món học sinh đã chọn thành công kèm số lượng
  totalPrice: 25000 // Tổng tiền tính theo từng món và số lượng
};

// Web Audio API Sound Generator
const SoundEffects = {
  ctx: null,
  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.ctx = new AudioContext();
    }
  },
  playPop() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) { /* ignore audio error */ }
  },
  playChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.1, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.25);
      });
    } catch (e) {}
  },
  playFanfare() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880];
      const now = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.15, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.35);
      });
    } catch (e) {}
  }
};

// Dữ liệu gợi ý câu thoại thông minh theo từng bước
const QUICK_PROMPTS = {
  1: [
    "Dạ cô cho cháu 2 bánh mì kẹp thịt và 1 hộp sữa tươi ạ! (Số lượng > 1 🥖)",
    "Cô ơi cho cháu 1 bánh mì, 1 gói xôi xéo và 2 cây xúc xích ạ! (Mua 3 món 🍱)",
    "Cho cháu 3 cây xúc xích nướng nhé cô! (3 cây xúc xích 🌭)",
    "Cô ơi, bán cho cháu 1 tô phở bò tái nạm nhé! (Thử món ngoài menu ❌)"
  ],
  2: [
    "Dạ tổng cộng hết bao nhiêu tiền vậy cô?",
    "Dạ phần của cháu hết tất cả bao nhiêu ạ?",
    "Dạ cháu gửi tiền, cô tính giúp cháu với ạ!"
  ],
  3: [
    "Dạ cháu cảm ơn cô nhiều ạ, chúc cô bán đắt hàng!",
    "Cháu cảm ơn cô ạ, chào cô cháu vào lớp!",
    "Dạ cháu nhận đồ và tiền thừa, cảm ơn cô nhé!"
  ]
};

// DOM Elements
const screens = {
  start: document.getElementById('screen-start'),
  dialogue: document.getElementById('screen-dialogue'),
  summary: document.getElementById('screen-summary')
};

const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const typingIndicator = document.getElementById('typing-indicator');
const quickPromptsList = document.getElementById('quick-prompts-list');
const progressFill = document.getElementById('progress-fill');
const currentMissionBadge = document.getElementById('current-mission-badge');
const transcriptBody = document.getElementById('transcript-body');

// Điều hướng chuyển màn hình
function switchScreen(screenName) {
  SoundEffects.playPop();
  AppState.currentScreen = screenName;
  Object.keys(screens).forEach(key => {
    if (key === screenName) {
      screens[key].classList.add('active');
    } else {
      screens[key].classList.remove('active');
    }
  });

  if (screenName === 'dialogue') {
    initDialogueScreen();
  } else if (screenName === 'summary') {
    renderSummaryScreen();
    startConfetti();
    SoundEffects.playFanfare();
  }
}

// Khởi tạo màn hình hội thoại
function initDialogueScreen() {
  chatMessages.innerHTML = '';
  AppState.currentStep = 1;
  AppState.chatHistory = [];
  AppState.isTyping = false;
  AppState.orderedItems = [];
  AppState.totalPrice = 0;
  updateProgressUI();
  renderQuickPrompts();

  // Tin nhắn mở đầu từ Cô bán hàng
  setTimeout(() => {
    appendMessage('seller', '👩‍🍳', 'Chào cháu! Giờ ra chơi hôm nay cháu muốn ăn gì nào? Cô có bánh mì kẹp thịt (20k), sữa tươi (5k), xôi xéo (15k), xúc xích nướng (10k) và nước suối (5k) đây nhé!');
  }, 400);
}

// Cập nhật thanh tiến độ 1-2-3
function updateProgressUI() {
  const step = AppState.currentStep;
  const percent = ((step - 1) / 2) * 100;
  progressFill.style.width = `${percent}%`;

  for (let i = 1; i <= 3; i++) {
    const indicator = document.getElementById(`step-indicator-${i}`);
    indicator.classList.remove('current', 'completed');
    if (i < step) {
      indicator.classList.add('completed');
      indicator.querySelector('.step-circle').innerHTML = '✓';
    } else if (i === step) {
      indicator.classList.add('current');
      indicator.querySelector('.step-circle').innerHTML = i;
    } else {
      indicator.querySelector('.step-circle').innerHTML = i;
    }
  }

  // Cập nhật nhãn nhiệm vụ
  const badges = {
    1: 'Nhiệm vụ 1: Hãy gọi món bạn muốn mua 🥖',
    2: 'Nhiệm vụ 2: Hỏi giá & Chuẩn bị thanh toán 💵',
    3: 'Nhiệm vụ 3: Nói lời cảm ơn cô bán hàng 🙏'
  };
  currentMissionBadge.textContent = badges[step] || 'Hoàn thành';
}

// Hiển thị gợi ý câu thoại
function renderQuickPrompts() {
  quickPromptsList.innerHTML = '';
  const prompts = QUICK_PROMPTS[AppState.currentStep] || [];
  prompts.forEach(text => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'prompt-chip';
    chip.textContent = text;
    chip.onclick = () => {
      SoundEffects.playPop();
      userInput.value = text;
      userInput.focus();
    };
    quickPromptsList.appendChild(chip);
  });
}

// Thêm tin nhắn vào khung chat
function appendMessage(sender, avatar, text) {
  SoundEffects.playChime();
  const timeStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  
  const msgRow = document.createElement('div');
  msgRow.className = `msg-row ${sender}`;
  
  msgRow.innerHTML = `
    <div class="msg-avatar">${avatar}</div>
    <div class="msg-bubble">
      <div class="msg-text">${text}</div>
      <div class="msg-meta">${timeStr}</div>
    </div>
  `;
  
  chatMessages.appendChild(msgRow);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  AppState.chatHistory.push({
    sender: sender === 'seller' ? 'Cô Hoa' : 'Bạn (Học sinh)',
    senderType: sender,
    text,
    time: timeStr
  });
}

// Xử lý gửi tin nhắn của người dùng
function handleSendMessage(customText = null) {
  const text = (customText !== null ? customText : userInput.value).trim();
  if (!text || AppState.isTyping) return;

  // Render tin nhắn của học sinh
  appendMessage('user', '🎒', text);
  userInput.value = '';

  // Xử lý logic 3 bước
  processStepLogic(text);
}

// Hàm kiểm tra và nhận diện từng món ăn cùng số lượng trong câu
function detectOrderedItems(text) {
  const lower = text.toLowerCase();
  const matched = [];

  MENU_ITEMS.forEach(item => {
    let bestPos = -1;
    let matchedKw = '';

    // Tìm xem từ khóa nào của món xuất hiện sớm nhất trong câu
    for (const kw of item.keywords) {
      const pos = lower.indexOf(kw);
      if (pos !== -1) {
        if (bestPos === -1 || pos < bestPos) {
          bestPos = pos;
          matchedKw = kw;
        }
      }
    }

    if (bestPos !== -1) {
      // Tìm số lượng liên quan đến món này
      let quantity = 1;

      // 1. Kiểm tra đoạn văn bản 25 ký tự trước từ khóa: ví dụ "2 bánh mì", "3 cây xúc xích", "hai hộp sữa"
      const beforeText = lower.substring(Math.max(0, bestPos - 25), bestPos).trim();
      
      // Tìm số dạng số: "2 ", "3 cây ", "1 hộp "
      const numBeforeMatch = beforeText.match(/(\d+)\s*(?:cái|chiếc|ổ|hộp|bịch|gói|suất|phần|cây|que|chai|ly|cốc)?\s*$/i);
      if (numBeforeMatch) {
        const val = parseInt(numBeforeMatch[1], 10);
        if (!isNaN(val) && val > 0 && val <= 50) {
          quantity = val;
        }
      } else {
        // Tìm số dạng chữ: "hai ", "ba cây ", "một hộp "
        for (const [word, num] of Object.entries(WORD_TO_NUM)) {
          const wordRegex = new RegExp(`(?:^|\\s)${word}\\s*(?:cái|chiếc|ổ|hộp|bịch|gói|suất|phần|cây|que|chai|ly|cốc)?\\s*$`, 'i');
          if (wordRegex.test(beforeText)) {
            quantity = num;
            break;
          }
        }
      }

      // 2. Nếu phía trước không có số, kiểm tra đoạn văn bản 18 ký tự ngay sau từ khóa: ví dụ "bánh mì 2 cái", "xúc xích 3"
      if (quantity === 1) {
        const afterText = lower.substring(bestPos + matchedKw.length, Math.min(lower.length, bestPos + matchedKw.length + 18)).trim();
        const numAfterMatch = afterText.match(/^(\d+)\s*(?:cái|chiếc|ổ|hộp|bịch|gói|suất|phần|cây|que|chai|ly|cốc)?/i);
        if (numAfterMatch) {
          const val = parseInt(numAfterMatch[1], 10);
          if (!isNaN(val) && val > 0 && val <= 50) {
            quantity = val;
          }
        } else {
          for (const [word, num] of Object.entries(WORD_TO_NUM)) {
            const wordRegex = new RegExp(`^${word}(?:\\s*(?:cái|chiếc|ổ|hộp|bịch|gói|suất|phần|cây|que|chai|ly|cốc))?`, 'i');
            if (wordRegex.test(afterText)) {
              quantity = num;
              break;
            }
          }
        }
      }

      matched.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: quantity,
        subtotal: item.price * quantity,
        pos: bestPos
      });
    }
  });

  // Sắp xếp các món theo thứ tự xuất hiện trong câu nói
  matched.sort((a, b) => a.pos - b.pos);
  return matched;
}

// Logic kiểm tra & phản hồi theo 3 bước
function processStepLogic(userText) {
  AppState.isTyping = true;
  typingIndicator.style.display = 'flex';
  chatMessages.scrollTop = chatMessages.scrollHeight;

  const lower = userText.toLowerCase();

  setTimeout(() => {
    typingIndicator.style.display = 'none';
    AppState.isTyping = false;

    if (AppState.currentStep === 1) {
      // BƯỚC 1: GỌI MÓN (Kiểm tra thực đơn & tính số lượng)
      const matched = detectOrderedItems(userText);

      if (matched.length > 0) {
        // Món CÓ trong thực đơn!
        AppState.orderedItems = matched;
        AppState.totalPrice = matched.reduce((sum, item) => sum + item.subtotal, 0);

        // Hiển thị danh sách món kèm số lượng rõ ràng
        const itemsFormatted = matched.map(i => {
          const qtyStr = i.quantity > 1 ? `<b>${i.quantity}x</b> ` : '';
          return `${qtyStr}<b>${i.name}</b>`;
        }).join(', ');

        appendMessage('seller', '👩‍🍳', `Có ngay đây cháu ơi! Phần ${itemsFormatted} của cháu cô làm xong rồi nhé, nóng hổi thơm phức luôn! Cháu nhận lấy đồ ăn nha. 🥪✨`);
        
        AppState.currentStep = 2; // Chuyển sang Bước 2: Hỏi giá
        updateProgressUI();
        renderQuickPrompts();
      } else {
        // Món KHÔNG CÓ trong thực đơn -> Cô căng tin từ chối lịch sự!
        SoundEffects.playPop();
        appendMessage('seller', '👩‍🍳', `Ôi tiếc quá cháu ơi, món đó can-tin cô hôm nay không có bán rồi! 😅<br><br>Hiện tại quầy cô chỉ có các món trong thực đơn:<br>• 🥖 <b>Bánh mì kẹp thịt</b> (20k)<br>• 🥛 <b>Sữa tươi tiệt trùng</b> (5k)<br>• 🍙 <b>Xôi xéo ruốc</b> (15k)<br>• 🌭 <b>Xúc xích nướng</b> (10k)<br>• 💧 <b>Nước suối đóng chai</b> (5k)<br><br>Cháu xem rồi chọn lại một món có trong thực đơn giúp cô nhé!`);
        
        // Giữ nguyên ở Bước 1 để học sinh gọi lại món
        AppState.currentStep = 1;
        updateProgressUI();
        renderQuickPrompts();
      }
    } 
    else if (AppState.currentStep === 2) {
      // BƯỚC 2: HỎI GIÁ & THANH TOÁN (Tính chi tiết từng món x số lượng)
      const breakdown = AppState.orderedItems.length > 0 
        ? AppState.orderedItems.map(i => `${i.quantity}x ${i.name} (${(i.subtotal).toLocaleString('vi-VN')}đ)`).join(' + ')
        : 'đồ ăn';
      const formattedPrice = AppState.totalPrice > 0 
        ? `${AppState.totalPrice.toLocaleString('vi-VN')}đ` 
        : '25.000đ';

      appendMessage('seller', '👩‍🍳', `Dạ phần của cháu gồm <b>${breakdown}</b>, tổng cộng hết <b>${formattedPrice}</b> nhé! ... Cô nhận tiền và gửi lại cháu tiền thừa (nếu có) nha. 💵`);
      
      AppState.currentStep = 3; // Chuyển sang Bước 3: Cảm ơn
      updateProgressUI();
      renderQuickPrompts();
    } 
    else if (AppState.currentStep === 3) {
      // BƯỚC 3: CẢM ƠN
      const isThanking = ['cảm ơn', 'cám ơn', 'cam on', 'thank', 'thks', 'chào', 'ơn'].some(kw => lower.includes(kw));

      if (isThanking) {
        appendMessage('seller', '👩‍🍳', 'Không có chi cháu yêu! Chúc cháu ăn thật ngon miệng và có một buổi học tràn đầy năng lượng nhé. Lần sau lại ghé ủng hộ cô nha! ❤️');
        AppState.currentStep = 4; // Hoàn thành
        updateProgressUI();

        // Sau 1.4s chuyển sang màn hình tổng kết
        setTimeout(() => {
          switchScreen('summary');
        }, 1400);
      } else {
        // Nhắc nhở văn hóa giao tiếp lịch sự nếu học sinh chưa cảm ơn
        appendMessage('seller', '👩‍🍳', 'Đồ ăn và tiền thừa của cháu xong hết rồi nhé! Trước khi vào lớp, cháu nhớ nói lời cảm ơn và chào cô một tiếng cho đúng lễ phép nha. 😊');
      }
    }
  }, 900);
}

// Render màn hình tổng kết
function renderSummaryScreen() {
  transcriptBody.innerHTML = '';
  AppState.chatHistory.forEach(item => {
    const entry = document.createElement('div');
    entry.className = 'transcript-entry';
    entry.innerHTML = `
      <span class="transcript-speaker ${item.senderType}">${item.sender}:</span>
      <span class="transcript-text">${item.text}</span>
    `;
    transcriptBody.appendChild(entry);
  });
}

// Chạy tự động kịch bản mẫu (Full Auto Demo)
function runAutoDemo() {
  switchScreen('dialogue');
  AppState.isAutoDemo = true;

  const demoScript = [
    { delay: 1600, text: "Dạ cô cho cháu lấy 1 bánh mì kẹp thịt và 1 hộp sữa tươi ạ!" },
    { delay: 3500, text: "Dạ tổng cộng hết tất cả bao nhiêu tiền vậy cô?" },
    { delay: 5400, text: "Dạ cháu cảm ơn cô nhiều ạ, cháu chào cô cháu vào lớp!" }
  ];

  demoScript.forEach(step => {
    setTimeout(() => {
      handleSendMessage(step.text);
    }, step.delay);
  });
}

// Hiệu ứng pháo hoa Canvas Confetti
function startConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#f97316', '#fbbf24', '#34d399', '#38bdf8', '#ec4899', '#a855f7'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height * 0.5,
      w: Math.random() * 9 + 5,
      h: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      velX: (Math.random() - 0.5) * 4,
      velY: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 6
    });
  }

  let animationFrame;
  let timer = 0;

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timer++;

    particles.forEach(p => {
      p.x += p.velX;
      p.y += p.velY;
      p.rotation += p.rotSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();

      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });

    if (timer < 220) {
      animationFrame = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  render();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Nút bắt đầu vào vai
  document.getElementById('btn-start-scenario').addEventListener('click', () => {
    switchScreen('dialogue');
  });

  // Nút chạy demo tự động
  document.getElementById('btn-quick-demo').addEventListener('click', () => {
    runAutoDemo();
  });

  // Gửi tin nhắn qua Form
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSendMessage();
  });

  // Thực hành lại
  document.getElementById('btn-restart-scenario').addEventListener('click', () => {
    switchScreen('dialogue');
  });

  // Về màn hình đầu
  document.getElementById('btn-back-to-home').addEventListener('click', () => {
    switchScreen('start');
  });

  // Tự động resize canvas khi thay đổi kích thước cửa sổ
  window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
});
