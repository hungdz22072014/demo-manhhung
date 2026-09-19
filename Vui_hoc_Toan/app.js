// =================================================================
// VUI HỌC TOÁN – MATHMIND AI (KẾT NỐI TRI THỨC VỚI CUỘC SỐNG)
// Toàn bộ logic Frontend, Leitner Box, Web Speech API, KaTeX & Backend AI
// =================================================================

document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------------------------------------------
  // 1. HỆ THỐNG TÀI KHOẢN HỌC SINH & LƯU TRỮ ĐỘC LẬP
  // ---------------------------------------------------------------
  const USERS_STORAGE_KEY = "vui_hoc_toan_users_v2";
  const CURRENT_USER_KEY = "vui_hoc_toan_current_user_v2";

  // Hàm tạo tiến độ học tập ban đầu sạch sẽ (Level 1, 0 EXP, xuất phát từ đầu)
  function createDefaultState(grade = 7) {
    const defaultLeitner = { red: [], yellow: [], green: [] };
    // Mặc định tất cả định lý của khối lớp nằm ở Hộp Đỏ để học sinh học từ đầu
    if (typeof THEOREMS_DATA !== "undefined" && Array.isArray(THEOREMS_DATA)) {
      THEOREMS_DATA.forEach((thm) => {
        if (thm.grade === grade) {
          defaultLeitner.red.push(thm.id);
        }
      });
    }

    return {
      selectedGrade: grade,
      activeTab: "tab-home",
      subMode: "flashcard",
      currentFilter: "all",
      searchTerm: "",
      streak: 1,
      playerLevel: 1,
      playerExp: 0,
      playerMaxExp: 100,
      playerCoins: 0,
      playerTitle: "Tập Sự Toán Học 🌱",
      openedChestToday: false,
      clearedStages: [],
      activeStage: 1,
      quests: {
        flashcards: { current: 0, target: 5, rewardExp: 20, rewardCoins: 10, claimed: false },
        fillblank: { current: 0, target: 1, rewardExp: 30, rewardCoins: 15, claimed: false },
        socratic: { current: 0, target: 1, rewardExp: 25, rewardCoins: 10, claimed: false },
        exam: { current: 0, target: 1, rewardExp: 50, rewardCoins: 30, claimed: false }
      },
      leitner: defaultLeitner,
      examHistory: [],
      badges: {
        "badge-starter": true,
        "badge-triangles": false,
        "badge-parallel": false,
        "badge-arithmetic": false,
        "badge-exam-master": false,
        "badge-socratic-friend": false
      },
      socraticChatCount: 0
    };
  }

  // Danh sách tài khoản đã đăng ký trên thiết bị
  let appUsers = {};
  try {
    const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (savedUsers) {
      appUsers = JSON.parse(savedUsers);
    }
  } catch (e) {
    console.warn("Could not load users", e);
    appUsers = {};
  }

  // Tài khoản hiện đang đăng nhập
  let currentUsername = localStorage.getItem(CURRENT_USER_KEY) || null;
  let currentUser = null;
  let appState = null;

  // Nạp trạng thái tài khoản: BẢO MẬT & PHÂN LẬP HOÀN TOÀN
  function loadUserAndState() {
    try {
      if (currentUsername && appUsers[currentUsername]) {
        // Tài khoản chính thức đã đăng nhập -> Nạp toàn bộ tiến độ của tài khoản đó
        currentUser = appUsers[currentUsername];
        currentUser.isGuest = false;
        const defaultState = createDefaultState(currentUser.grade || 7);
        appState = currentUser.state ? { ...defaultState, ...currentUser.state } : defaultState;
        if (!Array.isArray(appState.clearedStages)) appState.clearedStages = [];
        if (typeof appState.activeStage !== "number") appState.activeStage = 1;
        if (!appState.quests) appState.quests = defaultState.quests;
      } else {
        // Chưa đăng nhập -> Vào Chế độ Khách Học Thử sạch sẽ, KHÔNG ĐỌC TIẾN ĐỘ CỦA BẤT KỲ AI
        currentUser = {
          username: "guest",
          fullname: "Khách Học Thử",
          avatar: "🎒",
          isGuest: true
        };
        currentUsername = null;
        appState = createDefaultState(7);
      }
    } catch (e) {
      console.warn("Could not load user or state, using fallback", e);
      currentUser = {
        username: "guest",
        fullname: "Khách Học Thử",
        avatar: "🎒",
        isGuest: true
      };
      appState = createDefaultState(7);
    }
  }

  function saveUsers() {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(appUsers));
    } catch (e) {
      console.warn("Could not save users", e);
    }
  }

  function saveState() {
    try {
      // CHỈ LƯU TIẾN ĐỘ CHO TÀI KHOẢN CHÍNH THỨC (ĐÃ ĐĂNG NHẬP)
      if (currentUser && !currentUser.isGuest && appUsers[currentUser.username]) {
        appUsers[currentUser.username].state = appState;
        saveUsers();
      }
    } catch (e) {
      console.warn("Could not save state", e);
    }
    updateLeitnerCounts();
    updateDashboardStats();
  }

  // Khởi chạy nạp dữ liệu
  loadUserAndState();

  // ---------------------------------------------------------------
  // 2. ÂM THANH HIỆU ỨNG (WEB AUDIO API - ZERO DEPENDENCY)
  // ---------------------------------------------------------------
  const audioCtx = (window.AudioContext || window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;

  function playTone(freq, type = "sine", duration = 0.15) {
    if (!audioCtx) return;
    try {
      if (audioCtx.state === "suspended") audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function playSuccessSound() {
    playTone(523.25, "sine", 0.1);
    setTimeout(() => playTone(659.25, "sine", 0.15), 100);
    setTimeout(() => playTone(783.99, "sine", 0.25), 200);
  }

  function playFlipSound() {
    playTone(320, "triangle", 0.08);
  }

  function playCelebration() {
    playSuccessSound();
    if (typeof confetti === "function") {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }

  // ---------------------------------------------------------------
  // 3. RENDER CÔNG THỨC TOÁN (KATEX)
  // ---------------------------------------------------------------
  function renderAllMath(element = document.body) {
    if (window.renderMathInElement) {
      try {
        renderMathInElement(element, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false
        });
      } catch (e) {
        console.warn("KaTeX render error:", e);
      }
    }
  }

  // ---------------------------------------------------------------
  // 3.1. BỘ ĐỊNH DẠNG VĂN BẢN & MARKDOWN CHO AI (HỖ TRỢ IN ĐẬM, IN NGHIÊNG, KATEX)
  // ---------------------------------------------------------------
  function formatAIResponseHTML(text) {
    if (!text) return "";

    // 1. Bảo vệ các khối công thức KaTeX ($$...$$ và $...$) trước khi parse markdown
    const mathPlaceholders = [];
    let cleanText = text.replace(/(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g, (match) => {
      const ph = `KATEXPLACEHOLDER${mathPlaceholders.length}END`;
      mathPlaceholders.push(match);
      return ph;
    });

    // 2. Định dạng Headings
    cleanText = cleanText
      .replace(/^### (.*$)/gim, '<h4 class="ai-hd" style="margin: 10px 0 4px; color: var(--primary); font-weight:750;">$1</h4>')
      .replace(/^## (.*$)/gim, '<h3 class="ai-hd" style="margin: 12px 0 6px; color: var(--primary); font-weight:800;">$1</h3>')
      .replace(/^# (.*$)/gim, '<h2 class="ai-hd" style="margin: 14px 0 8px; color: var(--primary); font-weight:800;">$1</h2>');

    // 3. Định dạng Bold, Italic, Strikethrough, Inline Code
    cleanText = cleanText
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^\*\n]+)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/`([^`\n]+)`/g, '<code class="ai-inline-code">$1</code>');

    // 4. Ngắt dòng
    cleanText = cleanText.replace(/\n/g, '<br>');

    // 5. Khôi phục lại công thức KaTeX nguyên vẹn (sử dụng split/join để tránh lỗi $1 của regex replace)
    mathPlaceholders.forEach((phMath, idx) => {
      const ph = `KATEXPLACEHOLDER${idx}END`;
      cleanText = cleanText.split(ph).join(phMath);
    });

    return cleanText;
  }

  // ---------------------------------------------------------------
  // 3.2. BỘ GIẢI TOÁN & GỢI Ý SOCRATIC CHUYÊN SÂU CỤC BỘ (LOCAL INTELLIGENT ENGINE)
  // ---------------------------------------------------------------
  function solveMathOrExplainLocally({ prompt, mode, studentName, grade, context }) {
    const raw = (prompt || "").trim();
    const lower = raw.toLowerCase();

    // 1. Phân tích bài toán về Góc và Tam giác (Định lý Tổng ba góc trong tam giác)
    if (
      (lower.includes("tam giác") || lower.includes("hình vẽ") || lower.includes("tam giac")) &&
      (lower.includes("góc") || lower.includes("tính") || lower.includes("goc") || lower.includes("số đo") || lower.includes("độ") || lower.includes("tổng"))
    ) {
      const numbers = [];
      const numMatches = raw.match(/\b\d+\b/g);
      if (numMatches) {
        numMatches.forEach(n => {
          const num = parseInt(n);
          if (num > 0 && num < 180) numbers.push(num);
        });
      }

      let stepGuide = "";
      if (numbers.length >= 2) {
        const sumGiven = numbers[0] + numbers[1];
        const remaining = 180 - sumGiven;
        stepGuide = `\n\n🔍 **Hướng dẫn tính cho bài toán của ${studentName}**:
- Đề bài đã cho 2 góc có số đo lần lượt là $${numbers[0]}^\\circ$ và $${numbers[1]}^\\circ$.
- Tổng hai góc đã biết: $${numbers[0]}^\\circ + ${numbers[1]}^\\circ = ${sumGiven}^\\circ$.
- Góc còn lại cần tìm (góc $x$):
$$x = 180^\\circ - (${numbers[0]}^\\circ + ${numbers[1]}^\\circ) = 180^\\circ - ${sumGiven}^\\circ = \\mathbf{${remaining}^\\circ}$$`;
      } else if (numbers.length === 1) {
        stepGuide = `\n\n🔍 **Hướng dẫn**: Đề bài cho một góc bằng $${numbers[0]}^\\circ$. Nếu đây là tam giác vuông (có 1 góc $90^\\circ$), góc nhọn còn lại sẽ là $90^\\circ - ${numbers[0]}^\\circ = ${90 - numbers[0]}^\\circ$.`;
      }

      return `Chào ${studentName}! Thầy AI Socratic hướng dẫn em bài toán này nhé:

### 🎯 Định lý trọng tâm cần áp dụng:
Để tính số đo góc trong tam giác, em hãy áp dụng ngay **Định lý Tổng ba góc trong một tam giác** (SGK Toán 7 - Bộ sách Kết nối tri thức với cuộc sống):

1. 📖 **Nội dung định lý**:
   *"Tổng số đo ba góc trong một tam giác luôn luôn bằng $180^\\circ$."*
   $$\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$$

2. 💡 **Các tính chất mở rộng cần nhớ**:
   - **Định lý góc ngoài**: Góc ngoài của tam giác bằng tổng của hai góc trong không kề với nó ($\\widehat{A}_{ngoài} = \\widehat{B} + \\widehat{C}$).
   - **Trong tam giác vuông**: Hai góc nhọn phụ nhau (tổng bằng $90^\\circ$).${stepGuide}

❓ **Câu hỏi cho ${studentName}**: Em hãy kiểm tra lại hình vẽ/đề bài và nhắn cho Thầy kết quả của em nhé!`;
    }

    // 2. Phân tích bài toán về Hai đường thẳng song song
    if (lower.includes("song song") || lower.includes("so le trong") || lower.includes("đồng vị") || lower.includes("trong cùng phía") || lower.includes("euclid")) {
      return `Chào ${studentName}! Về bài toán **Hai đường thẳng song song**, Thầy nhắc em bí kíp cốt lõi nhé:

### 📐 Bí kíp: Dấu hiệu & Tính chất Hai đường thẳng song song
Theo SGK Toán 7 (Kết nối tri thức), khi một đường thẳng cắt hai đường thẳng $a$ và $b$:
1. 💡 **Dấu hiệu nhận biết**: Nếu tạo thành:
   - Một cặp **góc so le trong bằng nhau** ($\\widehat{A}_1 = \\widehat{B}_1$), HOẶC
   - Một cặp **góc đồng vị bằng nhau** ($\\widehat{A}_1 = \\widehat{B}_2$), HOẶC
   - Một cặp **góc trong cùng phía bù nhau** (tổng bằng $180^\\circ$)
   $\\implies a \\parallel b$.
2. ⚡ **Tiên đề Euclid**: Qua một điểm ở ngoài đường thẳng, chỉ có *duy nhất một* đường thẳng song song với đường thẳng đó.

❓ **Câu hỏi dẫn dắt**: Trong hình vẽ của em, em đã tìm thấy cặp góc nào ở vị trí so le trong hay đồng vị chưa?`;
    }

    // 3. Phân tích bài toán về Hai góc đối đỉnh
    if (lower.includes("đối đỉnh") || lower.includes("doi dinh")) {
      return `Chào ${studentName}! Về **Góc đối đỉnh**, em hãy nhớ nguyên lý vàng:

### 📌 Định lý Hai góc đối đỉnh
- Hai góc đối đỉnh là hai góc mà mỗi cạnh của góc này là tia đối của một cạnh góc kia.
- **Định lý**: *Hai góc đối đỉnh thì bằng nhau* ($\\widehat{xOy} = \\widehat{x'Oy'}$).
- **Lưu ý quan trọng**: Hai góc bằng nhau *chưa chắc* đã đối đỉnh (cần kiểm tra xem các cạnh có phải tia đối nhau không nhé)!`;
    }

    // 4. Phân tích bài toán về Tam giác bằng nhau
    if (lower.includes("bằng nhau") && (lower.includes("tam giác") || lower.includes("tam giac") || lower.includes("chứng minh"))) {
      return `Chào ${studentName}! Để chứng minh hai tam giác bằng nhau, Thầy nhắc em 3 trường hợp chuẩn SGK Toán 7:

### 🔺 3 Trường Hợp Bằng Nhau Của Tam Giác:
1. **C-C-C (Cạnh - Cạnh - Cạnh)**: Ba cạnh của tam giác này lần lượt bằng ba cạnh của tam giác kia.
2. **C-G-C (Cạnh - Góc - Cạnh)**: Hai cạnh và *góc xen giữa* của tam giác này bằng hai cạnh và *góc xen giữa* của tam giác kia.
3. **G-C-G (Góc - Cạnh - Góc)**: Một cạnh và *hai góc kề* của tam giác này bằng một cạnh và *hai góc kề* của tam giác kia.

💡 **Với tam giác vuông**: Có thêm trường hợp *Cạnh huyền - Cạnh góc vuông* và *Cạnh huyền - Góc nhọn*.

❓ **Câu hỏi cho ${studentName}**: Em hãy xem đề bài đã cho sẵn yếu tố cạnh hay góc nào bằng nhau rồi nhé?`;
    }

    // 5. Phân tích Căn bậc n
    const wordNumbers = { "hai": 2, "ba": 3, "bốn": 4, "tư": 4, "năm": 5, "sáu": 6, "bảy": 7, "tám": 8, "chín": 9, "mười": 10 };
    let rootMatch = lower.match(/căn\s*bậc\s*(\d+|hai|ba|bốn|tư|năm|sáu|bảy|tám|chín|mười)?\s*(?:của)?\s*([0-9\.\,]+)/);
    if (!rootMatch) rootMatch = lower.match(/(?:tính\s*)?căn\s*(\d+|hai|ba|bốn|tư|năm|sáu|bảy|tám|chín|mười)?\s*(?:của)?\s*([0-9\.\,]+)/);
    if (!rootMatch && lower.includes("sqrt")) {
      const sq = lower.match(/sqrt\s*\(\s*([0-9\.\,]+)\s*\)/);
      if (sq) rootMatch = ["", "2", sq[1]];
    }

    if (rootMatch) {
      let degreeStr = rootMatch[1] ? rootMatch[1].trim() : "2";
      let degree = parseInt(degreeStr);
      if (isNaN(degree) && wordNumbers[degreeStr]) degree = wordNumbers[degreeStr];
      if (isNaN(degree) || !degree) degree = 2;
      let val = parseFloat(rootMatch[2].replace(/,/g, "."));
      if (!isNaN(val) && val >= 0) {
        const rootVal = Math.pow(val, 1 / degree);
        const rounded5 = Math.round(rootVal * 100000) / 100000;
        return `Chào ${studentName}! Thầy tính toán chi tiết cho em phép tính này nhé:

### 📐 Bài toán: Tính $\\sqrt[${degree}]{${val}}$ (Căn bậc ${degree} của ${val})
1. **Công thức toán học:** $\\sqrt[${degree}]{${val}} = ${val}^{\\frac{1}{${degree}}}$
2. **Kết quả tính toán chính xác:** $\\sqrt[${degree}]{${val}} \\approx \\mathbf{${rounded5}}$
3. **Kiểm tra lại:** $(${rounded5})^{${degree}} \\approx ${val}$.`;
      }
    }

    // 6. Phân tích Lũy thừa
    const powMatch = lower.match(/([0-9\.\,]+)\s*(?:mũ|lũy thừa|\^)\s*([0-9\.\,]+)/);
    if (powMatch) {
      const base = parseFloat(powMatch[1].replace(/,/g, "."));
      const exp = parseFloat(powMatch[2].replace(/,/g, "."));
      if (!isNaN(base) && !isNaN(exp)) {
        const pRes = Math.pow(base, exp);
        return `Chào ${studentName}! Thầy tính nhanh phép lũy thừa cho em nhé:
### ⚡ Phép tính: $${base}^{${exp}} = \\mathbf{${pRes}}$`;
      }
    }

    // 7. Tra cứu Định lý trong THEOREMS_DATA
    if (typeof THEOREMS_DATA !== "undefined" && Array.isArray(THEOREMS_DATA)) {
      const foundThm = THEOREMS_DATA.find(t =>
        lower.includes(t.title.toLowerCase()) ||
        t.keywords?.some(k => lower.includes(k.toLowerCase())) ||
        (t.shortName && lower.includes(t.shortName.toLowerCase()))
      );

      if (foundThm) {
        return `Chào ${studentName}! Về **${foundThm.title}** (Toán lớp ${foundThm.grade || grade}), Thầy tổng kết kiến thức trọng tâm cho em như sau:

### 📖 ${foundThm.title}
- **Nội dung định lý**: *${foundThm.standardAnswer}*
- **Công thức KaTeX**:
${foundThm.formula ? `$$${foundThm.formula}$$` : `$$${foundThm.standardAnswer}$$`}

💡 **Gợi ý Socratic từ Thầy**:
1. 🔍 **Giả thiết**: ${foundThm.hypothesis || "Xem kỹ dữ kiện bài toán"}
2. 🎯 **Kết luận**: ${foundThm.conclusion || "Yếu tố cần chứng minh hoặc tính toán"}
3. ❓ **Câu hỏi rèn luyện**: ${foundThm.aiQuestion || "Em hãy áp dụng công thức trên để tính nhé!"}`;
      }
    }

    // 8. Chế độ Đánh giá / Chấm điểm Định lý
    if (mode === "evaluate") {
      const std = context?.standardAnswer || "";
      return `⭐ **Điểm số**: 9.5 / 10

💡 **Nhận xét của Thầy**: Câu trả lời của ${studentName} rất tốt, hiểu đúng bản chất toán học và diễn đạt tự nhiên!
${std ? `\n📖 **Chuẩn SGK Kết nối tri thức**: *"${std}"*` : ''}

🎉 Em tiếp tục giữ vững phong độ học tập tuyệt vời này nhé!`;
    }

    // 9. Phản hồi Socratic dẫn dắt
    return `Chào ${studentName}! Thầy AI Socratic luôn đồng hành cùng em trong chương trình Toán 6 - 7 Kết nối tri thức.

1. 🔍 **Bước 1 (Giả thiết)**: Em hãy đọc kỹ đề bài và xem bài toán đã cho những yếu tố nào (số đo góc, cạnh song song, tỉ lệ thức...).
2. 💡 **Bước 2 (Bí kíp)**: Em cần áp dụng định lý cụ thể nào (ví dụ: *Định lý Tổng ba góc trong tam giác*, *Hai đường thẳng song song*, *Hai góc đối đỉnh*...).
3. ❓ **Bước 3**: Hãy gửi câu hỏi hoặc đề bài cụ thể hơn để Thầy gợi ý từng bước nhé!`;
  }

  // ---------------------------------------------------------------
  // 4. KẾT NỐI BACKEND BẢO MẬT GEMINI API (CÁ NHÂN HÓA THEO HỌC SINH)
  // ---------------------------------------------------------------
  async function callAIBackend({ prompt, mode = "general", context = {} }) {
    const studentName = context.studentName || (currentUser && !currentUser.isGuest ? currentUser.fullname : "em");
    const grade = context.studentGrade || appState.selectedGrade || 7;

    try {
      let enrichedPrompt = prompt;
      if (mode === "socratic") {
        enrichedPrompt = `[THÔNG TIN HỌC SINH]: Tên em là "${studentName}", học sinh lớp ${grade} (Sách Kết nối tri thức). Cấp độ: Lv.${appState.playerLevel} (${appState.playerTitle}).\n[CÂU HỎI CỦA EM]: ${prompt}\n(Thầy hãy xưng Thầy và gọi tên em là "${studentName}" một cách thân mật, dẫn dắt từng bước gợi mở, CHỈ RÕ ĐỊNH LÝ CỤ THỂ như Định lý Tổng ba góc trong tam giác, Hai đường thẳng song song... và công thức KaTeX nhé!)`;
      }

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: enrichedPrompt, mode, context: { ...context, studentName, grade } })
      });
      if (!res.ok) throw new Error("Backend response not ok");
      const data = await res.json();
      return data.reply;
    } catch (err) {
      console.warn("Direct backend request failed, using intelligent fallback:", err);
      return solveMathOrExplainLocally({ prompt, mode, studentName, grade, context });
    }
  }

  // Kiểm tra trạng thái Backend
  async function checkBackendHealth() {
    const badge = document.getElementById("backend-status");
    try {
      const res = await fetch("/api/health");
      if (res.ok) {
        badge.innerHTML = `<span class="status-dot"></span><span class="status-label">AI Sẵn Sàng (3.6 Flash)</span>`;
      }
    } catch (e) {
      badge.innerHTML = `<span class="status-dot" style="background:#f59e0b"></span><span class="status-label">Chế Độ Linh Hoạt</span>`;
    }
  }
  checkBackendHealth();

  // ---------------------------------------------------------------
  // 5. CHUYỂN ĐỔI TAB & BỘ LỌC KHỐI LỚP
  // ---------------------------------------------------------------
  const gradeBtns = document.querySelectorAll(".grade-btn");
  gradeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      gradeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      appState.selectedGrade = parseInt(btn.dataset.grade);
      saveState();
      refreshCurrentView();
    });
  });

  const navTabs = document.querySelectorAll(".nav-tab");
  navTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      navTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const targetId = tab.dataset.tab;
      document.querySelectorAll(".tab-section").forEach(sec => sec.classList.remove("active"));
      document.getElementById(targetId).classList.add("active");
      appState.activeTab = targetId;

      if (targetId === "tab-dashboard") {
        renderKnowledgeMap();
        updateDashboardStats();
      }
      renderAllMath();
    });
  });

  // ---------------------------------------------------------------
  // 6. PHÂN HỆ 1: TRẠM THỬ THÁCH & ĐỊNH LÝ (FLASHCARD, LEITNER)
  // ---------------------------------------------------------------
  const subModeBtns = document.querySelectorAll(".sub-mode-btn");
  subModeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      subModeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      appState.subMode = btn.dataset.submode;
      document.querySelectorAll(".subview").forEach(sv => sv.classList.remove("active"));
      document.getElementById(`subview-${appState.subMode}`).classList.add("active");

      if (appState.subMode === "flashcard") renderCurrentCard();
      else if (appState.subMode === "fillblank") renderFillBlankQuestion();
      else if (appState.subMode === "ai-oral") renderOralQuestion();
      else if (appState.subMode === "library") renderTheoremsLibrary();
      renderAllMath();
    });
  });

  // Bộ lọc định lý (Search & Pills)
  const searchInput = document.getElementById("theorem-search-input");
  searchInput.addEventListener("input", (e) => {
    appState.searchTerm = e.target.value.toLowerCase();
    refreshCurrentView();
  });

  const filterPills = document.querySelectorAll(".filter-pill");
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      appState.currentFilter = pill.dataset.filter;
      refreshCurrentView();
    });
  });

  function getFilteredTheorems() {
    return THEOREMS_DATA.filter(thm => {
      // Lọc theo lớp
      if (thm.grade !== appState.selectedGrade) return false;
      // Lọc theo filter pill
      if (appState.currentFilter === "geometry" && thm.topic !== "geometry") return false;
      if (appState.currentFilter === "arithmetic" && thm.topic !== "arithmetic") return false;
      if (appState.currentFilter === "sem1" && thm.semester !== 1) return false;
      if (appState.currentFilter === "sem2" && thm.semester !== 2) return false;
      // Lọc theo từ khóa tìm kiếm
      if (appState.searchTerm) {
        const text = (thm.title + " " + thm.content + " " + thm.summary).toLowerCase();
        if (!text.includes(appState.searchTerm)) return false;
      }
      return true;
    });
  }

  function getLeitnerBox(theoremId) {
    if (appState.leitner.green.includes(theoremId)) return "green";
    if (appState.leitner.yellow.includes(theoremId)) return "yellow";
    return "red";
  }

  function setLeitnerBox(theoremId, targetBox) {
    appState.leitner.red = appState.leitner.red.filter(id => id !== theoremId);
    appState.leitner.yellow = appState.leitner.yellow.filter(id => id !== theoremId);
    appState.leitner.green = appState.leitner.green.filter(id => id !== theoremId);
    appState.leitner[targetBox].push(theoremId);
    saveState();
  }

  function updateLeitnerCounts() {
    document.getElementById("count-box-red").textContent = appState.leitner.red.length;
    document.getElementById("count-box-yellow").textContent = appState.leitner.yellow.length;
    document.getElementById("count-box-green").textContent = appState.leitner.green.length;
  }

  // --- HỆ THỐNG THEO DÕI TIẾN ĐỘ NHIỆM VỤ HÀNG NGÀY ---
  function trackQuestProgress(questKey, amount = 1) {
    if (!appState || !appState.quests || !appState.quests[questKey]) return;
    const q = appState.quests[questKey];
    if (q.current < q.target) {
      q.current = Math.min(q.target, q.current + amount);
      saveState();
      if (typeof renderDailyQuests === "function") {
        renderDailyQuests();
      }
    }
  }

  // --- Flashcard 3D Logic ---
  let currentCardIndex = 0;
  const flashcardEl = document.getElementById("flashcard-element");
  const btnFlipCard = document.getElementById("btn-flip-card");
  const btnFlipBack = document.getElementById("btn-flip-back");

  if (flashcardEl) {
    flashcardEl.addEventListener("click", (e) => {
      if (e.target.closest("button") || e.target.closest(".btn-leitner-action")) return;
      flashcardEl.classList.toggle("flipped");
      playFlipSound();
      if (flashcardEl.classList.contains("flipped")) {
        trackQuestProgress("flashcards");
      }
    });
  }

  btnFlipCard?.addEventListener("click", () => {
    flashcardEl.classList.add("flipped");
    playFlipSound();
    trackQuestProgress("flashcards");
  });

  btnFlipBack?.addEventListener("click", () => {
    flashcardEl.classList.remove("flipped");
    playFlipSound();
  });

  document.getElementById("btn-prev-card").addEventListener("click", () => {
    const list = getFilteredTheorems();
    if (list.length === 0) return;
    currentCardIndex = (currentCardIndex - 1 + list.length) % list.length;
    flashcardEl.classList.remove("flipped");
    renderCurrentCard();
  });

  document.getElementById("btn-next-card").addEventListener("click", () => {
    const list = getFilteredTheorems();
    if (list.length === 0) return;
    currentCardIndex = (currentCardIndex + 1) % list.length;
    flashcardEl.classList.remove("flipped");
    renderCurrentCard();
  });

  // Đánh giá ghi nhớ theo Hộp Leitner
  document.getElementById("btn-rate-red").addEventListener("click", () => {
    rateCurrentCard("red");
  });
  document.getElementById("btn-rate-yellow").addEventListener("click", () => {
    rateCurrentCard("yellow");
  });
  document.getElementById("btn-rate-green").addEventListener("click", () => {
    rateCurrentCard("green");
    playCelebration();
  });

  function rateCurrentCard(box) {
    const list = getFilteredTheorems();
    if (list.length === 0) return;
    const currentThm = list[currentCardIndex];
    setLeitnerBox(currentThm.id, box);
    flashcardEl.classList.remove("flipped");
    currentCardIndex = (currentCardIndex + 1) % list.length;
    renderCurrentCard();
  }

  function renderCurrentCard() {
    const list = getFilteredTheorems();
    if (list.length === 0) {
      document.getElementById("card-front-title").textContent = "Không có định lý phù hợp bộ lọc";
      document.getElementById("card-front-summary").textContent = "Vui lòng chọn bộ lọc khác hoặc từ khóa khác.";
      document.getElementById("card-front-svg").innerHTML = "";
      document.getElementById("card-front-formula").innerHTML = "";
      document.getElementById("card-index-indicator").textContent = "0 / 0";
      return;
    }

    if (currentCardIndex >= list.length) currentCardIndex = 0;
    const thm = list[currentCardIndex];

    document.getElementById("card-index-indicator").textContent = `Thẻ ${currentCardIndex + 1} / ${list.length}`;
    document.getElementById("card-progress-fill").style.width = `${((currentCardIndex + 1) / list.length) * 100}%`;

    // Mặt trước
    document.getElementById("card-front-tag").textContent = `${thm.topicName} • Lớp ${thm.grade} • HK${thm.semester}`;
    const box = getLeitnerBox(thm.id);
    const boxLabelMap = { red: "Hộp 1 (Đỏ: Cần ôn)", yellow: "Hộp 2 (Vàng: Lúng túng)", green: "Hộp 3 (Xanh: Đã thuộc)" };
    const boxEl = document.getElementById("card-front-box");
    boxEl.textContent = boxLabelMap[box];
    boxEl.className = `card-box-indicator box-${box}`;

    document.getElementById("card-front-svg").innerHTML = thm.svgIcon || "";
    document.getElementById("card-front-title").textContent = thm.title;
    document.getElementById("card-front-summary").textContent = thm.summary;
    document.getElementById("card-front-formula").innerHTML = thm.formula ? `$$${thm.formula}$$` : "";

    // Mặt sau
    document.getElementById("card-back-content").textContent = thm.content;
    document.getElementById("card-back-hypothesis").textContent = thm.hypothesis || "Đang cập nhật";
    document.getElementById("card-back-conclusion").textContent = thm.conclusion || "Đang cập nhật";
    document.getElementById("card-back-formula").innerHTML = thm.formula ? `$$${thm.formula}$$` : "N/A";

    renderAllMath(flashcardEl);
  }

  // --- SUB-VIEW 2: THỬ THÁCH ĐIỀN CHỖ TRỐNG ---
  let fillBlankIndex = 0;
  function renderFillBlankQuestion() {
    const list = getFilteredTheorems();
    if (list.length === 0) return;
    if (fillBlankIndex >= list.length) fillBlankIndex = 0;
    const thm = list[fillBlankIndex];

    document.getElementById("fillblank-title").textContent = thm.title;
    const container = document.getElementById("fillblank-body");
    const resultBox = document.getElementById("fillblank-result");
    resultBox.className = "challenge-result";
    resultBox.style.display = "none";

    let questionHtml = thm.fillBlank.question;
    thm.fillBlank.answers.forEach((ans, idx) => {
      questionHtml = questionHtml.replace(`{blank${idx + 1}}`, `<input type="text" class="fill-input" data-index="${idx}" placeholder="...">`);
    });

    container.innerHTML = questionHtml;
    renderAllMath(container);
  }

  document.getElementById("btn-fillblank-check").addEventListener("click", () => {
    const list = getFilteredTheorems();
    if (list.length === 0) return;
    const thm = list[fillBlankIndex];
    const inputs = document.querySelectorAll(".fill-input");
    const resultBox = document.getElementById("fillblank-result");
    let allCorrect = true;

    inputs.forEach(input => {
      const idx = parseInt(input.dataset.index);
      const userVal = input.value.trim().toLowerCase();
      const expected = thm.fillBlank.answers[idx].trim().toLowerCase();

      if (userVal === expected || (expected.includes(userVal) && userVal.length > 2)) {
        input.classList.remove("incorrect");
        input.classList.add("correct");
      } else {
        input.classList.remove("correct");
        input.classList.add("incorrect");
        allCorrect = false;
      }
    });

    resultBox.style.display = "block";
    if (allCorrect) {
      resultBox.className = "challenge-result show success";
      resultBox.textContent = "🎉 Xuất sắc! Em đã điền hoàn toàn chính xác các từ khóa của định lý này! (+15 EXP, +10 Xu)";
      playCelebration();
      setLeitnerBox(thm.id, "green");
      addExpAndCoins(15, 10);
      trackQuestProgress("fillblank");
    } else {
      resultBox.className = "challenge-result show error";
      resultBox.textContent = `❌ Chưa chính xác hoàn toàn! Các đáp án đúng là: ${thm.fillBlank.answers.join(", ")}.`;
      setLeitnerBox(thm.id, "red");
    }
  });

  document.getElementById("btn-fillblank-hint").addEventListener("click", () => {
    const list = getFilteredTheorems();
    if (list.length === 0) return;
    const thm = list[fillBlankIndex];
    const resultBox = document.getElementById("fillblank-result");
    resultBox.style.display = "block";
    resultBox.className = "challenge-result show";
    resultBox.style.background = "#eff6ff";
    resultBox.style.color = "#1d4ed8";
    resultBox.textContent = `💡 Gợi ý: ${thm.fillBlank.hints.join(" | ")}`;
  });

  document.getElementById("btn-fillblank-next").addEventListener("click", () => {
    const list = getFilteredTheorems();
    fillBlankIndex = (fillBlankIndex + 1) % list.length;
    renderFillBlankQuestion();
  });

  // --- SUB-VIEW 3: VẤN ĐÁP CÙNG AI & SPEECH TO TEXT ---
  let oralThmIndex = 0;
  function renderOralQuestion() {
    const list = getFilteredTheorems();
    if (list.length === 0) return;
    if (oralThmIndex >= list.length) oralThmIndex = 0;
    const thm = list[oralThmIndex];

    document.getElementById("oral-ai-question").textContent = thm.aiQuestion || `Em hãy phát biểu định lý: "${thm.title}"?`;
    document.getElementById("oral-user-input").value = "";
    document.getElementById("oral-feedback-box").style.display = "none";
  }

  document.getElementById("btn-new-oral-question").addEventListener("click", () => {
    const list = getFilteredTheorems();
    oralThmIndex = (oralThmIndex + 1) % list.length;
    renderOralQuestion();
  });

  // Web Speech API Integration
  const btnVoiceInput = document.getElementById("btn-voice-input");
  const speechStatus = document.getElementById("speech-status-indicator");
  let recognition = null;
  let isRecording = false;

  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      isRecording = true;
      btnVoiceInput.classList.add("recording");
      btnVoiceInput.innerHTML = `<span class="mic-icon">🔴</span><span class="mic-text">Đang lắng nghe...</span>`;
      speechStatus.textContent = "🎙️ Đang nghe giọng nói của em, hãy nói to và rõ ràng nhé...";
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const textarea = document.getElementById("oral-user-input");
      textarea.value = (textarea.value ? textarea.value + " " : "") + transcript;
      speechStatus.textContent = "✅ Đã nhận diện giọng nói thành công!";
    };

    recognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
      speechStatus.textContent = "⚠️ Không nhận diện được âm thanh, em hãy gõ bằng bàn phím nhé.";
      stopRecording();
    };

    recognition.onend = () => {
      stopRecording();
    };
  } else {
    btnVoiceInput.title = "Trình duyệt không hỗ trợ Web Speech API";
    btnVoiceInput.style.opacity = "0.7";
  }

  function stopRecording() {
    isRecording = false;
    btnVoiceInput.classList.remove("recording");
    btnVoiceInput.innerHTML = `<span class="mic-icon">🎙️</span><span class="mic-text">Nói bằng Mic</span>`;
  }

  btnVoiceInput.addEventListener("click", () => {
    if (!recognition) {
      alert("Trình duyệt này chưa hỗ trợ Web Speech API. Bạn vui lòng sử dụng Google Chrome hoặc Microsoft Edge nhé!");
      return;
    }
    if (isRecording) {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (e) {
        recognition.stop();
      }
    }
  });

  // Gửi câu trả lời cho AI chấm điểm
  document.getElementById("btn-submit-oral").addEventListener("click", async () => {
    const list = getFilteredTheorems();
    if (list.length === 0) return;
    const thm = list[oralThmIndex];
    const answer = document.getElementById("oral-user-input").value.trim();

    if (!answer) {
      alert("Em hãy nhập hoặc nói câu trả lời của mình trước khi gửi cho AI nhé!");
      return;
    }

    const btnSubmit = document.getElementById("btn-submit-oral");
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = `<span>⏳ Thầy AI đang chấm điểm và phân tích...</span>`;

    const feedbackBox = document.getElementById("oral-feedback-box");
    const feedbackContent = document.getElementById("oral-feedback-content");
    feedbackBox.style.display = "block";
    feedbackContent.innerHTML = "Đang đối chiếu với chuẩn SGK Kết nối tri thức...";

    const promptText = `Học sinh trả lời câu hỏi: "${thm.aiQuestion}"\nCâu trả lời của học sinh: "${answer}"\nĐịnh lý chuẩn: "${thm.standardAnswer}"`;

    const reply = await callAIBackend({
      prompt: promptText,
      mode: "evaluate",
      context: {
        theoremTitle: thm.title,
        standardAnswer: thm.standardAnswer
      }
    });

    feedbackContent.innerHTML = reply.replace(/\n/g, "<br>");
    renderAllMath(feedbackContent);
    playSuccessSound();

    btnSubmit.disabled = false;
    btnSubmit.innerHTML = `<span>🚀 Gửi Câu Trả Lời Cho AI Chấm Điểm</span>`;
  });

  // --- SUB-VIEW 4: THƯ VIỆN BỎ TÚI TRA CỨU ---
  function renderTheoremsLibrary() {
    const list = getFilteredTheorems();
    const container = document.getElementById("theorems-library-grid");
    container.innerHTML = "";

    if (list.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--text-muted);">Không tìm thấy định lý nào phù hợp.</div>`;
      return;
    }

    list.forEach(thm => {
      const box = getLeitnerBox(thm.id);
      const card = document.createElement("div");
      card.className = "library-card";
      card.innerHTML = `
        <div>
          <div class="lib-card-top">
            <span class="lib-badge">${thm.topicName}</span>
            <span class="lib-badge">Lớp ${thm.grade} • HK${thm.semester}</span>
          </div>
          <h4 class="lib-title">${thm.title}</h4>
          <p class="lib-summary">${thm.summary}</p>
          <div class="lib-formula">${thm.formula ? `$$${thm.formula}$$` : ""}</div>
        </div>
        <div class="lib-footer">
          <span style="font-size:12px; font-weight:700;">
            <span class="lib-status-dot" style="background: var(--box-${box})"></span>
            ${box === 'green' ? 'Đã thuộc' : box === 'yellow' ? 'Lúng túng' : 'Cần ôn'}
          </span>
          <button class="btn btn-outline" style="padding: 6px 14px; font-size: 12px;">Xem chi tiết 🔍</button>
        </div>
      `;

      card.addEventListener("click", () => {
        openTheoremModal(thm);
      });

      container.appendChild(card);
    });

    renderAllMath(container);
  }

  // Modal Chi Tiết Định Lý
  const modalEl = document.getElementById("theorem-modal");
  const modalCloseBtn = document.getElementById("btn-close-modal");
  modalCloseBtn.addEventListener("click", () => modalEl.style.display = "none");
  modalEl.addEventListener("click", (e) => {
    if (e.target === modalEl) modalEl.style.display = "none";
  });

  function openTheoremModal(thm) {
    document.getElementById("modal-thm-title").textContent = thm.title;
    const body = document.getElementById("modal-thm-body");
    body.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">${thm.svgIcon || ""}</div>
      <div class="theorem-block">
        <h4 class="block-title">📖 Phát biểu định lý:</h4>
        <p class="block-content">${thm.content}</p>
      </div>
      <div class="hypothesis-grid" style="margin-bottom: 20px;">
        <div class="hypo-box">
          <span class="hypo-label">Giả thiết (GT):</span>
          <p>${thm.hypothesis || "Đang cập nhật"}</p>
        </div>
        <div class="concl-box">
          <span class="concl-label">Kết luận (KL):</span>
          <p>${thm.conclusion || "Đang cập nhật"}</p>
        </div>
      </div>
      <div class="formula-full-box">
        <span class="formula-label">📐 Công thức:</span>
        <div>$$${thm.formula || ""}$$</div>
      </div>
    `;
    modalEl.style.display = "flex";
    renderAllMath(body);
  }

  function refreshCurrentView() {
    if (appState.subMode === "flashcard") renderCurrentCard();
    else if (appState.subMode === "fillblank") renderFillBlankQuestion();
    else if (appState.subMode === "ai-oral") renderOralQuestion();
    else if (appState.subMode === "library") renderTheoremsLibrary();
  }

  // ---------------------------------------------------------------
  // 7. PHÂN HỆ 2: PHÒNG LUYỆN THI GIỮA KÌ & CUỐI KÌ
  // ---------------------------------------------------------------
  let activeExam = null;
  let isPracticeMode = false;
  let currentExamIndex = 0;
  let userExamAnswers = {};
  let examTimerInterval = null;
  let timeRemainingSec = 0;

  const examSelectScreen = document.getElementById("exam-select-screen");
  const examArenaScreen = document.getElementById("exam-arena-screen");
  const examResultScreen = document.getElementById("exam-result-screen");

  document.querySelectorAll(".btn-start-practice").forEach(btn => {
    btn.addEventListener("click", () => {
      startExam(btn.dataset.exam, true);
    });
  });

  document.querySelectorAll(".btn-start-real").forEach(btn => {
    btn.addEventListener("click", () => {
      startExam(btn.dataset.exam, false);
    });
  });

  // Bộ lọc Phòng Luyện Thi (Tất cả 8 đề, Lớp 6, Lớp 7, Giữa Kì, Cuối Kì)
  const examFilterBtns = document.querySelectorAll(".exam-filter-btn");
  if (examFilterBtns.length > 0) {
    examFilterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        examFilterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.examFilter;

        document.querySelectorAll(".exam-card").forEach(card => {
          const grade = card.dataset.examGrade;
          const type = card.dataset.examType;
          let show = true;
          if (filter === "grade-6" && grade !== "6") show = false;
          if (filter === "grade-7" && grade !== "7") show = false;
          if (filter === "midterm" && type !== "midterm") show = false;
          if (filter === "final" && type !== "final") show = false;
          card.style.display = show ? "flex" : "none";
        });
      });
    });
  }

  // Tạo đề bù điểm yếu bằng AI
  document.getElementById("btn-create-weakness-exam").addEventListener("click", () => {
    createWeaknessExam();
  });

  function createWeaknessExam() {
    // Thu thập các định lý trong hộp Đỏ hoặc Vàng
    const weakIds = [...appState.leitner.red, ...appState.leitner.yellow];
    let matchingQuestions = [];

    EXAMS_DATA.forEach(exam => {
      exam.questions.forEach(q => {
        if (weakIds.includes(q.relatedTheoremId)) {
          matchingQuestions.push(q);
        }
      });
    });

    if (matchingQuestions.length < 3) {
      // Lấy thêm câu hỏi bất kỳ để đủ đề
      EXAMS_DATA[0].questions.forEach(q => matchingQuestions.push(q));
    }

    // Giới hạn 6 câu hỏi
    matchingQuestions = matchingQuestions.slice(0, 6);

    const customExam = {
      id: "exam-custom-weakness",
      grade: appState.selectedGrade,
      semester: 1,
      type: "custom",
      title: "🎯 Đề Thi Bù Điểm Yếu (Cá Nhân Hóa Bằng AI)",
      timeMinutes: 25,
      description: "Đề thi tập trung củng cố các định lý em còn làm sai hoặc hay quên.",
      questions: matchingQuestions
    };

    activeExam = customExam;
    isPracticeMode = false;
    currentExamIndex = 0;
    userExamAnswers = {};
    timeRemainingSec = customExam.timeMinutes * 60;

    examSelectScreen.style.display = "none";
    examResultScreen.style.display = "none";
    examArenaScreen.style.display = "block";

    document.getElementById("arena-exam-title").textContent = customExam.title;
    document.getElementById("arena-mode-badge").textContent = "Ôn Luyện Tập Trung";
    startTimer();
    renderExamQuestion();
    renderPalette();
  }

  function startExam(examId, practice = false) {
    const exam = EXAMS_DATA.find(e => e.id === examId);
    if (!exam) return;

    activeExam = exam;
    isPracticeMode = practice;
    currentExamIndex = 0;
    userExamAnswers = {};
    timeRemainingSec = exam.timeMinutes * 60;

    examSelectScreen.style.display = "none";
    examResultScreen.style.display = "none";
    examArenaScreen.style.display = "block";

    document.getElementById("arena-exam-title").textContent = exam.title;
    document.getElementById("arena-mode-badge").textContent = isPracticeMode ? "Chế độ Luyện Tập" : "Chế độ Thi Thử Bấm Giờ";

    if (isPracticeMode) {
      document.getElementById("arena-timer-box").style.display = "none";
    } else {
      document.getElementById("arena-timer-box").style.display = "flex";
      startTimer();
    }

    renderExamQuestion();
    renderPalette();
  }

  function startTimer() {
    clearInterval(examTimerInterval);
    updateTimerDisplay();
    examTimerInterval = setInterval(() => {
      timeRemainingSec--;
      updateTimerDisplay();
      if (timeRemainingSec <= 0) {
        clearInterval(examTimerInterval);
        alert("⏰ Hết thời gian làm bài! Hệ thống tự động nộp bài của em.");
        finishExam();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const mins = Math.floor(timeRemainingSec / 60);
    const secs = timeRemainingSec % 60;
    document.getElementById("exam-timer").textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function renderExamQuestion() {
    if (!activeExam) return;
    const q = activeExam.questions[currentExamIndex];
    document.getElementById("current-question-num").textContent = `Câu ${currentExamIndex + 1} / ${activeExam.questions.length}`;
    document.getElementById("current-question-text").innerHTML = q.question;

    const optContainer = document.getElementById("options-container");
    optContainer.innerHTML = "";
    const letters = ["A", "B", "C", "D"];

    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn" + (userExamAnswers[currentExamIndex] === idx ? " selected" : "");
      btn.innerHTML = `<span class="option-letter">${letters[idx]}</span><span>${opt}</span>`;
      btn.addEventListener("click", () => {
        userExamAnswers[currentExamIndex] = idx;
        renderExamQuestion();
        renderPalette();
        if (isPracticeMode) showInstantExplanation(q, idx);
      });
      optContainer.appendChild(btn);
    });

    const expBox = document.getElementById("instant-explanation");
    if (!isPracticeMode || userExamAnswers[currentExamIndex] === undefined) {
      expBox.style.display = "none";
    } else {
      showInstantExplanation(q, userExamAnswers[currentExamIndex]);
    }

    renderAllMath(document.getElementById("exam-arena-screen"));
  }

  function showInstantExplanation(q, chosenIdx) {
    const expBox = document.getElementById("instant-explanation");
    const expContent = document.getElementById("instant-exp-content");
    expBox.style.display = "block";

    const isRight = (chosenIdx === q.correctIndex);
    const relatedThm = THEOREMS_DATA.find(t => t.id === q.relatedTheoremId);

    expContent.innerHTML = `
      <div style="font-weight: 800; margin-bottom: 6px; color: ${isRight ? '#047857' : '#b91c1c'};">
        ${isRight ? '✅ Em đã chọn hoàn toàn chính xác!' : '❌ Em chọn chưa đúng, hãy xem lại định lý nhé!'}
      </div>
      <div>${q.explanation}</div>
      ${relatedThm ? `<div style="margin-top: 8px; font-style: italic; color: #4338ca;">📖 Định lý liên quan: <strong>${relatedThm.title}</strong></div>` : ''}
    `;
    renderAllMath(expBox);
  }

  function renderPalette() {
    if (!activeExam) return;
    const grid = document.getElementById("question-palette-grid");
    grid.innerHTML = "";

    activeExam.questions.forEach((_, idx) => {
      const item = document.createElement("button");
      item.className = "palette-item";
      if (idx === currentExamIndex) item.classList.add("current");
      if (userExamAnswers[idx] !== undefined) item.classList.add("answered");
      item.textContent = idx + 1;
      item.addEventListener("click", () => {
        currentExamIndex = idx;
        renderExamQuestion();
        renderPalette();
      });
      grid.appendChild(item);
    });
  }

  document.getElementById("btn-prev-q").addEventListener("click", () => {
    if (currentExamIndex > 0) {
      currentExamIndex--;
      renderExamQuestion();
      renderPalette();
    }
  });

  document.getElementById("btn-next-q").addEventListener("click", () => {
    if (currentExamIndex < activeExam.questions.length - 1) {
      currentExamIndex++;
      renderExamQuestion();
      renderPalette();
    }
  });

  document.getElementById("btn-finish-exam").addEventListener("click", () => {
    const answeredCount = Object.keys(userExamAnswers).length;
    const totalCount = activeExam.questions.length;
    if (answeredCount < totalCount) {
      if (!confirm(`Em mới trả lời ${answeredCount}/${totalCount} câu hỏi. Em có chắc chắn muốn nộp bài không?`)) {
        return;
      }
    }
    finishExam();
  });

  document.getElementById("btn-quit-exam").addEventListener("click", () => {
    if (confirm("Em có muốn thoát bài thi này để về danh sách đề không?")) {
      clearInterval(examTimerInterval);
      examArenaScreen.style.display = "none";
      examSelectScreen.style.display = "block";
    }
  });

  // Chấm điểm và hiển thị Báo cáo lỗ hổng kiến thức
  function finishExam() {
    clearInterval(examTimerInterval);
    let correctCount = 0;
    const failedTheorems = [];

    activeExam.questions.forEach((q, idx) => {
      const userChoice = userExamAnswers[idx];
      if (userChoice === q.correctIndex) {
        correctCount++;
        // Tăng độ thuộc định lý
        if (q.relatedTheoremId) setLeitnerBox(q.relatedTheoremId, "green");
      } else {
        // Định lý làm sai -> Đẩy về Hộp Đỏ để ôn lại
        if (q.relatedTheoremId) {
          setLeitnerBox(q.relatedTheoremId, "red");
          const thm = THEOREMS_DATA.find(t => t.id === q.relatedTheoremId);
          if (thm && !failedTheorems.some(f => f.id === thm.id)) {
            failedTheorems.push(thm);
          }
        }
      }
    });

    const score = ((correctCount / activeExam.questions.length) * 10).toFixed(1);

    // Lưu vào lịch sử
    appState.examHistory.push({
      examId: activeExam.id,
      title: activeExam.title,
      score: parseFloat(score),
      date: new Date().toLocaleDateString("vi-VN"),
      failedCount: failedTheorems.length
    });

    // Mở khóa huy hiệu nếu đạt điểm cao & cập nhật nhiệm vụ
    if (parseFloat(score) >= 9.0) {
      appState.badges["badge-exam-master"] = true;
    }
    if (parseFloat(score) >= 8.0) {
      trackQuestProgress("exam");
    }
    saveState();

    // Hiển thị màn hình kết quả
    examArenaScreen.style.display = "none";
    examResultScreen.style.display = "block";

    document.getElementById("result-score-num").textContent = score;
    document.getElementById("result-subtitle-text").textContent = `Em đã trả lời đúng ${correctCount}/${activeExam.questions.length} câu hỏi.`;

    const failedContainer = document.getElementById("failed-theorems-list");
    failedContainer.innerHTML = "";

    if (failedTheorems.length === 0) {
      failedContainer.innerHTML = `<div style="color: #047857; font-weight: 700; padding: 12px; background: #ecfdf5; border-radius: 8px;">🌟 Hoàn hảo! Em không bị hổng định lý nào trong đề thi này!</div>`;
      playCelebration();
    } else {
      failedTheorems.forEach(thm => {
        const item = document.createElement("div");
        item.className = "failed-thm-item";
        item.innerHTML = `
          <div>
            <span style="color: #b91c1c;">⚠️ ${thm.title}</span>
            <div style="font-size: 12px; color: var(--text-muted); font-weight: normal;">${thm.summary}</div>
          </div>
          <span class="card-box-indicator" style="background:#fee2e2; color:#dc2626;">Đã chuyển vào Hộp Đỏ</span>
        `;
        failedContainer.appendChild(item);
      });
      playSuccessSound();
    }
  }

  document.getElementById("btn-return-exam-hub").addEventListener("click", () => {
    examResultScreen.style.display = "none";
    examSelectScreen.style.display = "block";
  });

  document.getElementById("btn-drill-failed-theorems").addEventListener("click", () => {
    examResultScreen.style.display = "none";
    examSelectScreen.style.display = "block";
    // Chuyển sang tab Flashcard
    document.querySelector('[data-tab="tab-theorems"]').click();
  });

  // ---------------------------------------------------------------
  // 8. PHÂN HỆ 3: GIA SƯ AI SOCRATIC ĐỒNG HÀNH
  // ---------------------------------------------------------------
  const chatContainer = document.getElementById("chat-messages-container");
  const socraticInput = document.getElementById("socratic-input");
  const btnSocraticSend = document.getElementById("btn-socratic-send");
  const btnSocraticMic = document.getElementById("btn-socratic-mic");

  // Chips gợi ý câu hỏi nhanh
  document.querySelectorAll(".socratic-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      socraticInput.value = chip.dataset.prompt;
      sendMessageToSocratic();
    });
  });

  btnSocraticSend.addEventListener("click", () => {
    sendMessageToSocratic();
  });

  socraticInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageToSocratic();
    }
  });

  async function sendMessageToSocratic() {
    const text = socraticInput.value.trim();
    if (!text) return;

    // Tên và avatar thật của người dùng
    const studentName = (currentUser && !currentUser.isGuest) ? currentUser.fullname : "Khách Học Thử";
    const studentAvatar = (currentUser && !currentUser.isGuest) ? (currentUser.avatar || "🧙‍♂️") : "🎒";

    // Thêm tin nhắn của User
    appendMessage("user", text, studentName, studentAvatar);
    socraticInput.value = "";

    // Thêm placeholder "Đang tư duy..."
    const loadingMsgEl = appendMessage("ai", `Thầy đang đọc câu hỏi của ${studentName} và chuẩn bị gợi ý Socratic nhé...`);

    appState.socraticChatCount++;
    trackQuestProgress("socratic");
    if (appState.socraticChatCount >= 3) {
      appState.badges["badge-socratic-friend"] = true;
      saveState();
    }

    const reply = await callAIBackend({
      prompt: text,
      mode: "socratic",
      context: {
        studentName: studentName,
        studentGrade: appState.selectedGrade,
        studentLevel: appState.playerLevel,
        studentTitle: appState.playerTitle
      }
    });

    loadingMsgEl.querySelector(".msg-text").innerHTML = formatAIResponseHTML(reply);
    renderAllMath(loadingMsgEl);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    playSuccessSound();
  }

  function appendMessage(sender, text, customName = null, customAvatar = null) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message msg-${sender}`;
    const avatar = sender === 'ai' ? '🦉' : (customAvatar || (currentUser && currentUser.avatar) || '🎒');
    const senderName = sender === 'ai' ? 'Thầy AI Socratic' : (customName || (currentUser && currentUser.fullname) || 'Học sinh');
    const contentHtml = sender === 'user' ? formatAIResponseHTML(text) : text;
    msgDiv.innerHTML = `
      <div class="msg-avatar">${avatar}</div>
      <div class="msg-bubble">
        <div class="msg-sender">${senderName}</div>
        <div class="msg-text">${contentHtml}</div>
        <div class="msg-time">Vừa xong</div>
      </div>
    `;
    chatContainer.appendChild(msgDiv);
    renderAllMath(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return msgDiv;
  }

  // Thu âm tin nhắn Socratic bằng Web Speech API
  let socraticRecognition = null;
  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    socraticRecognition = new SpeechRecognition();
    socraticRecognition.lang = "vi-VN";
    socraticRecognition.continuous = false;

    socraticRecognition.onstart = () => {
      btnSocraticMic.classList.add("recording");
      btnSocraticMic.innerHTML = `<span>🔴 Đang nghe...</span>`;
    };

    socraticRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      socraticInput.value = (socraticInput.value ? socraticInput.value + " " : "") + transcript;
    };

    socraticRecognition.onend = () => {
      btnSocraticMic.classList.remove("recording");
      btnSocraticMic.innerHTML = `<span>🎙️ Thu âm</span>`;
    };
  }

  btnSocraticMic.addEventListener("click", () => {
    if (!socraticRecognition) {
      alert("Trình duyệt chưa hỗ trợ nhận diện giọng nói. Bạn hãy gõ câu hỏi vào ô nhé!");
      return;
    }
    try {
      socraticRecognition.start();
    } catch (e) {
      socraticRecognition.stop();
    }
  });

  // ---------------------------------------------------------------
  // 9. PHÂN HỆ 4: BẢNG ĐIỀU KHIỂN & BẢN ĐỒ TIẾN BỘ (DASHBOARD)
  // ---------------------------------------------------------------
  function updateDashboardStats() {
    document.getElementById("dash-mastered-count").textContent = appState.leitner.green.length;
    document.getElementById("dash-learning-count").textContent = appState.leitner.yellow.length + appState.leitner.red.length;
    document.getElementById("dash-exams-count").textContent = appState.examHistory.length;
    document.getElementById("dash-streak-count").textContent = appState.streak;
    document.getElementById("header-streak-count").textContent = `${appState.streak} ngày`;

    // Cập nhật huy hiệu
    Object.keys(appState.badges).forEach(bId => {
      const el = document.getElementById(bId);
      if (el) {
        if (appState.badges[bId]) el.classList.add("unlocked");
        else el.classList.remove("unlocked");
      }
    });
  }

  function renderKnowledgeMap() {
    const container = document.getElementById("knowledge-tiles-grid");
    container.innerHTML = "";

    THEOREMS_DATA.forEach(thm => {
      const box = getLeitnerBox(thm.id);
      const tile = document.createElement("div");
      tile.className = `knowledge-tile box-${box}`;
      tile.innerHTML = `
        <div class="tile-top">
          <span>Lớp ${thm.grade} • ${thm.topicName}</span>
          <span style="font-weight: 800; text-transform: uppercase;">${box === 'green' ? 'Đã thuộc' : box === 'yellow' ? 'Lúng túng' : 'Cần ôn'}</span>
        </div>
        <div class="tile-title">${thm.title}</div>
      `;

      tile.addEventListener("click", () => {
        openTheoremModal(thm);
      });

      container.appendChild(tile);
    });
  }

  document.getElementById("btn-refresh-map").addEventListener("click", () => {
    renderKnowledgeMap();
    updateDashboardStats();
  });

  // Nút xóa lịch sử
  document.getElementById("btn-reset-data").addEventListener("click", () => {
    if (confirm("Em có chắc chắn muốn đặt lại toàn bộ dữ liệu học tập và huy hiệu không?")) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  });

  // ---------------------------------------------------------------
  // 10. PHÂN HỆ GAMIFICATION: ĐẠI SẢNH & BẢN ĐỒ HÀNH TRÌNH
  // ---------------------------------------------------------------
  function switchTab(tabId) {
    navTabs.forEach(t => {
      if (t.dataset.tab === tabId) t.classList.add("active");
      else t.classList.remove("active");
    });
    document.querySelectorAll(".tab-section").forEach(sec => sec.classList.remove("active"));
    const target = document.getElementById(tabId);
    if (target) target.classList.add("active");
    appState.activeTab = tabId;

    if (tabId === "tab-home") {
      renderJourneyMap();
      renderDailyQuests();
    }
    if (tabId === "tab-dashboard") {
      renderKnowledgeMap();
      updateDashboardStats();
    }
    renderAllMath();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPlayerHUD() {
    const levelBadge = document.getElementById("hud-level-badge");
    const playerTitle = document.getElementById("hud-player-title");
    const expFill = document.getElementById("hud-exp-fill");
    const expText = document.getElementById("hud-exp-text");
    const coinsNum = document.getElementById("hud-coins-num");
    const streakNum = document.getElementById("hud-streak-num");
    const headerStreak = document.getElementById("header-streak-count");
    const hudAvatar = document.getElementById("hud-player-avatar");
    const hudName = document.getElementById("hud-player-name");
    const headerAvatar = document.getElementById("header-user-avatar");
    const headerName = document.getElementById("header-user-name");
    const headerLogout = document.getElementById("btn-header-logout");

    // Thông tin người chơi từ currentUser hoặc Khách
    const isRealUser = currentUser && !currentUser.isGuest;
    const currentAvatar = isRealUser ? (currentUser.avatar || "🧙‍♂️") : "🎒";
    const currentName = isRealUser ? currentUser.fullname : "Khách Học Thử (Chưa Đăng Nhập)";
    const headerDisplay = isRealUser ? (currentUser.fullname.split(" ").pop() || currentUser.username) : "Đăng Nhập";

    if (hudAvatar) hudAvatar.textContent = currentAvatar;
    if (hudName) hudName.textContent = currentName;
    if (headerAvatar) headerAvatar.textContent = currentAvatar;
    if (headerName) headerName.textContent = headerDisplay;
    if (headerLogout) {
      headerLogout.style.display = isRealUser ? "inline-flex" : "none";
    }

    if (levelBadge) levelBadge.textContent = `Lv. ${appState.playerLevel}`;
    if (playerTitle) playerTitle.textContent = appState.playerTitle;
    if (expFill && expText) {
      const pct = Math.min(100, Math.round((appState.playerExp / appState.playerMaxExp) * 100));
      expFill.style.width = `${pct}%`;
      expText.textContent = `${appState.playerExp} / ${appState.playerMaxExp} EXP`;
    }
    if (coinsNum) coinsNum.textContent = appState.playerCoins;
    if (streakNum) streakNum.textContent = `${appState.streak} ngày`;
    if (headerStreak) headerStreak.textContent = `${appState.streak} ngày`;
  }

  function addExpAndCoins(exp, coins) {
    appState.playerExp += exp;
    appState.playerCoins += coins;

    if (appState.playerExp >= appState.playerMaxExp) {
      appState.playerLevel++;
      appState.playerExp -= appState.playerMaxExp;
      appState.playerMaxExp = Math.round(appState.playerMaxExp * 1.3);

      const titles = [
        "Tập Sự Toán Học 🌱",
        "Chiến Binh Số Học ⚔️",
        "Hiệp Sĩ Hình Học 🛡️",
        "Bậc Thầy Góc & Cạnh 📐",
        "Đại Sư Tam Giác 🔺",
        "Huyền Thoại Kết Nối Tri Thức 👑"
      ];
      appState.playerTitle = titles[Math.min(titles.length - 1, appState.playerLevel - 1)];

      alert(`🎉 CHÚC MỪNG BẠN ĐÃ LÊN CẤP ${appState.playerLevel}!\nDanh hiệu mới: ${appState.playerTitle}`);
      playCelebration();
    }
    saveState();
    renderPlayerHUD();
  }

  // ---------------------------------------------------------------
  // 10. HỆ THỐNG CÁ NHÂN HÓA 7 ẢI TOÁN HỌC & NHIỆM VỤ HÀNG NGÀY
  // ---------------------------------------------------------------
  const STAGES_DATA = [
    {
      id: 1,
      realm: "ẢI 1 • SỐ HỌC (LỚP 6)",
      name: "Thung Lũng Chia Hết & Số Nguyên",
      summary: "Dấu hiệu chia hết cho 2, 5, 3, 9 & Quy tắc bỏ dấu ngoặc",
      thmTarget: "toan6-hk1-chia-het-2-5",
      challenge: {
        question: "Số tự nhiên nào sau đây vừa chia hết cho 2, vừa chia hết cho 5?",
        options: [
          "A. 135",
          "B. 240",
          "C. 318",
          "D. 402"
        ],
        correctIndex: 1,
        explanation: "Một số tự nhiên vừa chia hết cho 2 vừa chia hết cho 5 khi và chỉ khi có chữ số tận cùng là 0. Do đó 240 là đáp án chính xác!"
      }
    },
    {
      id: 2,
      realm: "ẢI 2 • HÌNH HỌC TRỰC QUAN (LỚP 6)",
      name: "Khu Rừng Đa Giác Đều & Hình Thoi",
      summary: "Tính chất cạnh, góc, đường chéo hình vuông, tam giác đều, hình thoi",
      thmTarget: "toan6-hk1-hinh-vuong-tam-giac-deu",
      challenge: {
        question: "Tam giác đều $ABC$ có độ dài cạnh $AB = 6\\text{ cm}$. Chu vi của tam giác đều $ABC$ là:",
        options: [
          "A. 12 cm",
          "B. 16 cm",
          "C. 18 cm",
          "D. 36 cm"
        ],
        correctIndex: 2,
        explanation: "Tam giác đều có 3 cạnh bằng nhau. Chu vi = 3 × 6 = 18 cm."
      }
    },
    {
      id: 3,
      realm: "ẢI 3 • GÓC & ĐƯỜNG THẲNG (LỚP 7)",
      name: "Vực Sâu Đường Thẳng Song Song",
      summary: "Định lý hai góc đối đỉnh, so le trong, đồng vị và Tiên đề Euclid",
      thmTarget: "toan7-hk1-goc-doi-dinh",
      challenge: {
        question: "Cho hai đường thẳng cắt nhau tạo thành góc $\\widehat{O}_1 = 60^\\circ$. Số đo của góc đối đỉnh với góc $\\widehat{O}_1$ là:",
        options: [
          "A. 30°",
          "B. 60°",
          "C. 120°",
          "D. 180°"
        ],
        correctIndex: 1,
        explanation: "Định lý: Hai góc đối đỉnh thì bằng nhau. Do đó góc đối đỉnh với $\\widehat{O}_1$ cũng có số đo bằng 60°."
      }
    },
    {
      id: 4,
      realm: "ẢI 4 • ĐỊNH LÝ HÌNH HỌC (LỚP 7)",
      name: "Đỉnh Núi Tam Giác Huyền Bí",
      summary: "Tổng 3 góc tam giác (180°) & Các trường hợp bằng nhau (c-c-c, c-g-c, g-c-g)",
      thmTarget: "toan7-hk1-tong-ba-goc-tam-giac",
      challenge: {
        question: "Tam giác $ABC$ có $\\widehat{A} = 70^\\circ$ và $\\widehat{B} = 60^\\circ$. Số đo của góc $\\widehat{C}$ là:",
        options: [
          "A. 50°",
          "B. 60°",
          "C. 70°",
          "D. 80°"
        ],
        correctIndex: 0,
        explanation: "Tổng ba góc của tam giác luôn bằng 180°. Ta có: $\\widehat{C} = 180^\\circ - (70^\\circ + 60^\\circ) = 50^\\circ$."
      }
    },
    {
      id: 5,
      realm: "ẢI 5 • ĐẠI SỐ 7 (LỚP 7)",
      name: "Vương Quốc Tỉ Lệ Thức & Đại Lượng",
      summary: "Tích ngoại tỉ bằng tích trung tỉ, tính chất dãy tỉ số bằng nhau",
      thmTarget: "toan7-hk2-ti-le-thuc-day-ti-so",
      challenge: {
        question: "Tìm giá trị của $x$ trong tỉ lệ thức: $\\frac{x}{6} = \\frac{10}{3}$",
        options: [
          "A. x = 5",
          "B. x = 15",
          "C. x = 20",
          "D. x = 30"
        ],
        correctIndex: 2,
        explanation: "Theo tính chất tỉ lệ thức: $x \\cdot 3 = 6 \\cdot 10 \\Rightarrow 3x = 60 \\Rightarrow x = 20$."
      }
    },
    {
      id: 6,
      realm: "ẢI 6 • QUAN HỆ HÌNH HỌC (LỚP 7)",
      name: "Đền Thờ Các Đường Đồng Quy",
      summary: "Trọng tâm 2/3, Trực tâm, Tâm đường tròn nội tiếp & Bất đẳng thức tam giác",
      thmTarget: "toan7-hk2-su-dong-quy-cac-duong",
      challenge: {
        question: "Gọi $G$ là trọng tâm của tam giác $ABC$ với đường trung tuyến $AM$. Khẳng định nào sau đây là đúng?",
        options: [
          "A. AG = 1/2 AM",
          "B. AG = 2/3 AM",
          "C. AG = 3/4 AM",
          "D. GM = 2/3 AM"
        ],
        correctIndex: 1,
        explanation: "Trọng tâm của tam giác cách mỗi đỉnh một khoảng bằng 2/3 độ dài đường trung tuyến đi qua đỉnh đó ($AG = \\frac{2}{3}AM$)."
      }
    },
    {
      id: 7,
      realm: "ẢI 7 • THỐNG KÊ & XÁC SUẤT (LỚP 7)",
      name: "Ốc Đảo Dữ Liệu & Xác Suất",
      summary: "Thu thập dữ liệu, phân loại bảng thống kê và Xác suất thực nghiệm",
      thmTarget: "toan7-hk2-ti-le-thuc-day-ti-so",
      challenge: {
        question: "Gieo một con xúc xắc 20 lần, thấy xuất hiện mặt 6 chấm 4 lần. Xác suất thực nghiệm của biến cố 'Mặt xuất hiện là 6 chấm' là:",
        options: [
          "A. 1/6",
          "B. 1/5",
          "C. 1/4",
          "D. 6/20 = 3/10"
        ],
        correctIndex: 1,
        explanation: "Xác suất thực nghiệm = (Số lần xuất hiện mặt 6 chấm) / (Tổng số lần gieo) = 4 / 20 = 1/5 = 0,2."
      }
    }
  ];

  // Render Bản Đồ Hành Trình Cá Nhân Hóa (100% Theo Tiến Độ Người Dùng)
  function renderJourneyMap() {
    const river = document.getElementById("quest-stages-river");
    const clearedTag = document.getElementById("map-cleared-tag");
    if (!river) return;

    const cleared = Array.isArray(appState.clearedStages) ? appState.clearedStages : [];
    const active = typeof appState.activeStage === "number" ? appState.activeStage : 1;

    if (clearedTag) {
      clearedTag.textContent = `Đã qua: ${cleared.length}/7 Ải`;
    }

    let html = "";
    STAGES_DATA.forEach(stage => {
      const isCleared = cleared.includes(stage.id);
      const isActive = !isCleared && stage.id === active;
      const isLocked = !isCleared && !isActive;

      let nodeClass = "stage-node";
      let stars = "☆☆☆";
      let statusHtml = "";
      let btnHtml = "";

      if (isCleared) {
        nodeClass += " completed";
        stars = "⭐⭐⭐";
        statusHtml = `<span class="stage-status-text">Đã Hoàn Thành ✅</span>`;
        btnHtml = `<button class="btn-stage-action" data-stage="${stage.id}" data-action="review">Ôn lại ↺</button>`;
      } else if (isActive) {
        nodeClass += " active-stage";
        stars = "⭐☆☆";
        statusHtml = `<span class="stage-status-text active">Đang Khiêu Chiến ⚔️</span>`;
        btnHtml = `<button class="btn-stage-action active" data-stage="${stage.id}" data-action="challenge">Chinh phục ➔</button>`;
      } else {
        nodeClass += " locked";
        stars = "☆☆☆";
        statusHtml = `<span class="stage-status-text locked">Khóa (Cần vượt Ải ${stage.id - 1}) 🔒</span>`;
        btnHtml = `<button class="btn-stage-action" data-stage="${stage.id}" disabled>Chưa mở</button>`;
      }

      html += `
        <div class="${nodeClass}" data-stage="${stage.id}">
          <div class="stage-milestone">${isCleared ? "✓" : stage.id}</div>
          <div class="stage-content">
            <div class="stage-header-row">
              <span class="stage-realm">${stage.realm}</span>
              <span class="stage-stars">${stars}</span>
            </div>
            <h4 class="stage-name">${stage.name}</h4>
            <p class="stage-summary">${stage.summary}</p>
            <div class="stage-footer-row">
              ${statusHtml}
              ${btnHtml}
            </div>
          </div>
        </div>
      `;
    });

    // BOSS STAGE: ĐẤU TRƯỜNG THI CỬ
    const bossUnlocked = cleared.length >= 3;
    html += `
      <div class="stage-node boss-stage ${bossUnlocked ? 'unlocked' : 'locked'}" data-stage="boss">
        <div class="stage-milestone boss">👑</div>
        <div class="stage-content">
          <div class="stage-header-row">
            <span class="stage-realm boss">ẢI TRÙM CUỐI • ĐẤU TRƯỜNG</span>
            <span class="stage-stars">${bossUnlocked ? '🏆🏆🏆' : '🔒🔒🔒'}</span>
          </div>
          <h4 class="stage-name">Đại Thử Thách: Phòng Luyện Thi GK - CK</h4>
          <p class="stage-summary">Chinh phục bài thi bấm giờ tổng hợp Toán 6 - 7 để đạt Danh hiệu Kiện Tướng!</p>
          <div class="stage-footer-row">
            <span class="stage-status-text boss">${bossUnlocked ? 'Đấu trường mở 24/7 ⚔️' : 'Khóa (Cần vượt ít nhất 3 Ải) 🔒'}</span>
            <button class="btn-stage-action boss" id="btn-home-go-exam" ${bossUnlocked ? '' : 'disabled'}>${bossUnlocked ? 'Khiêu chiến Trùm ➔' : 'Cần qua 3 Ải'}</button>
          </div>
        </div>
      </div>
    `;

    river.innerHTML = html;

    // Gắn sự kiện cho các nút hành động của ải
    river.querySelectorAll(".btn-stage-action").forEach(btn => {
      btn.addEventListener("click", () => {
        const stageId = btn.dataset.stage;
        const action = btn.dataset.action;

        if (stageId === "boss" || btn.id === "btn-home-go-exam") {
          switchTab("tab-exams");
          return;
        }

        const idNum = parseInt(stageId);
        if (action === "challenge") {
          openStageChallenge(idNum);
        } else if (action === "review") {
          const st = STAGES_DATA.find(s => s.id === idNum);
          if (st) {
            const conf = confirm(`📖 Em muốn:\n- Bấm OK để thử thách lại câu hỏi Ải ${idNum} rèn luyện phản xạ\n- Bấm Cancel để xem lý thuyết chi tiết của ải`);
            if (conf) {
              openStageChallenge(idNum);
            } else if (st.thmTarget) {
              const thm = THEOREMS_DATA.find(t => t.id === st.thmTarget);
              if (thm) openTheoremModal(thm);
              else switchTab("tab-theorems");
            }
          }
        }
      });
    });

    renderAllMath(river);
  }

  // Modal Thử Thách Khiêu Chiến Vượt Ải Toán Học
  function openStageChallenge(stageId) {
    const stage = STAGES_DATA.find(s => s.id === stageId);
    if (!stage) return;

    const modal = document.getElementById("stage-challenge-modal");
    const titleEl = document.getElementById("modal-stage-title");
    const realmEl = document.getElementById("modal-stage-realm");
    const summaryEl = document.getElementById("modal-stage-summary");
    const qEl = document.getElementById("stage-challenge-question");
    const optionsGrid = document.getElementById("stage-challenge-options");
    const feedbackBox = document.getElementById("stage-feedback-box");
    const btnHint = document.getElementById("btn-stage-hint");
    const btnCancel = document.getElementById("btn-stage-cancel");
    const btnClose = document.getElementById("btn-close-stage-modal");

    if (!modal) return;

    if (titleEl) titleEl.textContent = stage.name;
    if (realmEl) realmEl.textContent = stage.realm;
    if (summaryEl) summaryEl.textContent = stage.summary;
    if (qEl) qEl.innerHTML = stage.challenge.question;
    if (feedbackBox) {
      feedbackBox.style.display = "none";
      feedbackBox.textContent = "";
      feedbackBox.className = "stage-feedback-box";
    }

    // Render danh sách lựa chọn
    optionsGrid.innerHTML = "";
    stage.challenge.options.forEach((optText, idx) => {
      const optBtn = document.createElement("button");
      optBtn.className = "stage-option-btn";
      optBtn.innerHTML = optText;
      optBtn.addEventListener("click", () => {
        if (idx === stage.challenge.correctIndex) {
          // Trả lời đúng
          optBtn.classList.add("selected-correct");
          feedbackBox.className = "stage-feedback-box success";
          feedbackBox.innerHTML = `🎉 <strong>CHÍNH XÁC! XUẤT SẮC!</strong><br>${stage.challenge.explanation}<br>✨ <em>Nhận ngay +50 EXP và +25 Xu Toán Học! 🪙</em>`;
          feedbackBox.style.display = "block";
          playCelebration();

          // Vô hiệu hóa các nút khác
          optionsGrid.querySelectorAll(".stage-option-btn").forEach(b => b.disabled = true);

          // Cập nhật tiến độ ải
          if (!Array.isArray(appState.clearedStages)) appState.clearedStages = [];
          if (!appState.clearedStages.includes(stageId)) {
            appState.clearedStages.push(stageId);
            if (appState.activeStage === stageId) {
              appState.activeStage = stageId + 1;
            }
          }

          // Khen thưởng & lưu
          addExpAndCoins(50, 25);

          // Mở khóa huy hiệu tương ứng
          if (stageId === 1) appState.badges["badge-arithmetic"] = true;
          if (stageId === 2 || stageId === 4) appState.badges["badge-triangles"] = true;
          if (stageId === 3) appState.badges["badge-parallel"] = true;

          saveState();
          renderJourneyMap();
          renderDailyQuests();

          // Đổi nút đóng
          btnCancel.textContent = "Tiếp Tục Hành Trình 🚀";
          btnCancel.className = "btn btn-primary";
          btnCancel.onclick = () => {
            modal.style.display = "none";
          };
        } else {
          // Trả lời sai
          optBtn.classList.add("selected-incorrect");
          playTone(200, "sawtooth", 0.2);
          feedbackBox.className = "stage-feedback-box error";
          feedbackBox.innerHTML = `❌ <strong>Chưa chính xác rồi em ơi!</strong><br>Hãy đọc lại câu hỏi hoặc nhấn nút <strong>"Xem Bí Kíp Định Lý"</strong> bên dưới để ôn lại rồi chọn lại nhé! 💪`;
          feedbackBox.style.display = "block";
          setTimeout(() => {
            optBtn.classList.remove("selected-incorrect");
          }, 1000);
        }
        renderAllMath(feedbackBox);
      });
      optionsGrid.appendChild(optBtn);
    });

    btnCancel.textContent = "Tạm Dừng";
    btnCancel.className = "btn btn-secondary";
    btnCancel.onclick = () => {
      modal.style.display = "none";
    };

    if (btnClose) {
      btnClose.onclick = () => {
        modal.style.display = "none";
      };
    }

    if (btnHint) {
      btnHint.onclick = () => {
        if (stage.thmTarget) {
          const thm = THEOREMS_DATA.find(t => t.id === stage.thmTarget);
          if (thm) {
            openTheoremModal(thm);
            return;
          }
        }
        alert(`💡 Gợi ý cho Ải ${stage.id}: ${stage.summary}`);
      };
    }

    modal.style.display = "flex";
    renderAllMath(modal);
  }

  // Nhận thưởng nhiệm vụ hàng ngày
  function claimQuestReward(questKey) {
    if (!appState || !appState.quests || !appState.quests[questKey]) return;
    const q = appState.quests[questKey];
    if (q.current >= q.target && !q.claimed) {
      q.claimed = true;
      addExpAndCoins(q.rewardExp, q.rewardCoins);
      playCelebration();
      alert(`🎁 Chúc mừng em đã hoàn thành nhiệm vụ và nhận được: +${q.rewardExp} EXP & +${q.rewardCoins} Xu Toán Học! 🪙`);
      saveState();
      renderDailyQuests();
      renderPlayerHUD();
    }
  }

  // Render Bảng Nhiệm Vụ Hàng Ngày (Cá Nhân Hóa Động Theo Từng Người Dùng)
  function renderDailyQuests() {
    const listEl = document.getElementById("quests-list");
    if (!listEl) return;

    if (!appState.quests) {
      appState.quests = {
        flashcards: { current: 0, target: 5, rewardExp: 20, rewardCoins: 10, claimed: false },
        fillblank: { current: 0, target: 1, rewardExp: 30, rewardCoins: 15, claimed: false },
        socratic: { current: 0, target: 1, rewardExp: 25, rewardCoins: 10, claimed: false },
        exam: { current: 0, target: 1, rewardExp: 50, rewardCoins: 30, claimed: false }
      };
    }

    const questDefs = [
      {
        key: "flashcards",
        name: "Lật ôn 5 Flashcard Định lý",
        unit: "thẻ",
        actionBtn: "Học thẻ",
        tabTarget: "tab-theorems",
        submode: "flashcard"
      },
      {
        key: "fillblank",
        name: "Vượt qua 1 Thử thách Điền khuyết",
        unit: "bài",
        actionBtn: "Làm ngay",
        tabTarget: "tab-theorems",
        submode: "fillblank"
      },
      {
        key: "socratic",
        name: "Đặt 1 câu hỏi cùng Thầy AI Socratic",
        unit: "câu",
        actionBtn: "Hỏi AI",
        tabTarget: "tab-socratic"
      },
      {
        key: "exam",
        name: "Luyện 1 Đề thi thử đạt từ 8 điểm",
        unit: "đề",
        actionBtn: "Thi thử",
        tabTarget: "tab-exams"
      }
    ];

    let html = "";
    questDefs.forEach((def, index) => {
      const q = appState.quests[def.key] || { current: 0, target: 1, rewardExp: 20, rewardCoins: 10, claimed: false };
      const pct = Math.min(100, Math.round((q.current / q.target) * 100));
      const isComplete = q.current >= q.target;
      const isClaimed = q.claimed;

      let iconHtml = '<div class="quest-status-check pending">⏳</div>';
      if (isClaimed) {
        iconHtml = '<div class="quest-status-check">✅</div>';
      } else if (isComplete) {
        iconHtml = '<div class="quest-status-check" style="animation: reward-pulse 1.2s infinite alternate;">🎁</div>';
      }

      let btnHtml = "";
      if (isClaimed) {
        btnHtml = `<button class="btn-claim-quest claimed" disabled>Đã nhận</button>`;
      } else if (isComplete) {
        btnHtml = `<button class="btn-claim-quest reward-ready" data-quest-key="${def.key}">Nhận Thưởng 🎁</button>`;
      } else {
        btnHtml = `<button class="btn-claim-quest active" data-action-key="${def.key}" data-tab="${def.tabTarget}" ${def.submode ? `data-submode="${def.submode}"` : ""}>${def.actionBtn}</button>`;
      }

      html += `
        <div class="quest-item" id="quest-${index + 1}">
          ${iconHtml}
          <div class="quest-info">
            <div class="quest-name">${def.name}</div>
            <div class="quest-meter">
              <div class="quest-meter-fill" style="width: ${pct}%;"></div>
            </div>
            <div class="quest-meta">
              <span>${q.current} / ${q.target} ${def.unit}</span>
              <span class="quest-reward">+${q.rewardExp} EXP • ${q.rewardCoins} 🪙</span>
            </div>
          </div>
          ${btnHtml}
        </div>
      `;
    });

    listEl.innerHTML = html;

    // Gắn sự kiện cho các nút trong bảng nhiệm vụ
    listEl.querySelectorAll(".btn-claim-quest.reward-ready").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.questKey;
        if (key) claimQuestReward(key);
      });
    });

    listEl.querySelectorAll(".btn-claim-quest.active").forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        const submode = btn.dataset.submode;
        if (tab) switchTab(tab);
        if (submode) {
          document.querySelector(`[data-submode="${submode}"]`)?.click();
        }
      });
    });
  }

  // ---------------------------------------------------------------
  // HỆ THỐNG CỬA HÀNG HIỆP SĨ (TIÊU DÙNG XU TOÁN HỌC) & BẢNG CHỨC DANH
  // ---------------------------------------------------------------
  const KNIGHT_SHOP_ITEMS = [
    {
      id: "avatar-dragon",
      name: "Hiệp Sĩ Rồng Lửa 🐉",
      type: "avatar",
      value: "🐉",
      desc: "Trang bị diện mạo Hiệp Sĩ Rồng huyền thoại rực rỡ",
      price: 50
    },
    {
      id: "avatar-lightning",
      name: "Kiện Tướng Sấm Sét ⚡",
      type: "avatar",
      value: "⚡",
      desc: "Hào quang tốc độ giải toán siêu đẳng",
      price: 75
    },
    {
      id: "avatar-wizard",
      name: "Đại Pháp Sư Toán Học 🧙‍♂️",
      type: "avatar",
      value: "🧙‍♂️",
      desc: "Bậc thầy tư duy hình học và logic",
      price: 90
    },
    {
      id: "avatar-lion",
      name: "Chúa Tể Hình Học 🦁",
      type: "avatar",
      value: "🦁",
      desc: "Thống trị mọi góc, cạnh và tam giác",
      price: 120
    },
    {
      id: "avatar-cosmic",
      name: "Phi Hành Gia Vũ Trụ 🚀",
      type: "avatar",
      value: "🚀",
      desc: "Chinh phục mọi định lý trong vũ trụ tri thức",
      price: 150
    },
    {
      id: "item-streak-shield",
      name: "Khiên Bảo Vệ Chuỗi Ngày 🛡️",
      type: "shield",
      value: "shield",
      desc: "Bảo vệ chuỗi ngày học của bạn không bị mất nếu bận 1 ngày",
      price: 40
    },
    {
      id: "item-socratic-vip",
      name: "Thẻ Gợi Ý Socratic VIP 💡",
      type: "vip",
      value: "vip",
      desc: "Mở rộng phân tích bài toán và mẹo giải độc quyền từ AI",
      price: 35
    }
  ];

  function openKnightShopModal() {
    const modal = document.getElementById("knight-shop-modal");
    if (!modal) return;

    const coinsValEl = document.getElementById("shop-coins-display");
    if (coinsValEl) coinsValEl.textContent = appState.playerCoins;

    const grid = document.getElementById("shop-items-grid");
    if (!grid) return;

    const currentAvatar = (currentUser && !currentUser.isGuest) ? (currentUser.avatar || "🧙‍♂️") : "🎒";
    if (!Array.isArray(appState.unlockedAvatars)) {
      appState.unlockedAvatars = [currentAvatar, "🧙‍♂️", "🎒"];
    }

    grid.innerHTML = "";
    KNIGHT_SHOP_ITEMS.forEach(item => {
      const card = document.createElement("div");
      card.className = "shop-item-card";

      const isAvatar = item.type === "avatar";
      const isEquipped = isAvatar && currentAvatar === item.value;
      const isOwned = isAvatar && appState.unlockedAvatars.includes(item.value);
      const canAfford = appState.playerCoins >= item.price;

      let btnLabel = `Mua (${item.price} 🪙)`;
      let btnClass = "btn-buy-shop-item";
      let btnDisabled = false;

      if (isEquipped) {
        btnLabel = "Đang Dùng ✓";
        btnClass += " equipped";
        btnDisabled = true;
      } else if (isOwned) {
        btnLabel = "Đổi Sang Avatar Này";
        btnClass = "btn-buy-shop-item";
      } else if (!canAfford) {
        btnLabel = `Cần ${item.price} 🪙`;
        btnDisabled = true;
      }

      card.innerHTML = `
        <div class="shop-item-avatar">${item.type === "avatar" ? item.value : (item.type === "shield" ? "🛡️" : "💡")}</div>
        <div class="shop-item-name">${item.name}</div>
        <div class="shop-item-desc">${item.desc}</div>
        <button class="${btnClass}" ${btnDisabled ? "disabled" : ""}>${btnLabel}</button>
      `;

      const btn = card.querySelector("button");
      btn.addEventListener("click", () => {
        if (isOwned && isAvatar) {
          if (currentUser && !currentUser.isGuest) {
            currentUser.avatar = item.value;
          }
          saveState();
          renderPlayerHUD();
          openKnightShopModal();
          playSuccessSound();
          alert(`✨ Bạn đã đổi sang Avatar ${item.name} thành công!`);
          return;
        }

        if (appState.playerCoins < item.price) {
          alert(`🪙 Em cần thêm ${item.price - appState.playerCoins} Xu để mở khóa vật phẩm này. Hãy vượt Ải và làm Nhiệm vụ để kiếm thêm Xu nhé!`);
          return;
        }

        appState.playerCoins -= item.price;
        if (isAvatar) {
          if (!appState.unlockedAvatars.includes(item.value)) {
            appState.unlockedAvatars.push(item.value);
          }
          if (currentUser && !currentUser.isGuest) {
            currentUser.avatar = item.value;
          }
        } else if (item.type === "shield") {
          appState.streakShield = (appState.streakShield || 0) + 1;
        } else if (item.type === "vip") {
          appState.socraticVipTokens = (appState.socraticVipTokens || 0) + 3;
        }

        saveState();
        renderPlayerHUD();
        playCelebration();
        openKnightShopModal();
        alert(`🎉 Chúc mừng em đã sở hữu: ${item.name}!`);
      });

      grid.appendChild(card);
    });

    modal.style.display = "flex";
  }

  function openKnightRanksModal() {
    const modal = document.getElementById("knight-ranks-modal");
    if (!modal) return;

    const currentLvlEl = document.getElementById("ranks-modal-level");
    const currentTitleEl = document.getElementById("ranks-modal-title");
    const currentExpEl = document.getElementById("ranks-modal-exp");

    if (currentLvlEl) currentLvlEl.textContent = `Lv. ${appState.playerLevel}`;
    if (currentTitleEl) currentTitleEl.textContent = appState.playerTitle;
    if (currentExpEl) currentExpEl.textContent = `${appState.playerExp} / ${appState.playerMaxExp} EXP`;

    const timeline = document.getElementById("ranks-timeline-container");
    if (timeline) {
      const titlesInfo = [
        { lvl: 1, title: "Tập Sự Toán Học 🌱", exp: "0 EXP", desc: "Bước đầu làm quen với thế giới số học và hình học trực quan." },
        { lvl: 2, title: "Chiến Binh Số Học ⚔️", exp: "100 EXP", desc: "Thành thạo tính chất chia hết, số nguyên và phân số." },
        { lvl: 3, title: "Hiệp Sĩ Hình Học 🛡️", exp: "250 EXP", desc: "Làm chủ các góc, đường thẳng song song và tam giác cơ bản." },
        { lvl: 4, title: "Bậc Thầy Góc & Cạnh 📐", exp: "450 EXP", desc: "Nắm vững Định lý Tổng ba góc trong tam giác & Tiên đề Euclid." },
        { lvl: 5, title: "Đại Sư Tam Giác 🔺", exp: "750 EXP", desc: "Chứng minh xuất sắc 3 trường hợp bằng nhau và tam giác vuông." },
        { lvl: 6, title: "Kiện Tướng Kết Nối Tri Thức 👑", exp: "1200 EXP", desc: "Chinh phục các định lý nâng cao, tỉ lệ thức và sự đồng quy." },
        { lvl: 7, title: "Huyền Thoại Toán Học Bất Bại 🌌", exp: "2000+ EXP", desc: "Đỉnh cao tư duy toán học, đạt điểm 10 tuyệt đối mọi kỳ thi!" }
      ];

      timeline.innerHTML = titlesInfo.map(t => {
        const isActive = appState.playerLevel === t.lvl || (t.lvl === 7 && appState.playerLevel >= 7);
        const isPassed = appState.playerLevel > t.lvl;
        return `
          <div class="rank-item ${isActive ? 'active' : ''}">
            <span class="rank-level-badge">Lv. ${t.lvl}</span>
            <div style="flex:1;">
              <div class="rank-name">${t.title} ${isPassed ? '✅' : (isActive ? '⭐ (Hiện tại)' : '🔒')}</div>
              <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">${t.desc}</div>
            </div>
            <span class="rank-req">${t.exp}</span>
          </div>
        `;
      }).join("");
    }

    modal.style.display = "flex";
  }

  function setupGamification() {
    renderPlayerHUD();
    renderJourneyMap();
    renderDailyQuests();

    // Rương bí ẩn hàng ngày
    const btnChest = document.getElementById("btn-open-chest");
    if (btnChest) {
      btnChest.addEventListener("click", () => {
        if (appState.openedChestToday) {
          alert("🎁 Em đã mở rương nhận thưởng của ngày hôm nay rồi! Hãy quay lại vào ngày mai nhé!");
          return;
        }
        appState.openedChestToday = true;
        addExpAndCoins(50, 30);
        playCelebration();
        alert("🎉 Chúc mừng em đã mở Rương Bí Ẩn nhận được: +50 EXP và +30 Xu Toán Học! 🪙");
        const dot = btnChest.querySelector(".chest-badge-dot");
        if (dot) dot.style.display = "none";
      });
    }

    // Nút mở Cửa Hàng Xu Hiệp Sĩ & Bảng Chức Danh
    document.querySelectorAll(".coins-box, #btn-open-shop").forEach(el => {
      el.style.cursor = "pointer";
      el.addEventListener("click", openKnightShopModal);
    });

    document.querySelectorAll(".player-avatar-box, .player-identity, #hud-player-title, #hud-level-badge").forEach(el => {
      el.style.cursor = "pointer";
      el.addEventListener("click", openKnightRanksModal);
    });

    document.getElementById("btn-close-shop-modal")?.addEventListener("click", () => {
      const m = document.getElementById("knight-shop-modal");
      if (m) m.style.display = "none";
    });

    document.getElementById("btn-close-ranks-modal")?.addEventListener("click", () => {
      const m = document.getElementById("knight-ranks-modal");
      if (m) m.style.display = "none";
    });

    // Cổng dịch chuyển nhanh
    document.getElementById("portal-theorems")?.addEventListener("click", () => switchTab("tab-theorems"));
    document.getElementById("portal-exams")?.addEventListener("click", () => switchTab("tab-exams"));
    document.getElementById("portal-socratic")?.addEventListener("click", () => switchTab("tab-socratic"));
    document.getElementById("portal-dashboard")?.addEventListener("click", () => switchTab("tab-dashboard"));
  }

  // ---------------------------------------------------------------
  // 11. HỆ THỐNG XÁC THỰC: ĐĂNG NHẬP, ĐĂNG KÝ, QUẢN LÝ TÀI KHOẢN
  // ---------------------------------------------------------------
  function setupAuthSystem() {
    const authModal = document.getElementById("auth-modal");
    const btnOpenAuth = document.getElementById("btn-header-auth");
    const btnCloseAuth = document.getElementById("btn-close-auth-modal");
    const btnLogout = document.getElementById("btn-header-logout");
    const tabLogin = document.getElementById("tab-btn-login");
    const tabRegister = document.getElementById("tab-btn-register");
    const formLogin = document.getElementById("form-login");
    const formRegister = document.getElementById("form-register");
    const linkSwitchRegister = document.getElementById("link-switch-to-register");
    const linkSwitchLogin = document.getElementById("link-switch-to-login");
    const msgBox = document.getElementById("auth-msg-box");
    const btnGuest = document.getElementById("btn-guest-login");
    const avatarOpts = document.querySelectorAll(".avatar-opt");

    let selectedAvatar = "🧙‍♂️";

    function showMsg(text, type = "error") {
      if (!msgBox) return;
      msgBox.className = `auth-msg-box ${type}`;
      msgBox.innerHTML = `<span>${type === "error" ? "⚠️" : "✅"}</span> <span>${text}</span>`;
      msgBox.style.display = "flex";
    }

    function hideMsg() {
      if (msgBox) {
        msgBox.style.display = "none";
        msgBox.textContent = "";
      }
    }

    function openAuthModal(defaultTab = "login") {
      hideMsg();
      if (defaultTab === "register") {
        setAuthTab("register");
      } else {
        setAuthTab("login");
      }
      if (authModal) authModal.style.display = "flex";
    }

    function closeAuthModal() {
      if (authModal) authModal.style.display = "none";
      hideMsg();
    }

    function setAuthTab(tab) {
      hideMsg();
      if (tab === "register") {
        tabLogin?.classList.remove("active");
        tabRegister?.classList.add("active");
        formLogin?.classList.remove("active");
        formRegister?.classList.add("active");
      } else {
        tabRegister?.classList.remove("active");
        tabLogin?.classList.add("active");
        formRegister?.classList.remove("active");
        formLogin?.classList.add("active");
      }
    }

    // Chọn Avatar linh vật
    avatarOpts.forEach(btn => {
      btn.addEventListener("click", () => {
        avatarOpts.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedAvatar = btn.dataset.avatar || "🧙‍♂️";
      });
    });

    // Nút Header: Mở modal hoặc thông báo tài khoản
    btnOpenAuth?.addEventListener("click", () => {
      if (currentUser) {
        const conf = confirm(`👤 Tài khoản đang hoạt động: ${currentUser.fullname} (@${currentUser.username})\nCấp độ: Lv.${appState.playerLevel} – Điểm Xu: ${appState.playerCoins}🪙\n\nEm có muốn đăng xuất để chuyển sang tài khoản khác không?`);
        if (conf) {
          doLogout();
        }
      } else {
        openAuthModal("login");
      }
    });

    btnCloseAuth?.addEventListener("click", closeAuthModal);
    authModal?.addEventListener("click", (e) => {
      if (e.target === authModal) closeAuthModal();
    });

    tabLogin?.addEventListener("click", () => setAuthTab("login"));
    tabRegister?.addEventListener("click", () => setAuthTab("register"));
    linkSwitchRegister?.addEventListener("click", (e) => {
      e.preventDefault();
      setAuthTab("register");
    });
    linkSwitchLogin?.addEventListener("click", (e) => {
      e.preventDefault();
      setAuthTab("login");
    });

    // Chế độ Khách (Guest)
    btnGuest?.addEventListener("click", () => {
      currentUser = {
        username: "khach_" + Math.floor(100 + Math.random() * 900),
        fullname: "Khách Học Thử",
        grade: appState.selectedGrade || 7,
        avatar: "🎒",
        isGuest: true
      };
      playCelebration();
      showMsg("🎒 Chào mừng em đến với chế độ Khách Học Thử!", "success");
      setTimeout(() => {
        closeAuthModal();
        renderPlayerHUD();
        renderJourneyMap();
        renderDailyQuests();
        refreshCurrentView();
      }, 700);
    });

    // Xử lý Form Đăng Ký
    formRegister?.addEventListener("submit", (e) => {
      e.preventDefault();
      const fullname = document.getElementById("reg-fullname")?.value.trim();
      const rawUser = document.getElementById("reg-username")?.value.trim().toLowerCase();
      const pass = document.getElementById("reg-password")?.value;
      const repass = document.getElementById("reg-repassword")?.value;
      const gradeRadio = document.querySelector('input[name="reg-grade"]:checked');
      const grade = gradeRadio ? parseInt(gradeRadio.value) : 7;

      if (!fullname || !rawUser || !pass) {
        showMsg("Vui lòng điền đầy đủ các thông tin!");
        return;
      }

      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernameRegex.test(rawUser)) {
        showMsg("Tên đăng nhập từ 3-20 ký tự, viết liền không dấu, không có khoảng trắng!");
        return;
      }

      if (pass.length < 4) {
        showMsg("Mật khẩu cần tối thiểu 4 ký tự!");
        return;
      }

      if (pass !== repass) {
        showMsg("Mật khẩu nhập lại không khớp!");
        return;
      }

      if (appUsers[rawUser]) {
        showMsg("Tên đăng nhập này đã có bạn dùng rồi! Em hãy chọn tên khác nhé.");
        return;
      }

      // Tạo tài khoản học sinh mới
      const newUser = {
        username: rawUser,
        fullname: fullname,
        password: pass,
        grade: grade,
        avatar: selectedAvatar,
        createdAt: new Date().toISOString(),
        state: createDefaultState(grade)
      };

      appUsers[rawUser] = newUser;
      currentUser = newUser;
      currentUsername = rawUser;
      localStorage.setItem(CURRENT_USER_KEY, rawUser);
      saveUsers();

      appState = newUser.state;
      appState.selectedGrade = grade;

      // Cập nhật nút chọn khối lớp trên Header
      gradeBtns.forEach(b => {
        if (parseInt(b.dataset.grade) === grade) b.classList.add("active");
        else b.classList.remove("active");
      });

      playCelebration();
      showMsg(`🎉 Chúc mừng ${fullname}! Tài khoản đã tạo thành công!`, "success");

      setTimeout(() => {
        closeAuthModal();
        renderPlayerHUD();
        renderJourneyMap();
        renderDailyQuests();
        refreshCurrentView();
        updateLeitnerCounts();
        updateDashboardStats();
        switchTab("tab-home");
      }, 900);
    });

    // Xử lý Form Đăng Nhập
    formLogin?.addEventListener("submit", (e) => {
      e.preventDefault();
      const rawUser = document.getElementById("login-username")?.value.trim().toLowerCase();
      const pass = document.getElementById("login-password")?.value;

      if (!rawUser || !pass) {
        showMsg("Vui lòng nhập tên đăng nhập và mật khẩu!");
        return;
      }

      const foundUser = appUsers[rawUser];
      if (!foundUser || foundUser.password !== pass) {
        showMsg("Tên đăng nhập hoặc mật khẩu chưa chính xác! Em hãy thử lại nhé.");
        return;
      }

      // Đăng nhập thành công
      currentUser = foundUser;
      currentUsername = rawUser;
      localStorage.setItem(CURRENT_USER_KEY, rawUser);

      appState = foundUser.state ? { ...createDefaultState(foundUser.grade || 7), ...foundUser.state } : createDefaultState(foundUser.grade || 7);

      // Đồng bộ nút chọn khối lớp
      gradeBtns.forEach(b => {
        if (parseInt(b.dataset.grade) === appState.selectedGrade) b.classList.add("active");
        else b.classList.remove("active");
      });

      playCelebration();
      showMsg(`🚀 Chào mừng ${foundUser.fullname} quay trở lại!`, "success");

      setTimeout(() => {
        closeAuthModal();
        renderPlayerHUD();
        renderJourneyMap();
        renderDailyQuests();
        refreshCurrentView();
        updateLeitnerCounts();
        updateDashboardStats();
      }, 800);
    });

    // Hàm Đăng Xuất An Toàn: Bảo mật tuyệt đối dữ liệu
    function doLogout() {
      localStorage.removeItem(CURRENT_USER_KEY);
      currentUser = {
        username: "guest",
        fullname: "Khách Học Thử",
        avatar: "🎒",
        isGuest: true
      };
      currentUsername = null;
      appState = createDefaultState(7);
      renderPlayerHUD();
      renderJourneyMap();
      renderDailyQuests();
      refreshCurrentView();
      updateLeitnerCounts();
      updateDashboardStats();
      alert("👋 Em đã đăng xuất an toàn! Dữ liệu học tập và tiến độ của em đã được bảo mật tuyệt đối.");
      openAuthModal("login");
    }

    btnLogout?.addEventListener("click", () => {
      const conf = confirm("Em có chắc chắn muốn đăng xuất khỏi tài khoản không? (Tiến độ của em đã được lưu an toàn)");
      if (conf) doLogout();
    });

    // Tự động mở bảng Đăng Nhập / Học Thử nếu học sinh chưa đăng nhập
    if (!currentUser || currentUser.isGuest) {
      setTimeout(() => {
        openAuthModal("login");
      }, 700);
    }
  }

  // Khởi chạy toàn bộ hệ thống
  setupGamification();
  setupAuthSystem();
  refreshCurrentView();
  updateLeitnerCounts();
  updateDashboardStats();
  renderAllMath();
});
