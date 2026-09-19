// =================================================================
// NGÂN HÀNG ĐỀ THI GIỮA KÌ & CUỐI KÌ TOÁN 6 - 7 (KẾT NỐI TRI THỨC VỚI CUỐI KÌ)
// Chuẩn ma trận đề kiểm tra của Bộ GD&ĐT: GK1, CK1, GK2, CK2 cho cả Lớp 6 và Lớp 7 (Tổng cộng 8 đề)
// Mỗi câu hỏi liên kết trực tiếp với Định lý tương ứng, có giải thích chi tiết & KaTeX
// =================================================================

const EXAMS_DATA = [
  // =============================================================
  // 1. TOÁN 6 - GIỮA HỌC KÌ 1 (GK1)
  // =============================================================
  {
    id: "exam-toan6-gk1",
    grade: 6,
    semester: 1,
    type: "midterm",
    title: "Đề thi Giữa Học Kì 1 - Toán 6 (Kết nối tri thức)",
    timeMinutes: 45,
    description: "Kiểm tra Dấu hiệu chia hết 2, 3, 5, 9, Phép tính lũy thừa, Số nguyên tố, Hình vuông, Tam giác đều, Hình thoi.",
    questions: [
      {
        id: "q6-gk1-1",
        question: "Số nào sau đây vừa chia hết cho 2 vừa chia hết cho 5?",
        options: ["124", "235", "540", "312"],
        correctIndex: 2,
        explanation: "Một số tự nhiên vừa chia hết cho 2 vừa chia hết cho 5 khi và chỉ khi có chữ số tận cùng là 0. Số 540 có chữ số tận cùng là 0 nên thỏa mãn.",
        relatedTheoremId: "toan6-hk1-chia-het-2-5",
        points: 1
      },
      {
        id: "q6-gk1-2",
        question: "Số \\(34*\\) chia hết cho 9 khi dấu * được thay bằng chữ số nào?",
        options: ["2", "5", "9", "0"],
        correctIndex: 0,
        explanation: "Tổng các chữ số: \\(3 + 4 + * = 7 + *\\). Để số đó chia hết cho 9 thì \\(7 + *\\) phải chia hết cho 9, suy ra \\(* = 2\\).",
        relatedTheoremId: "toan6-hk1-chia-het-3-9",
        points: 1
      },
      {
        id: "q6-gk1-3",
        question: "Kết quả của phép tính lũy thừa \\(2^3 \\cdot 2^2\\) là:",
        options: ["\\(2^6\\)", "\\(2^5 = 32\\)", "\\(4^5\\)", "\\(2^1 = 2\\)"],
        correctIndex: 1,
        explanation: "Áp dụng quy tắc nhân hai lũy thừa cùng cơ số: \\(a^m \\cdot a^n = a^{m+n}\\). Do đó \\(2^3 \\cdot 2^2 = 2^{3+2} = 2^5 = 32\\).",
        relatedTheoremId: "toan6-hk1-tap-hop-luy-thua",
        points: 1
      },
      {
        id: "q6-gk1-4",
        question: "Trong các số sau: 2, 9, 15, 21, số nào là số nguyên tố?",
        options: ["2", "9", "15", "21"],
        correctIndex: 0,
        explanation: "Số nguyên tố là số tự nhiên lớn hơn 1 chỉ có đúng 2 ước là 1 và chính nó. Số 2 là số nguyên tố (chẵn duy nhất). Các số 9, 15, 21 là hợp số.",
        relatedTheoremId: "toan6-hk1-uoc-va-boi",
        points: 1
      },
      {
        id: "q6-gk1-5",
        question: "Tam giác đều ABC có chu vi bằng 18cm. Độ dài mỗi cạnh của tam giác đó là:",
        options: ["3cm", "6cm", "9cm", "12cm"],
        correctIndex: 1,
        explanation: "Tam giác đều có 3 cạnh bằng nhau nên độ dài mỗi cạnh là: \\(18 : 3 = 6\\text{cm}\\).",
        relatedTheoremId: "toan6-hk1-hinh-vuong-tam-giac-deu",
        points: 1
      },
      {
        id: "q6-gk1-6",
        question: "Hình vuông có cạnh bằng 6cm thì chu vi và diện tích lần lượt là:",
        options: ["P = 24cm, S = 36cm²", "P = 36cm, S = 24cm²", "P = 12cm, S = 36cm²", "P = 24cm, S = 12cm²"],
        correctIndex: 0,
        explanation: "Chu vi hình vuông: \\(P = 4 \\cdot a = 4 \\cdot 6 = 24\\text{cm}\\). Diện tích hình vuông: \\(S = a^2 = 6^2 = 36\\text{cm}^2\\).",
        relatedTheoremId: "toan6-hk1-hinh-vuong-tam-giac-deu",
        points: 1
      },
      {
        id: "q6-gk1-7",
        question: "Một hình thoi có độ dài hai đường chéo là 8cm và 10cm. Diện tích hình thoi đó là:",
        options: ["80cm²", "40cm²", "36cm²", "20cm²"],
        correctIndex: 1,
        explanation: "Diện tích hình thoi bằng nửa tích hai đường chéo: \\(S = \\frac{1}{2} \\cdot d_1 \\cdot d_2 = \\frac{1}{2} \\cdot 8 \\cdot 10 = 40\\text{cm}^2\\).",
        relatedTheoremId: "toan6-hk1-hinh-thoi-hinh-binh-hanh",
        points: 1
      },
      {
        id: "q6-gk1-8",
        question: "ƯCLN của hai số 12 và 18 là:",
        options: ["3", "6", "12", "36"],
        correctIndex: 1,
        explanation: "Phân tích: \\(12 = 2^2 \\cdot 3\\); \\(18 = 2 \\cdot 3^2\\). Do đó \\(\\text{ƯCLN}(12, 18) = 2 \\cdot 3 = 6\\).",
        relatedTheoremId: "toan6-hk1-uoc-va-boi",
        points: 1
      }
    ]
  },

  // =============================================================
  // 2. TOÁN 6 - CUỐI HỌC KÌ 1 (CK1)
  // =============================================================
  {
    id: "exam-toan6-ck1",
    grade: 6,
    semester: 1,
    type: "final",
    title: "Đề thi Cuối Học Kì 1 - Toán 6 (Kết nối tri thức)",
    timeMinutes: 60,
    description: "Tổng hợp Số nguyên, Quy tắc dấu ngoặc, Bội & Ước số nguyên, Hình bình hành, Hình thoi và Thống kê trực quan.",
    questions: [
      {
        id: "q6-ck1-1",
        question: "Khẳng định nào sau đây về so sánh các số nguyên là ĐÚNG?",
        options: ["-15 > -8", "-20 < -12", "0 < -5", "-7 > 2"],
        correctIndex: 1,
        explanation: "Trên trục số nằm ngang, điểm -20 nằm bên trái điểm -12 nên \\(-20 < -12\\). Với hai số nguyên âm, số có giá trị tuyệt đối lớn hơn thì nhỏ hơn.",
        relatedTheoremId: "toan6-hk1-quy-tac-dau-ngoac",
        points: 1
      },
      {
        id: "q6-ck1-2",
        question: "Kết quả của phép tính bỏ dấu ngoặc: \\(- (15 - 28 + 7)\\) là:",
        options: ["-15 - 28 + 7", "-15 + 28 - 7", "15 - 28 + 7", "-15 + 28 + 7"],
        correctIndex: 1,
        explanation: "Khi bỏ dấu ngoặc có dấu '-' đằng trước, ta phải đổi dấu tất cả các số hạng trong ngoặc: \\(-(15 - 28 + 7) = -15 + 28 - 7\\).",
        relatedTheoremId: "toan6-hk1-quy-tac-dau-ngoac",
        points: 1
      },
      {
        id: "q6-ck1-3",
        question: "Kết quả của phép tính \\((-5) \\cdot (-8)\\) là:",
        options: ["-40", "40", "-13", "13"],
        correctIndex: 1,
        explanation: "Tích của hai số nguyên cùng dấu là một số nguyên dương: \\((-5) \\cdot (-8) = 5 \\cdot 8 = 40\\).",
        relatedTheoremId: "toan6-hk1-quy-tac-dau-ngoac",
        points: 1
      },
      {
        id: "q6-ck1-4",
        question: "Tập hợp tất cả các ước nguyên của số 6 là:",
        options: [
          "\\(\\{1, 2, 3, 6\\}\\)",
          "\\(\\{-6, -3, -2, -1, 1, 2, 3, 6\\}\\)",
          "\\(\\{-3, -2, -1, 0, 1, 2, 3\\}\\)",
          "\\(\\{1, 6\\}\\)"
        ],
        correctIndex: 1,
        explanation: "Các ước nguyên của 6 bao gồm cả các ước dương và các ước âm đối xứng: \\(\\{\\pm 1, \\pm 2, \\pm 3, \\pm 6\\}\\).",
        relatedTheoremId: "toan6-hk1-uoc-va-boi",
        points: 1
      },
      {
        id: "q6-ck1-5",
        question: "Một mảnh vườn hình bình hành có độ dài đáy là 12m và chiều cao tương ứng là 7m. Diện tích mảnh vườn đó là:",
        options: ["84m²", "42m²", "38m²", "19m²"],
        correctIndex: 0,
        explanation: "Diện tích hình bình hành bằng độ dài đáy nhân với chiều cao tương ứng: \\(S = a \\cdot h = 12 \\cdot 7 = 84\\text{m}^2\\).",
        relatedTheoremId: "toan6-hk1-hinh-thoi-hinh-binh-hanh",
        points: 1
      },
      {
        id: "q6-ck1-6",
        question: "Khẳng định nào sau đây là SAI đối với hình bình hành?",
        options: [
          "Các cạnh đối song song và bằng nhau",
          "Các góc đối bằng nhau",
          "Hai đường chéo vuông góc với nhau",
          "Hai đường chéo cắt nhau tại trung điểm của mỗi đường"
        ],
        correctIndex: 2,
        explanation: "Hai đường chéo vuông góc là tính chất đặc trưng của hình thoi hoặc hình vuông, hình bình hành tổng quát không có hai đường chéo vuông góc.",
        relatedTheoremId: "toan6-hk1-hinh-thoi-hinh-binh-hanh",
        points: 1
      },
      {
        id: "q6-ck1-7",
        question: "Nhiệt độ lúc 6 giờ sáng là -3°C, đến 12 giờ trưa nhiệt độ tăng thêm 8°C. Nhiệt độ lúc 12 giờ trưa là:",
        options: ["-11°C", "5°C", "-5°C", "11°C"],
        correctIndex: 1,
        explanation: "Nhiệt độ lúc 12 giờ trưa: \\(-3 + 8 = 5^\\circ\\text{C}\\).",
        relatedTheoremId: "toan6-hk1-quy-tac-dau-ngoac",
        points: 1
      },
      {
        id: "q6-ck1-8",
        question: "BCNN của hai số 8 và 12 là:",
        options: ["24", "48", "96", "4"],
        correctIndex: 0,
        explanation: "Phân tích: \\(8 = 2^3\\); \\(12 = 2^2 \\cdot 3\\). Do đó \\(\\text{BCNN}(8, 12) = 2^3 \\cdot 3 = 8 \\cdot 3 = 24\\).",
        relatedTheoremId: "toan6-hk1-uoc-va-boi",
        points: 1
      }
    ]
  },

  // =============================================================
  // 3. TOÁN 6 - GIỮA HỌC KÌ 2 (GK2)
  // =============================================================
  {
    id: "exam-toan6-gk2",
    grade: 6,
    semester: 2,
    type: "midterm",
    title: "Đề thi Giữa Học Kì 2 - Toán 6 (Kết nối tri thức)",
    timeMinutes: 45,
    description: "Kiểm tra Khái niệm phân số, Tính chất cơ bản phân số, So sánh và Phép tính phân số, Điểm nằm giữa, Trung điểm đoạn thẳng.",
    questions: [
      {
        id: "q6-gk2-1",
        question: "Cặp phân số nào sau đây bằng nhau?",
        options: [
          "\\(\\frac{-2}{3}\\) và \\(\\frac{4}{6}\\)",
          "\\(\\frac{3}{4}\\) và \\(\\frac{9}{12}\\)",
          "\\(\\frac{-1}{5}\\) và \\(\\frac{-2}{15}\\)",
          "\\(\\frac{2}{7}\\) và \\(\\frac{7}{2}\\)"
        ],
        correctIndex: 1,
        explanation: "Nhân cả tử và mẫu của \\(\\frac{3}{4}\\) với 3: \\(\\frac{3 \\cdot 3}{4 \\cdot 3} = \\frac{9}{12}\\). Hoặc tích chéo \\(3 \\cdot 12 = 4 \\cdot 9 = 36\\).",
        relatedTheoremId: "toan6-hk2-tinh-chat-phan-so",
        points: 1
      },
      {
        id: "q6-gk2-2",
        question: "Rút gọn phân số \\(\\frac{-18}{45}\\) về dạng phân số tối giản ta được:",
        options: ["\\(\\frac{-2}{5}\\)", "\\(\\frac{-6}{15}\\)", "\\(\\frac{-9}{20}\\)", "\\(\\frac{2}{5}\\)"],
        correctIndex: 0,
        explanation: "ƯCLN(18, 45) = 9. Chia cả tử và mẫu cho 9: \\(\\frac{-18 : 9}{45 : 9} = \\frac{-2}{5}\\).",
        relatedTheoremId: "toan6-hk2-tinh-chat-phan-so",
        points: 1
      },
      {
        id: "q6-gk2-3",
        question: "Kết quả của phép tính \\(\\frac{3}{7} + \\frac{2}{7}\\) là:",
        options: ["\\(\\frac{5}{14}\\)", "\\(\\frac{5}{7}\\)", "\\(\\frac{6}{7}\\)", "\\(\\frac{6}{49}\\)"],
        correctIndex: 1,
        explanation: "Cộng hai phân số cùng mẫu: \\(\\frac{3}{7} + \\frac{2}{7} = \\frac{3+2}{7} = \\frac{5}{7}\\).",
        relatedTheoremId: "toan6-hk2-tinh-chat-phan-so",
        points: 1
      },
      {
        id: "q6-gk2-4",
        question: "Kết quả của phép tính \\(\\frac{-2}{3} \\cdot \\frac{9}{4}\\) là:",
        options: ["\\(\\frac{-3}{2}\\)", "\\(\\frac{-18}{7}\\)", "\\(\\frac{3}{2}\\)", "\\(\\frac{-6}{12}\\)"],
        correctIndex: 0,
        explanation: "Nhân tử với tử, mẫu với mẫu rồi rút gọn: \\(\\frac{-2 \\cdot 9}{3 \\cdot 4} = \\frac{-18}{12} = \\frac{-3}{2}\\).",
        relatedTheoremId: "toan6-hk2-tinh-chat-phan-so",
        points: 1
      },
      {
        id: "q6-gk2-5",
        question: "Cho điểm B nằm giữa hai điểm A và C. Biết AB = 4cm, BC = 6cm. Độ dài đoạn thẳng AC là:",
        options: ["2cm", "8cm", "10cm", "24cm"],
        correctIndex: 2,
        explanation: "Vì B nằm giữa A và C nên \\(AC = AB + BC = 4 + 6 = 10\\text{cm}\\).",
        relatedTheoremId: "toan6-hk2-trung-diem-doan-thang",
        points: 1
      },
      {
        id: "q6-gk2-6",
        question: "Cho đoạn thẳng AB dài 12cm. Gọi M là trung điểm của AB. Độ dài đoạn thẳng AM là:",
        options: ["4cm", "6cm", "8cm", "12cm"],
        correctIndex: 1,
        explanation: "M là trung điểm của AB nên \\(AM = MB = \\frac{AB}{2} = \\frac{12}{2} = 6\\text{cm}\\).",
        relatedTheoremId: "toan6-hk2-trung-diem-doan-thang",
        points: 1
      },
      {
        id: "q6-gk2-7",
        question: "Nghịch đảo của phân số \\(-\\frac{5}{8}\\) là:",
        options: ["\\(\\frac{5}{8}\\)", "\\(-\\frac{8}{5}\\)", "\\(\\frac{8}{5}\\)", "\\(-\\frac{5}{8}\\)"],
        correctIndex: 1,
        explanation: "Phân số nghịch đảo của \\(\\frac{a}{b}\\) là \\(\\frac{b}{a}\\). Do đó nghịch đảo của \\(-\\frac{5}{8}\\) là \\(-\\frac{8}{5}\\).",
        relatedTheoremId: "toan6-hk2-tinh-chat-phan-so",
        points: 1
      },
      {
        id: "q6-gk2-8",
        question: "Có bao nhiêu đường thẳng đi qua hai điểm phân biệt A và B?",
        options: ["Vô số", "Chỉ có 1 đường thẳng duy nhất", "Có 2 đường thẳng", "Không có đường thẳng nào"],
        correctIndex: 1,
        explanation: "Qua hai điểm phân biệt cho trước, có một và chỉ một đường thẳng đi qua hai điểm đó.",
        relatedTheoremId: "toan6-hk2-trung-diem-doan-thang",
        points: 1
      }
    ]
  },

  // =============================================================
  // 4. TOÁN 6 - CUỐI HỌC KÌ 2 (CK2)
  // =============================================================
  {
    id: "exam-toan6-ck2",
    grade: 6,
    semester: 2,
    type: "final",
    title: "Đề thi Cuối Học Kì 2 - Toán 6 (Kết nối tri thức)",
    timeMinutes: 60,
    description: "Tổng hợp Số thập phân, Tỉ số phần trăm, Bài toán phân số thực tế, Góc và Xác suất thực nghiệm.",
    questions: [
      {
        id: "q6-ck2-1",
        question: "Tìm \\(\\frac{3}{5}\\) của 45kg ta được kết quả là:",
        options: ["27kg", "15kg", "75kg", "9kg"],
        correctIndex: 0,
        explanation: "Muốn tìm giá trị phân số của một số: \\(45 \\cdot \\frac{3}{5} = 27\\text{kg}\\).",
        relatedTheoremId: "toan6-hk2-so-thap-phan-ti-so",
        points: 1
      },
      {
        id: "q6-ck2-2",
        question: "Một lớp học có 40 học sinh, trong đó có 24 học sinh nữ. Tỉ số phần trăm của học sinh nữ so với cả lớp là:",
        options: ["40%", "60%", "24%", "50%"],
        correctIndex: 1,
        explanation: "Tỉ số phần trăm học sinh nữ: \\(\\frac{24}{40} \\cdot 100\\% = 0{,}6 \\cdot 100\\% = 60\\%\\).",
        relatedTheoremId: "toan6-hk2-so-thap-phan-ti-so",
        points: 1
      },
      {
        id: "q6-ck2-3",
        question: "Kết quả của phép tính số thập phân \\(12{,}5 - (-3{,}5)\\) là:",
        options: ["9", "16", "-16", "15"],
        correctIndex: 1,
        explanation: "Trừ đi một số âm là cộng với số đối: \\(12{,}5 - (-3{,}5) = 12{,}5 + 3{,}5 = 16\\).",
        relatedTheoremId: "toan6-hk2-so-thap-phan-ti-so",
        points: 1
      },
      {
        id: "q6-ck2-4",
        question: "Góc có số đo bằng \\(125^\\circ\\) thuộc loại góc nào?",
        options: ["Góc nhọn", "Góc vuông", "Góc tù", "Góc bẹt"],
        correctIndex: 2,
        explanation: "Vì \\(90^\\circ < 125^\\circ < 180^\\circ\\) nên góc này là góc tù.",
        relatedTheoremId: "toan6-hk2-goc-va-so-do-goc",
        points: 1
      },
      {
        id: "q6-ck2-5",
        question: "Góc bẹt có số đo bằng bao nhiêu độ?",
        options: ["\\(90^\\circ\\)", "\\(180^\\circ\\)", "\\(360^\\circ\\)", "\\(60^\\circ\\)"],
        correctIndex: 1,
        explanation: "Góc bẹt là góc tạo bởi hai tia đối nhau và có số đo luôn bằng \\(180^\\circ\\).",
        relatedTheoremId: "toan6-hk2-goc-va-so-do-goc",
        points: 1
      },
      {
        id: "q6-ck2-6",
        question: "Gieo một con xúc xắc 6 mặt 50 lần, thấy mặt 6 chấm xuất hiện 12 lần. Xác suất thực nghiệm xuất hiện mặt 6 chấm là:",
        options: ["\\(\\frac{12}{50} = 24\\%\\)", "\\(\\frac{6}{50} = 12\\%\\)", "\\(\\frac{1}{6}\\)", "\\(\\frac{38}{50} = 76\\%\\)"],
        correctIndex: 0,
        explanation: "Xác suất thực nghiệm bằng số lần biến cố xảy ra chia cho tổng số lần thử: \\(\\frac{12}{50} = 0{,}24 = 24\\%\\).",
        relatedTheoremId: "toan6-hk2-so-thap-phan-ti-so",
        points: 1
      },
      {
        id: "q6-ck2-7",
        question: "Biết \\(\\frac{2}{3}\\) độ dài quãng đường AB là 60km. Độ dài toàn bộ quãng đường AB là:",
        options: ["40km", "90km", "120km", "100km"],
        correctIndex: 1,
        explanation: "Tìm một số biết giá trị phân số của nó: \\(60 : \\frac{2}{3} = 60 \\cdot \\frac{3}{2} = 90\\text{km}\\).",
        relatedTheoremId: "toan6-hk2-so-thap-phan-ti-so",
        points: 1
      },
      {
        id: "q6-ck2-8",
        question: "Cho tia Oz nằm giữa hai tia Ox và Oy. Biết \\(\\widehat{xOz} = 40^\\circ\\) và \\(\\widehat{zOy} = 50^\\circ\\). Số đo của \\(\\widehat{xOy}\\) là:",
        options: ["\\(10^\\circ\\)", "\\(90^\\circ\\)", "\\(100^\\circ\\)", "\\(45^\\circ\\)"],
        correctIndex: 1,
        explanation: "Vì Oz nằm giữa Ox và Oy nên \\(\\widehat{xOy} = \\widehat{xOz} + \\widehat{zOy} = 40^\\circ + 50^\\circ = 90^\\circ\\) (góc vuông).",
        relatedTheoremId: "toan6-hk2-goc-va-so-do-goc",
        points: 1
      }
    ]
  },

  // =============================================================
  // 5. TOÁN 7 - GIỮA HỌC KÌ 1 (GK1)
  // =============================================================
  {
    id: "exam-toan7-gk1",
    grade: 7,
    semester: 1,
    type: "midterm",
    title: "Đề thi Giữa Học Kì 1 - Toán 7 (Kết nối tri thức)",
    timeMinutes: 45,
    description: "Kiểm tra Số hữu tỉ, Góc đối đỉnh, Hai đường thẳng song song, Tiên đề Euclid và Định lý hình học.",
    questions: [
      {
        id: "q7-gk1-1",
        question: "Cho hai đường thẳng xx' và yy' cắt nhau tại O. Biết \\(\\widehat{xOy} = 50^\\circ\\). Số đo của góc đối đỉnh \\(\\widehat{x'Oy'}\\) là:",
        options: ["\\(50^\\circ\\)", "\\(130^\\circ\\)", "\\(180^\\circ\\)", "\\(40^\\circ\\)"],
        correctIndex: 0,
        explanation: "Theo định lý: Hai góc đối đỉnh thì bằng nhau. Do đó \\(\\widehat{x'Oy'} = \\widehat{xOy} = 50^\\circ\\).",
        relatedTheoremId: "toan7-hk1-goc-doi-dinh",
        points: 1
      },
      {
        id: "q7-gk1-2",
        question: "Đường thẳng c cắt hai đường thẳng a và b. Điều kiện nào sau đây KHÔNG suy ra được a // b?",
        options: [
          "Một cặp góc so le trong bằng nhau",
          "Một cặp góc đồng vị bằng nhau",
          "Một cặp góc trong cùng phía bằng nhau",
          "Một cặp góc trong cùng phía bù nhau (tổng bằng 180°)"
        ],
        correctIndex: 2,
        explanation: "Dấu hiệu nhận biết hai đường thẳng song song: Hai góc trong cùng phía phải BÙ NHAU (tổng bằng 180°), chứ không phải bằng nhau.",
        relatedTheoremId: "toan7-hk1-song-song-dau-hieu",
        points: 1
      },
      {
        id: "q7-gk1-3",
        question: "Qua một điểm M nằm ngoài đường thẳng a, có bao nhiêu đường thẳng song song với đường thẳng a?",
        options: ["Vô số", "Chỉ có 1 đường thẳng duy nhất", "Có đúng 2 đường thẳng", "Không có đường thẳng nào"],
        correctIndex: 1,
        explanation: "Theo Tiên đề Euclid: Qua một điểm ở ngoài một đường thẳng, chỉ có MỘT đường thẳng song song với đường thẳng đó.",
        relatedTheoremId: "toan7-hk1-tien-de-euclid",
        points: 1
      },
      {
        id: "q7-gk1-4",
        question: "Biết đường thẳng a // b và đường thẳng c ⊥ a. Khi đó quan hệ giữa c và b là:",
        options: ["c // b", "c ⊥ b", "c trùng với b", "c chéo b"],
        correctIndex: 1,
        explanation: "Theo hệ quả tiên đề Euclid (từ vuông góc đến song song): Một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng kia.",
        relatedTheoremId: "toan7-hk1-tien-de-euclid",
        points: 1
      },
      {
        id: "q7-gk1-5",
        question: "Cho hai góc \\(\\widehat{xOy}\\) và \\(\\widehat{yOz}\\) kề bù nhau. Biết \\(\\widehat{xOy} = 70^\\circ\\). Số đo của \\(\\widehat{yOz}\\) là:",
        options: ["\\(110^\\circ\\)", "\\(20^\\circ\\)", "\\(70^\\circ\\)", "\\(90^\\circ\\)"],
        correctIndex: 0,
        explanation: "Hai góc kề bù có tổng số đo bằng 180°: \\(\\widehat{yOz} = 180^\\circ - 70^\\circ = 110^\\circ\\).",
        relatedTheoremId: "toan7-hk1-goc-doi-dinh",
        points: 1
      },
      {
        id: "q7-gk1-6",
        question: "Số hữu tỉ nào sau đây là số đối của phân số \\(-\\frac{4}{9}\\)?",
        options: ["\\(\\frac{4}{9}\\)", "\\(-\\frac{9}{4}\\)", "\\(\\frac{9}{4}\\)", "\\(-\\frac{4}{-9}\\)"],
        correctIndex: 0,
        explanation: "Số đối của \\(-a\\) là \\(a\\). Do đó số đối của \\(-\\frac{4}{9}\\) là \\(\\frac{4}{9}\\).",
        relatedTheoremId: "toan7-hk1-so-huu-ti-so-thuc",
        points: 1
      },
      {
        id: "q7-gk1-7",
        question: "Kết quả của phép tính lũy thừa \\(\\left(-\\frac{1}{2}\\right)^3\\) là:",
        options: ["\\(-\\frac{1}{6}\\)", "\\(\\frac{1}{8}\\)", "\\(-\\frac{1}{8}\\)", "\\(\\frac{1}{6}\\)"],
        correctIndex: 2,
        explanation: "Lũy thừa bậc lẻ của số âm là một số âm: \\(\\left(-\\frac{1}{2}\\right)^3 = \\frac{(-1)^3}{2^3} = -\\frac{1}{8}\\).",
        relatedTheoremId: "toan7-hk1-so-huu-ti-so-thuc",
        points: 1
      },
      {
        id: "q7-gk1-8",
        question: "Tia Ot là tia phân giác của góc \\(\\widehat{xOy} = 80^\\circ\\). Số đo của góc \\(\\widehat{xOt}\\) là:",
        options: ["\\(40^\\circ\\)", "\\(160^\\circ\\)", "\\(80^\\circ\\)", "\\(20^\\circ\\)"],
        correctIndex: 0,
        explanation: "Tia phân giác chia góc thành hai góc bằng nhau: \\(\\widehat{xOt} = \\frac{\\widehat{xOy}}{2} = \\frac{80^\\circ}{2} = 40^\\circ\\).",
        relatedTheoremId: "toan7-hk1-goc-doi-dinh",
        points: 1
      },
      {
        id: "q7-gk1-9",
        question: "Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba thì:",
        options: ["Chúng vuông góc với nhau", "Chúng cắt nhau", "Chúng song song với nhau", "Chúng trùng nhau"],
        correctIndex: 2,
        explanation: "Theo tiên đề Euclid và tính chất ba đường thẳng song song: Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba thì song song với nhau.",
        relatedTheoremId: "toan7-hk1-tien-de-euclid",
        points: 1
      },
      {
        id: "q7-gk1-10",
        question: "Tìm x biết: \\(x - \\frac{1}{3} = \\frac{2}{3}\\):",
        options: ["x = 1", "x = 1/3", "x = -1/3", "x = 0"],
        correctIndex: 0,
        explanation: "Áp dụng quy tắc chuyển vế: \\(x = \\frac{2}{3} + \\frac{1}{3} = \\frac{3}{3} = 1\\).",
        relatedTheoremId: "toan7-hk1-so-huu-ti-so-thuc",
        points: 1
      }
    ]
  },

  // =============================================================
  // 6. TOÁN 7 - CUỐI HỌC KÌ 1 (CK1)
  // =============================================================
  {
    id: "exam-toan7-ck1",
    grade: 7,
    semester: 1,
    type: "final",
    title: "Đề thi Cuối Học Kì 1 - Toán 7 (Kết nối tri thức)",
    timeMinutes: 60,
    description: "Tổng hợp Số thực, Căn bậc hai, Tổng ba góc tam giác, Ba trường hợp bằng nhau tam giác và Tam giác cân.",
    questions: [
      {
        id: "q7-ck1-1",
        question: "Căn bậc hai số học của 49 là:",
        options: ["7", "-7", "±7", "2401"],
        correctIndex: 0,
        explanation: "Căn bậc hai số học của số không âm a là số KHÔNG ÂM x sao cho x² = a. Do đó \\(\\sqrt{49} = 7\\).",
        relatedTheoremId: "toan7-hk1-so-huu-ti-so-thuc",
        points: 1
      },
      {
        id: "q7-ck1-2",
        question: "Giá trị của \\(|-3{,}8|\\) là:",
        options: ["-3,8", "3,8", "±3,8", "0"],
        correctIndex: 1,
        explanation: "Giá trị tuyệt đối của một số luôn không âm: \\(|-3{,}8| = 3{,}8\\).",
        relatedTheoremId: "toan7-hk1-so-huu-ti-so-thuc",
        points: 1
      },
      {
        id: "q7-ck1-3",
        question: "Cho tam giác ABC có \\(\\widehat{A} = 60^\\circ\\), \\(\\widehat{B} = 75^\\circ\\). Số đo của góc \\(\\widehat{C}\\) là:",
        options: ["\\(35^\\circ\\)", "\\(45^\\circ\\)", "\\(55^\\circ\\)", "\\(65^\\circ\\)"],
        correctIndex: 1,
        explanation: "Tổng 3 góc trong tam giác bằng 180°: \\(\\widehat{C} = 180^\\circ - (60^\\circ + 75^\\circ) = 45^\\circ\\).",
        relatedTheoremId: "toan7-hk1-tong-ba-goc-tam-giac",
        points: 1
      },
      {
        id: "q7-ck1-4",
        question: "Góc ngoài tại đỉnh A của tam giác ABC bằng 120°. Biết \\(\\widehat{B} = 50^\\circ\\). Số đo góc \\(\\widehat{C}\\) là:",
        options: ["\\(70^\\circ\\)", "\\(60^\\circ\\)", "\\(170^\\circ\\)", "\\(50^\\circ\\)"],
        correctIndex: 0,
        explanation: "Góc ngoài của tam giác bằng tổng hai góc trong không kề: \\(\\widehat{A}_{ngoai} = \\widehat{B} + \\widehat{C} \\implies 120^\\circ = 50^\\circ + \\widehat{C} \\implies \\widehat{C} = 70^\\circ\\).",
        relatedTheoremId: "toan7-hk1-tong-ba-goc-tam-giac",
        points: 1
      },
      {
        id: "q7-ck1-5",
        question: "Cho \\(\\Delta ABC = \\Delta MNP\\). Khẳng định nào sau đây là SAI?",
        options: ["AB = MN", "BC = NP", "\\(\\widehat{A} = \\widehat{M}\\)", "AC = NP"],
        correctIndex: 3,
        explanation: "Vì \\(\\Delta ABC = \\Delta MNP\\), các cạnh tương ứng là AB = MN, BC = NP, AC = MP. Do đó AC = NP là sai.",
        relatedTheoremId: "toan7-hk1-tam-giac-bang-nhau-3-truong-hop",
        points: 1
      },
      {
        id: "q7-ck1-6",
        question: "Để \\(\\Delta ABC = \\Delta DEF\\) theo trường hợp Cạnh - Góc - Cạnh (c-g-c) khi đã có AB = DE, BC = EF, cần thêm điều kiện gì?",
        options: ["\\(\\widehat{A} = \\widehat{D}\\)", "\\(\\widehat{B} = \\widehat{E}\\)", "\\(\\widehat{C} = \\widehat{F}\\)", "AC = DF"],
        correctIndex: 1,
        explanation: "Góc xen giữa AB và BC là góc B; góc xen giữa DE và EF là góc E. Do đó cần \\(\\widehat{B} = \\widehat{E}\\).",
        relatedTheoremId: "toan7-hk1-tam-giac-bang-nhau-3-truong-hop",
        points: 1
      },
      {
        id: "q7-ck1-7",
        question: "Hai tam giác vuông bằng nhau theo trường hợp 'Cạnh huyền - Cạnh góc vuông' khi:",
        options: [
          "Hai cạnh góc vuông bằng nhau",
          "Cạnh huyền và một góc nhọn bằng nhau",
          "Cạnh huyền và một cạnh góc vuông của tam giác này bằng cạnh huyền và một cạnh góc vuông của tam giác kia",
          "Ba cạnh bằng nhau"
        ],
        correctIndex: 2,
        explanation: "Định lý tam giác vuông: Cạnh huyền và một cạnh góc vuông của tam giác này tương ứng bằng cạnh huyền và cạnh góc vuông của tam giác kia.",
        relatedTheoremId: "toan7-hk1-tam-giac-vuong-bang-nhau",
        points: 1
      },
      {
        id: "q7-ck1-8",
        question: "Cho tam giác ABC cân tại A có \\(\\widehat{A} = 50^\\circ\\). Số đo của mỗi góc ở đáy (góc B và góc C) là:",
        options: ["\\(65^\\circ\\)", "\\(50^\\circ\\)", "\\(130^\\circ\\)", "\\(60^\\circ\\)"],
        correctIndex: 0,
        explanation: "Tam giác cân có hai góc ở đáy bằng nhau: \\(\\widehat{B} = \\widehat{C} = \\frac{180^\\circ - \\widehat{A}}{2} = \\frac{180^\\circ - 50^\\circ}{2} = 65^\\circ\\).",
        relatedTheoremId: "toan7-hk1-tam-giac-vuong-bang-nhau",
        points: 1
      },
      {
        id: "q7-ck1-9",
        question: "Đường thẳng d là đường trung trực của đoạn thẳng AB khi:",
        options: [
          "d vuông góc với AB",
          "d đi qua trung điểm của AB",
          "d vuông góc với AB tại trung điểm của AB",
          "d song song với AB"
        ],
        correctIndex: 2,
        explanation: "Đường trung trực của đoạn thẳng là đường thẳng vuông góc với đoạn thẳng tại trung điểm của đoạn thẳng đó.",
        relatedTheoremId: "toan7-hk1-tam-giac-vuong-bang-nhau",
        points: 1
      },
      {
        id: "q7-ck1-10",
        question: "Trong tam giác vuông, tổng số đo của hai góc nhọn bằng bao nhiêu độ?",
        options: ["\\(180^\\circ\\)", "\\(90^\\circ\\)", "\\(60^\\circ\\)", "\\(45^\\circ\\)"],
        correctIndex: 1,
        explanation: "Tổng ba góc là 180° mà góc vuông là 90° nên hai góc nhọn phụ nhau, có tổng bằng 90°.",
        relatedTheoremId: "toan7-hk1-tong-ba-goc-tam-giac",
        points: 1
      }
    ]
  },

  // =============================================================
  // 7. TOÁN 7 - GIỮA HỌC KÌ 2 (GK2)
  // =============================================================
  {
    id: "exam-toan7-gk2",
    grade: 7,
    semester: 2,
    type: "midterm",
    title: "Đề thi Giữa Học Kì 2 - Toán 7 (Kết nối tri thức)",
    timeMinutes: 45,
    description: "Kiểm tra Tỉ lệ thức, Đại lượng tỉ lệ thuận/nghịch, Đa thức một biến, Quan hệ giữa góc và cạnh đối diện, Bất đẳng thức tam giác.",
    questions: [
      {
        id: "q7-gk2-1",
        question: "Tìm giá trị của x trong tỉ lệ thức \\(\\frac{x}{6} = \\frac{4}{3}\\):",
        options: ["x = 8", "x = 2", "x = 12", "x = 6"],
        correctIndex: 0,
        explanation: "Tích ngoại tỉ bằng tích trung tỉ: \\(x \\cdot 3 = 6 \\cdot 4 = 24 \\implies x = 24 : 3 = 8\\).",
        relatedTheoremId: "toan7-hk2-ti-le-thuc-day-ti-so",
        points: 1
      },
      {
        id: "q7-gk2-2",
        question: "Từ tỉ lệ thức \\(\\frac{x}{3} = \\frac{y}{5}\\) và \\(x + y = 24\\), giá trị của x và y lần lượt là:",
        options: ["x = 9, y = 15", "x = 10, y = 14", "x = 6, y = 18", "x = 8, y = 16"],
        correctIndex: 0,
        explanation: "Áp dụng dãy tỉ số bằng nhau: \\(\\frac{x}{3} = \\frac{y}{5} = \\frac{x+y}{3+5} = \\frac{24}{8} = 3\\). Do đó \\(x = 3 \\cdot 3 = 9\\), \\(y = 3 \\cdot 5 = 15\\).",
        relatedTheoremId: "toan7-hk2-ti-le-thuc-day-ti-so",
        points: 1
      },
      {
        id: "q7-gk2-3",
        question: "Biết đại lượng y tỉ lệ thuận với đại lượng x theo hệ số tỉ lệ k = 3. Khi x = 4 thì y bằng:",
        options: ["12", "7", "4/3", "3/4"],
        correctIndex: 0,
        explanation: "Công thức tỉ lệ thuận: \\(y = kx = 3 \\cdot 4 = 12\\).",
        relatedTheoremId: "toan7-hk2-ti-le-thuc-day-ti-so",
        points: 1
      },
      {
        id: "q7-gk2-4",
        question: "Bậc của đa thức \\(P(x) = 5x^4 - 3x^2 + 7x - 9\\) là:",
        options: ["4", "3", "2", "9"],
        correctIndex: 0,
        explanation: "Bậc của đa thức một biến là số mũ cao nhất của biến trong đa thức đã thu gọn. Ở đây số mũ lớn nhất là 4.",
        relatedTheoremId: "toan7-hk2-bieu-thuc-da-thuc-mot-bien",
        points: 1
      },
      {
        id: "q7-gk2-5",
        question: "Số nào sau đây là nghiệm của đa thức \\(A(x) = 2x - 6\\)?",
        options: ["x = 3", "x = -3", "x = 6", "x = 0"],
        correctIndex: 0,
        explanation: "Thay \\(x = 3\\) vào: \\(A(3) = 2(3) - 6 = 6 - 6 = 0\\). Do đó \\(x = 3\\) là nghiệm.",
        relatedTheoremId: "toan7-hk2-bieu-thuc-da-thuc-mot-bien",
        points: 1
      },
      {
        id: "q7-gk2-6",
        question: "Cho tam giác ABC có AB = 5cm, BC = 8cm, AC = 7cm. Thứ tự sắp xếp các góc từ bé đến lớn là:",
        options: [
          "\\(\\widehat{A} < \\widehat{B} < \\widehat{C}\\)",
          "\\(\\widehat{C} < \\widehat{B} < \\widehat{A}\\)",
          "\\(\\widehat{C} < \\widehat{A} < \\widehat{B}\\)",
          "\\(\\widehat{B} < \\widehat{C} < \\widehat{A}\\)"
        ],
        correctIndex: 1,
        explanation: "Ta có AB < AC < BC (5 < 7 < 8). Theo định lý quan hệ giữa cạnh và góc đối diện: cạnh nhỏ hơn đối diện góc nhỏ hơn, suy ra \\(\\widehat{C} < \\widehat{B} < \\widehat{A}\\).",
        relatedTheoremId: "toan7-hk2-quan-he-goc-va-canh-doi-dien",
        points: 1
      },
      {
        id: "q7-gk2-7",
        question: "Bộ ba độ dài đoạn thẳng nào sau đây CÓ THỂ là ba cạnh của một tam giác?",
        options: ["2cm, 3cm, 6cm", "3cm, 4cm, 7cm", "4cm, 5cm, 8cm", "1cm, 2cm, 4cm"],
        correctIndex: 2,
        explanation: "Theo bất đẳng thức tam giác: 4 + 5 = 9 > 8 (thỏa mãn tổng hai cạnh lớn hơn cạnh thứ ba). Các trường hợp khác: 2+3=5<6 (loại), 3+4=7=7 (loại), 1+2=3<4 (loại).",
        relatedTheoremId: "toan7-hk2-bat-dang-thuc-tam-giac",
        points: 1
      },
      {
        id: "q7-gk2-8",
        question: "Trong tam giác tù, cạnh có độ dài lớn nhất là:",
        options: ["Cạnh kề góc tù", "Cạnh đối diện góc tù", "Không xác định được", "Cạnh nhỏ nhất"],
        correctIndex: 1,
        explanation: "Vì góc tù là góc lớn nhất trong tam giác (> 90°), theo quan hệ góc - cạnh đối diện thì cạnh đối diện với góc tù luôn lớn nhất.",
        relatedTheoremId: "toan7-hk2-quan-he-goc-va-canh-doi-dien",
        points: 1
      },
      {
        id: "q7-gk2-9",
        question: "Hệ số cao nhất và hệ số tự do của đa thức \\(Q(x) = -4x^3 + 2x^2 - 5x + 7\\) lần lượt là:",
        options: ["-4 và 7", "4 và 7", "-4 và -5", "3 và 7"],
        correctIndex: 0,
        explanation: "Hệ số của lũy thừa bậc cao nhất (x³) là -4. Hệ số tự do (không chứa x) là 7.",
        relatedTheoremId: "toan7-hk2-bieu-thuc-da-thuc-mot-bien",
        points: 1
      },
      {
        id: "q7-gk2-10",
        question: "Cho điểm A nằm ngoài đường thẳng d. Kẻ AH vuông góc với d tại H và AM là đường xiên bất kì nối A với d (M ≠ H). Khẳng định nào đúng?",
        options: ["AH > AM", "AH < AM", "AH = AM", "AH ≥ AM"],
        correctIndex: 1,
        explanation: "Trong các đường vuông góc và đường xiên kẻ từ một điểm nằm ngoài một đường thẳng đến đường thẳng đó, đường vuông góc là đường ngắn nhất (AH < AM).",
        relatedTheoremId: "toan7-hk2-bat-dang-thuc-tam-giac",
        points: 1
      }
    ]
  },

  // =============================================================
  // 8. TOÁN 7 - CUỐI HỌC KÌ 2 (CK2)
  // =============================================================
  {
    id: "exam-toan7-ck2",
    grade: 7,
    semester: 2,
    type: "final",
    title: "Đề thi Cuối Học Kì 2 - Toán 7 (Kết nối tri thức)",
    timeMinutes: 60,
    description: "Tổng hợp toàn bộ Đa thức một biến, Các đường đồng quy trong tam giác, Hình hộp chữ nhật, Lăng trụ đứng và Xác suất biến cố.",
    questions: [
      {
        id: "q7-ck2-1",
        question: "Cho hai đa thức \\(P(x) = 3x^2 - 2x + 1\\) và \\(Q(x) = x^2 + 2x - 5\\). Đa thức \\(P(x) + Q(x)\\) là:",
        options: ["\\(4x^2 - 4\\)", "\\(4x^2 + 4x - 4\\)", "\\(2x^2 - 4\\)", "\\(4x^2 - 6\\)"],
        correctIndex: 0,
        explanation: "\\(P(x) + Q(x) = (3x^2 + x^2) + (-2x + 2x) + (1 - 5) = 4x^2 + 0x - 4 = 4x^2 - 4\\).",
        relatedTheoremId: "toan7-hk2-bieu-thuc-da-thuc-mot-bien",
        points: 1
      },
      {
        id: "q7-ck2-2",
        question: "Ba đường trung tuyến của tam giác đồng quy tại một điểm gọi là:",
        options: ["Trực tâm", "Trọng tâm", "Tâm đường tròn ngoại tiếp", "Tâm đường tròn nội tiếp"],
        correctIndex: 1,
        explanation: "Ba đường trung tuyến của một tam giác cùng đi qua một điểm, điểm đó gọi là TRỌNG TÂM của tam giác.",
        relatedTheoremId: "toan7-hk2-su-dong-quy-cac-duong",
        points: 1
      },
      {
        id: "q7-ck2-3",
        question: "Gọi G là trọng tâm của tam giác ABC với đường trung tuyến AM. Khẳng định nào sau đây là ĐÚNG?",
        options: ["AG = 1/2 AM", "AG = 2/3 AM", "AG = 3/4 AM", "GM = 2/3 AM"],
        correctIndex: 1,
        explanation: "Theo tính chất ba đường trung tuyến: Trọng tâm cách mỗi đỉnh một khoảng bằng 2/3 độ dài đường trung tuyến đi qua đỉnh đó (AG = 2/3 AM).",
        relatedTheoremId: "toan7-hk2-su-dong-quy-cac-duong",
        points: 1
      },
      {
        id: "q7-ck2-4",
        question: "Giao điểm của ba đường phân giác trong tam giác có tính chất gì?",
        options: [
          "Cách đều ba đỉnh của tam giác",
          "Cách đều ba cạnh của tam giác",
          "Là trực tâm của tam giác",
          "Cách mỗi đỉnh 2/3 độ dài đường phân giác"
        ],
        correctIndex: 1,
        explanation: "Giao điểm của ba đường phân giác cách đều ba cạnh của tam giác (chính là tâm đường tròn nội tiếp tam giác).",
        relatedTheoremId: "toan7-hk2-su-dong-quy-cac-duong",
        points: 1
      },
      {
        id: "q7-ck2-5",
        question: "Giao điểm của ba đường trung trực trong tam giác có tính chất gì?",
        options: [
          "Cách đều ba đỉnh của tam giác",
          "Cách đều ba cạnh của tam giác",
          "Là trọng tâm",
          "Chia đường trung trực theo tỉ lệ 2:1"
        ],
        correctIndex: 0,
        explanation: "Giao điểm của ba đường trung trực cách đều ba đỉnh của tam giác (chính là tâm đường tròn ngoại tiếp tam giác).",
        relatedTheoremId: "toan7-hk2-su-dong-quy-cac-duong",
        points: 1
      },
      {
        id: "q7-ck2-6",
        question: "Ba đường cao của tam giác cùng đi qua một điểm gọi là:",
        options: ["Trực tâm", "Trọng tâm", "Tâm nội tiếp", "Tâm ngoại tiếp"],
        correctIndex: 0,
        explanation: "Ba đường cao của tam giác đồng quy tại một điểm, điểm đó gọi là TRỰC TÂM của tam giác.",
        relatedTheoremId: "toan7-hk2-su-dong-quy-cac-duong",
        points: 1
      },
      {
        id: "q7-ck2-7",
        question: "Một hình hộp chữ nhật có ba kích thước dài 6cm, rộng 4cm, cao 5cm. Thể tích hình hộp chữ nhật đó là:",
        options: ["120cm³", "60cm³", "74cm³", "148cm³"],
        correctIndex: 0,
        explanation: "Thể tích hình hộp chữ nhật: \\(V = a \\cdot b \\cdot c = 6 \\cdot 4 \\cdot 5 = 120\\text{cm}^3\\).",
        relatedTheoremId: "toan7-hk2-su-dong-quy-cac-duong",
        points: 1
      },
      {
        id: "q7-ck2-8",
        question: "Tìm độ dài cạnh x (với x là số nguyên) của tam giác có hai cạnh là 3cm và 7cm:",
        options: [
          "x có thể bằng 4cm",
          "4 < x < 10 (x ∈ {5, 6, 7, 8, 9})",
          "x có thể bằng 10cm",
          "x = 3cm"
        ],
        correctIndex: 1,
        explanation: "Theo hệ quả bất đẳng thức tam giác: \\(7 - 3 < x < 7 + 3 \\iff 4 < x < 10\\). Vì x nguyên nên \\(x \\in \\{5, 6, 7, 8, 9\\}\\).",
        relatedTheoremId: "toan7-hk2-bat-dang-thuc-tam-giac",
        points: 1
      },
      {
        id: "q7-ck2-9",
        question: "Gieo một con xúc xắc cân đối 6 mặt. Xác suất để xuất hiện mặt có số chấm là số chẵn (2, 4, 6) là:",
        options: ["\\(\\frac{1}{2}\\)", "\\(\\frac{1}{6}\\)", "\\(\\frac{1}{3}\\)", "\\(\\frac{2}{3}\\)"],
        correctIndex: 0,
        explanation: "Có 3 kết quả thuận lợi (2, 4, 6) trên tổng số 6 kết quả có thể xảy ra: \\(P = \\frac{3}{6} = \\frac{1}{2}\\).",
        relatedTheoremId: "toan7-hk2-bieu-thuc-da-thuc-mot-bien",
        points: 1
      },
      {
        id: "q7-ck2-10",
        question: "Một hình lập phương có cạnh bằng 4cm thì diện tích toàn phần của nó là:",
        options: ["96cm²", "64cm²", "16cm²", "24cm²"],
        correctIndex: 0,
        explanation: "Hình lập phương có 6 mặt vuông bằng nhau: \\(S_{tp} = 6 \\cdot a^2 = 6 \\cdot 4^2 = 6 \\cdot 16 = 96\\text{cm}^2\\).",
        relatedTheoremId: "toan7-hk2-su-dong-quy-cac-duong",
        points: 1
      }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { EXAMS_DATA };
}
