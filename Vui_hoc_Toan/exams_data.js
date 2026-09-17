// =================================================================
// NGÂN HÀNG ĐỀ THI GIỮA KÌ & CUỐI KÌ TOÁN 6 - 7 (KẾT NỐI TRI THỨC)
// Thiết kế chuẩn ma trận đề kiểm tra: Trắc nghiệm + Điền khuyết/Tự luận ngắn
// Mỗi câu hỏi đều liên kết trực tiếp với ID của định lý tương ứng!
// =================================================================

const EXAMS_DATA = [
  // -------------------------------------------------------------
  // ĐỀ 1: TOÁN 7 - GIỮA HỌC KÌ 1 (HK1)
  // -------------------------------------------------------------
  {
    id: "exam-toan7-gk1",
    grade: 7,
    semester: 1,
    type: "midterm",
    title: "Đề thi Giữa Học Kì 1 - Toán 7 (Kết nối tri thức)",
    timeMinutes: 45,
    description: "Kiểm tra kiến thức Số hữu tỉ, Góc đối đỉnh, Hai đường thẳng song song và Tiên đề Euclid.",
    questions: [
      {
        id: "q7-gk1-1",
        question: "Cho hình vẽ hai đường thẳng xx' và yy' cắt nhau tại O. Biết \\(\\widehat{xOy} = 50^\\circ\\). Số đo của góc \\(\\widehat{x'Oy'}\\) đối đỉnh với nó là:",
        options: ["\\(50^\\circ\\)", "\\(130^\\circ\\)", "\\(180^\\circ\\)", "\\(40^\\circ\\)"],
        correctIndex: 0,
        explanation: "Theo định lý: Hai góc đối đỉnh thì bằng nhau. Do \\(\\widehat{x'Oy'}\\) đối đỉnh với \\(\\widehat{xOy}\\) nên \\(\\widehat{x'Oy'} = \\widehat{xOy} = 50^\\circ\\).",
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
        explanation: "Theo hệ quả tiên đề Euclid: Một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng kia (từ vuông góc đến song song).",
        relatedTheoremId: "toan7-hk1-tien-de-euclid",
        points: 1
      },
      {
        id: "q7-gk1-5",
        question: "Cho tam giác ABC có \\(\\widehat{A} = 60^\\circ\\), \\(\\widehat{B} = 75^\\circ\\). Số đo của góc \\(\\widehat{C}\\) là:",
        options: ["\\(35^\\circ\\)", "\\(45^\\circ\\)", "\\(55^\\circ\\)", "\\(65^\\circ\\)"],
        correctIndex: 1,
        explanation: "Theo định lý tổng ba góc trong tam giác: \\(\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ\\). Suy ra \\(\\widehat{C} = 180^\\circ - (60^\\circ + 75^\\circ) = 45^\\circ\\).",
        relatedTheoremId: "toan7-hk1-tong-ba-goc-tam-giac",
        points: 1
      },
      {
        id: "q7-gk1-6",
        question: "Góc ngoài tại đỉnh A của tam giác ABC có số đo bằng 120°. Biết \\(\\widehat{B} = 50^\\circ\\). Số đo góc \\(\\widehat{C}\\) là:",
        options: ["\\(70^\\circ\\)", "\\(60^\\circ\\)", "\\(170^\\circ\\)", "\\(50^\\circ\\)"],
        correctIndex: 0,
        explanation: "Theo định lý góc ngoài: Góc ngoài của tam giác bằng tổng hai góc trong không kề với nó: \\(\\widehat{A}_{ngoai} = \\widehat{B} + \\widehat{C} \\implies 120^\\circ = 50^\\circ + \\widehat{C} \\implies \\widehat{C} = 70^\\circ\\).",
        relatedTheoremId: "toan7-hk1-tong-ba-goc-tam-giac",
        points: 1
      },
      {
        id: "q7-gk1-7",
        question: "Cho \\(\\Delta ABC = \\Delta MNP\\). Khẳng định nào sau đây là SAI?",
        options: ["AB = MN", "BC = NP", "\\(\\widehat{A} = \\widehat{M}\\)", "AC = NP"],
        correctIndex: 3,
        explanation: "Vì \\(\\Delta ABC = \\Delta MNP\\), các cạnh tương ứng bằng nhau là AB = MN, BC = NP, AC = MP. Do đó khẳng định AC = NP là sai.",
        relatedTheoremId: "toan7-hk1-tam-giac-bang-nhau-3-truong-hop",
        points: 1
      },
      {
        id: "q7-gk1-8",
        question: "Để \\(\\Delta ABC = \\Delta DEF\\) theo trường hợp Cạnh - Góc - Cạnh (c-g-c) khi đã có AB = DE, BC = EF, cần thêm điều kiện gì?",
        options: ["\\(\\widehat{A} = \\widehat{D}\\)", "\\(\\widehat{B} = \\widehat{E}\\)", "\\(\\widehat{C} = \\widehat{F}\\)", "AC = DF"],
        correctIndex: 1,
        explanation: "Góc xen giữa hai cạnh AB và BC là góc B. Góc xen giữa DE và EF là góc E. Do đó cần thêm điều kiện \\(\\widehat{B} = \\widehat{E}\\).",
        relatedTheoremId: "toan7-hk1-tam-giac-bang-nhau-3-truong-hop",
        points: 1
      },
      {
        id: "q7-gk1-9",
        question: "Hai tam giác vuông bằng nhau theo trường hợp 'Cạnh huyền - Cạnh góc vuông' khi:",
        options: [
          "Hai cạnh góc vuông bằng nhau",
          "Cạnh huyền và một góc nhọn bằng nhau",
          "Cạnh huyền và một cạnh góc vuông của tam giác này bằng cạnh huyền và một cạnh góc vuông của tam giác kia",
          "Ba cạnh bằng nhau"
        ],
        correctIndex: 2,
        explanation: "Định lý trường hợp bằng nhau đặc biệt của tam giác vuông: Cạnh huyền và một cạnh góc vuông tương ứng bằng nhau.",
        relatedTheoremId: "toan7-hk1-tam-giac-vuong-bang-nhau",
        points: 1
      },
      {
        id: "q7-gk1-10",
        question: "Trong tam giác vuông, tổng hai góc nhọn bằng bao nhiêu độ?",
        options: ["\\(180^\\circ\\)", "\\(90^\\circ\\)", "\\(60^\\circ\\)", "\\(45^\\circ\\)"],
        correctIndex: 1,
        explanation: "Vì tổng ba góc bằng 180° mà góc vuông là 90° nên hai góc nhọn phụ nhau, có tổng bằng 90°.",
        relatedTheoremId: "toan7-hk1-tong-ba-goc-tam-giac",
        points: 1
      }
    ]
  },

  // -------------------------------------------------------------
  // ĐỀ 2: TOÁN 7 - CUỐI HỌC KÌ 2 (HK2)
  // -------------------------------------------------------------
  {
    id: "exam-toan7-ck2",
    grade: 7,
    semester: 2,
    type: "final",
    title: "Đề thi Cuối Học Kì 2 - Toán 7 (Kết nối tri thức)",
    timeMinutes: 60,
    description: "Tổng hợp toàn bộ Tỉ lệ thức, Quan hệ giữa góc và cạnh đối diện, Bất đẳng thức tam giác và Các đường đồng quy.",
    questions: [
      {
        id: "q7-ck2-1",
        question: "Từ tỉ lệ thức \\(\\frac{x}{3} = \\frac{y}{5}\\) và \\(x + y = 24\\), giá trị của x và y lần lượt là:",
        options: ["x = 9, y = 15", "x = 10, y = 14", "x = 6, y = 18", "x = 8, y = 16"],
        correctIndex: 0,
        explanation: "Áp dụng tính chất dãy tỉ số bằng nhau: \\(\\frac{x}{3} = \\frac{y}{5} = \\frac{x+y}{3+5} = \\frac{24}{8} = 3\\). Suy ra x = 3 · 3 = 9; y = 3 · 5 = 15.",
        relatedTheoremId: "toan7-hk2-ti-le-thuc-day-ti-so",
        points: 1
      },
      {
        id: "q7-ck2-2",
        question: "Cho tam giác ABC có AB = 5cm, BC = 8cm, AC = 7cm. Thứ tự sắp xếp các góc từ bé đến lớn là:",
        options: ["\\(\\widehat{A} < \\widehat{B} < \\widehat{C}\\)", "\\(\\widehat{C} < \\widehat{B} < \\widehat{A}\\)", "\\(\\widehat{C} < \\widehat{A} < \\widehat{B}\\)", "\\(\\widehat{B} < \\widehat{C} < \\widehat{A}\\)"],
        correctIndex: 1,
        explanation: "Ta có AB < AC < BC (5 < 7 < 8). Theo định lý quan hệ giữa cạnh và góc đối diện: Cạnh nhỏ hơn đối diện góc nhỏ hơn, suy ra \\(\\widehat{C} < \\widehat{B} < \\widehat{A}\\).",
        relatedTheoremId: "toan7-hk2-quan-he-goc-va-canh-doi-dien",
        points: 1
      },
      {
        id: "q7-ck2-3",
        question: "Bộ ba độ dài đoạn thẳng nào sau đây CÓ THỂ là độ dài ba cạnh của một tam giác?",
        options: ["2cm, 3cm, 6cm", "3cm, 4cm, 7cm", "4cm, 5cm, 8cm", "1cm, 2cm, 4cm"],
        correctIndex: 2,
        explanation: "Theo bất đẳng thức tam giác: 4 + 5 = 9 > 8 (thỏa mãn tổng hai cạnh lớn hơn cạnh thứ ba). Các trường hợp khác: 2+3=5<6 (loại), 3+4=7=7 (loại), 1+2=3<4 (loại).",
        relatedTheoremId: "toan7-hk2-bat-dang-thuc-tam-giac",
        points: 1
      },
      {
        id: "q7-ck2-4",
        question: "Ba đường trung tuyến của tam giác đồng quy tại một điểm gọi là:",
        options: ["Trực tâm", "Trọng tâm", "Tâm đường tròn ngoại tiếp", "Tâm đường tròn nội tiếp"],
        correctIndex: 1,
        explanation: "Ba đường trung tuyến đồng quy tại một điểm gọi là TRỌNG TÂM của tam giác.",
        relatedTheoremId: "toan7-hk2-su-dong-quy-cac-duong",
        points: 1
      },
      {
        id: "q7-ck2-5",
        question: "Gọi G là trọng tâm của tam giác ABC với trung tuyến AM. Khẳng định nào sau đây đúng?",
        options: ["AG = 1/2 AM", "AG = 2/3 AM", "AG = 3/4 AM", "AG = 2 GM"],
        correctIndex: 1,
        explanation: "Theo tính chất ba đường trung tuyến: Trọng tâm cách mỗi đỉnh một khoảng bằng 2/3 độ dài đường trung tuyến đi qua đỉnh đó: AG = 2/3 AM.",
        relatedTheoremId: "toan7-hk2-su-dong-quy-cac-duong",
        points: 1
      },
      {
        id: "q7-ck2-6",
        question: "Giao điểm của ba đường phân giác trong tam giác có tính chất gì?",
        options: ["Cách đều ba đỉnh", "Cách đều ba cạnh", "Là trực tâm", "Cách mỗi đỉnh 2/3 độ dài"],
        correctIndex: 1,
        explanation: "Giao điểm của ba đường phân giác cách đều ba cạnh của tam giác (chính là tâm đường tròn nội tiếp).",
        relatedTheoremId: "toan7-hk2-su-dong-quy-cac-duong",
        points: 1
      },
      {
        id: "q7-ck2-7",
        question: "Trong tam giác tù, cạnh có độ dài lớn nhất là:",
        options: ["Cạnh kề với góc tù", "Cạnh đối diện với góc tù", "Không xác định được", "Cạnh nhỏ nhất"],
        correctIndex: 1,
        explanation: "Vì góc tù là góc lớn nhất trong tam giác (> 90°), theo định lý góc và cạnh đối diện thì cạnh đối diện với góc tù là cạnh lớn nhất.",
        relatedTheoremId: "toan7-hk2-quan-he-goc-va-canh-doi-dien",
        points: 1
      },
      {
        id: "q7-ck2-8",
        question: "Tìm độ dài cạnh x (là số nguyên) của tam giác có hai cạnh là 3cm và 7cm:",
        options: ["x có thể bằng 4cm", "4 < x < 10 (x ∈ {5, 6, 7, 8, 9})", "x có thể bằng 10cm", "x = 3cm"],
        correctIndex: 1,
        explanation: "Theo hệ quả bất đẳng thức tam giác: 7 - 3 < x < 7 + 3 ⇔ 4 < x < 10. Do đó x có thể nhận các giá trị nguyên từ 5 đến 9.",
        relatedTheoremId: "toan7-hk2-bat-dang-thuc-tam-giac",
        points: 1
      }
    ]
  },

  // -------------------------------------------------------------
  // ĐỀ 3: TOÁN 6 - GIỮA HỌC KÌ 1 (HK1)
  // -------------------------------------------------------------
  {
    id: "exam-toan6-gk1",
    grade: 6,
    semester: 1,
    type: "midterm",
    title: "Đề thi Giữa Học Kì 1 - Toán 6 (Kết nối tri thức)",
    timeMinutes: 45,
    description: "Kiểm tra Dấu hiệu chia hết, Số nguyên tố, Hình vuông, Tam giác đều, Hình thoi.",
    questions: [
      {
        id: "q6-gk1-1",
        question: "Số nào sau đây vừa chia hết cho 2 vừa chia hết cho 5?",
        options: ["124", "235", "540", "312"],
        correctIndex: 2,
        explanation: "Một số vừa chia hết cho 2 vừa chia hết cho 5 khi và chỉ khi có chữ số tận cùng là 0. Số 540 có tận cùng là 0.",
        relatedTheoremId: "toan6-hk1-chia-het-2-5",
        points: 1
      },
      {
        id: "q6-gk1-2",
        question: "Số 34* chia hết cho 9 khi dấu * được thay bằng chữ số:",
        options: ["2", "5", "9", "0"],
        correctIndex: 0,
        explanation: "Tổng các chữ số: 3 + 4 + * = 7 + *. Để chia hết cho 9 thì 7 + * phải bằng 9, suy ra * = 2.",
        relatedTheoremId: "toan6-hk1-chia-het-3-9",
        points: 1
      },
      {
        id: "q6-gk1-3",
        question: "Kết quả của phép tính bỏ dấu ngoặc: \\(- (15 - 28 + 7)\\) là:",
        options: ["-15 - 28 + 7", "-15 + 28 - 7", "15 - 28 + 7", "-15 + 28 + 7"],
        correctIndex: 1,
        explanation: "Khi bỏ dấu ngoặc có dấu trừ đằng trước, ta đổi dấu toàn bộ các số hạng bên trong: -(15 - 28 + 7) = -15 + 28 - 7.",
        relatedTheoremId: "toan6-hk1-quy-tac-dau-ngoac",
        points: 1
      },
      {
        id: "q6-gk1-4",
        question: "Hình vuông có cạnh bằng 6cm thì chu vi và diện tích lần lượt là:",
        options: ["P = 24cm, S = 36cm²", "P = 36cm, S = 24cm²", "P = 12cm, S = 36cm²", "P = 24cm, S = 12cm²"],
        correctIndex: 0,
        explanation: "Chu vi P = 4 · 6 = 24cm; Diện tích S = 6² = 36cm².",
        relatedTheoremId: "toan6-hk1-hinh-vuong-tam-giac-deu",
        points: 1
      },
      {
        id: "q6-gk1-5",
        question: "Một hình thoi có độ dài hai đường chéo là 8cm và 10cm. Diện tích hình thoi đó là:",
        options: ["80cm²", "40cm²", "36cm²", "20cm²"],
        correctIndex: 1,
        explanation: "Diện tích hình thoi bằng nửa tích hai đường chéo: S = 1/2 · 8 · 10 = 40cm².",
        relatedTheoremId: "toan6-hk1-hinh-thoi-hinh-binh-hanh",
        points: 1
      },
      {
        id: "q6-gk1-6",
        question: "Tam giác đều ABC có chu vi bằng 18cm. Độ dài mỗi cạnh của tam giác đó là:",
        options: ["3cm", "6cm", "9cm", "12cm"],
        correctIndex: 1,
        explanation: "Tam giác đều có 3 cạnh bằng nhau nên độ dài mỗi cạnh là: 18 : 3 = 6cm.",
        relatedTheoremId: "toan6-hk1-hinh-vuong-tam-giac-deu",
        points: 1
      }
    ]
  },

  // -------------------------------------------------------------
  // ĐỀ 4: TOÁN 6 - CUỐI HỌC KÌ 2 (HK2)
  // -------------------------------------------------------------
  {
    id: "exam-toan6-ck2",
    grade: 6,
    semester: 2,
    type: "final",
    title: "Đề thi Cuối Học Kì 2 - Toán 6 (Kết nối tri thức)",
    timeMinutes: 60,
    description: "Phân số, số thập phân, điểm nằm giữa, trung điểm đoạn thẳng và góc.",
    questions: [
      {
        id: "q6-ck2-1",
        question: "Phân số nào sau đây bằng phân số \\(-\\frac{3}{4}\\)?",
        options: ["\\(\\frac{6}{8}\\)", "\\(-\\frac{9}{12}\\)", "\\(\\frac{-9}{-12}\\)", "\\(-\\frac{6}{-8}\\)"],
        correctIndex: 1,
        explanation: "Nhân cả tử và mẫu với 3: (-3 · 3)/(4 · 3) = -9/12. Theo tính chất cơ bản của phân số, hai phân số này bằng nhau.",
        relatedTheoremId: "toan6-hk2-tinh-chat-phan-so",
        points: 1
      },
      {
        id: "q6-ck2-2",
        question: "Cho đoạn thẳng AB dài 10cm. Gọi M là trung điểm của AB. Độ dài đoạn thẳng AM là:",
        options: ["4cm", "5cm", "6cm", "10cm"],
        correctIndex: 1,
        explanation: "Vì M là trung điểm của AB nên AM = MB = AB / 2 = 10 / 2 = 5cm.",
        relatedTheoremId: "toan6-hk2-trung-diem-doan-thang",
        points: 1
      },
      {
        id: "q6-ck2-3",
        question: "Cho điểm B nằm giữa hai điểm A và C. Biết AB = 4cm, BC = 6cm. Độ dài đoạn AC là:",
        options: ["2cm", "8cm", "10cm", "24cm"],
        correctIndex: 2,
        explanation: "Vì B nằm giữa A và C nên AC = AB + BC = 4 + 6 = 10cm.",
        relatedTheoremId: "toan6-hk2-trung-diem-doan-thang",
        points: 1
      },
      {
        id: "q6-ck2-4",
        question: "Rút gọn phân số \\(\\frac{24}{36}\\) về phân số tối giản ta được:",
        options: ["\\(\\frac{12}{18}\\)", "\\(\\frac{6}{9}\\)", "\\(\\frac{2}{3}\\)", "\\(\\frac{4}{6}\\)"],
        correctIndex: 2,
        explanation: "Chia cả tử và mẫu cho ƯCLN(24, 36) = 12: 24:12 / 36:12 = 2/3.",
        relatedTheoremId: "toan6-hk2-tinh-chat-phan-so",
        points: 1
      }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { EXAMS_DATA };
}
