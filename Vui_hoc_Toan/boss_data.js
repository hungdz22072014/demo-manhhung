// =================================================================
// KHO DỮ LIỆU ĐẤU TRƯỜNG DIỆT BOSS TOÁN 6 - 7 (KẾT NỐI TRI THỨC VỚI CUỘC SỐNG)
// 10 Cấp Độ Boss & Ngân Hàng Câu Hỏi Nâng Cao Khối Lớp 6 và 7
// =================================================================

const BOSS_TIERS_DATA = [
  {
    level: 1,
    name: "Goblin Toán Học",
    avatar: "👺",
    title: "Cấp 1 • Tiểu Quái Vùng Ven",
    desc: "Kẻ canh giữ cửa ngõ đại ngàn, chuyên dùng các phép tính lũy thừa và chia hết cơ bản để thử thách hiệp sĩ.",
    maxHp: 20,
    rewardExp: 150,
    rewardCoins: 60,
    bossColor: "#10b981",
    themeClass: "boss-tier-1"
  },
  {
    level: 2,
    name: "Quái Thú Số Học",
    avatar: "🐺",
    title: "Cấp 2 • Ma Sói Rừng Rậm",
    desc: "Sở hữu tốc độ tính nhẩm siêu thanh và các bài toán tìm ước chung, bội chung nhanh như chớp.",
    maxHp: 20,
    rewardExp: 180,
    rewardCoins: 75,
    bossColor: "#0ea5e9",
    themeClass: "boss-tier-2"
  },
  {
    level: 3,
    name: "Thạch Thủ Hình Học",
    avatar: "🗿",
    title: "Cấp 3 • Hộ Vệ Cự Thạch",
    desc: "Cơ thể bằng đá tảng hình học bất hoại, chỉ có thể bị tổn thương bởi các công thức chu vi, diện tích và tính chất đa giác.",
    maxHp: 20,
    rewardExp: 210,
    rewardCoins: 90,
    bossColor: "#f59e0b",
    themeClass: "boss-tier-3"
  },
  {
    level: 4,
    name: "Hắc Pháp Sư Phân Số",
    avatar: "🧙‍♂️",
    title: "Cấp 4 • Pháp Sư Thao Túng",
    desc: "Bậc thầy quy đồng và tính nhanh dãy phân số có quy luật, tạo ra những ma trận số bí ẩn.",
    maxHp: 20,
    rewardExp: 240,
    rewardCoins: 110,
    bossColor: "#8b5cf6",
    themeClass: "boss-tier-4"
  },
  {
    level: 5,
    name: "Rồng Lửa Tỉ Lệ Thức",
    avatar: "🐉",
    title: "Cấp 5 • Hỏa Long Núi Lửa",
    desc: "Hơi thở rực lửa biến đổi khôn lường các đại lượng tỉ lệ thuận, tỉ lệ nghịch và dãy tỉ số bằng nhau.",
    maxHp: 20,
    rewardExp: 280,
    rewardCoins: 130,
    bossColor: "#ef4444",
    themeClass: "boss-tier-5"
  },
  {
    level: 6,
    name: "Bạo Chúa Đa Thức",
    avatar: "🦖",
    title: "Cấp 6 • Chúa Tể Rừng Già",
    desc: "Kẻ thống trị các biểu thức đại số, nghiệm của đa thức một biến và các bài toán rút gọn phức tạp.",
    maxHp: 20,
    rewardExp: 320,
    rewardCoins: 150,
    bossColor: "#ec4899",
    themeClass: "boss-tier-6"
  },
  {
    level: 7,
    name: "Ma Thần Tam Giác Bằng Nhau",
    avatar: "👁️",
    title: "Cấp 7 • Ác Ma Không Gian",
    desc: "Sở hữu nhãn thuật nhìn thấu mọi góc, cạnh tương ứng và 3 trường hợp bằng nhau của tam giác.",
    maxHp: 20,
    rewardExp: 360,
    rewardCoins: 170,
    bossColor: "#6366f1",
    themeClass: "boss-tier-7"
  },
  {
    level: 8,
    name: "Lãnh Chúa Bất Đẳng Thức",
    avatar: "⚔️",
    title: "Cấp 8 • Kiếm Thánh Bất Khả Chiến Bại",
    desc: "Chuyên sử dụng bất đẳng thức tam giác và bài toán cực trị hình học để phản đòn hiệp sĩ.",
    maxHp: 20,
    rewardExp: 400,
    rewardCoins: 190,
    bossColor: "#059669",
    themeClass: "boss-tier-8"
  },
  {
    level: 9,
    name: "Hắc Long Đồng Quy",
    avatar: "🐲",
    title: "Cấp 9 • Thần Long Bốn Trọng Điểm",
    desc: "Tập hợp sức mạnh của trọng tâm, trực tâm, tâm đường tròn nội tiếp và ngoại tiếp tam giác.",
    maxHp: 20,
    rewardExp: 450,
    rewardCoins: 220,
    bossColor: "#7c3aed",
    themeClass: "boss-tier-9"
  },
  {
    level: 10,
    name: "Thần Ma Toán Học Vô Cực",
    avatar: "🌌",
    title: "Cấp 10 • TRÙM CUỐI HUYỀN THOẠI",
    desc: "Hiện thân của cảnh giới Toán học THCS tối cao! Kẻ đánh bại Thần Ma sẽ được tôn vinh là Huyền Thoại Toán Học Bất Tử!",
    maxHp: 20,
    rewardExp: 600,
    rewardCoins: 300,
    bossColor: "#f43f5e",
    themeClass: "boss-tier-10"
  }
];

