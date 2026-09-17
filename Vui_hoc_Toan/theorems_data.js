// =================================================================
// KHO DỮ LIỆU ĐỊNH LÝ & CÔNG THỨC TOÁN 6 - 7 (KẾT NỐI TRI THỨC VỚI CUỘC SỐNG)
// Chuẩn hóa phục vụ Flashcard, Thử thách Điền khuyết, Leitner Box & AI Prompt
// =================================================================

const THEOREMS_DATA = [
  // -------------------------------------------------------------
  // LỚP 6 - HỌC KÌ 1: SỐ HỌC & HÌNH HỌC TRỰC QUAN
  // -------------------------------------------------------------
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
    id: "toan6-hk1-quy-tac-dau-ngoac",
    grade: 6,
    semester: 1,
    topic: "arithmetic",
    topicName: "Số nguyên & Đại số",
    title: "Quy tắc dấu ngoặc trong tập số nguyên",
    summary: "Quy tắc bỏ dấu ngoặc khi đằng trước có dấu cộng hoặc dấu trừ.",
    content: "Khi bỏ dấu ngoặc có dấu '+' đằng trước, ta giữ nguyên dấu của các số hạng trong ngoặc: +(a - b + c) = a - b + c.\nKhi bỏ dấu ngoặc có dấu '-' đằng trước, ta phải đổi dấu tất cả các số hạng trong ngoặc: dấu '+' thành dấu '-', dấu '-' thành dấu '+': -(a - b + c) = -a + b - c.",
    hypothesis: "Biểu thức có chứa dấu ngoặc đằng trước mang dấu '+' hoặc dấu '-'",
    conclusion: "+(a + b) = a + b; -(a + b) = -a - b; -(a - b) = -a + b",
    formula: "-(a - b + c) = -a + b - c",
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
  // LỚP 6 - HỌC KÌ 2: PHÂN SỐ & HÌNH HỌC PHẲNG
  // -------------------------------------------------------------
  {
    id: "toan6-hk2-tinh-chat-phan-so",
    grade: 6,
    semester: 2,
    topic: "arithmetic",
    topicName: "Phân số & Số thập phân",
    title: "Tính chất cơ bản của phân số",
    summary: "Nhân hoặc chia cả tử và mẫu với cùng một số nguyên khác 0 ta được phân số bằng phân số đã cho.",
    content: "Nếu nhân cả tử và mẫu của một phân số với cùng một số nguyên khác 0 thì ta được phân số bằng phân số đã cho.\nNếu chia cả tử và mẫu của một phân số cho cùng một ước chung của chúng thì ta được phân số bằng phân số đã cho.",
    hypothesis: "Phân số a/b với m, n ∈ Z, m ≠ 0, n là ước chung của a và b",
    conclusion: "a/b = (a * m)/(b * m) và a/b = (a : n)/(b : n)",
    formula: "\\frac{a}{b} = \\frac{a \\cdot m}{b \\cdot m} \\ (m \\neq 0), \\quad \\frac{a}{b} = \\frac{a : n}{b : n} \\ (n \\in \\text{ƯC}(a,b))",
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

  // -------------------------------------------------------------
  // LỚP 7 - HỌC KÌ 1: ĐẠI SỐ & HÌNH HỌC PHẲNG (CỰC KỲ QUAN TRỌNG)
  // -------------------------------------------------------------
  {
    id: "toan7-hk1-goc-doi-dinh",
    grade: 7,
    semester: 1,
    topic: "geometry",
    topicName: "Góc & Đường thẳng song song",
    title: "Định lý Hai góc đối đỉnh",
    summary: "Hai góc đối đỉnh thì bằng nhau.",
    content: "Hai góc đối đỉnh là hai góc mà mỗi cạnh của góc này là tia đối của một cạnh của góc kia.\nĐịnh lý: Hai góc đối đỉnh thì bằng nhau.",
    hypothesis: "Góc xOy và góc x'Oy' là hai góc đối đỉnh",
    conclusion: "xOy = x'Oy'",
    formula: "\\widehat{xOy} = \\widehat{x'Oy'}",
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
    keywords: ["180° - 90° = 90°", "hai góc nhọn phụ nhau", "tổng 3 góc"]
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
    title: "Các trường hợp bằng nhau của tam giác vuông",
    summary: "Cạnh huyền - góc nhọn, cạnh huyền - cạnh góc vuông và hai cạnh góc vuông.",
    content: "Các trường hợp đặc biệt cho tam giác vuông:\n1. Hai cạnh góc vuông (c.g.c suy rộng).\n2. Cạnh góc vuông - góc nhọn kề (g.c.g suy rộng).\n3. Cạnh huyền - góc nhọn: Nếu cạnh huyền và một góc nhọn của tam giác vuông này bằng cạnh huyền và một góc nhọn của tam giác vuông kia thì hai tam giác đó bằng nhau.\n4. Cạnh huyền - cạnh góc vuông: Nếu cạnh huyền và một cạnh góc vuông của tam giác vuông này bằng cạnh huyền và một cạnh góc vuông của tam giác vuông kia thì hai tam giác đó bằng nhau.",
    hypothesis: "ΔABC vuông tại A, ΔDEF vuông tại D",
    conclusion: "BC=EF, Â nhọn = D̂ nhọn ⇒ ΔABC = ΔDEF",
    formula: "\\text{Cạnh huyền - Góc nhọn}; \\quad \\text{Cạnh huyền - Cạnh góc vuông}",
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
  // LỚP 7 - HỌC KÌ 2: TỈ LỆ THỨC & QUAN HỆ TRONG TAM GIÁC
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
    title: "Bất đẳng thức tam giác",
    summary: "Trong một tam giác, tổng độ dài hai cạnh bất kì luôn lớn hơn độ dài cạnh còn lại.",
    content: "Định lý: Trong một tam giác, tổng độ dài hai cạnh bất kì bao giờ cũng lớn hơn độ dài cạnh còn lại.\nHệ quả: Hiệu độ dài hai cạnh bất kì bao giờ cũng nhỏ hơn độ dài cạnh còn lại.\nQuy tắc nhận biết: Ba đoạn thẳng có độ dài a, b, c lập thành tam giác khi: |b - c| < a < b + c.",
    hypothesis: "Tam giác ABC có ba cạnh a, b, c",
    conclusion: "b - c < a < b + c; a + b > c; a + c > b; b + c > a",
    formula: "|b - c| < a < b + c",
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
    content: "1. Ba đường trung tuyến đồng quy tại một điểm gọi là Trọng tâm (G). Trọng tâm cách mỗi đỉnh một khoảng bằng 2/3 độ dài đường trung tuyến đi qua đỉnh đó.\n2. Ba đường phân giác đồng quy tại một điểm, điểm này cách đều ba cạnh của tam giác.\n3. Ba đường trung trực đồng quy tại một điểm, điểm này cách đều ba đỉnh của tam giác.\n4. Ba đường cao đồng quy tại một điểm gọi là Trực tâm (H) của tam giác.",
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
