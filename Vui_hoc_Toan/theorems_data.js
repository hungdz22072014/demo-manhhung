// =================================================================
// KHO DỮ LIỆU ĐỊNH LÝ & CÔNG THỨC TOÁN 6 - 7 (KẾT NỐI TRI THỨC VỚI CUỘC SỐNG)
// Chuẩn hóa phục vụ Flashcard, Thử thách Điền khuyết, Leitner Box & AI Prompt
// =================================================================

const THEOREMS_DATA = [
  // -------------------------------------------------------------
  // LỚP 6 - HỌC KÌ 1: SỐ HỌC & HÌNH HỌC TRỰC QUAN
  // -------------------------------------------------------------
  {
    id: "toan6-hk1-tap-hop-luy-thua",
    grade: 6,
    semester: 1,
    topic: "arithmetic",
    topicName: "Tập hợp & Phép tính lũy thừa",
    title: "Quy tắc lũy thừa với số mũ tự nhiên",
    summary: "Nhân, chia hai lũy thừa cùng cơ số và lũy thừa của lũy thừa.",
    content: "Khi nhân hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và cộng các số mũ: a^m · a^n = a^(m+n).\nKhi chia hai lũy thừa cùng cơ số khác 0, ta giữ nguyên cơ số và trừ các số mũ: a^m : a^n = a^(m-n) (với a ≠ 0, m ≥ n).\nQuy ước: a^0 = 1 (với a ≠ 0); a^1 = a.",
    hypothesis: "Cho số tự nhiên a khác 0 và m, n là các số tự nhiên",
    conclusion: "a^m · a^n = a^(m+n); a^m : a^n = a^(m-n) (m ≥ n)",
    formula: "a^m \\cdot a^n = a^{m+n}, \\quad a^m : a^n = a^{m-n} \\ (a \\neq 0, m \\ge n)",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><circle cx="50" cy="50" r="42" fill="#eff6ff" stroke="#3b82f6" stroke-width="4"/><text x="50" y="58" font-size="26" font-weight="bold" fill="#1d4ed8" text-anchor="middle">a^m · a^n</text></svg>`,
    fillBlank: {
      question: "Khi nhân hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và {blank1} các số mũ. Khi chia hai lũy thừa cùng cơ số, ta {blank2} các số mũ.",
      answers: ["cộng", "trừ"],
      hints: ["Phép cộng", "Phép trừ"]
    },
    aiQuestion: "Em hãy nêu quy tắc nhân và chia hai lũy thừa cùng cơ số?",
    standardAnswer: "Khi nhân hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và cộng các số mũ: a^m · a^n = a^(m+n). Khi chia hai lũy thừa cùng cơ số khác 0, ta giữ nguyên cơ số và trừ các số mũ: a^m : a^n = a^(m-n).",
    keywords: ["giữ nguyên cơ số", "cộng các số mũ", "trừ các số mũ", "a^m · a^n = a^(m+n)"]
  },
  {
    id: "toan6-hk1-chia-het-2-5",
    grade: 6,
    semester: 1,
    topic: "arithmetic",
    topicName: "Số học & Tính chia hết",
    title: "Dấu hiệu chia hết cho 2 và cho 5",
    summary: "Dấu hiệu nhận biết một số chia hết cho 2 hoặc 5 dựa vào chữ số tận cùng.",
    content: "Các số có chữ số tận cùng là 0, 2, 4, 6, 8 thì chia hết cho 2 và chỉ những số đó mới chia hết cho 2.\nCác số có chữ số tận cùng là 0 hoặc 5 thì chia hết cho 5 và chỉ những số đó mới chia hết cho 5.",
    hypothesis: "Số tự nhiên a có chữ số tận cùng là c",
    conclusion: "c ∈ {0, 2, 4, 6, 8} ⇔ a ⋮ 2; c ∈ {0, 5} ⇔ a ⋮ 5",
    formula: "a = \\overline{...c} \\implies (c \\in \\{0,2,4,6,8\\} \\Leftrightarrow a \\ \\vdots \\ 2)",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><circle cx="50" cy="50" r="42" fill="#eff6ff" stroke="#3b82f6" stroke-width="4"/><text x="50" y="58" font-size="28" font-weight="bold" fill="#1d4ed8" text-anchor="middle">÷ 2, 5</text></svg>`,
    fillBlank: {
      question: "Các số có chữ số tận cùng là {blank1} thì chia hết cho 2. Số tận cùng là {blank2} thì chia hết cho cả 2 và 5.",
      answers: ["chẵn", "0"],
      hints: ["0, 2, 4, 6, 8", "Chữ số tròn chục nhỏ nhất"]
    },
    aiQuestion: "Em hãy nêu rõ dấu hiệu để một số tự nhiên vừa chia hết cho 2, vừa chia hết cho 5?",
    standardAnswer: "Một số tự nhiên vừa chia hết cho 2 vừa chia hết cho 5 khi và chỉ khi nó có chữ số tận cùng là 0.",
    keywords: ["chữ số tận cùng", "0", "chia hết cho 2", "chia hết cho 5"]
  },
  {
    id: "toan6-hk1-chia-het-3-9",
    grade: 6,
    semester: 1,
    topic: "arithmetic",
    topicName: "Số học & Tính chia hết",
    title: "Dấu hiệu chia hết cho 3 và cho 9",
    summary: "Dấu hiệu nhận biết một số chia hết cho 3 hoặc 9 dựa vào tổng các chữ số.",
    content: "Các số có tổng các chữ số chia hết cho 3 thì chia hết cho 3 và chỉ những số đó mới chia hết cho 3.\nCác số có tổng các chữ số chia hết cho 9 thì chia hết cho 9 và chỉ những số đó mới chia hết cho 9.",
    hypothesis: "Số tự nhiên a có tổng các chữ số là S",
    conclusion: "S ⋮ 3 ⇔ a ⋮ 3; S ⋮ 9 ⇔ a ⋮ 9",
    formula: "S(a) \\ \\vdots \\ 3 \\Leftrightarrow a \\ \\vdots \\ 3, \\quad S(a) \\ \\vdots \\ 9 \\Leftrightarrow a \\ \\vdots \\ 9",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><rect x="10" y="10" width="80" height="80" rx="16" fill="#fef3c7" stroke="#f59e0b" stroke-width="4"/><text x="50" y="58" font-size="26" font-weight="bold" fill="#b45309" text-anchor="middle">∑ chữ số</text></svg>`,
    fillBlank: {
      question: "Một số chia hết cho 9 khi và chỉ khi {blank1} các chữ số của nó {blank2}.",
      answers: ["tổng", "chia hết cho 9"],
      hints: ["Phép tính cộng", "Tính chất chia hết"]
    },
    aiQuestion: "Tại sao một số chia hết cho 9 thì chắc chắn chia hết cho 3, nhưng điều ngược lại có đúng không?",
    standardAnswer: "Vì 9 chia hết cho 3 nên tổng chữ số chia hết cho 9 thì cũng chia hết cho 3. Điều ngược lại không đúng (ví dụ số 12 chia hết cho 3 nhưng không chia hết cho 9).",
    keywords: ["tổng các chữ số", "chia hết cho 9", "chia hết cho 3", "chiều ngược lại không đúng"]
  },
  {
    id: "toan6-hk1-uoc-va-boi",
    grade: 6,
    semester: 1,
    topic: "arithmetic",
    topicName: "Ước, Bội & Số nguyên tố",
    title: "Ước chung lớn nhất (ƯCLN) & Bội chung nhỏ nhất (BCNN)",
    summary: "Quy tắc tìm ƯCLN và BCNN bằng cách phân tích ra thừa số nguyên tố.",
    content: "ƯCLN(a, b): Lấy các thừa số nguyên tố CHUNG với số mũ NHỎ NHẤT rồi nhân lại.\nBCNN(a, b): Lấy các thừa số nguyên tố CHUNG VÀ RIÊNG với số mũ LỚN NHẤT rồi nhân lại.\nSố nguyên tố là số tự nhiên lớn hơn 1 chỉ có đúng 2 ước là 1 và chính nó.",
    hypothesis: "Cho a, b là các số tự nhiên lớn hơn 1 đã phân tích ra thừa số nguyên tố",
    conclusion: "ƯCLN lấy thừa số chung (mũ nhỏ nhất), BCNN lấy chung & riêng (mũ lớn nhất)",
    formula: "\\text{ƯCLN}(a,b) \\cdot \\text{BCNN}(a,b) = a \\cdot b",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><circle cx="40" cy="50" r="30" fill="none" stroke="#3b82f6" stroke-width="3"/><circle cx="60" cy="50" r="30" fill="none" stroke="#ec4899" stroke-width="3"/><text x="50" y="55" font-size="14" font-weight="bold" fill="#7e22ce" text-anchor="middle">ƯCLN</text></svg>`,
    fillBlank: {
      question: "Để tìm ƯCLN của hai hay nhiều số, ta chọn ra các thừa số nguyên tố {blank1} với số mũ {blank2}.",
      answers: ["chung", "nhỏ nhất"],
      hints: ["Cùng xuất hiện ở các số", "Số mũ bé nhất"]
    },
    aiQuestion: "Nêu các bước tìm ƯCLN của hai hay nhiều số tự nhiên lớn hơn 1?",
    standardAnswer: "Bước 1: Phân tích mỗi số ra thừa số nguyên tố. Bước 2: Chọn ra các thừa số nguyên tố chung. Bước 3: Lập tích các thừa số đã chọn, mỗi thừa số lấy với số mũ nhỏ nhất của nó.",
    keywords: ["phân tích ra thừa số nguyên tố", "thừa số chung", "số mũ nhỏ nhất"]
  },
  {
    id: "toan6-hk1-quy-tac-dau-ngoac",
    grade: 6,
    semester: 1,
    topic: "arithmetic",
    topicName: "Số nguyên & Quy tắc dấu",
    title: "Quy tắc dấu ngoặc & Phép tính số nguyên",
    summary: "Quy tắc bỏ dấu ngoặc và quy tắc cộng, trừ, nhân hai số nguyên.",
    content: "Khi bỏ dấu ngoặc có dấu '+' đằng trước: giữ nguyên dấu tất cả các số hạng.\nKhi bỏ dấu ngoặc có dấu '-' đằng trước: đổi dấu tất cả các số hạng: '+' thành '-', '-' thành '+'.\nNhân hai số nguyên cùng dấu cho kết quả dương, nhân hai số nguyên khác dấu cho kết quả âm.",
    hypothesis: "Biểu thức có chứa dấu ngoặc đằng trước mang dấu '+' hoặc dấu '-'",
    conclusion: "+(a - b + c) = a - b + c; -(a - b + c) = -a + b - c",
    formula: "-(a - b + c) = -a + b - c, \\quad (-a) \\cdot (-b) = a \\cdot b, \\quad (-a) \\cdot b = -(a \\cdot b)",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><circle cx="50" cy="50" r="42" fill="#fdf2f8" stroke="#ec4899" stroke-width="4"/><text x="50" y="58" font-size="30" font-weight="bold" fill="#be185d" text-anchor="middle">-(a - b)</text></svg>`,
    fillBlank: {
      question: "Khi bỏ dấu ngoặc có dấu trừ đằng trước, ta phải {blank1} của tất cả các số hạng trong ngoặc, dấu cộng thành {blank2}.",
      answers: ["đổi dấu", "dấu trừ"],
      hints: ["Hành động thay đổi", "Dấu đối diện"]
    },
    aiQuestion: "Em hãy phát biểu chính xác quy tắc bỏ dấu ngoặc có dấu trừ đằng trước và lấy 1 ví dụ cụ thể?",
    standardAnswer: "Khi bỏ dấu ngoặc có dấu trừ đằng trước, ta phải đổi dấu toàn bộ các số hạng bên trong: dấu cộng đổi thành dấu trừ, dấu trừ đổi thành dấu cộng. Ví dụ: -(5 - 8 + 2) = -5 + 8 - 2.",
    keywords: ["đổi dấu", "dấu cộng thành dấu trừ", "dấu trừ thành dấu cộng", "ví dụ"]
  },
  {
    id: "toan6-hk1-hinh-vuong-tam-giac-deu",
    grade: 6,
    semester: 1,
    topic: "geometry",
    topicName: "Hình học trực quan",
    title: "Tính chất Tam giác đều & Hình vuông",
    summary: "Các đặc điểm về cạnh, góc và đường chéo của tam giác đều và hình vuông.",
    content: "Tam giác đều có 3 cạnh bằng nhau, 3 góc bằng nhau và mỗi góc bằng 60°.\nHình vuông có 4 cạnh bằng nhau, 4 góc vuông (90°), hai đường chéo bằng nhau và vuông góc với nhau tại trung điểm của mỗi đường.",
    hypothesis: "Tam giác ABC đều; Tứ giác MNPQ là hình vuông",
    conclusion: "AB = BC = CA; Â = B̂ = Ĉ = 60°. MN = NP = PQ = QM; 4 góc vuông, MP = NQ và MP ⊥ NQ.",
    formula: "S_{hv} = a^2, \\quad P_{hv} = 4a, \\quad P_{\\Delta} = 3a",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><polygon points="50,15 88,80 12,80" fill="none" stroke="#6366f1" stroke-width="4"/><rect x="35" y="45" width="30" height="30" fill="#e0e7ff" stroke="#4f46e5" stroke-width="3"/></svg>`,
    fillBlank: {
      question: "Hình vuông có 4 cạnh bằng nhau, 4 góc bằng {blank1} và hai đường chéo {blank2} với nhau tại trung điểm.",
      answers: ["90°", "vuông góc"],
      hints: ["Góc vuông", "Tạo góc 90 độ"]
    },
    aiQuestion: "Nêu các tính chất nổi bật nhất của hai đường chéo trong hình vuông?",
    standardAnswer: "Hai đường chéo của hình vuông có độ dài bằng nhau, cắt nhau tại trung điểm của mỗi đường và vuông góc với nhau.",
    keywords: ["hai đường chéo bằng nhau", "vuông góc", "cắt nhau tại trung điểm"]
  },
  {
    id: "toan6-hk1-hinh-thoi-hinh-binh-hanh",
    grade: 6,
    semester: 1,
    topic: "geometry",
    topicName: "Hình học trực quan",
    title: "Tính chất Hình bình hành & Hình thoi",
    summary: "Đặc điểm các cạnh đối song song, bằng nhau và tính chất đường chéo hình thoi.",
    content: "Hình bình hành: Các cạnh đối song song và bằng nhau, các góc đối bằng nhau, hai đường chéo cắt nhau tại trung điểm mỗi đường.\nHình thoi: Có 4 cạnh bằng nhau, các cạnh đối song song, hai đường chéo vuông góc với nhau và cắt nhau tại trung điểm mỗi đường. Diện tích hình thoi bằng nửa tích hai đường chéo.",
    hypothesis: "ABCD là hình thoi có hai đường chéo d1, d2",
    conclusion: "AB = BC = CD = DA, AC ⊥ BD, S = 1/2 * d1 * d2",
    formula: "S_{thoi} = \\frac{1}{2} d_1 d_2, \\quad S_{hbh} = a \\cdot h",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><polygon points="50,12 88,50 50,88 12,50" fill="#f0fdf4" stroke="#16a34a" stroke-width="4"/><line x1="50" y1="12" x2="50" y2="88" stroke="#15803d" stroke-dasharray="3,3"/><line x1="12" y1="50" x2="88" y2="50" stroke="#15803d" stroke-dasharray="3,3"/></svg>`,
    fillBlank: {
      question: "Hai đường chéo của hình thoi {blank1} với nhau tại {blank2} của mỗi đường.",
      answers: ["vuông góc", "trung điểm"],
      hints: ["Tạo góc 90 độ", "Điểm chính giữa"]
    },
    aiQuestion: "Công thức tính diện tích hình thoi khi biết độ dài hai đường chéo m và n là gì?",
    standardAnswer: "Diện tích hình thoi bằng một nửa tích độ dài hai đường chéo: S = 1/2 * m * n.",
    keywords: ["nửa tích", "hai đường chéo", "S = 1/2 * m * n"]
  },

  // -------------------------------------------------------------
  // LỚP 6 - HỌC KÌ 2: PHÂN SỐ, SỐ THẬP PHÂN & HÌNH HỌC PHẲNG
  // -------------------------------------------------------------
  {
    id: "toan6-hk2-tinh-chat-phan-so",
    grade: 6,
    semester: 2,
    topic: "arithmetic",
    topicName: "Phân số & Số thập phân",
    title: "Tính chất cơ bản của phân số & Phép tính phân số",
    summary: "Nhân/chia cả tử và mẫu với cùng một số khác 0 và quy tắc cộng trừ nhân chia phân số.",
    content: "Nếu nhân cả tử và mẫu của một phân số với cùng một số nguyên khác 0 thì ta được phân số bằng phân số đã cho: a/b = (a·m)/(b·m).\nNếu chia cả tử và mẫu cho cùng một ước chung thì được phân số bằng phân số đã cho.\nCộng/trừ phân số cùng mẫu: a/m + b/m = (a+b)/m. Nhân phân số: (a/b) · (c/d) = (a·c)/(b·d).",
    hypothesis: "Phân số a/b với m, n ∈ Z, m ≠ 0",
    conclusion: "a/b = (a * m)/(b * m) và a/b = (a : n)/(b : n)",
    formula: "\\frac{a}{b} = \\frac{a \\cdot m}{b \\cdot m} \\ (m \\neq 0), \\quad \\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><rect x="15" y="15" width="70" height="70" rx="12" fill="#f8fafc" stroke="#64748b" stroke-width="4"/><text x="50" y="42" font-size="24" font-weight="bold" fill="#0f172a" text-anchor="middle">a · m</text><line x1="25" y1="52" x2="75" y2="52" stroke="#0f172a" stroke-width="3"/><text x="50" y="76" font-size="24" font-weight="bold" fill="#0f172a" text-anchor="middle">b · m</text></svg>`,
    fillBlank: {
      question: "Nếu nhân cả tử và mẫu của phân số với cùng một số nguyên {blank1} thì ta được phân số {blank2} phân số đã cho.",
      answers: ["khác 0", "bằng"],
      hints: ["Điều kiện của số nguyên nhân vào", "Quan hệ giữa hai phân số"]
    },
    aiQuestion: "Dựa vào tính chất cơ bản của phân số, em hãy giải thích cách rút gọn một phân số về tối giản?",
    standardAnswer: "Để rút gọn phân số về tối giản, ta chia cả tử và mẫu của phân số đó cho ước chung lớn nhất (ƯCLN) của chúng.",
    keywords: ["chia cả tử và mẫu", "ước chung lớn nhất", "ƯCLN", "tối giản"]
  },
  {
    id: "toan6-hk2-so-thap-phan-ti-so",
    grade: 6,
    semester: 2,
    topic: "arithmetic",
    topicName: "Số thập phân & Tỉ số phần trăm",
    title: "Số thập phân, Tỉ số và Tỉ số phần trăm",
    summary: "Quy tắc tìm giá trị phân số của một số và tìm tỉ số phần trăm.",
    content: "1. Muốn tìm m/n của số b cho trước, ta tính b · (m/n).\n2. Muốn tìm một số biết m/n của nó bằng a, ta tính a : (m/n).\n3. Tỉ số phần trăm của hai số a và b là (a : b) · 100%.",
    hypothesis: "Số a, b và tỉ số m/n",
    conclusion: "Giá trị phân số = b · (m/n); Số cần tìm = a : (m/n)",
    formula: "\\text{Giá trị} = b \\cdot \\frac{m}{n}, \\quad \\text{Tỉ số phần trăm} = \\frac{a}{b} \\cdot 100\\%",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><circle cx="50" cy="50" r="42" fill="#ecfdf5" stroke="#10b981" stroke-width="4"/><text x="50" y="58" font-size="26" font-weight="bold" fill="#059669" text-anchor="middle">% Tỉ số</text></svg>`,
    fillBlank: {
      question: "Muốn tìm {blank1} của số b cho trước, ta lấy số b {blank2} với phân số đó.",
      answers: ["giá trị phân số", "nhân"],
      hints: ["Đại lượng cần tìm", "Phép tính nhân"]
    },
    aiQuestion: "Em hãy nêu cách tìm m/n của số b cho trước và cho ví dụ?",
    standardAnswer: "Muốn tìm m/n của số b cho trước, ta lấy b nhân với m/n: b · (m/n). Ví dụ: Tìm 2/3 của 30 ta lấy 30 · 2/3 = 20.",
    keywords: ["b nhân với m/n", "b · (m/n)", "ví dụ"]
  },
  {
    id: "toan6-hk2-trung-diem-doan-thang",
    grade: 6,
    semester: 2,
    topic: "geometry",
    topicName: "Hình học phẳng cơ bản",
    title: "Điểm nằm giữa & Trung điểm đoạn thẳng",
    summary: "Điều kiện cộng độ dài đoạn thẳng và định nghĩa trung điểm.",
    content: "Nếu điểm M nằm giữa hai điểm A và B thì AM + MB = AB.\nTrung điểm M của đoạn thẳng AB là điểm nằm giữa A, B và cách đều hai điểm A, B (MA = MB = AB / 2).",
    hypothesis: "M nằm giữa A và B; MA = MB",
    conclusion: "M là trung điểm của đoạn thẳng AB và MA = MB = AB / 2",
    formula: "AM + MB = AB \\iff M \\text{ nằm giữa } A, B; \\quad MA = MB = \\frac{AB}{2}",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><line x1="15" y1="50" x2="85" y2="50" stroke="#0284c7" stroke-width="4"/><circle cx="15" cy="50" r="5" fill="#0284c7"/><circle cx="50" cy="50" r="6" fill="#f43f5e"/><circle cx="85" cy="50" r="5" fill="#0284c7"/><text x="15" y="72" font-size="14" font-weight="bold" fill="#0369a1" text-anchor="middle">A</text><text x="50" y="72" font-size="14" font-weight="bold" fill="#e11d48" text-anchor="middle">M</text><text x="85" y="72" font-size="14" font-weight="bold" fill="#0369a1" text-anchor="middle">B</text></svg>`,
    fillBlank: {
      question: "Trung điểm M của đoạn thẳng AB là điểm {blank1} hai điểm A, B và {blank2} hai điểm đó.",
      answers: ["nằm giữa", "cách đều"],
      hints: ["Vị trí", "Độ dài bằng nhau"]
    },
    aiQuestion: "Điểm M muốn trở thành trung điểm của đoạn thẳng AB thì cần thỏa mãn mấy điều kiện và là những điều kiện nào?",
    standardAnswer: "Cần thỏa mãn 2 điều kiện: 1) Điểm M phải nằm giữa hai điểm A và B; 2) Điểm M phải cách đều A và B (MA = MB = AB/2).",
    keywords: ["2 điều kiện", "nằm giữa", "cách đều", "MA = MB"]
  },
  {
    id: "toan6-hk2-goc-va-so-do-goc",
    grade: 6,
    semester: 2,
    topic: "geometry",
    topicName: "Góc & Số đo góc",
    title: "Khái niệm Góc & Phân loại góc",
    summary: "Góc nhọn, góc vuông, góc tù, góc bẹt và góc kề nhau.",
    content: "Góc là hình gồm hai tia chung gốc.\n- Góc nhọn: số đo lớn hơn 0° và nhỏ hơn 90° (0° < α < 90°).\n- Góc vuông: số đo bằng 90°.\n- Góc tù: số đo lớn hơn 90° và nhỏ hơn 180° (90° < α < 180°).\n- Góc bẹt: số đo bằng 180°.\nNếu tia Oz nằm giữa hai tia Ox và Oy thì xOz + zOy = xOy.",
    hypothesis: "Góc có số đo α",
    conclusion: "α = 90°: vuông; 0° < α < 90°: nhọn; 90° < α < 180°: tù; α = 180°: bẹt",
    formula: "0^\\circ < \\alpha_{\\text{nhọn}} < 90^\\circ, \\quad \\alpha_{\\text{vuông}} = 90^\\circ, \\quad 90^\\circ < \\alpha_{\\text{tù}} < 180^\\circ, \\quad \\alpha_{\\text{bẹt}} = 180^\\circ",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><line x1="20" y1="75" x2="85" y2="75" stroke="#6366f1" stroke-width="4"/><line x1="20" y1="75" x2="70" y2="25" stroke="#6366f1" stroke-width="4"/><path d="M 40 75 A 20 20 0 0 0 35 62" fill="none" stroke="#f43f5e" stroke-width="3"/></svg>`,
    fillBlank: {
      question: "Góc nhọn có số đo lớn hơn 0° và {blank1} 90°. Góc bẹt có số đo bằng {blank2}.",
      answers: ["nhỏ hơn", "180°"],
      hints: ["So sánh với 90 độ", "Số đo góc bẹt"]
    },
    aiQuestion: "Em hãy phân biệt 4 loại góc cơ bản dựa vào số đo của chúng?",
    standardAnswer: "1) Góc nhọn: 0° < α < 90°; 2) Góc vuông: α = 90°; 3) Góc tù: 90° < α < 180°; 4) Góc bẹt: α = 180°.",
    keywords: ["góc nhọn", "góc vuông", "góc tù", "góc bẹt", "90°", "180°"]
  },

  // -------------------------------------------------------------
  // LỚP 7 - HỌC KÌ 1: ĐẠI SỐ & HÌNH HỌC PHẲNG (CỰC KỲ QUAN TRỌNG)
  // -------------------------------------------------------------
  {
    id: "toan7-hk1-so-huu-ti-so-thuc",
    grade: 7,
    semester: 1,
    topic: "arithmetic",
    topicName: "Số hữu tỉ & Số thực",
    title: "Tập hợp số hữu tỉ, Số thực & Căn bậc hai số học",
    summary: "Số hữu tỉ viết dưới dạng a/b (b ≠ 0), căn bậc hai số học và giá trị tuyệt đối.",
    content: "Số hữu tỉ là số viết được dưới dạng phân số a/b với a, b ∈ Z, b ≠ 0. Tập hợp các số hữu tỉ kí hiệu là Q.\nCăn bậc hai số học của số a không âm là số x không âm sao cho x² = a (kí hiệu √a).\nGiá trị tuyệt đối của số thực x: |x| = x nếu x ≥ 0 và |x| = -x nếu x < 0.",
    hypothesis: "a/b với a, b ∈ Z, b ≠ 0; a ≥ 0",
    conclusion: "a/b ∈ Q; (√a)² = a; |x| ≥ 0",
    formula: "\\mathbb{Q} = \\left\\{ \\frac{a}{b} \\ \\middle| \\ a, b \\in \\mathbb{Z}, b \\neq 0 \\right\\}, \\quad \\sqrt{a} = x \\ (x \\ge 0, x^2 = a)",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><circle cx="50" cy="50" r="42" fill="#eff6ff" stroke="#2563eb" stroke-width="4"/><text x="50" y="58" font-size="28" font-weight="bold" fill="#1e40af" text-anchor="middle">Q, ℝ, √a</text></svg>`,
    fillBlank: {
      question: "Số hữu tỉ là số viết được dưới dạng phân số a/b với a, b thuộc Z và {blank1}. Căn bậc hai số học của số a không âm là số x không âm sao cho {blank2}.",
      answers: ["b khác 0", "x^2 = a"],
      hints: ["Mẫu số khác 0", "Bình phương bằng a"]
    },
    aiQuestion: "Thế nào là số hữu tỉ và căn bậc hai số học của một số không âm?",
    standardAnswer: "Số hữu tỉ là số viết được dưới dạng phân số a/b (a, b ∈ Z, b ≠ 0). Căn bậc hai số học của số không âm a là số x không âm sao cho x² = a.",
    keywords: ["a/b", "b khác 0", "căn bậc hai số học", "x^2 = a"]
  },
  {
    id: "toan7-hk1-goc-doi-dinh",
    grade: 7,
    semester: 1,
    topic: "geometry",
    topicName: "Góc & Đường thẳng song song",
    title: "Định lý Hai góc đối đỉnh & Góc kề bù",
    summary: "Hai góc đối đỉnh thì bằng nhau. Hai góc kề bù có tổng bằng 180°.",
    content: "Hai góc đối đỉnh là hai góc mà mỗi cạnh của góc này là tia đối của một cạnh của góc kia.\nĐịnh lý: Hai góc đối đỉnh thì bằng nhau.\nHai góc kề bù là hai góc vừa kề nhau vừa bù nhau, có tổng số đo bằng 180°.",
    hypothesis: "Góc xOy và góc x'Oy' là hai góc đối đỉnh",
    conclusion: "xOy = x'Oy'",
    formula: "\\widehat{xOy} = \\widehat{x'Oy'}, \\quad \\widehat{AOB} + \\widehat{BOC} = 180^\\circ \\text{ (kề bù)}",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><line x1="15" y1="20" x2="85" y2="80" stroke="#4f46e5" stroke-width="4"/><line x1="15" y1="80" x2="85" y2="20" stroke="#4f46e5" stroke-width="4"/><circle cx="50" cy="50" r="4" fill="#ef4444"/><path d="M 38 40 A 15 15 0 0 1 62 40" fill="none" stroke="#f59e0b" stroke-width="3"/></svg>`,
    fillBlank: {
      question: "Hai góc đối đỉnh là hai góc mà mỗi cạnh của góc này là {blank1} của một cạnh của góc kia. Định lý: Hai góc đối đỉnh thì {blank2}.",
      answers: ["tia đối", "bằng nhau"],
      hints: ["Tia ngược chiều", "Quan hệ độ lớn"]
    },
    aiQuestion: "Nếu hai góc có số đo bằng nhau thì chúng có nhất thiết phải đối đỉnh không? Cho ví dụ minh họa?",
    standardAnswer: "Không nhất thiết. Hai góc bằng nhau chưa chắc đối đỉnh vì các cạnh của chúng có thể không phải là tia đối của nhau. Ví dụ hai góc ở hai hình riêng biệt cùng bằng 45 độ.",
    keywords: ["không nhất thiết", "tia đối", "hai góc bằng nhau chưa chắc đối đỉnh"]
  },
  {
    id: "toan7-hk1-song-song-dau-hieu",
    grade: 7,
    semester: 1,
    topic: "geometry",
    topicName: "Góc & Đường thẳng song song",
    title: "Dấu hiệu nhận biết hai đường thẳng song song",
    summary: "Dấu hiệu qua cặp góc so le trong bằng nhau hoặc đồng vị bằng nhau.",
    content: "Nếu đường thẳng c cắt hai đường thẳng phân biệt a, b và trong các góc tạo thành có:\n- Một cặp góc so le trong bằng nhau, HOẶC\n- Một cặp góc đồng vị bằng nhau, HOẶC\n- Một cặp góc trong cùng phía bù nhau (tổng bằng 180°)\nThì đường thẳng a song song với đường thẳng b (a // b).",
    hypothesis: "Đường thẳng c cắt a và b; Â1 = B̂1 (so le trong) hoặc Â1 = B̂2 (đồng vị)",
    conclusion: "a // b",
    formula: "\\widehat{A_1} = \\widehat{B_1} \\text{ (so le trong)} \\implies a \\parallel b",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><line x1="10" y1="30" x2="90" y2="30" stroke="#0ea5e9" stroke-width="4"/><line x1="10" y1="70" x2="90" y2="70" stroke="#0ea5e9" stroke-width="4"/><line x1="25" y1="85" x2="75" y2="15" stroke="#ec4899" stroke-width="3"/></svg>`,
    fillBlank: {
      question: "Nếu một đường thẳng cắt hai đường thẳng và có một cặp góc {blank1} bằng nhau thì hai đường thẳng đó {blank2}.",
      answers: ["so le trong", "song song"],
      hints: ["Vị trí góc chéo nhau", "Không bao giờ cắt nhau"]
    },
    aiQuestion: "Em hãy nêu đầy đủ 3 dấu hiệu nhận biết hai đường thẳng song song thông qua các cặp góc tạo bởi một cát tuyến?",
    standardAnswer: "Đường thẳng cắt hai đường thẳng tạo ra: 1) Cặp góc so le trong bằng nhau; 2) Cặp góc đồng vị bằng nhau; 3) Cặp góc trong cùng phía bù nhau (tổng bằng 180°).",
    keywords: ["so le trong bằng nhau", "đồng vị bằng nhau", "trong cùng phía bù nhau"]
  },
  {
    id: "toan7-hk1-tien-de-euclid",
    grade: 7,
    semester: 1,
    topic: "geometry",
    topicName: "Tiên đề & Định lý",
    title: "Tiên đề Euclid về đường thẳng song song",
    summary: "Tính duy nhất của đường thẳng song song đi qua một điểm nằm ngoài đường thẳng.",
    content: "Qua một điểm ở ngoài một đường thẳng, chỉ có một đường thẳng song song với đường thẳng đó.\nHệ quả quan trọng:\n1) Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba thì chúng song song với nhau.\n2) Một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng kia.",
    hypothesis: "Điểm M ∉ d; d' đi qua M và d' // d",
    conclusion: "d' là duy nhất. (a // c và b // c ⇒ a // b; a ⊥ c và a // b ⇒ b ⊥ c)",
    formula: "M \\notin d \\implies \\exists! \\ d' \\text{ qua } M: d' \\parallel d",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><line x1="15" y1="65" x2="85" y2="65" stroke="#64748b" stroke-width="4"/><circle cx="50" cy="30" r="5" fill="#f43f5e"/><line x1="15" y1="30" x2="85" y2="30" stroke="#f43f5e" stroke-width="3" stroke-dasharray="4,4"/><text x="50" y="22" font-size="14" font-weight="bold" fill="#e11d48" text-anchor="middle">M duy nhất</text></svg>`,
    fillBlank: {
      question: "Qua một điểm ở ngoài một đường thẳng, chỉ có {blank1} đường thẳng {blank2} với đường thẳng đó.",
      answers: ["một", "song song"],
      hints: ["Số lượng duy nhất", "Quan hệ vị trí"]
    },
    aiQuestion: "Nêu mối quan hệ từ vuông góc đến song song dựa trên tiên đề Euclid?",
    standardAnswer: "Nếu một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng kia. Ngược lại, hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì chúng song song với nhau.",
    keywords: ["vuông góc", "song song", "từ vuông góc đến song song"]
  },
  {
    id: "toan7-hk1-tong-ba-goc-tam-giac",
    grade: 7,
    semester: 1,
    topic: "geometry",
    topicName: "Tam giác & Định lý hình học",
    title: "Định lý Tổng ba góc trong một tam giác",
    summary: "Tổng số đo ba góc của một tam giác luôn bằng 180°.",
    content: "Định lý: Tổng ba góc trong một tam giác bằng 180°.\nĐịnh lý góc ngoài: Góc ngoài của một tam giác bằng tổng của hai góc trong không kề với nó.\nHệ quả: Trong tam giác vuông, hai góc nhọn phụ nhau (tổng bằng 90°).",
    hypothesis: "Cho tam giác ABC có ba góc là Â, B̂, Ĉ",
    conclusion: "Â + B̂ + Ĉ = 180°; Góc ngoài tại A = B̂ + Ĉ",
    formula: "\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ, \\quad \\widehat{A}_{ngoai} = \\widehat{B} + \\widehat{C}",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><polygon points="50,15 90,82 10,82" fill="#eff6ff" stroke="#2563eb" stroke-width="4"/><text x="50" y="65" font-size="18" font-weight="bold" fill="#1e40af" text-anchor="middle">180°</text></svg>`,
    fillBlank: {
      question: "Tổng ba góc trong một tam giác bằng {blank1}. Góc ngoài của tam giác bằng {blank2} của hai góc trong không kề với nó.",
      answers: ["180°", "tổng"],
      hints: ["Số đo góc bẹt", "Phép cộng"]
    },
    aiQuestion: "Tại sao trong một tam giác vuông, hai góc nhọn lại luôn phụ nhau (tổng bằng 90°)?",
    standardAnswer: "Vì tổng 3 góc trong tam giác là 180°, mà góc vuông đã bằng 90°, nên tổng 2 góc nhọn còn lại phải bằng 180° - 90° = 90° (phụ nhau).",
    keywords: ["180° - 90° = 90°", "hai góc nhọn phụ nhau", "tổng 3 góc", "tổng các góc trong tam giác"]
  },
  {
    id: "toan7-hk1-tam-giac-bang-nhau-3-truong-hop",
    grade: 7,
    semester: 1,
    topic: "geometry",
    topicName: "Tam giác & Định lý hình học",
    title: "Ba trường hợp bằng nhau của hai tam giác (c-c-c, c-g-c, g-c-g)",
    summary: "Các điều kiện để hai tam giác bằng nhau theo cạnh và góc.",
    content: "1. Cạnh - Cạnh - Cạnh (c-c-c): Nếu ba cạnh của tam giác này bằng ba cạnh của tam giác kia thì hai tam giác đó bằng nhau.\n2. Cạnh - Góc - Cạnh (c-g-c): Nếu hai cạnh và góc xen giữa của tam giác này bằng hai cạnh và góc xen giữa của tam giác kia thì hai tam giác đó bằng nhau.\n3. Góc - Cạnh - Góc (g-c-g): Nếu một cạnh và hai góc kề của tam giác này bằng một cạnh và hai góc kề của tam giác kia thì hai tam giác đó bằng nhau.",
    hypothesis: "ΔABC và ΔA'B'C' thỏa mãn 1 trong 3 trường hợp",
    conclusion: "ΔABC = ΔA'B'C'",
    formula: "\\Delta ABC = \\Delta A'B'C' \\ (c.c.c \\ | \\ c.g.c \\ | \\ g.c.g)",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><polygon points="12,75 48,75 30,25" fill="#fdf4ff" stroke="#a855f7" stroke-width="3"/><polygon points="54,75 90,75 72,25" fill="#fdf4ff" stroke="#a855f7" stroke-width="3"/><text x="51" y="55" font-size="20" font-weight="bold" fill="#7e22ce" text-anchor="middle">=</text></svg>`,
    fillBlank: {
      question: "Trường hợp cạnh - góc - cạnh yêu cầu góc bằng nhau phải là góc {blank1} giữa hai cạnh. Trường hợp góc - cạnh - góc yêu cầu cạnh phải là cạnh {blank2} hai góc đó.",
      answers: ["xen giữa", "nằm giữa"],
      hints: ["Ở giữa hai cạnh", "Kề với cả hai góc"]
    },
    aiQuestion: "Tại sao trong trường hợp Cạnh - Góc - Cạnh, góc bằng nhau bắt buộc phải là góc xen giữa hai cạnh?",
    standardAnswer: "Bắt buộc phải là góc xen giữa vì nếu góc không xen giữa, hai cạnh có thể xoay tạo ra hai tam giác có hình dạng và kích thước hoàn toàn khác nhau (không bằng nhau).",
    keywords: ["góc xen giữa", "không xác định duy nhất", "hai tam giác khác nhau"]
  },
  {
    id: "toan7-hk1-tam-giac-vuong-bang-nhau",
    grade: 7,
    semester: 1,
    topic: "geometry",
    topicName: "Tam giác & Định lý hình học",
    title: "Các trường hợp bằng nhau của tam giác vuông & Tam giác cân",
    summary: "Cạnh huyền - góc nhọn, cạnh huyền - cạnh góc vuông và tính chất tam giác cân.",
    content: "Tam giác vuông bằng nhau: 1) Hai cạnh góc vuông; 2) Cạnh góc vuông - góc nhọn kề; 3) Cạnh huyền - góc nhọn; 4) Cạnh huyền - cạnh góc vuông.\nTam giác cân: Có hai cạnh bằng nhau ⇔ hai góc ở đáy bằng nhau. Đường phân giác góc ở đỉnh đồng thời là đường trung trực, trung tuyến và đường cao.",
    hypothesis: "ΔABC vuông tại A, ΔDEF vuông tại D; hoặc ΔABC cân tại A",
    conclusion: "ΔABC = ΔDEF; AB = AC ⇔ B̂ = Ĉ",
    formula: "\\text{Cạnh huyền - Góc nhọn}; \\quad \\text{Cạnh huyền - Cạnh góc vuông}; \\quad AB = AC \\iff \\widehat{B} = \\widehat{C}",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><polygon points="20,80 80,80 20,20" fill="#ecfdf5" stroke="#10b981" stroke-width="4"/><rect x="20" y="65" width="15" height="15" fill="none" stroke="#059669" stroke-width="2"/></svg>`,
    fillBlank: {
      question: "Nếu {blank1} và một góc nhọn của tam giác vuông này bằng {blank1} và một góc nhọn của tam giác vuông kia thì hai tam giác vuông đó bằng nhau.",
      answers: ["cạnh huyền"],
      hints: ["Cạnh đối diện góc vuông"]
    },
    aiQuestion: "Em hãy nêu phát biểu trường hợp bằng nhau đặc biệt 'Cạnh huyền - Cạnh góc vuông' của tam giác vuông?",
    standardAnswer: "Nếu cạnh huyền và một cạnh góc vuông của tam giác vuông này bằng cạnh huyền và một cạnh góc vuông của tam giác vuông kia thì hai tam giác vuông đó bằng nhau.",
    keywords: ["cạnh huyền", "cạnh góc vuông", "hai tam giác vuông bằng nhau"]
  },

  // -------------------------------------------------------------
  // LỚP 7 - HỌC KÌ 2: TỈ LỆ THỨC, ĐA THỨC & HÌNH HỌC KHÔNG GIAN
  // -------------------------------------------------------------
  {
    id: "toan7-hk2-ti-le-thuc-day-ti-so",
    grade: 7,
    semester: 2,
    topic: "arithmetic",
    topicName: "Đại số & Tỉ lệ thức",
    title: "Tính chất tỉ lệ thức & Dãy tỉ số bằng nhau",
    summary: "Tích ngoại tỉ bằng tích trung tỉ và tính chất cộng trừ tử mẫu.",
    content: "Tỉ lệ thức: Nếu a/b = c/d thì a * d = b * c (tích ngoại tỉ bằng tích trung tỉ).\nTính chất dãy tỉ số bằng nhau:\na/b = c/d = e/f = (a + c + e)/(b + d + f) = (a - c + e)/(b - d + f) (với điều kiện các mẫu khác 0).",
    hypothesis: "a/b = c/d = e/f",
    conclusion: "a * d = b * c; a/b = (a + c + e)/(b + d + f)",
    formula: "\\frac{a}{b} = \\frac{c}{d} \\iff a \\cdot d = b \\cdot c; \\quad \\frac{a}{b} = \\frac{c}{d} = \\frac{a+c}{b+d} = \\frac{a-c}{b-d}",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><circle cx="50" cy="50" r="42" fill="#fffbeb" stroke="#d97706" stroke-width="4"/><text x="50" y="58" font-size="24" font-weight="bold" fill="#b45309" text-anchor="middle">a·d = b·c</text></svg>`,
    fillBlank: {
      question: "Trong tỉ lệ thức a/b = c/d, tích các ngoại tỉ {blank1} tích các {blank2}.",
      answers: ["bằng", "trung tỉ"],
      hints: ["Bằng nhau", "Số ở giữa"]
    },
    aiQuestion: "Áp dụng tính chất dãy tỉ số bằng nhau, nếu x/2 = y/3 và x + y = 10 thì tìm x, y như thế nào?",
    standardAnswer: "Áp dụng tính chất dãy tỉ số bằng nhau: x/2 = y/3 = (x + y)/(2 + 3) = 10/5 = 2. Do đó x = 2 * 2 = 4, y = 3 * 2 = 6.",
    keywords: ["dãy tỉ số bằng nhau", "10/5 = 2", "x = 4", "y = 6"]
  },
  {
    id: "toan7-hk2-bieu-thuc-da-thuc-mot-bien",
    grade: 7,
    semester: 2,
    topic: "arithmetic",
    topicName: "Biểu thức & Đa thức một biến",
    title: "Đa thức một biến, Cộng trừ & Nghiệm của đa thức",
    summary: "Bậc của đa thức, cộng trừ đa thức và nghiệm của đa thức một biến.",
    content: "Đa thức một biến là tổng của những đơn thức của cùng một biến.\nBậc của đa thức một biến (khác đa thức không, đã thu gọn) là số mũ lớn nhất của biến trong đa thức đó.\nNếu tại x = a, đa thức P(x) có giá trị bằng 0 (P(a) = 0) thì a gọi là một nghiệm của đa thức P(x).",
    hypothesis: "P(x) = a_n x^n + ... + a_1 x + a_0 (a_n ≠ 0)",
    conclusion: "Bậc là n; P(a) = 0 ⇔ a là nghiệm của P(x)",
    formula: "P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_0, \\quad P(a) = 0 \\iff x = a \\text{ là nghiệm}",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><circle cx="50" cy="50" r="42" fill="#fdf4ff" stroke="#a855f7" stroke-width="4"/><text x="50" y="58" font-size="24" font-weight="bold" fill="#7e22ce" text-anchor="middle">P(x) = 0</text></svg>`,
    fillBlank: {
      question: "Bậc của đa thức một biến là số mũ {blank1} của biến trong đa thức đã thu gọn. Nếu P(a) = 0 thì a được gọi là {blank2} của đa thức P(x).",
      answers: ["lớn nhất", "nghiệm"],
      hints: ["Số mũ cao nhất", "Giá trị làm đa thức triệt tiêu"]
    },
    aiQuestion: "Thế nào là nghiệm của đa thức một biến và làm sao để kiểm tra x = a có phải là nghiệm hay không?",
    standardAnswer: "Nghiệm của đa thức P(x) là giá trị của biến làm cho đa thức có giá trị bằng 0. Để kiểm tra x = a có phải nghiệm không, ta thay x = a vào P(x), nếu P(a) = 0 thì a là nghiệm, nếu P(a) ≠ 0 thì a không phải là nghiệm.",
    keywords: ["giá trị bằng 0", "P(a) = 0", "thay vào đa thức"]
  },
  {
    id: "toan7-hk2-quan-he-goc-va-canh-doi-dien",
    grade: 7,
    semester: 2,
    topic: "geometry",
    topicName: "Quan hệ hình học trong tam giác",
    title: "Quan hệ giữa góc và cạnh đối diện trong tam giác",
    summary: "Trong một tam giác, góc đối diện với cạnh lớn hơn là góc lớn hơn và ngược lại.",
    content: "Định lý 1: Trong một tam giác, góc đối diện với cạnh lớn hơn là góc lớn hơn.\nĐịnh lý 2 (đảo): Trong một tam giác, cạnh đối diện với góc lớn hơn là cạnh lớn hơn.\nHệ quả: Trong tam giác vuông, cạnh huyền là cạnh lớn nhất. Trong tam giác tù, cạnh đối diện góc tù là cạnh lớn nhất.",
    hypothesis: "Tam giác ABC có AC > AB",
    conclusion: "Góc B > Góc C (cạnh lớn hơn đối diện góc lớn hơn)",
    formula: "AC > AB \\iff \\widehat{B} > \\widehat{C}",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><polygon points="15,80 85,80 70,25" fill="#fef2f2" stroke="#ef4444" stroke-width="4"/><text x="50" y="70" font-size="14" font-weight="bold" fill="#991b1b" text-anchor="middle">AC > AB ⇔ B̂ > Ĉ</text></svg>`,
    fillBlank: {
      question: "Trong một tam giác, cạnh đối diện với góc lớn hơn là {blank1}. Trong tam giác vuông, cạnh {blank2} là cạnh lớn nhất.",
      answers: ["cạnh lớn hơn", "huyền"],
      hints: ["Kích thước lớn hơn", "Cạnh đối diện góc 90 độ"]
    },
    aiQuestion: "Tại sao trong tam giác vuông, cạnh huyền luôn luôn là cạnh có độ dài lớn nhất?",
    standardAnswer: "Vì góc vuông (90°) là góc lớn nhất trong tam giác vuông (hai góc còn lại đều nhọn < 90°). Theo định lý quan hệ giữa góc và cạnh đối diện, cạnh đối diện với góc lớn nhất (tức cạnh huyền) phải là cạnh lớn nhất.",
    keywords: ["góc vuông lớn nhất", "đối diện góc lớn nhất", "cạnh huyền"]
  },
  {
    id: "toan7-hk2-bat-dang-thuc-tam-giac",
    grade: 7,
    semester: 2,
    topic: "geometry",
    topicName: "Quan hệ hình học trong tam giác",
    title: "Bất đẳng thức tam giác & Quan hệ đường vuông góc",
    summary: "Trong một tam giác, tổng độ dài hai cạnh bất kì luôn lớn hơn độ dài cạnh còn lại.",
    content: "Định lý: Trong một tam giác, tổng độ dài hai cạnh bất kì bao giờ cũng lớn hơn độ dài cạnh còn lại.\nHệ quả: Hiệu độ dài hai cạnh bất kì bao giờ cũng nhỏ hơn độ dài cạnh còn lại.\nQuy tắc nhận biết: Ba đoạn thẳng có độ dài a, b, c lập thành tam giác khi: |b - c| < a < b + c.\nQuan hệ đường vuông góc: Trong các đường nối từ điểm A ngoài d đến d, đường vuông góc là đường ngắn nhất.",
    hypothesis: "Tam giác ABC có ba cạnh a, b, c",
    conclusion: "b - c < a < b + c; a + b > c; a + c > b; b + c > a",
    formula: "|b - c| < a < b + c, \\quad AH \\le AM \\ (AH \\perp d)",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><polygon points="20,80 80,80 40,25" fill="#faf5ff" stroke="#9333ea" stroke-width="4"/><text x="50" y="60" font-size="16" font-weight="bold" fill="#6b21a8" text-anchor="middle">a + b > c</text></svg>`,
    fillBlank: {
      question: "Trong một tam giác, {blank1} độ dài hai cạnh bất kì luôn lớn hơn cạnh còn lại, và {blank2} độ dài hai cạnh luôn nhỏ hơn cạnh còn lại.",
      answers: ["tổng", "hiệu"],
      hints: ["Phép cộng", "Phép trừ"]
    },
    aiQuestion: "Có thể tạo thành một tam giác từ 3 đoạn thẳng có độ dài 2cm, 3cm, 5cm được không? Vì sao?",
    standardAnswer: "Không thể, vì 2 + 3 = 5, không thỏa mãn bất đẳng thức tam giác (tổng hai cạnh phải lớn hơn hẳn cạnh thứ ba, ở đây 2 + 3 không lớn hơn 5 mà bằng 5).",
    keywords: ["không thể", "2 + 3 = 5", "không lớn hơn cạnh thứ ba", "bất đẳng thức tam giác"]
  },
  {
    id: "toan7-hk2-su-dong-quy-cac-duong",
    grade: 7,
    semester: 2,
    topic: "geometry",
    topicName: "Quan hệ hình học trong tam giác",
    title: "Sự đồng quy của các đường trong tam giác",
    summary: "Trọng tâm (trung tuyến), Trực tâm (đường cao), Tâm đường tròn nội tiếp (phân giác), Tâm ngoại tiếp (trung trực).",
    content: "1. Ba đường trung tuyến đồng quy tại Trọng tâm (G). Trọng tâm cách mỗi đỉnh bằng 2/3 độ dài đường trung tuyến qua đỉnh đó.\n2. Ba đường phân giác đồng quy tại một điểm cách đều ba cạnh của tam giác (tâm đường tròn nội tiếp).\n3. Ba đường trung trực đồng quy tại một điểm cách đều ba đỉnh của tam giác (tâm đường tròn ngoại tiếp).\n4. Ba đường cao đồng quy tại một điểm gọi là Trực tâm (H) của tam giác.",
    hypothesis: "Tam giác ABC với các đường đặc biệt",
    conclusion: "Trọng tâm G (AG = 2/3 AM); Trực tâm H; Tâm cách đều 3 cạnh (phân giác); Tâm cách đều 3 đỉnh (trung trực)",
    formula: "AG = \\frac{2}{3} AM, \\quad GM = \\frac{1}{3} AM",
    svgIcon: `<svg viewBox="0 0 100 100" class="thm-svg"><polygon points="50,15 88,80 12,80" fill="none" stroke="#0891b2" stroke-width="3"/><line x1="50" y1="15" x2="50" y2="80" stroke="#06b6d4" stroke-dasharray="3,3"/><line x1="12" y1="80" x2="69" y2="47" stroke="#06b6d4" stroke-dasharray="3,3"/><circle cx="50" cy="58" r="5" fill="#e11d48"/><text x="60" y="62" font-size="14" font-weight="bold" fill="#e11d48">G</text></svg>`,
    fillBlank: {
      question: "Ba đường trung tuyến của tam giác đồng quy tại một điểm gọi là {blank1}. Điểm này cách mỗi đỉnh một khoảng bằng {blank2} độ dài đường trung tuyến.",
      answers: ["trọng tâm", "2/3"],
      hints: ["Giao điểm 3 đường trung tuyến", "Tỉ lệ phân số"]
    },
    aiQuestion: "Điểm cách đều 3 cạnh của tam giác là giao điểm của 3 đường nào, còn điểm cách đều 3 đỉnh là giao điểm của 3 đường nào?",
    standardAnswer: "Điểm cách đều 3 cạnh là giao điểm của 3 đường phân giác. Điểm cách đều 3 đỉnh là giao điểm của 3 đường trung trực.",
    keywords: ["phân giác cách đều 3 cạnh", "trung trực cách đều 3 đỉnh"]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { THEOREMS_DATA };
}