// =================================================================
// NGÂN HÀNG CÂU HỎI NÂNG CAO LỚP 6
// =================================================================
const BOSS_QUESTIONS_GRADE_6 = [
  {
    id: "bq6-1",
    question: "Chữ số tận cùng của số $A = 2^{2024}$ là chữ số nào?",
    options: ["2", "4", "6", "8"],
    correctIndex: 2,
    explanation: "Ta có $2^4 = 16$ tận cùng là 6. Mà $2^{2024} = (2^4)^{506} = 16^{506}$ luôn có chữ số tận cùng là 6."
  },
  {
    id: "bq6-2",
    question: "Tìm số tự nhiên $x$ thỏa mãn: $1 + 2 + 3 + \\dots + x = 210$.",
    options: ["$x = 20$", "$x = 21$", "$x = 19$", "$x = 22$"],
    correctIndex: 0,
    explanation: "Tổng dãy số: $\\frac{x(x+1)}{2} = 210 \\Rightarrow x(x+1) = 420 = 20 \\times 21$. Vậy $x = 20$."
  },
  {
    id: "bq6-3",
    question: "Tìm chữ số tận cùng của tổng $S = 1 + 3 + 3^2 + 3^3 + \\dots + 3^{2024}$:",
    options: ["1", "3", "0", "4"],
    correctIndex: 0,
    explanation: "Nhân 3 vào $S$: $3S = 3 + 3^2 + \\dots + 3^{2025} \\Rightarrow 2S = 3^{2025} - 1$. Vì $3^{2025} = 3 \\cdot (3^4)^{506}$ tận cùng là 3, nên $3^{2025} - 1$ tận cùng là 2 $\\Rightarrow 2S$ tận cùng là 2 $\\Rightarrow S$ tận cùng là 1 (hoặc 6, nhưng tổng số lẻ có 2025 số hạng lẻ nên là số lẻ $\\Rightarrow$ tận cùng là 1)."
  },
  {
    id: "bq6-4",
    question: "Số tự nhiên $n$ nhỏ nhất khác 0 chia hết cho cả 12, 15 và 18 là:",
    options: ["90", "180", "360", "540"],
    correctIndex: 1,
    explanation: "Ta tìm $\\text{BCNN}(12, 15, 18)$. Phân tích: $12 = 2^2 \\cdot 3$, $15 = 3 \\cdot 5$, $18 = 2 \\cdot 3^2 \\Rightarrow \\text{BCNN} = 2^2 \\cdot 3^2 \\cdot 5 = 180$."
  },
  {
    id: "bq6-5",
    question: "Cho biểu thức $A = \\frac{1}{1 \\cdot 2} + \\frac{1}{2 \\cdot 3} + \\frac{1}{3 \\cdot 4} + \\dots + \\frac{1}{99 \\cdot 100}$. Giá trị của $A$ là:",
    options: ["$\\frac{99}{100}$", "$\\frac{1}{100}$", "$\\frac{100}{99}$", "$\\frac{98}{100}$"],
    correctIndex: 0,
    explanation: "$A = (1 - \\frac{1}{2}) + (\\frac{1}{2} - \\frac{1}{3}) + \\dots + (\\frac{1}{99} - \\frac{1}{100}) = 1 - \\frac{1}{100} = \\frac{99}{100}$."
  },
  {
    id: "bq6-6",
    question: "Có bao nhiêu số nguyên $x$ thỏa mãn $-5 < x \\le 4$?",
    options: ["8", "9", "10", "11"],
    correctIndex: 1,
    explanation: "Các số nguyên $x \\in \\{-4, -3, -2, -1, 0, 1, 2, 3, 4\\}$. Tổng cộng có 9 số nguyên."
  },
  {
    id: "bq6-7",
    question: "Số ước tự nhiên của số $72$ là:",
    options: ["10", "12", "14", "16"],
    correctIndex: 1,
    explanation: "Phân tích ra thừa số nguyên tố: $72 = 2^3 \\cdot 3^2$. Số lượng ước tự nhiên là $(3+1)(2+1) = 4 \\cdot 3 = 12$ ước."
  },
  {
    id: "bq6-8",
    question: "Cho $n$ điểm phân biệt trong đó không có 3 điểm nào thẳng hàng. Vẽ được tất cả 45 đoạn thẳng nối các cặp điểm. Giá trị của $n$ là:",
    options: ["$n = 9$", "$n = 10$", "$n = 11$", "$n = 12$"],
    correctIndex: 1,
    explanation: "Số đoạn thẳng tạo từ $n$ điểm: $\\frac{n(n-1)}{2} = 45 \\Rightarrow n(n-1) = 90 = 10 \\times 9 \\Rightarrow n = 10$."
  },
  {
    id: "bq6-9",
    question: "Cho góc $\\widehat{xOy} = 120^\\circ$, tia $Oz$ là tia phân giác của góc $\\widehat{xOy}$. Số đo góc $\\widehat{xOz}$ là:",
    options: ["60°", "30°", "45°", "90°"],
    correctIndex: 0,
    explanation: "Tia phân giác chia góc ra làm 2 phần bằng nhau: $\\widehat{xOz} = \\frac{\\widehat{xOy}}{2} = \\frac{120^\\circ}{2} = 60^\\circ$."
  },
  {
    id: "bq6-10",
    question: "Rút gọn phân số $\\frac{2^{10} \\cdot 3^8}{6^8}$ ta được kết quả là:",
    options: ["2", "4", "8", "16"],
    correctIndex: 1,
    explanation: "Ta có $6^8 = (2 \\cdot 3)^8 = 2^8 \\cdot 3^8$. Vậy $\\frac{2^{10} \\cdot 3^8}{2^8 \\cdot 3^8} = 2^{10-8} = 2^2 = 4$."
  },
  {
    id: "bq6-11",
    question: "Tìm chữ số tận cùng của $7^{2023}$:",
    options: ["1", "3", "7", "9"],
    correctIndex: 1,
    explanation: "Lũy thừa của 7 theo chu kỳ 4: $7^1=7, 7^2=9, 7^3=3, 7^4=1$. Ta có $2023 = 4 \\cdot 505 + 3$, nên $7^{2023}$ có tận cùng bằng chữ số tận cùng của $7^3$ là 3."
  },
  {
    id: "bq6-12",
    question: "Một mảnh vườn hình chữ nhật có chu vi 48m, chiều dài gấp 3 lần chiều rộng. Diện tích mảnh vườn là:",
    options: ["108 m²", "144 m²", "128 m²", "96 m²"],
    correctIndex: 0,
    explanation: "Nửa chu vi = $48 : 2 = 24\\text{m}$. Chiều rộng = $24 : (1+3) = 6\\text{m}$. Chiều dài = $18\\text{m}$. Diện tích = $18 \\times 6 = 108\\text{ m}^2$."
  },
  {
    id: "bq6-13",
    question: "Tìm tất cả các số nguyên $n$ để phân số $\\frac{n+3}{n-1}$ nhận giá trị nguyên:",
    options: ["$n \\in \\{2, 0, 3, -1, 5, -3\\}$", "$n \\in \\{2, 0, 3, -1\\}$", "$n \\in \\{1, -1, 2, -2\\}$", "$n \\in \\{5, -3\\}$"],
    correctIndex: 0,
    explanation: "Ta có $\\frac{n+3}{n-1} = 1 + \\frac{4}{n-1}$. Để là số nguyên thì $n-1 \\in \\text{Ư}(4) = \\{\\pm 1, \\pm 2, \\pm 4\\} \\Rightarrow n \\in \\{2, 0, 3, -1, 5, -3\\}$."
  },
  {
    id: "bq6-14",
    question: "Giá trị của tổng $B = \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\frac{1}{16} + \\frac{1}{32} + \\frac{1}{64}$ là:",
    options: ["$\\frac{63}{64}$", "$\\frac{31}{32}$", "$\\frac{65}{64}$", "1"],
    correctIndex: 0,
    explanation: "Nhân 2 vào $B$: $2B = 1 + \\frac{1}{2} + \\dots + \\frac{1}{32} \\Rightarrow B = 2B - B = 1 - \\frac{1}{64} = \\frac{63}{64}$."
  },
  {
    id: "bq6-15",
    question: "Một bể nước có dung tích 1200 lít. Vòi thứ nhất chảy trong 4 giờ thì đầy bể, vòi thứ hai chảy trong 6 giờ thì đầy bể. Cả hai vòi cùng chảy thì sau bao lâu đầy bể?",
    options: ["2,4 giờ", "2,5 giờ", "3 giờ", "5 giờ"],
    correctIndex: 0,
    explanation: "Trong 1 giờ hai vòi chảy được: $\\frac{1}{4} + \\frac{1}{6} = \\frac{5}{12}$ bể. Thời gian đầy bể là: $1 : \\frac{5}{12} = \\frac{12}{5} = 2{,}4$ giờ (2 giờ 24 phút)."
  },
  {
    id: "bq6-16",
    question: "Tổng của 5 số tự nhiên liên tiếp là 105. Số lớn nhất trong 5 số đó là:",
    options: ["21", "22", "23", "24"],
    correctIndex: 2,
    explanation: "Số chính giữa là $105 : 5 = 21$. Năm số đó là: 19, 20, 21, 22, 23. Số lớn nhất là 23."
  },
  {
    id: "bq6-17",
    question: "Tìm giá trị của $x$ biết: $|x - 3| + 5 = 12$:",
    options: ["$x = 10$ hoặc $x = -4$", "$x = 10$", "$x = -4$", "$x = 7$"],
    correctIndex: 0,
    explanation: "$|x - 3| = 12 - 5 = 7 \\Rightarrow x - 3 = 7 \\Rightarrow x = 10$ hoặc $x - 3 = -7 \\Rightarrow x = -4$."
  },
  {
    id: "bq6-18",
    question: "Cho hai góc kề bù $\\widehat{AOB}$ và $\\widehat{BOC}$. Biết $\\widehat{AOB} = 2\\widehat{BOC}$. Số đo góc $\\widehat{AOB}$ là:",
    options: ["60°", "120°", "90°", "100°"],
    correctIndex: 1,
    explanation: "Vì kề bù nên $\\widehat{AOB} + \\widehat{BOC} = 180^\\circ \\Rightarrow 2\\widehat{BOC} + \\widehat{BOC} = 180^\\circ \\Rightarrow 3\\widehat{BOC} = 180^\\circ \\Rightarrow \\widehat{BOC} = 60^\\circ \\Rightarrow \\widehat{AOB} = 120^\\circ$."
  },
  {
    id: "bq6-19",
    question: "Trong các số sau, số nào chia hết cho cả 2, 3, 5 và 9?",
    options: ["1350", "2460", "3150", "1350 và 3150 đều đúng"],
    correctIndex: 3,
    explanation: "Số chia hết cho 2 và 5 tận cùng là 0. Số chia hết cho 9 thì tổng các chữ số chia hết cho 9. Cả 1350 (tổng = 9) và 3150 (tổng = 9) đều thỏa mãn chia hết cho 2, 3, 5, 9."
  },
  {
    id: "bq6-20",
    question: "Hình thoi có độ dài hai đường chéo lần lượt là 14cm và 18cm. Diện tích hình thoi là:",
    options: ["126 cm²", "252 cm²", "63 cm²", "108 cm²"],
    correctIndex: 0,
    explanation: "Diện tích hình thoi = $\\frac{1}{2} d_1 d_2 = \\frac{1}{2} \\cdot 14 \\cdot 18 = 126\\text{ cm}^2$."
  }
];

