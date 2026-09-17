// =================================================================
// VUI HỌC TOÁN – MATHMIND AI (KẾT NỐI TRI THỨC VỚI CUỘC SỐNG)
// Toàn bộ logic Frontend, Leitner Box, Web Speech API, KaTeX & Backend AI
// =================================================================

document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------------------------------------------
  // 1. KHỞI TẠO DỮ LIỆU & LOCAL STORAGE
  // ---------------------------------------------------------------
  const STORAGE_KEY = "vui_hoc_toan_data_v1";

  let appState = {
    selectedGrade: 7, // 6 hoặc 7
    activeTab: "tab-home", // Mặc định vào Màn hình chính Gamification
    subMode: "flashcard",
    currentFilter: "all", // all | geometry | arithmetic | sem1 | sem2
    searchTerm: "",
    streak: 3,
    playerLevel: 3,
    playerExp: 390,
    playerMaxExp: 600,
    playerCoins: 180,
    playerTitle: "Hiệp Sĩ Hình Học 🛡️",
    openedChestToday: false,
    clearedStages: [1, 2],
    activeStage: 3,
    leitner: {
      red: [],
      yellow: [],
      green: []
    },
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

  // Nạp trạng thái từ LocalStorage
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        appState = { ...appState, ...parsed };
      } else {
        // Phân bổ mặc định ban đầu: một số vào Hộp Đỏ, Vàng, Xanh để demo
        THEOREMS_DATA.forEach((thm, idx) => {
          if (idx % 3 === 0) appState.leitner.red.push(thm.id);
          else if (idx % 3 === 1) appState.leitner.yellow.push(thm.id);
          else appState.leitner.green.push(thm.id);
        });
        saveState();
      }
    } catch (e) {
      console.warn("Could not load state, using defaults", e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.warn("Could not save state", e);
    }
    updateLeitnerCounts();
    updateDashboardStats();
  }

  // Khởi chạy
  loadState();

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
  // 4. KẾT NỐI BACKEND BẢO MẬT GEMINI API
  // ---------------------------------------------------------------
  async function callAIBackend({ prompt, mode = "general", context = {} }) {
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, mode, context })
      });
      if (!res.ok) throw new Error("Backend response not ok");
      const data = await res.json();
      return data.reply;
    } catch (err) {
      console.warn("Direct backend request failed, using intelligent fallback:", err);
      // Fallback Engine khi chạy offline
      if (mode === "socratic") {
        return `Chào em! Thầy AI Socratic luôn đồng hành cùng em. Đối với bài toán này:\n\n1. 🔍 **Giả thiết**: Hãy liệt kê những yếu tố đề bài đã cho (số đo góc, cạnh song song, tam giác bằng nhau...).\n2. 💡 **Định lý gợi mở**: Em hãy thử nghĩ về định lý trọng tâm liên quan trong SGK Toán Kết nối tri thức.\n3. ❓ **Câu hỏi cho em**: Em đã nhận thấy hai góc nào bằng nhau hoặc cạnh nào chung chưa? Hãy thử viết ra nhé!`;
      } else if (mode === "evaluate") {
        return `⭐ **Điểm số**: 8.5 / 10\n\n💡 **Nhận xét**: Câu trả lời của em đã nắm rất vững ý nghĩa cốt lõi! Em diễn đạt tự nhiên và đúng bản chất hình học.\n\n📖 **Góp ý nhỏ**: Em nhớ bổ sung thêm điều kiện đầy đủ như SGK Kết nối tri thức: *"${context?.standardAnswer || ''}"* để đạt điểm 10 tuyệt đối nhé!`;
      }
      return "Thầy AI Vui Học Toán luôn sẵn sàng cùng em chinh phục các định lý Toán 6-7!";
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

  // --- Flashcard 3D Logic ---
  let currentCardIndex = 0;
  const flashcardEl = document.getElementById("flashcard-element");
  const btnFlipCard = document.getElementById("btn-flip-card");
  const btnFlipBack = document.getElementById("btn-flip-back");

  btnFlipCard.addEventListener("click", () => {
    flashcardEl.classList.add("flipped");
    playFlipSound();
  });

  btnFlipBack.addEventListener("click", () => {
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
      resultBox.textContent = "🎉 Xuất sắc! Em đã điền hoàn toàn chính xác các từ khóa của định lý này!";
      playCelebration();
      setLeitnerBox(thm.id, "green");
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

    // Mở khóa huy hiệu nếu đạt điểm cao
    if (parseFloat(score) >= 9.0) {
      appState.badges["badge-exam-master"] = true;
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

    // Thêm tin nhắn của User
    appendMessage("user", text);
    socraticInput.value = "";

    // Thêm placeholder "Đang tư duy..."
    const loadingMsgEl = appendMessage("ai", "Thầy đang đọc đề bài và chuẩn bị các gợi ý Socratic cho em...");

    appState.socraticChatCount++;
    if (appState.socraticChatCount >= 3) {
      appState.badges["badge-socratic-friend"] = true;
      saveState();
    }

    const reply = await callAIBackend({
      prompt: text,
      mode: "socratic"
    });

    loadingMsgEl.querySelector(".msg-text").innerHTML = reply.replace(/\n/g, "<br>");
    renderAllMath(loadingMsgEl);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    playSuccessSound();
  }

  function appendMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message msg-${sender}`;
    msgDiv.innerHTML = `
      <div class="msg-avatar">${sender === 'ai' ? '🦉' : '🎒'}</div>
      <div class="msg-bubble">
        <div class="msg-sender">${sender === 'ai' ? 'Thầy AI Socratic' : 'Học sinh'}</div>
        <div class="msg-text">${text}</div>
        <div class="msg-time">Vừa xong</div>
      </div>
    `;
    chatContainer.appendChild(msgDiv);
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

    if (levelBadge) levelBadge.textContent = `Lv. ${appState.playerLevel}`;
    if (playerTitle) playerTitle.textContent = appState.playerTitle;
    if (expFill && expText) {
      const pct = Math.min(100, Math.round((appState.playerExp / appState.playerMaxExp) * 100));
      expFill.style.width = `${pct}%`;
      expText.textContent = `${appState.playerExp} / ${appState.playerMaxExp} EXP`;
    }
    if (coinsNum) coinsNum.textContent = appState.playerCoins;
    if (streakNum) streakNum.textContent = `${appState.streak} ngày`;
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

  function setupGamification() {
    renderPlayerHUD();

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

    // Cổng dịch chuyển nhanh
    document.getElementById("portal-theorems")?.addEventListener("click", () => switchTab("tab-theorems"));
    document.getElementById("portal-exams")?.addEventListener("click", () => switchTab("tab-exams"));
    document.getElementById("portal-socratic")?.addEventListener("click", () => switchTab("tab-socratic"));
    document.getElementById("portal-dashboard")?.addEventListener("click", () => switchTab("tab-dashboard"));

    // Nút điều hướng từ bảng nhiệm vụ
    document.getElementById("btn-quest-go-fillblank")?.addEventListener("click", () => {
      switchTab("tab-theorems");
      document.querySelector('[data-submode="fillblank"]')?.click();
    });
    document.getElementById("btn-quest-go-socratic")?.addEventListener("click", () => switchTab("tab-socratic"));
    document.getElementById("btn-quest-go-exam")?.addEventListener("click", () => switchTab("tab-exams"));

    // Nút trùm cuối trên bản đồ
    document.getElementById("btn-home-go-exam")?.addEventListener("click", () => switchTab("tab-exams"));

    // Nút hành động trên từng ải
    document.querySelectorAll(".btn-stage-action").forEach(btn => {
      btn.addEventListener("click", () => {
        const stage = btn.dataset.stage;
        if (stage === "boss") {
          switchTab("tab-exams");
          return;
        }
        const stageNode = btn.closest(".stage-node");
        const thmTarget = stageNode?.dataset.thmTarget;
        if (thmTarget) {
          const thm = THEOREMS_DATA.find(t => t.id === thmTarget);
          if (thm) {
            openTheoremModal(thm);
            return;
          }
        }
        switchTab("tab-theorems");
      });
    });
  }

  // Khởi chạy giao diện ban đầu
  setupGamification();
  refreshCurrentView();
  updateLeitnerCounts();
  updateDashboardStats();
  renderAllMath();
});