// =================================================================
// NGÂN HÀNG CÂU HỎI NÂNG CAO LỚP 7
// =================================================================
const BOSS_QUESTIONS_GRADE_7 = [
  {
    id: "bq7-1",
    question: "Cho $\\frac{a}{b} = \\frac{c}{d}$. Đẳng thức nào sau đây luôn đúng?",
    options: ["$\\frac{a+b}{b} = \\frac{c+d}{d}$", "$\\frac{a-b}{b} = \\frac{c+d}{d}$", "$\\frac{a}{c} = \\frac{d}{b}$", "$a \\cdot c = b \\cdot d$"],
    correctIndex: 0,
    explanation: "Từ $\\frac{a}{b} = \\frac{c}{d} \\Rightarrow \\frac{a}{b} + 1 = \\frac{c}{d} + 1 \\Rightarrow \\frac{a+b}{b} = \\frac{c+d}{d}$."
  },
  {
    id: "bq7-2",
    question: "Tìm $x, y, z$ biết $\\frac{x}{2} = \\frac{y}{3} = \\frac{z}{4}$ và $x + 2y - z = 16$:",
    options: ["$x=8, y=12, z=16$", "$x=4, y=6, z=8$", "$x=6, y=9, z=12$", "$x=10, y=15, z=20$"],
    correctIndex: 0,
    explanation: "Áp dụng tính chất dãy tỉ số: $\\frac{x}{2} = \\frac{2y}{6} = \\frac{z}{4} = \\frac{x+2y-z}{2+6-4} = \\frac{16}{4} = 4 \\Rightarrow x=8, y=12, z=16$."
  },
  {
    id: "bq7-3",
    question: "Cho tam giác $ABC$ có $\\widehat{A} : \\widehat{B} : \\widehat{C} = 1 : 2 : 3$. Số đo ba góc $A, B, C$ lần lượt là:",
    options: ["30°, 60°, 90°", "20°, 40°, 120°", "40°, 60°, 80°", "15°, 30°, 135°"],
    correctIndex: 0,
    explanation: "Tổng 3 góc bằng 180°: $\\frac{\\widehat{A}}{1} = \\frac{\\widehat{B}}{2} = \\frac{\\widehat{C}}{3} = \\frac{180^\\circ}{1+2+3} = 30^\\circ \\Rightarrow \\widehat{A}=30^\\circ, \\widehat{B}=60^\\circ, \\widehat{C}=90^\\circ$."
  },
  {
    id: "bq7-4",
    question: "Đa thức $P(x) = x^2 - 5x + 6$ có tập nghiệm là:",
    options: ["$\\{2, 3\\}$", "$\\{-2, -3\\}$", "$\\{1, 6\\}$", "$\\{-1, -6\\}$"],
    correctIndex: 0,
    explanation: "$x^2 - 5x + 6 = (x-2)(x-3) = 0 \\Rightarrow x = 2$ hoặc $x = 3$."
  },
  {
    id: "bq7-5",
    question: "Giá trị nhỏ nhất của biểu thức $A = |x - 2| + |x - 8|$ là:",
    options: ["6", "0", "8", "2"],
    correctIndex: 0,
    explanation: "Áp dụng bất đẳng thức trị tuyệt đối: $|x - 2| + |x - 8| = |x - 2| + |8 - x| \\ge |x - 2 + 8 - x| = 6$. Dấu '=' xảy ra khi $2 \\le x \\le 8$."
  },
  {
    id: "bq7-6",
    question: "Cho tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 100^\\circ$. Số đo góc đáy $\\widehat{B}$ là:",
    options: ["40°", "80°", "50°", "45°"],
    correctIndex: 0,
    explanation: "Tam giác cân có hai góc ở đáy bằng nhau: $\\widehat{B} = \\widehat{C} = \\frac{180^\\circ - 100^\\circ}{2} = 40^\\circ$."
  },
  {
    id: "bq7-7",
    question: "Bộ ba đoạn thẳng nào sau đây KHÔNG THỂ tạo thành một tam giác?",
    options: ["2cm, 4cm, 6cm", "3cm, 4cm, 5cm", "5cm, 6cm, 7cm", "4cm, 4cm, 7cm"],
    correctIndex: 0,
    explanation: "Bất đẳng thức tam giác: Tổng 2 cạnh bất kì phải lớn hơn cạnh còn lại. Bộ ba $2 + 4 = 6$ không thỏa mãn (phải lớn hơn 6)."
  },
  {
    id: "bq7-8",
    question: "Tam giác $ABC$ có trung tuyến $AM$, trọng tâm $G$. Tỉ số $\\frac{AG}{AM}$ bằng:",
    options: ["$\\frac{2}{3}$", "$\\frac{1}{2}$", "$\\frac{1}{3}$", "$\\frac{3}{4}$"],
    correctIndex: 0,
    explanation: "Tính chất 3 đường trung tuyến: Trọng tâm cách mỗi đỉnh một khoảng bằng $\\frac{2}{3}$ độ dài đường trung tuyến đi qua đỉnh đó ($AG = \\frac{2}{3} AM$)."
  },
  {
    id: "bq7-9",
    question: "Tìm hệ số cao nhất và hệ số tự do của đa thức $Q(x) = -3x^4 + 5x^3 - 2x^2 + 7x - 9$:",
    options: ["Hệ số cao nhất: -3, Hệ số tự do: -9", "Hệ số cao nhất: 5, Hệ số tự do: 9", "Hệ số cao nhất: 4, Hệ số tự do: -9", "Hệ số cao nhất: -3, Hệ số tự do: 7"],
    correctIndex: 0,
    explanation: "Bậc cao nhất là bậc 4 ứng với hệ số $-3$. Hệ số không chứa biến là hệ số tự do: $-9$."
  },
  {
    id: "bq7-10",
    question: "Cho tam giác $ABC$ vuông tại $A$ có $AB = 6\\text{ cm}, AC = 8\\text{ cm}$. Độ dài đường trung tuyến $AM$ ứng với cạnh huyền là:",
    options: ["5 cm", "10 cm", "4,8 cm", "7 cm"],
    correctIndex: 0,
    explanation: "Cạnh huyền $BC = \\sqrt{6^2 + 8^2} = 10\\text{ cm}$. Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền: $AM = \\frac{BC}{2} = 5\\text{ cm}$."
  },
  {
    id: "bq7-11",
    question: "Tìm giá trị của $x$ để đa thức $M(x) = x^2 + 4$ có nghiệm:",
    options: ["Không có giá trị nào của $x$", "$x = 2$", "$x = -2$", "$x = 0$"],
    correctIndex: 0,
    explanation: "Vì $x^2 \\ge 0$ với mọi $x$ nên $x^2 + 4 \\ge 4 > 0$ với mọi $x$. Đa thức vô nghiệm trên tập số thực."
  },
  {
    id: "bq7-12",
    question: "Giao điểm của ba đường phân giác trong tam giác là điểm:",
    options: ["Cách đều 3 cạnh của tam giác", "Cách đều 3 đỉnh của tam giác", "Trực tâm tam giác", "Trọng tâm tam giác"],
    correctIndex: 0,
    explanation: "Tính chất 3 đường phân giác: Giao điểm của ba đường phân giác là tâm đường tròn nội tiếp, cách đều ba cạnh của tam giác."
  },
  {
    id: "bq7-13",
    question: "Cho biết 12 người thợ gặt xong một cánh đồng trong 4 ngày. Muốn gặt xong cánh đồng đó trong 3 ngày thì cần bao nhiêu người thợ (năng suất như nhau)?",
    options: ["16 người", "15 người", "18 người", "14 người"],
    correctIndex: 0,
    explanation: "Số người và số ngày là hai đại lượng tỉ lệ nghịch: $12 \\times 4 = x \\times 3 \\Rightarrow x = \\frac{48}{3} = 16$ người."
  },
  {
    id: "bq7-14",
    question: "Cho đa thức $f(x) = ax^2 + bx + c$. Biết $f(0) = 2, f(1) = 7, f(-1) = 1$. Giá trị của $a$ là:",
    options: ["$a = 2$", "$a = 3$", "$a = 1$", "$a = -1$"],
    correctIndex: 0,
    explanation: "$f(0) = c = 2$. $f(1) = a + b + 2 = 7 \\Rightarrow a + b = 5$. $f(-1) = a - b + 2 = 1 \\Rightarrow a - b = -1$. Cộng lại: $2a = 4 \\Rightarrow a = 2$."
  },
  {
    id: "bq7-15",
    question: "Cho tam giác $ABC$ có $\\widehat{B} = 75^\\circ, \\widehat{C} = 45^\\circ$. So sánh độ dài ba cạnh $AB, BC, AC$:",
    options: ["$AB < BC < AC$", "$BC < AB < AC$", "$AC < AB < BC$", "$AB < AC < BC$"],
    correctIndex: 0,
    explanation: "Góc $\\widehat{A} = 180^\\circ - 75^\\circ - 45^\\circ = 60^\\circ$. So sánh góc: $\\widehat{C}(45^\\circ) < \\widehat{A}(60^\\circ) < \\widehat{B}(75^\\circ) \\Rightarrow AB < BC < AC$."
  },
  {
    id: "bq7-16",
    question: "Tìm giá trị lớn nhất của biểu thức $B = 10 - (x - 3)^2 - |y + 2|$:",
    options: ["10", "13", "7", "0"],
    correctIndex: 0,
    explanation: "Vì $-(x-3)^2 \\le 0$ và $-|y+2| \\le 0$ nên $B \\le 10$. Dấu '=' xảy ra khi $x = 3$ và $y = -2$."
  },
  {
    id: "bq7-17",
    question: "Giao điểm của ba đường trung trực trong tam giác là điểm:",
    options: ["Cách đều 3 đỉnh của tam giác", "Cách đều 3 cạnh của tam giác", "Trọng tâm tam giác", "Trực tâm tam giác"],
    correctIndex: 0,
    explanation: "Tính chất ba đường trung trực: Giao điểm của ba đường trung trực là tâm đường tròn ngoại tiếp, cách đều 3 đỉnh của tam giác."
  },
  {
    id: "bq7-18",
    question: "Tìm giá trị của $x$ biết: $(2x - 1)^3 = -27$:",
    options: ["$x = -1$", "$x = 1$", "$x = -2$", "$x = 2$"],
    correctIndex: 0,
    explanation: "$(2x - 1)^3 = (-3)^3 \\Rightarrow 2x - 1 = -3 \\Rightarrow 2x = -2 \\Rightarrow x = -1$."
  },
  {
    id: "bq7-19",
    question: "Đa thức nào sau đây có nghiệm $x = -2$?",
    options: ["$P(x) = 2x + 4$", "$Q(x) = x^2 + 4$", "$R(x) = 2x - 4$", "$S(x) = x^2 - 2$"],
    correctIndex: 0,
    explanation: "Thay $x = -2$ vào $P(x)$: $2(-2) + 4 = -4 + 4 = 0$. Vậy $x = -2$ là nghiệm của $P(x)$."
  },
  {
    id: "bq7-20",
    question: "Một hình lăng trụ đứng tam giác có đáy là tam giác vuông có hai cạnh góc vuông là 3cm và 4cm, chiều cao lăng trụ là 10cm. Thể tích hình lăng trụ là:",
    options: ["60 cm³", "120 cm³", "50 cm³", "70 cm³"],
    correctIndex: 0,
    explanation: "Diện tích đáy $S_đ = \\frac{1}{2} \\cdot 3 \\cdot 4 = 6\\text{ cm}^2$. Thể tích $V = S_đ \\cdot h = 6 \\cdot 10 = 60\\text{ cm}^3$."
  }
];

if (typeof window !== "undefined") {
  window.BOSS_TIERS_DATA = BOSS_TIERS_DATA;
  window.BOSS_QUESTIONS_GRADE_6 = BOSS_QUESTIONS_GRADE_6;
  window.BOSS_QUESTIONS_GRADE_7 = BOSS_QUESTIONS_GRADE_7;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    BOSS_TIERS_DATA,
    BOSS_QUESTIONS_GRADE_6,
    BOSS_QUESTIONS_GRADE_7
  };
}
