// =================================================================
// KHO DỮ LIỆU TOÀN BỘ SÁCH GIÁO KHOA TOÁN LỚP 6 & LỚP 7
// BỘ SÁCH: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (TẬP 1 & TẬP 2)
// Phục vụ: Cẩm Nang SGK, Sơ Đồ Tư Duy, Tra Cứu Công Thức & AI Gia Sư
// =================================================================

const TEXTBOOK_CURRICULUM_DATA = [
  // =============================================================
  // TOÁN LỚP 6 - TẬP 1 (HỌC KÌ 1)
  // =============================================================
  {
    id: "sgk6-tap1-chuong1",
    grade: 6,
    semester: 1,
    bookVolume: "Tập 1",
    chapterNumber: "Chương I",
    chapterTitle: "Tập Hợp Các Số Tự Nhiên",
    category: "arithmetic",
    categoryName: "Số & Đại số",
    icon: "🔢",
    badgeColor: "#4f46e5",
    description: "Nền tảng số học: Tập hợp, các phép toán trên tập số tự nhiên N, lũy thừa, tính chia hết, số nguyên tố, ƯCLN và BCNN.",
    mindmap: {
      root: "Tập hợp số tự nhiên (N)",
      branches: [
        { name: "Khái niệm & Cách viết", items: ["Phần tử ∈, ∉", "Liệt kê phần tử", "Chỉ ra tính chất đặc trưng"] },
        { name: "Phép tính", items: ["Cộng & Nhân (Giao hoán, kết hợp, phân phối)", "Trừ & Chia (Điều kiện chia hết)", "Lũy thừa với số mũ tự nhiên"] },
        { name: "Tính chia hết & Số nguyên tố", items: ["Dấu hiệu chia hết 2, 5, 3, 9", "Số nguyên tố & Hợp số", "Phân tích ra thừa số nguyên tố"] },
        { name: "ƯCLN & BCNN", items: ["Ước chung - ƯCLN", "Bội chung - BCNN", "Ứng dụng rút gọn & quy đồng"] }
      ]
    },
    lessons: [
      {
        id: "toan6-c1-b1",
        lessonNumber: "Bài 1",
        title: "Tập hợp",
        summary: "Khái niệm tập hợp, các phần tử của tập hợp và 2 cách viết tập hợp.",
        coreConcepts: [
          {
            title: "Khái niệm tập hợp và phần tử",
            definition: "Tập hợp thường được đặt tên bằng chữ cái in hoa (A, B, X, Y...). Một đối tượng x thuộc tập hợp A được kí hiệu là $x \\in A$. Nếu x không thuộc A, kí hiệu là $x \\notin A$.",
            formula: "x \\in A \\quad \\text{hoặc} \\quad y \\notin A",
            notes: "Mỗi phần tử chỉ được liệt kê 1 lần, thứ tự liệt kê tùy ý."
          },
          {
            title: "Hai cách mô tả tập hợp",
            definition: "Cách 1: Liệt kê các phần tử trong dấu ngoặc nhọn $\\{ \\}$. Cách 2: Chỉ ra dấu hiệu đặc trưng cho các phần tử của tập hợp.",
            formula: "A = \\{0; 1; 2; 3; 4\\} = \\{x \\in \\mathbb{N} \\mid x < 5\\}",
            notes: "Các phần tử ngăn cách nhau bởi dấu chấm phẩy ';' (tránh nhầm số thập phân)."
          }
        ],
        sampleProblems: [
          {
            problem: "Viết tập hợp B gồm các số tự nhiên lẻ nhỏ hơn 10 bằng 2 cách.",
            solution: "Cách 1 (Liệt kê): $B = \\{1; 3; 5; 7; 9\\}$.\nCách 2 (Tính chất đặc trưng): $B = \\{x \\in \\mathbb{N} \\mid x \\text{ lẻ}, x < 10\\}$.",
            method: "Xác định miền giá trị và tính chất đặc trưng rồi áp dụng đúng cú pháp."
          }
        ],
        commonTraps: "Quên dùng dấu chấm phẩy ';' giữa các số hoặc viết lặp lại phần tử.",
        socraticPrompt: "Em hãy giải thích sự khác biệt giữa hai cách viết tập hợp và cho ví dụ cụ thể?",
        relatedTheoremsId: "toan6-hk1-tap-hop-luy-thua"
      },
      {
        id: "toan6-c1-b2",
        lessonNumber: "Bài 2",
        title: "Cách ghi số tự nhiên",
        summary: "Hệ thập phân, giá trị của các chữ số và số La Mã.",
        coreConcepts: [
          {
            title: "Biểu diễn số trong hệ thập phân",
            definition: "Số có hai chữ số $\\overline{ab} = 10a + b$. Số có ba chữ số $\\overline{abc} = 100a + 10b + c$.",
            formula: "\\overline{ab} = 10a + b \\quad (a \\neq 0)",
            notes: "Chữ số hàng đầu tiên bên trái luôn phải khác 0."
          },
          {
            title: "Chữ số La Mã",
            definition: "Các chữ số cơ bản: I = 1, V = 5, X = 10. Ghép các kí hiệu để viết số đến 30 (VD: IV = 4, IX = 9, XIV = 14, XXIV = 24).",
            formula: "\\text{IV} = 4, \\quad \\text{VI} = 6, \\quad \\text{IX} = 9, \\quad \\text{XI} = 11",
            notes: "Chữ số nhỏ đứng trước chữ số lớn mang ý nghĩa phép trừ (IV = 5 - 1 = 4)."
          }
        ],
        sampleProblems: [
          {
            problem: "Viết số 29 bằng chữ số La Mã.",
            solution: "$29 = 20 + 9 = \\text{XX} + \\text{IX} = \\text{XXIX}$.",
            method: "Tách thành hàng chục và hàng đơn vị rồi ghép kí hiệu La Mã."
          }
        ],
        commonTraps: "Nhầm lẫn giữa IX (9) và XI (11), hoặc viết 4 chữ số I liền nhau (IIII là sai, phải viết IV).",
        socraticPrompt: "Tại sao trong số La Mã, IX là 9 còn XI là 11? Nguyên tắc ghép số ở đây là gì?"
      },
      {
        id: "toan6-c1-b3",
        lessonNumber: "Bài 3 & 4",
        title: "Thứ tự trong tập hợp số tự nhiên & Phép tính cộng, trừ, nhân, chia",
        summary: "Tập hợp N và N*, tính chất giao hoán, kết hợp, phân phối và phép chia có dư.",
        coreConcepts: [
          {
            title: "Tập số tự nhiên $\\mathbb{N}$ và $\\mathbb{N}^*$",
            definition: "$\\mathbb{N} = \\{0; 1; 2; 3; ...\\}$; $\\mathbb{N}^* = \\{1; 2; 3; ...\\}$ (tập hợp các số tự nhiên khác 0).",
            formula: "\\mathbb{N}^* = \\mathbb{N} \\setminus \\{0\\}",
            notes: "Số 0 là số tự nhiên nhỏ nhất; không có số tự nhiên lớn nhất."
          },
          {
            title: "Tính chất phép toán & Phép chia có dư",
            definition: "Tính chất phân phối: $a(b + c) = ab + ac$. Phép chia: $a = b \\cdot q + r$ với $0 \\le r < b$ ($a$ là số bị chia, $b$ là số chia, $q$ là thương, $r$ là số dư).",
            formula: "a = b \\cdot q + r \\quad (0 \\le r < b, b \\neq 0)",
            notes: "Nếu $r = 0$ thì là phép chia hết; số dư $r$ luôn nhỏ hơn số chia $b$."
          }
        ],
        sampleProblems: [
          {
            problem: "Tính nhanh: $25 \\cdot 64 + 25 \\cdot 36$.",
            solution: "$25 \\cdot (64 + 36) = 25 \\cdot 100 = 2500$.",
            method: "Đặt thừa số chung 25 ra ngoài theo tính chất phân phối."
          }
        ],
        commonTraps: "Khi chia có dư, quên điều kiện số dư luôn phải bé hơn số chia.",
        socraticPrompt: "Khi chia một số cho 6, có những số dư nào có thể xảy ra? Tại sao?"
      },
      {
        id: "toan6-c1-b6",
        lessonNumber: "Bài 6 & 7",
        title: "Lũy thừa với số mũ tự nhiên & Thứ tự thực hiện phép tính",
        summary: "Khái niệm lũy thừa $a^n$, nhân chia lũy thừa cùng cơ số và quy tắc thứ tự ngoặc tròn, vuông, nhọn.",
        coreConcepts: [
          {
            title: "Định nghĩa và công thức lũy thừa",
            definition: "$a^n = a \\cdot a \\cdot ... \\cdot a$ (n thừa số a, $n \\in \\mathbb{N}^*$). $a$ là cơ số, $n$ là số mũ. Quy ước: $a^0 = 1$ ($a \\neq 0$), $a^1 = a$.",
            formula: "a^m \\cdot a^n = a^{m+n}; \\quad a^m : a^n = a^{m-n} \\ (a \\neq 0, m \\ge n)",
            notes: "Cộng số mũ khi nhân, trừ số mũ khi chia hai lũy thừa CÙNG CƠ SỐ."
          },
          {
            title: "Thứ tự thực hiện phép tính",
            definition: "Biểu thức không có dấu ngoặc: Lũy thừa $\\rightarrow$ Nhân, Chia $\\rightarrow$ Cộng, Trừ.\nBiểu thức có dấu ngoặc: Ngoặc tròn $( ) \\rightarrow$ Ngoặc vuông $[ ] \\rightarrow$ Ngoặc nhọn $\\{ \\}$.",
            formula: "( \\dots ) \\implies [ \\dots ] \\implies \\{ \\dots \\}",
            notes: "Nếu chỉ có phép cộng trừ (hoặc chỉ có nhân chia), thực hiện từ trái sang phải."
          }
        ],
        sampleProblems: [
          {
            problem: "Tính giá trị biểu thức: $120 : [ 54 - (50 - 2^3 \\cdot 3) ]$.",
            solution: "1) $2^3 \\cdot 3 = 8 \\cdot 3 = 24$.\n2) Ngoặc tròn: $50 - 24 = 26$.\n3) Ngoặc vuông: $54 - 26 = 28$... và tính lần lượt.",
            method: "Tính lũy thừa trước, sau đó tính từ ngoặc tròn ra ngoặc vuông."
          }
        ],
        commonTraps: "Nhầm $a^m \\cdot a^n = a^{m \\cdot n}$ (sai, phải là $a^{m+n}$) hoặc thực hiện cộng trừ trước nhân chia.",
        socraticPrompt: "Tại sao khi nhân hai lũy thừa cùng cơ số ta lại cộng số mũ chứ không phải nhân số mũ?",
        relatedTheoremsId: "toan6-hk1-tap-hop-luy-thua"
      },
      {
        id: "toan6-c1-b8",
        lessonNumber: "Bài 8, 9 & 10",
        title: "Tính chia hết & Dấu hiệu chia hết cho 2, 3, 5, 9",
        summary: "Tính chất chia hết của một tổng/hiệu và dấu hiệu nhận biết chia hết qua chữ số tận cùng hoặc tổng chữ số.",
        coreConcepts: [
          {
            title: "Tính chất chia hết của một tổng",
            definition: "Nếu $a \\vdots m$ và $b \\vdots m$ thì $(a + b) \\vdots m$ và $(a - b) \\vdots m$.\nNếu $a \\vdots m$ và $b \\not\\vdots m$ thì $(a + b) \\not\\vdots m$.",
            formula: "a \\vdots m, b \\vdots m \\implies (a \\pm b) \\vdots m",
            notes: "Chỉ cần 1 số hạng không chia hết thì tổng không chia hết (nếu các số hạng còn lại chia hết)."
          },
          {
            title: "Dấu hiệu chia hết",
            definition: "Chia hết cho 2: Tận cùng là 0, 2, 4, 6, 8.\nChia hết cho 5: Tận cùng là 0 hoặc 5.\nChia hết cho 3: Tổng các chữ số chia hết cho 3.\nChia hết cho 9: Tổng các chữ số chia hết cho 9.",
            formula: "\\text{Tận cùng } \\in \\{0,2,4,6,8\\} \\iff \\vdots 2; \\quad \\sum \\text{chữ số } \\vdots 9 \\iff \\vdots 9",
            notes: "Số chia hết cho 9 thì chắc chắn chia hết cho 3, nhưng chia hết cho 3 chưa chắc chia hết cho 9."
          }
        ],
        sampleProblems: [
          {
            problem: "Tìm chữ số x để số $\\overline{4x5}$ chia hết cho cả 3 và 5.",
            solution: "Tận cùng là 5 nên luôn chia hết cho 5. Để chia hết cho 3, tổng chữ số $4 + x + 5 = 9 + x$ phải chia hết cho 3 $\\implies x \\in \\{0; 3; 6; 9\\}$.",
            method: "Xét dấu hiệu tận cùng trước, sau đó xét điều kiện tổng chữ số."
          }
        ],
        commonTraps: "Áp dụng nhầm dấu hiệu chia hết cho 3/9 (tổng chữ số) cho số 2/5 (chỉ xét tận cùng).",
        socraticPrompt: "Tại sao dấu hiệu chia hết cho 3 và 9 lại dựa vào tổng các chữ số của một số?",
        relatedTheoremsId: "toan6-hk1-chia-het-3-9"
      },
      {
        id: "toan6-c1-b11",
        lessonNumber: "Bài 11, 12 & 13",
        title: "Số nguyên tố, Hợp số, ƯCLN và BCNN",
        summary: "Phân biệt số nguyên tố và hợp số; thuật toán tìm ƯCLN và BCNN qua phân tích thừa số nguyên tố.",
        coreConcepts: [
          {
            title: "Số nguyên tố & Hợp số",
            definition: "Số nguyên tố là số tự nhiên lớn hơn 1, chỉ có đúng 2 ước là 1 và chính nó. Hợp số là số tự nhiên lớn hơn 1, có nhiều hơn 2 ước. Số 0 và số 1 không là số nguyên tố, không là hợp số.",
            formula: "p \\in \\mathbb{P} \\iff p > 1 \\text{ và Ư}(p) = \\{1; p\\}",
            notes: "Số 2 là số nguyên tố chẵn duy nhất và là số nguyên tố nhỏ nhất."
          },
          {
            title: "Quy tắc tìm ƯCLN và BCNN",
            definition: "ƯCLN: Chọn thừa số nguyên tố CHUNG với số mũ NHỎ NHẤT.\nBCNN: Chọn thừa số nguyên tố CHUNG VÀ RIÊNG với số mũ LỚN NHẤT.\nCông thức liên hệ: $\\text{ƯCLN}(a,b) \\cdot \\text{BCNN}(a,b) = a \\cdot b$.",
            formula: "\\text{ƯCLN lấy mũ MIN; BCNN lấy mũ MAX}",
            notes: "Nếu $a \\vdots b$ thì $\\text{ƯCLN}(a,b) = b$ và $\\text{BCNN}(a,b) = a$."
          }
        ],
        sampleProblems: [
          {
            problem: "Tìm ƯCLN và BCNN của 24 và 36.",
            solution: "$24 = 2^3 \\cdot 3$; $36 = 2^2 \\cdot 3^2$.\n$\\text{ƯCLN}(24, 36) = 2^2 \\cdot 3 = 12$.\n$\\text{BCNN}(24, 36) = 2^3 \\cdot 3^2 = 72$.",
            method: "Phân tích ra thừa số nguyên tố $\\rightarrow$ Áp dụng quy tắc mũ nhỏ nhất cho ƯCLN, mũ lớn nhất cho BCNN."
          }
        ],
        commonTraps: "Lấy nhầm thừa số riêng khi tìm ƯCLN hoặc lấy số mũ nhỏ nhất khi tìm BCNN.",
        socraticPrompt: "Làm thế nào để nhận biết một bài toán đố thực tế yêu cầu tìm ƯCLN hay BCNN?",
        relatedTheoremsId: "toan6-hk1-uoc-va-boi"
      }
    ]
  },

  // =============================================================
  // TOÁN LỚP 6 - TẬP 1: CHƯƠNG II: SỐ NGUYÊN
  // =============================================================
  {
    id: "sgk6-tap1-chuong2",
    grade: 6,
    semester: 1,
    bookVolume: "Tập 1",
    chapterNumber: "Chương II",
    chapterTitle: "Số Nguyên",
    category: "arithmetic",
    categoryName: "Số & Đại số",
    icon: "➖",
    badgeColor: "#0ea5e9",
    description: "Khám phá tập hợp số nguyên Z, trục số, số đối, các phép cộng, trừ, nhân, chia số nguyên và quy tắc dấu ngoặc.",
    mindmap: {
      root: "Tập hợp số nguyên (Z)",
      branches: [
        { name: "Tập hợp & Biểu diễn", items: ["Số nguyên âm, số 0, số nguyên dương", "Trục số nằm ngang", "Số đối (-a)", "So sánh hai số nguyên"] },
        { name: "Cộng & Trừ số nguyên", items: ["Cộng hai số cùng dấu", "Cộng hai số khác dấu", "Phép trừ: a - b = a + (-b)", "Quy tắc dấu ngoặc"] },
        { name: "Nhân & Chia số nguyên", items: ["Nhân cùng dấu (+) ", "Nhân khác dấu (-)", "Quy tắc dấu: (+)·(+)=(+), (-)·(-)=(+), (+)·(-)=(-)"] },
        { name: "Bội và ước của số nguyên", items: ["Khái niệm chia hết trong Z", "Tìm tập ước và tập bội của số nguyên"] }
      ]
    },
    lessons: [
      {
        id: "toan6-c2-b1",
        lessonNumber: "Bài 13 & 14",
        title: "Tập hợp các số nguyên & Thứ tự trong tập hợp số nguyên",
        summary: "Tập hợp Z, số nguyên âm, số đối và so sánh số nguyên trên trục số.",
        coreConcepts: [
          {
            title: "Tập hợp số nguyên $\\mathbb{Z}$",
            definition: "$\\mathbb{Z} = \\{...; -3; -2; -1; 0; 1; 2; 3; ...\\}$ gồm các số nguyên âm, số 0 và các số nguyên dương. Số 0 không là số nguyên dương và cũng không là số nguyên âm.",
            formula: "\\mathbb{Z} = \\mathbb{Z}^- \\cup \\{0\\} \\cup \\mathbb{Z}^+",
            notes: "Mọi số nguyên dương đều lớn hơn 0; mọi số nguyên âm đều nhỏ hơn 0."
          },
          {
            title: "Số đối và so sánh",
            definition: "Hai số nguyên nằm về hai phía của điểm 0 trên trục số và cách đều điểm 0 gọi là hai số đối nhau. Số đối của a là $-a$. Số đối của $-a$ là $a$. Số đối của 0 là 0.",
            formula: "-(-a) = a; \\quad a < b \\implies a \\text{ nằm bên trái } b \\text{ trên trục số}",
            notes: "Trong hai số nguyên âm, số nào có khoảng cách tới 0 lớn hơn thì số đó bé hơn (ví dụ: $-7 < -2$)."
          }
        ],
        sampleProblems: [
          {
            problem: "Sắp xếp các số sau theo thứ tự tăng dần: $5; -8; 0; -3; 12; -15$.",
            solution: "Ta có: $-15 < -8 < -3 < 0 < 5 < 12$.",
            method: "Sắp xếp các số âm trước (theo giá trị độ lớn giảm dần), sau đó đến số 0 và các số dương."
          }
        ],
        commonTraps: "Nghĩ rằng $-15 > -8$ vì $15 > 8$. Thực tế số âm càng xa 0 về bên trái thì càng nhỏ.",
        socraticPrompt: "Tại sao trên trục số, số $-100$ lại nhỏ hơn số $-1$?",
        relatedTheoremsId: "toan6-hk1-cong-tru-so-nguyen"
      },
      {
        id: "toan6-c2-b2",
        lessonNumber: "Bài 15",
        title: "Phép cộng và phép trừ số nguyên. Quy tắc dấu ngoặc",
        summary: "Cộng hai số cùng dấu, cộng hai số khác dấu, phép trừ số nguyên và quy tắc bỏ ngoặc / đặt ngoặc.",
        coreConcepts: [
          {
            title: "Quy tắc cộng hai số nguyên",
            definition: "Cùng dấu: Cộng hai phần tự nhiên rồi đặt dấu chung trước kết quả.\nKhác dấu (không đối nhau): Lấy số lớn hơn trừ số bé hơn rồi đặt dấu của số có phần tự nhiên lớn hơn trước kết quả.",
            formula: "(-a) + (-b) = -(a+b); \\quad a + (-b) = a - b \\ (a > b)",
            notes: "Tổng của hai số nguyên đối nhau luôn bằng 0: $a + (-a) = 0$."
          },
          {
            title: "Phép trừ & Quy tắc dấu ngoặc",
            definition: "Muốn trừ số nguyên a cho số nguyên b, ta cộng a với số đối của b: $a - b = a + (-b)$.\nKhi bỏ dấu ngoặc có dấu '+' đằng trước, giữ nguyên dấu các số hạng. Khi bỏ ngoặc có dấu '-' đằng trước, PHẢI ĐỔI DẤU tất cả các số hạng bên trong.",
            formula: "-(a + b - c) = -a - b + c",
            notes: "Đổi dấu: '+' thành '-' và '-' thành '+'."
          }
        ],
        sampleProblems: [
          {
            problem: "Tính hợp lý: $A = (125 - 45) - (125 - 45 + 70)$.",
            solution: "$A = 125 - 45 - 125 + 45 - 70 = (125 - 125) + (-45 + 45) - 70 = 0 + 0 - 70 = -70$.",
            method: "Phá ngoặc có dấu '-' đằng trước và đổi dấu toàn bộ các số hạng bên trong để triệt tiêu các cặp số đối."
          }
        ],
        commonTraps: "Quên đổi dấu số hạng thứ hai hoặc thứ ba khi phá ngoặc có dấu trừ đằng trước.",
        socraticPrompt: "Hãy giải thích tại sao phép trừ $a - b$ lại tương đương với phép cộng $a + (-b)$?",
        relatedTheoremsId: "toan6-hk1-quy-tac-dau-ngoac"
      },
      {
        id: "toan6-c2-b3",
        lessonNumber: "Bài 16 & 17",
        title: "Phép nhân và phép chia hết hai số nguyên. Bội và ước",
        summary: "Quy tắc nhân chia hai số nguyên cùng dấu, khác dấu; khái niệm bội và ước của số nguyên.",
        coreConcepts: [
          {
            title: "Quy tắc dấu trong phép nhân & chia",
            definition: "Dương × Dương = Dương; Âm × Âm = Dương.\nDương × Âm = Âm; Âm × Dương = Âm.",
            formula: "(+) \\cdot (+) = (+); \\quad (-) \\cdot (-) = (+); \\quad (+) \\cdot (-) = (-)",
            notes: "Tích của một số chẵn các thừa số nguyên âm là số dương; tích của một số lẻ các thừa số nguyên âm là số âm."
          },
          {
            title: "Bội và ước của một số nguyên",
            definition: "Cho $a, b \\in \\mathbb{Z} (b \\neq 0)$. Nếu có số nguyên q sao cho $a = b \\cdot q$ thì a chia hết cho b, ta nói a là bội của b và b là ước của a.",
            formula: "a \\vdots b \\iff a = b \\cdot q \\ (q \\in \\mathbb{Z})",
            notes: "Nếu d là ước của a thì $-d$ cũng là ước của a. Số 0 là bội của mọi số nguyên khác 0."
          }
        ],
        sampleProblems: [
          {
            problem: "Tìm tất cả các ước nguyên của số 6.",
            solution: "Các ước tự nhiên của 6 là 1, 2, 3, 6. Do đó tập hợp các ước nguyên của 6 là: $\\text{Ư}(6) = \\{\\pm 1; \\pm 2; \\pm 3; \\pm 6\\}$.",
            method: "Tìm các ước dương rồi lấy thêm các số đối tương ứng."
          }
        ],
        commonTraps: "Quên lấy các ước số âm khi đề bài yêu cầu tìm ước trong tập số nguyên Z.",
        socraticPrompt: "Tích của 5 số nguyên âm là số âm hay số dương? Quy tắc tổng quát ở đây là gì?"
      }
    ]
  },

  // =============================================================
  // TOÁN LỚP 6 - TẬP 1: CHƯƠNG III: HÌNH HỌC TRỰC QUAN
  // =============================================================
  {
    id: "sgk6-tap1-chuong3",
    grade: 6,
    semester: 1,
    bookVolume: "Tập 1",
    chapterNumber: "Chương III & IV",
    chapterTitle: "Hình Học Trực Quan & Tính Đối Xứng",
    category: "geometry",
    categoryName: "Hình học & Đo lường",
    icon: "📐",
    badgeColor: "#10b981",
    description: "Nhận biết đặc điểm, công thức tính chu vi và diện tích: Tam giác đều, hình vuông, hình chữ nhật, hình thoi, hình bình hành, hình thang cân; Trục đối xứng và tâm đối xứng.",
    mindmap: {
      root: "Hình học trực quan lớp 6",
      branches: [
        { name: "Hình cơ bản", items: ["Tam giác đều (3 cạnh bằng nhau, 3 góc 60°)", "Hình vuông (4 cạnh bằng nhau, 4 góc vuông)", "Lục giác đều (6 cạnh bằng nhau, 6 tam giác đều)"] },
        { name: "Tứ giác đặc biệt", items: ["Hình chữ nhật & Hình thoi", "Hình bình hành", "Hình thang cân"] },
        { name: "Chu vi & Diện tích", items: ["Chữ nhật: C = 2(a+b), S = a·b", "Thoi: S = 1/2 · d1 · d2", "Bình hành: S = a·h", "Thang: S = 1/2 · (a+b) · h"] },
        { name: "Đối xứng", items: ["Trục đối xứng (Gấp đôi trùng khít)", "Tâm đối xứng (Quay 180° trùng khít)"] }
      ]
    },
    lessons: [
      {
        id: "toan6-c3-b1",
        lessonNumber: "Bài 18 & 19",
        title: "Các hình phẳng trong thực tiễn: Hình chữ nhật, hình thoi, hình bình hành, hình thang cân",
        summary: "Đặc điểm cạnh, góc, đường chéo và cách vẽ các hình phẳng cơ bản.",
        coreConcepts: [
          {
            title: "Hình thoi & Hình bình hành",
            definition: "Hình bình hành có 2 cặp cạnh đối song song và bằng nhau; 2 đường chéo cắt nhau tại trung điểm mỗi đường.\nHình thoi có 4 cạnh bằng nhau; 2 đường chéo vuông góc với nhau tại trung điểm.",
            formula: "\\text{Hình thoi: } AB = BC = CD = DA, \\ AC \\perp BD",
            notes: "Hình thoi vừa là hình bình hành, vừa có tính chất đặc biệt 2 đường chéo vuông góc."
          },
          {
            title: "Hình thang cân",
            definition: "Hình thang có 2 cạnh đáy song song, 2 cạnh bên bằng nhau, 2 góc kề một đáy bằng nhau, 2 đường chéo bằng nhau.",
            formula: "AB \\parallel CD, \\ AD = BC, \\ AC = BD",
            notes: "2 cạnh bên của hình thang cân không song song (trừ trường hợp hình chữ nhật)."
          }
        ],
        sampleProblems: [
          {
            problem: "Nêu các yếu tố bằng nhau trong hình thoi ABCD có hai đường chéo cắt nhau tại O.",
            solution: "1) 4 cạnh: $AB = BC = CD = DA$.\n2) Các cạnh đối song song: $AB \\parallel CD, AD \\parallel BC$.\n3) Hai đường chéo vuông góc tại O: $AC \\perp BD$ và $OA = OC, OB = OD$.",
            method: "Liệt kê đầy đủ theo cạnh, góc và đường chéo."
          }
        ],
        commonTraps: "Nhầm lẫn giữa tính chất đường chéo của hình bình hành (chỉ cắt nhau tại trung điểm) và hình chữ nhật (hai đường chéo bằng nhau) / hình thoi (hai đường chéo vuông góc).",
        socraticPrompt: "Hai đường chéo của hình thoi có điểm gì đặc biệt so với hai đường chéo của hình chữ nhật?"
      },
      {
        id: "toan6-c3-b2",
        lessonNumber: "Bài 20",
        title: "Chu vi và diện tích một số tứ giác đã học",
        summary: "Công thức tính chu vi và diện tích hình chữ nhật, hình vuông, hình bình hành, hình thoi, hình thang cân.",
        coreConcepts: [
          {
            title: "Bảng công thức diện tích",
            definition: "Hình chữ nhật: $S = a \\cdot b$\nHình vuông: $S = a^2$\nHình bình hành: $S = a \\cdot h$ ($a$ là cạnh đáy, $h$ là chiều cao tương ứng)\nHình thoi: $S = \\frac{1}{2} d_1 \\cdot d_2$ ($d_1, d_2$ là độ dài hai đường chéo)\nHình thang: $S = \\frac{(a+b) \\cdot h}{2}$",
            formula: "S_{\\text{thoi}} = \\frac{1}{2} d_1 d_2; \\quad S_{\\text{thang}} = \\frac{(a+b)h}{2}",
            notes: "Đơn vị đo độ dài của các kích thước phải đồng nhất trước khi tính diện tích."
          }
        ],
        sampleProblems: [
          {
            problem: "Một mảnh vườn hình thoi có độ dài hai đường chéo là 8m và 6m. Tính diện tích mảnh vườn.",
            solution: "Diện tích mảnh vườn là: $S = \\frac{1}{2} \\cdot 8 \\cdot 6 = 24 \\text{ (m}^2\\text{)}$.",
            method: "Áp dụng công thức diện tích hình thoi bằng nửa tích hai đường chéo."
          }
        ],
        commonTraps: "Quên chia 2 trong công thức diện tích hình thoi và diện tích hình thang.",
        socraticPrompt: "Tại sao diện tích hình thoi lại bằng một nửa tích hai đường chéo? Em hãy giải thích bằng cách ghép hình?",
        relatedTheoremsId: "toan6-hk1-dien-tich-hinh-phang"
      },
      {
        id: "toan6-c3-b3",
        lessonNumber: "Bài 21 & 22",
        title: "Hình có trục đối xứng & Hình có tâm đối xứng",
        summary: "Nhận biết trục đối xứng và tâm đối xứng của các hình trong tự nhiên và hình học.",
        coreConcepts: [
          {
            title: "Trục đối xứng & Tâm đối xứng",
            definition: "Trục đối xứng: Đường thẳng d chia hình thành hai phần mà khi gấp theo d thì hai phần trùng khít nhau.\nTâm đối xứng: Điểm O sao cho khi quay hình 180° quanh O thì hình thu được trùng khít với hình ban đầu.",
            formula: "\\text{Hình tròn: vô số trục đối xứng, tâm là tâm hình tròn}",
            notes: "Hình chữ nhật có 2 trục đối xứng và 1 tâm đối xứng. Tam giác đều có 3 trục đối xứng nhưng KHÔNG có tâm đối xứng."
          }
        ],
        sampleProblems: [
          {
            problem: "Trong các chữ cái in hoa sau: H, A, N, O, I; chữ nào vừa có trục đối xứng vừa có tâm đối xứng?",
            solution: "Chữ H và chữ O vừa có trục đối xứng vừa có tâm đối xứng.",
            method: "Kiểm tra thao tác gấp đôi (trục đối xứng) và thao tác quay 180° (tâm đối xứng)."
          }
        ],
        commonTraps: "Nghĩ rằng đường chéo của hình chữ nhật là trục đối xứng (sai, trục đối xứng của hình chữ nhật là 2 đường nối trung điểm các cạnh đối).",
        socraticPrompt: "Hình bình hành có trục đối xứng không? Có tâm đối xứng không? Tại sao?"
      }
    ]
  },

  // =============================================================
  // TOÁN LỚP 6 - TẬP 2: CHƯƠNG V & VI: PHÂN SỐ & SỐ THẬP PHÂN
  // =============================================================
  {
    id: "sgk6-tap2-chuong5",
    grade: 6,
    semester: 2,
    bookVolume: "Tập 2",
    chapterNumber: "Chương V & VI",
    chapterTitle: "Phân Số & Số Thập Phân",
    category: "arithmetic",
    categoryName: "Số & Đại số",
    icon: "🍰",
    badgeColor: "#f59e0b",
    description: "Mở rộng phân số với tử và mẫu nguyên, phân số bằng nhau, quy đồng mẫu, 4 phép tính phân số, số thập phân và 2 bài toán cơ bản về phân số / tỉ số.",
    mindmap: {
      root: "Phân số & Số thập phân",
      branches: [
        { name: "Phân số cơ bản", items: ["Định nghĩa a/b (b≠0, a,b ∈ Z)", "Phân số bằng nhau: a·d = b·c", "Tính chất cơ bản: rút gọn & quy đồng"] },
        { name: "Phép tính phân số", items: ["Cộng & Trừ (quy đồng mẫu dương)", "Nhân: tử×tử, mẫu×mẫu", "Chia: nhân nghịch đảo a/b : c/d = a/b · d/c"] },
        { name: "Số thập phân & Tỉ số", items: ["Số thập phân âm & dương", "Làm tròn & ước lượng", "Tỉ số & Tỉ số phần trăm (%)"] },
        { name: "2 Bài toán cơ bản", items: ["Tìm m/n của số a: a · m/n", "Tìm một số biết m/n của nó bằng b: b : m/n"] }
      ]
    },
    lessons: [
      {
        id: "toan6-c5-b1",
        lessonNumber: "Bài 23 & 24",
        title: "Phân số bằng nhau. Tính chất cơ bản của phân số & So sánh phân số",
        summary: "Điều kiện hai phân số bằng nhau, rút gọn về phân số tối giản và so sánh phân số.",
        coreConcepts: [
          {
            title: "Định nghĩa phân số bằng nhau",
            definition: "Hai phân số $\\frac{a}{b}$ và $\\frac{c}{d}$ gọi là bằng nhau nếu $a \\cdot d = b \\cdot c$ ($b, d \\neq 0$).",
            formula: "\\frac{a}{b} = \\frac{c}{d} \\iff a \\cdot d = b \\cdot c",
            notes: "Tính chất: $\\frac{a}{b} = \\frac{a \\cdot m}{b \\cdot m} = \\frac{a : n}{b : n}$ ($m \\neq 0$, $n \\in \\text{ƯC}(a,b)$)."
          },
          {
            title: "Quy đồng mẫu số và so sánh",
            definition: "Muốn so sánh hai phân số không cùng mẫu, ta viết chúng dưới dạng hai phân số có cùng mẫu DƯƠNG rồi so sánh các tử số (tử lớn hơn thì phân số lớn hơn).",
            formula: "\\frac{a}{m} < \\frac{b}{m} \\iff a < b \\quad (m > 0)",
            notes: "Luôn đổi phân số về mẫu dương trước khi quy đồng mẫu hoặc so sánh."
          }
        ],
        sampleProblems: [
          {
            problem: "Tìm số nguyên x biết: $\\frac{x}{15} = \\frac{-4}{5}$.",
            solution: "Ta có: $x \\cdot 5 = 15 \\cdot (-4) \\implies 5x = -60 \\implies x = -12$.",
            method: "Áp dụng tích chéo của hai phân số bằng nhau $a \\cdot d = b \\cdot c$."
          }
        ],
        commonTraps: "So sánh hai phân số khi mẫu còn âm dẫn đến kết luận ngược chiều.",
        socraticPrompt: "Tại sao khi so sánh hai phân số có cùng mẫu số, ta bắt buộc phải đưa mẫu số về số dương?",
        relatedTheoremsId: "toan6-hk2-hai-bai-toan-phan-so"
      },
      {
        id: "toan6-c5-b2",
        lessonNumber: "Bài 25, 26 & 27",
        title: "Phép tính phân số & Hai bài toán về phân số",
        summary: "Cộng, trừ, nhân, chia phân số và giải 2 dạng toán đố thực tế về phân số.",
        coreConcepts: [
          {
            title: "Quy tắc phép toán phân số",
            definition: "Nhân: $\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$.\nChia: $\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c} = \\frac{a \\cdot d}{b \\cdot c}$ ($c, d \\neq 0$).",
            formula: "\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}",
            notes: "Phân số nghịch đảo của $\\frac{c}{d}$ là $\\frac{d}{c}$ ($c, d \\neq 0$)."
          },
          {
            title: "Hai bài toán cơ bản về phân số",
            definition: "Bài toán 1: Tìm $\\frac{m}{n}$ của số $a \\implies$ Tính $a \\cdot \\frac{m}{n}$.\nBài toán 2: Tìm một số biết $\\frac{m}{n}$ của nó bằng $b \\implies$ Tính $b : \\frac{m}{n}$.",
            formula: "\\text{Dạng 1: } a \\cdot \\frac{m}{n}; \\quad \\text{Dạng 2: } b : \\frac{m}{n}",
            notes: "Phân biệt kỹ: 'tìm của' là phép nhân; 'biết giá trị tìm số ban đầu' là phép chia."
          }
        ],
        sampleProblems: [
          {
            problem: "Một lớp học có 40 học sinh, trong đó $\\frac{3}{5}$ số học sinh là nữ. Hỏi lớp có bao nhiêu học sinh nam?",
            solution: "Số học sinh nữ là: $40 \\cdot \\frac{3}{5} = 24$ (học sinh).\nSố học sinh nam là: $40 - 24 = 16$ (học sinh).",
            method: "Áp dụng bài toán 1: Tìm giá trị phân số của một số."
          }
        ],
        commonTraps: "Nhầm lẫn giữa phép nhân ở bài toán 1 và phép chia ở bài toán 2.",
        socraticPrompt: "Làm thế nào để phân biệt khi nào dùng phép nhân $a \\cdot \\frac{m}{n}$ và khi nào dùng phép chia $b : \\frac{m}{n}$?",
        relatedTheoremsId: "toan6-hk2-hai-bai-toan-phan-so"
      },
      {
        id: "toan6-c6-b1",
        lessonNumber: "Bài 28, 29, 30 & 31",
        title: "Số thập phân, Làm tròn & Tỉ số phần trăm",
        summary: "Phép tính số thập phân, quy tắc làm tròn số và các bài toán tỉ số phần trăm.",
        coreConcepts: [
          {
            title: "Tỉ số và Tỉ số phần trăm",
            definition: "Tỉ số của a và b ($b \\neq 0$) là $\\frac{a}{b}$. Tỉ số phần trăm của a và b là: $\\frac{a \\cdot 100}{b}\\%$.",
            formula: "\\text{Tỉ số phần trăm} = \\frac{a}{b} \\cdot 100\\%",
            notes: "Khi tìm tỉ số của hai đại lượng, chúng phải cùng một đơn vị đo."
          },
          {
            title: "Quy tắc làm tròn số",
            definition: "Nếu chữ số ngay sau hàng làm tròn nhỏ hơn 5 thì giữ nguyên; nếu lớn hơn hoặc bằng 5 thì cộng thêm 1 vào chữ số hàng làm tròn.",
            formula: "3,14159... \\approx 3,14 \\text{ (làm tròn đến chữ số thập phân thứ hai)}",
            notes: "Các chữ số sau hàng làm tròn thay bằng 0 (nếu ở phần nguyên) hoặc bỏ đi (nếu ở phần thập phân)."
          }
        ],
        sampleProblems: [
          {
            problem: "Một cửa hàng giảm giá chiếc áo từ 200.000đ xuống còn 160.000đ. Hỏi chiếc áo đã được giảm giá bao nhiêu phần trăm?",
            solution: "Số tiền giảm là: $200.000 - 160.000 = 40.000$đ.\nPhần trăm giảm giá: $\\frac{40.000}{200.000} \\cdot 100\\% = 20\\%$.",
            method: "Tính độ chênh lệch rồi lập tỉ số phần trăm so với giá ban đầu."
          }
        ],
        commonTraps: "Chia cho giá sau khi giảm thay vì chia cho giá gốc ban đầu khi tính phần trăm giảm giá.",
        socraticPrompt: "Khi tính phần trăm tăng/giảm giá, tại sao ta luôn phải so với mức giá ban đầu?"
      }
    ]
  },

  // =============================================================
  // TOÁN LỚP 6 - TẬP 2: CHƯƠNG VII & VIII: HÌNH HỌC PHẲNG & THỐNG KÊ XÁC SUẤT
  // =============================================================
  {
    id: "sgk6-tap2-chuong7",
    grade: 6,
    semester: 2,
    bookVolume: "Tập 2",
    chapterNumber: "Chương VII & VIII",
    chapterTitle: "Hình Học Cơ Bản & Xác Suất Thống Kê",
    category: "geometry",
    categoryName: "Hình học & Xác suất",
    icon: "🎲",
    badgeColor: "#8b5cf6",
    description: "Điểm, đường thẳng, tia, đoạn thẳng, trung điểm, góc và số đo góc; Bảng số liệu, biểu đồ cột/cột kép và xác suất thực nghiệm.",
    mindmap: {
      root: "Hình cơ bản & Thống kê 6",
      branches: [
        { name: "Hình học cơ bản", items: ["Điểm & Đường thẳng", "Điểm nằm giữa & Tia Ox, Oy", "Đoạn thẳng & Trung điểm M (MA = MB = AB/2)", "Góc nhọn, góc vuông, góc tù, góc bẹt (180°)"] },
        { name: "Thống kê", items: ["Thu thập & Phân loại dữ liệu", "Bảng số liệu & Biểu đồ tranh", "Biểu đồ cột & Biểu đồ cột kép"] },
        { name: "Xác suất thực nghiệm", items: ["Phép thử nghiệm & Sự kiện", "Xác suất = (Số lần xuất hiện sự kiện) / (Tổng số lần thử)"] }
      ]
    },
    lessons: [
      {
        id: "toan6-c7-b1",
        lessonNumber: "Bài 32, 33, 34 & 35",
        title: "Điểm, đường thẳng, tia, đoạn thẳng & Góc",
        summary: "Khái niệm trung điểm của đoạn thẳng, điều kiện cộng đoạn thẳng và các loại góc.",
        coreConcepts: [
          {
            title: "Trung điểm của đoạn thẳng",
            definition: "Trung điểm M của đoạn thẳng AB là điểm nằm giữa A, B và cách đều A, B ($MA = MB = \\frac{AB}{2}$).",
            formula: "M \\text{ là trung điểm } AB \\iff M \\text{ nằm giữa } A, B \\text{ và } MA = MB = \\frac{AB}{2}",
            notes: "Thiếu 1 trong 2 điều kiện (nằm giữa HOẶC cách đều) thì M không phải là trung điểm."
          },
          {
            title: "Phân loại góc theo số đo",
            definition: "Góc nhọn: $0^\\circ < \\alpha < 90^\\circ$\nGóc vuông: $\\alpha = 90^\\circ$\nGóc tù: $90^\\circ < \\alpha < 180^\\circ$\nGóc bẹt: $\\alpha = 180^\\circ$",
            formula: "\\text{Góc bẹt: } 180^\\circ; \\quad \\text{Góc vuông: } 90^\\circ",
            notes: "Hai góc kề bù có tổng số đo bằng $180^\\circ$."
          }
        ],
        sampleProblems: [
          {
            problem: "Cho đoạn thẳng $AB = 8\\text{cm}$. Gọi M là trung điểm của AB. Tính độ dài đoạn thẳng AM.",
            solution: "Vì M là trung điểm của AB nên: $AM = \\frac{AB}{2} = \\frac{8}{2} = 4\\text{cm}$.",
            method: "Áp dụng định nghĩa trung điểm của đoạn thẳng."
          }
        ],
        commonTraps: "Chỉ ghi $MA = MB$ mà không chứng minh M nằm giữa A và B.",
        socraticPrompt: "Nếu có 3 điểm A, M, B thỏa mãn $MA = MB = 4\\text{cm}$ và $AB = 6\\text{cm}$, thì M có là trung điểm của AB không? Tại sao?"
      },
      {
        id: "toan6-c8-b1",
        lessonNumber: "Bài 38, 39, 40 & 41",
        title: "Thu thập dữ liệu, Biểu đồ cột kép & Xác suất thực nghiệm",
        summary: "Đọc phân tích biểu đồ cột kép và tính xác suất thực nghiệm của một sự kiện.",
        coreConcepts: [
          {
            title: "Xác suất thực nghiệm",
            definition: "Xác suất thực nghiệm xuất hiện một sự kiện = (Số lần sự kiện xảy ra) : (Tổng số lần thực hiện phép thử).",
            formula: "P_{\\text{thực nghiệm}} = \\frac{k}{n} \\quad (k \\text{ là số lần xuất hiện}, n \\text{ là tổng số lần thử})",
            notes: "Khi số lần thử càng lớn thì xác suất thực nghiệm càng gần với xác suất lí thuyết."
          }
        ],
        sampleProblems: [
          {
            problem: "Gieo một con xúc xắc 50 lần, thấy mặt 6 chấm xuất hiện 8 lần. Tính xác suất thực nghiệm xuất hiện mặt 6 chấm.",
            solution: "Xác suất thực nghiệm là: $\\frac{8}{50} = \\frac{4}{25} = 0,16 = 16\\%$.",
            method: "Lập tỉ số giữa số lần xuất hiện và tổng số lần gieo."
          }
        ],
        commonTraps: "Lấy số lần xuất hiện chia cho 6 (số mặt) thay vì chia cho tổng số lần gieo thực tế.",
        socraticPrompt: "Xác suất thực nghiệm khác xác suất lí thuyết ở điểm nào?"
      }
    ]
  },

  // =============================================================
  // TOÁN LỚP 7 - TẬP 1 (HỌC KÌ 1)
  // =============================================================
  {
    id: "sgk7-tap1-chuong1",
    grade: 7,
    semester: 1,
    bookVolume: "Tập 1",
    chapterNumber: "Chương I",
    chapterTitle: "Số Hữu Tỉ",
    category: "arithmetic",
    categoryName: "Số & Đại số",
    icon: "ℚ",
    badgeColor: "#4f46e5",
    description: "Tập hợp các số hữu tỉ Q, biểu diễn trên trục số, 4 phép tính, lũy thừa với số mũ tự nhiên của số hữu tỉ và quy tắc dấu ngoặc.",
    mindmap: {
      root: "Tập hợp số hữu tỉ (Q)",
      branches: [
        { name: "Khái niệm số hữu tỉ", items: ["Dạng a/b (a, b ∈ Z, b ≠ 0)", "Biểu diễn trên trục số", "Số đối của số hữu tỉ: -x"] },
        { name: "Phép tính trên Q", items: ["Cộng & Trừ (quy đồng mẫu)", "Nhân & Chia (nghịch đảo)", "Tính chất phân phối a(b+c) = ab+ac"] },
        { name: "Lũy thừa số hữu tỉ", items: ["(x/y)^n = x^n / y^n", "x^m · x^n = x^(m+n)", "x^m : x^n = x^(m-n)", "(x^m)^n = x^(m·n)"] },
        { name: "Quy tắc dấu ngoặc", items: ["Bỏ ngoặc trước có dấu '+': giữ nguyên", "Bỏ ngoặc trước có dấu '-': đổi dấu"] }
      ]
    },
    lessons: [
      {
        id: "toan7-c1-b1",
        lessonNumber: "Bài 1 & 2",
        title: "Tập hợp các số hữu tỉ & Các phép tính với số hữu tỉ",
        summary: "Định nghĩa số hữu tỉ, biểu diễn trên trục số, so sánh và các phép tính cộng, trừ, nhân, chia.",
        coreConcepts: [
          {
            title: "Định nghĩa số hữu tỉ",
            definition: "Số hữu tỉ là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\neq 0$. Tập hợp các số hữu tỉ được kí hiệu là $\\mathbb{Q}$.",
            formula: "\\mathbb{Q} = \\left\\{ \\frac{a}{b} \\ \\middle| \\ a, b \\in \\mathbb{Z}, b \\neq 0 \\right\\}",
            notes: "Mọi số tự nhiên, số nguyên, phân số và số thập phân hữu hạn đều là số hữu tỉ: $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q}$."
          },
          {
            title: "Phép tính trên $\\mathbb{Q}$",
            definition: "Cộng, trừ, nhân, chia số hữu tỉ thực hiện tương tự như phân số. Thứ tự ưu tiên phép tính và quy tắc dấu ngoặc hoàn toàn giống trong $\\mathbb{Z}$.",
            formula: "x + y = \\frac{a}{m} + \\frac{b}{m} = \\frac{a+b}{m}; \\quad x \\cdot y = \\frac{a \\cdot c}{b \\cdot d}",
            notes: "Với $y \\neq 0$, phép chia: $x : y = x \\cdot \\frac{1}{y}$."
          }
        ],
        sampleProblems: [
          {
            problem: "Tính: $A = -\\frac{2}{3} + \\frac{5}{6} \\cdot \\left( -\\frac{3}{10} \\right)$.",
            solution: "1) Nhân trước: $\\frac{5}{6} \\cdot \\left( -\\frac{3}{10} \\right) = -\\frac{1}{4}$.\n2) Cộng: $-\\frac{2}{3} + \\left( -\\frac{1}{4} \\right) = -\\frac{8}{12} - \\frac{3}{12} = -\\frac{11}{12}$.",
            method: "Thực hiện phép nhân trước, quy đồng mẫu số rồi thực hiện phép cộng."
          }
        ],
        commonTraps: "Cộng trừ trước khi nhân chia hoặc quên rút gọn phân số sau khi tính.",
        socraticPrompt: "Số 0,75 và số $-3$ có phải là số hữu tỉ không? Tại sao?",
        relatedTheoremsId: "toan7-hk1-luy-thua-so-huu-ti"
      },
      {
        id: "toan7-c1-b3",
        lessonNumber: "Bài 3 & 4",
        title: "Lũy thừa của một số hữu tỉ & Quy tắc dấu ngoặc",
        summary: "Công thức lũy thừa của tích, thương, lũy thừa của lũy thừa và quy tắc chuyển vế.",
        coreConcepts: [
          {
            title: "Các công thức lũy thừa số hữu tỉ",
            definition: "Tích 2 lũy thừa cùng cơ số: $x^m \\cdot x^n = x^{m+n}$\nThương 2 lũy thừa cùng cơ số: $x^m : x^n = x^{m-n}$ ($x \\neq 0, m \\ge n$)\nLũy thừa của lũy thừa: $(x^m)^n = x^{m \\cdot n}$\nLũy thừa của một tích / một thương: $(x \\cdot y)^n = x^n \\cdot y^n; \\quad \\left(\\frac{x}{y}\\right)^n = \\frac{x^n}{y^n}$ ($y \\neq 0$).",
            formula: "(x^m)^n = x^{m \\cdot n}; \\quad (x \\cdot y)^n = x^n \\cdot y^n",
            notes: "Quy ước: $x^0 = 1$ ($x \\neq 0$); $x^1 = x$."
          },
          {
            title: "Quy tắc chuyển vế",
            definition: "Khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức, ta phải đổi dấu số hạng đó: '+' đổi thành '-' và '-' đổi thành '+'.",
            formula: "x + a = b \\iff x = b - a",
            notes: "Áp dụng cực kì phổ biến trong các bài toán tìm x."
          }
        ],
        sampleProblems: [
          {
            problem: "Tìm x biết: $x - \\frac{1}{2} = -\\frac{3}{4}$.",
            solution: "Chuyển vế $-\\frac{1}{2}$ sang vế phải thành $+\\frac{1}{2}$:\n$x = -\\frac{3}{4} + \\frac{1}{2} = -\\frac{3}{4} + \\frac{2}{4} = -\\frac{1}{4}$.",
            method: "Áp dụng quy tắc chuyển vế đổi dấu."
          }
        ],
        commonTraps: "Nhầm lẫn giữa $(x^m)^n = x^{m \\cdot n}$ và $x^m \\cdot x^n = x^{m+n}$ (rất hay lấy $m \\cdot n$ khi nhân 2 lũy thừa).",
        socraticPrompt: "Tại sao $(2^3)^2 = 2^6$ nhưng $2^3 \\cdot 2^2 = 2^5$? Giải thích sự khác nhau của 2 công thức này?",
        relatedTheoremsId: "toan7-hk1-luy-thua-so-huu-ti"
      }
    ]
  },

  // =============================================================
  // TOÁN LỚP 7 - TẬP 1: CHƯƠNG II: SỐ THỰC
  // =============================================================
  {
    id: "sgk7-tap1-chuong2",
    grade: 7,
    semester: 1,
    bookVolume: "Tập 1",
    chapterNumber: "Chương II",
    chapterTitle: "Số Thực",
    category: "arithmetic",
    categoryName: "Số & Đại số",
    icon: "ℝ",
    badgeColor: "#0ea5e9",
    description: "Số thập phân vô hạn tuần hoàn, số vô tỉ I, căn bậc hai số học, tập hợp số thực R, giá trị tuyệt đối và làm tròn số.",
    mindmap: {
      root: "Tập hợp số thực (R)",
      branches: [
        { name: "Số vô tỉ (I)", items: ["Số thập phân vô hạn không tuần hoàn", "Ví dụ: √2, √3, π = 3.14159..."] },
        { name: "Căn bậc hai số học", items: ["√a = x (x ≥ 0 và x² = a)", "Điều kiện: a ≥ 0", "(√a)² = a"] },
        { name: "Tập số thực R", items: ["R = Q ∪ I", "Trục số thực lấp đầy liên tục", "Giá trị tuyệt đối |x|"] },
        { name: "Làm tròn & Ước lượng", items: ["Quy tắc làm tròn với độ chính xác d", "Ước lượng kết quả phép tính"] }
      ]
    },
    lessons: [
      {
        id: "toan7-c2-b1",
        lessonNumber: "Bài 5 & 6",
        title: "Số thập phân vô hạn tuần hoàn, Số vô tỉ & Căn bậc hai số học",
        summary: "Phân biệt số hữu tỉ (tuần hoàn) và số vô tỉ (không tuần hoàn), định nghĩa căn bậc hai số học.",
        coreConcepts: [
          {
            title: "Căn bậc hai số học",
            definition: "Căn bậc hai số học của số không âm a là số không âm x sao cho $x^2 = a$, kí hiệu là $\\sqrt{a}$.",
            formula: "x = \\sqrt{a} \\iff x \\ge 0 \\text{ và } x^2 = a \\quad (a \\ge 0)",
            notes: "Số âm KHÔNG có căn bậc hai số học. $\\sqrt{0} = 0$."
          },
          {
            title: "Số vô tỉ $\\mathbb{I}$",
            definition: "Số vô tỉ là số viết được dưới dạng số thập phân vô hạn KHÔNG tuần hoàn (như $\\sqrt{2} \\approx 1,4142...$, $\\pi \\approx 3,14159...$).",
            formula: "\\mathbb{I}: \\text{Số thập phân vô hạn không tuần hoàn}",
            notes: "Số vô tỉ không thể viết được dưới dạng phân số $\\frac{a}{b}$ ($a, b \\in \\mathbb{Z}$)."
          }
        ],
        sampleProblems: [
          {
            problem: "Tính giá trị của: $\\sqrt{81} - \\sqrt{0,25}$.",
            solution: "Ta có: $\\sqrt{81} = 9$ (vì $9^2 = 81$ và $9 > 0$), $\\sqrt{0,25} = 0,5$ (vì $0,5^2 = 0,25$).\nDo đó: $9 - 0,5 = 8,5$.",
            method: "Tìm số dương bình phương lên bằng số dưới dấu căn."
          }
        ],
        commonTraps: "Ghi $\\sqrt{16} = \\pm 4$ (sai, căn bậc hai số học $\\sqrt{16}$ chỉ bằng 4).",
        socraticPrompt: "Tại sao $\\sqrt{a}$ chỉ xác định khi $a \\ge 0$? Có số thực nào bình phương bằng $-9$ không?",
        relatedTheoremsId: "toan7-hk1-can-bac-hai"
      },
      {
        id: "toan7-c2-b2",
        lessonNumber: "Bài 7 & 8",
        title: "Tập hợp các số thực & Giá trị tuyệt đối của một số thực",
        summary: "Cấu trúc tập số thực R, ý nghĩa hình học và công thức giá trị tuyệt đối $|x|$.",
        coreConcepts: [
          {
            title: "Tập hợp số thực $\\mathbb{R}$ & Giá trị tuyệt đối",
            definition: "Tập hợp số thực gồm cả số hữu tỉ và số vô tỉ: $\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$.\nGiá trị tuyệt đối của số thực x là khoảng cách từ điểm x đến điểm 0 trên trục số:\n$|x| = x$ nếu $x \\ge 0$; $|x| = -x$ nếu $x < 0$.",
            formula: "|x| = \\begin{cases} x & \\text{khi } x \\ge 0 \\\\ -x & \\text{khi } x < 0 \\end{cases}; \\quad |x| \\ge 0 \\ \\forall x",
            notes: "$|-x| = |x|$; $|x|^2 = x^2$."
          }
        ],
        sampleProblems: [
          {
            problem: "Tìm x biết: $|x - 1,5| = 2$.",
            solution: "Trường hợp 1: $x - 1,5 = 2 \\implies x = 3,5$.\nTrường hợp 2: $x - 1,5 = -2 \\implies x = -2 + 1,5 = -0,5$.\nVậy $x \\in \\{3,5; -0,5\\}$.",
            method: "Phá dấu giá trị tuyệt đối thành 2 trường hợp mang dấu dương và dấu âm."
          }
        ],
        commonTraps: "Chỉ xét 1 trường hợp dương khi giải phương trình $|A| = B$ ($B > 0$).",
        socraticPrompt: "Ý nghĩa hình học của $|x - a|$ trên trục số là gì?"
      }
    ]
  },

  // =============================================================
  // TOÁN LỚP 7 - TẬP 1: CHƯƠNG III: GÓC VÀ ĐƯỜNG THẲNG SONG SONG
  // =============================================================
  {
    id: "sgk7-tap1-chuong3",
    grade: 7,
    semester: 1,
    bookVolume: "Tập 1",
    chapterNumber: "Chương III",
    chapterTitle: "Góc & Đường Thẳng Song Song",
    category: "geometry",
    categoryName: "Hình học & Đo lường",
    icon: "📐",
    badgeColor: "#10b981",
    description: "Hai góc kề bù, góc đối đỉnh, tia phân giác, dấu hiệu song song (so le trong, đồng vị), tiên đề Euclid, định lí và chứng minh hình học.",
    mindmap: {
      root: "Góc & Song song",
      branches: [
        { name: "Các góc đặc biệt", items: ["Góc đối đỉnh (bằng nhau)", "Góc kề bù (tổng = 180°)", "Tia phân giác (chia đôi góc thành 2 góc bằng nhau)"] },
        { name: "Hai đường song song", items: ["Dấu hiệu: So le trong bằng nhau / Đồng vị bằng nhau", "Tiên đề Euclid: Qua 1 điểm ngoài đường thẳng chỉ có DUY NHẤT 1 đường song song"] },
        { name: "Tính chất từ vuông góc đến song song", items: ["a ⊥ c và b ⊥ c ⇒ a ∥ b", "a ∥ b và c ⊥ a ⇒ c ⊥ b", "a ∥ b và b ∥ c ⇒ a ∥ c"] },
        { name: "Định lí & Chứng minh", items: ["Cấu trúc: Giả thiết (GT) ⇒ Kết luận (KL)", "Lập luận suy diễn có căn cứ"] }
      ]
    },
    lessons: [
      {
        id: "toan7-c3-b1",
        lessonNumber: "Bài 8 & 9",
        title: "Góc ở vị trí đặc biệt & Tia phân giác của một góc",
        summary: "Tính chất góc đối đỉnh, hai góc kề bù và tính chất tia phân giác.",
        coreConcepts: [
          {
            title: "Hai góc đối đỉnh & Kề bù",
            definition: "Hai góc đối đỉnh là hai góc mà mỗi cạnh của góc này là tia đối của một cạnh của góc kia. Hai góc đối đỉnh thì BẰNG NHAU.\nHai góc kề bù là hai góc vừa kề nhau vừa bù nhau (có tổng số đo bằng $180^\\circ$).",
            formula: "\\widehat{O_1} = \\widehat{O_3} \\text{ (đối đỉnh)}; \\quad \\widehat{A_1} + \\widehat{A_2} = 180^\\circ \\text{ (kề bù)}",
            notes: "Hai góc bằng nhau chưa chắc đã đối đỉnh."
          },
          {
            title: "Tia phân giác",
            definition: "Tia phân giác của một góc là tia nằm trong góc và tạo với hai cạnh của góc đó hai góc bằng nhau.",
            formula: "Oz \\text{ là phân giác } \\widehat{xOy} \\implies \\widehat{xOz} = \\widehat{zOy} = \\frac{\\widehat{xOy}}{2}",
            notes: "Mỗi góc (khác góc bẹt) chỉ có đúng 1 tia phân giác."
          }
        ],
        sampleProblems: [
          {
            problem: "Cho hai đường thẳng xy và zt cắt nhau tại O sao cho $\\widehat{xOz} = 50^\\circ$. Tính số đo $\\widehat{yOt}$ và $\\widehat{xOt}$.",
            solution: "1) $\\widehat{yOt} = \\widehat{xOz} = 50^\\circ$ (hai góc đối đỉnh).\n2) Vì $\\widehat{xOz}$ và $\\widehat{xOt}$ là hai góc kề bù nên:\n$\\widehat{xOt} = 180^\\circ - 50^\\circ = 130^\\circ$.",
            method: "Sử dụng tính chất đối đỉnh và kề bù."
          }
        ],
        commonTraps: "Nhận định hai góc bằng nhau là đối đỉnh mà không kiểm tra xem các cạnh có phải tia đối của nhau không.",
        socraticPrompt: "Hai góc có tổng bằng 180° có nhất thiết phải kề bù không? Phân biệt góc bù nhau và góc kề bù?",
        relatedTheoremsId: "toan7-hk1-goc-doi-dinh-ke-bu"
      },
      {
        id: "toan7-c3-b2",
        lessonNumber: "Bài 10 & 11",
        title: "Hai đường thẳng song song, Tiên đề Euclid & Định lí",
        summary: "Dấu hiệu nhận biết hai đường thẳng song song, tiên đề Euclid và cách viết GT - KL của định lí.",
        coreConcepts: [
          {
            title: "Dấu hiệu & Tính chất hai đường thẳng song song",
            definition: "Nếu đường thẳng c cắt hai đường thẳng a và b tạo thành một cặp góc so le trong bằng nhau (hoặc đồng vị bằng nhau) thì $a \\parallel b$.\nNgược lại, nếu $a \\parallel b$ thì các cặp góc so le trong bằng nhau, đồng vị bằng nhau, trong cùng phía bù nhau.",
            formula: "a \\parallel b \\implies \\widehat{A_{\\text{slt}}} = \\widehat{B_{\\text{slt}}}, \\quad \\widehat{A_{\\text{đv}}} = \\widehat{B_{\\text{đv}}}",
            notes: "Từ vuông góc đến song song: $\\begin{cases} a \\perp c \\\\ b \\perp c \\end{cases} \\implies a \\parallel b$."
          },
          {
            title: "Tiên đề Euclid",
            definition: "Qua một điểm ở ngoài một đường thẳng, chỉ có một đường thẳng song song với đường thẳng đó.",
            formula: "M \\notin a \\implies \\exists! \\ b \\text{ qua } M \\text{ sao cho } b \\parallel a",
            notes: "Tiên đề là khẳng định được công nhận đúng không cần chứng minh."
          }
        ],
        sampleProblems: [
          {
            problem: "Chứng minh rằng nếu hai đường thẳng cùng vuông góc với một đường thẳng thứ ba thì chúng song song với nhau.",
            solution: "Giả sử $a \\perp c$ tại A và $b \\perp c$ tại B $\\implies \\widehat{A_1} = 90^\\circ, \\widehat{B_1} = 90^\\circ$.\nHai góc này ở vị trí đồng vị và bằng nhau ($= 90^\\circ$) nên $a \\parallel b$.",
            method: "Dựa vào dấu hiệu nhận biết hai góc đồng vị bằng nhau."
          }
        ],
        commonTraps: "Ghi nhầm vị trí giữa góc so le trong và góc trong cùng phía.",
        socraticPrompt: "Nếu một đường thẳng cắt hai đường thẳng song song, hai góc trong cùng phía có quan hệ gì với nhau? Tại sao?",
        relatedTheoremsId: "toan7-hk1-song-song-euclid"
      }
    ]
  },

  // =============================================================
  // TOÁN LỚP 7 - TẬP 1: CHƯƠNG IV: TAM GIÁC BẰNG NHAU
  // =============================================================
  {
    id: "sgk7-tap1-chuong4",
    grade: 7,
    semester: 1,
    bookVolume: "Tập 1",
    chapterNumber: "Chương IV",
    chapterTitle: "Tam Giác Bằng Nhau",
    category: "geometry",
    categoryName: "Hình học & Đo lường",
    icon: "🔺",
    badgeColor: "#ec4899",
    description: "Tổng 3 góc trong tam giác (180°), góc ngoài; 3 trường hợp bằng nhau c-c-c, c-g-c, g-c-g; các trường hợp bằng nhau của tam giác vuông; tam giác cân và đường trung trực.",
    mindmap: {
      root: "Tam giác bằng nhau",
      branches: [
        { name: "Định lí về góc", items: ["Tổng 3 góc = 180°", "Góc ngoài = Tổng 2 góc trong không kề với nó"] },
        { name: "3 Trường hợp tam giác thường", items: ["Cạnh - Cạnh - Cạnh (c-c-c)", "Cạnh - Góc - Cạnh (c-g-c, góc xen giữa)", "Góc - Cạnh - Góc (g-c-g, cạnh xen giữa)"] },
        { name: "Tam giác vuông", items: ["2 cạnh góc vuông", "Cạnh góc vuông - góc nhọn kề", "Cạnh huyền - góc nhọn", "Cạnh huyền - cạnh góc vuông"] },
        { name: "Tam giác cân & Trung trực", items: ["Tam giác cân: 2 cạnh bằng nhau ⇔ 2 góc đáy bằng nhau", "Đường trung trực: vuông góc tại trung điểm, cách đều 2 đầu mút"] }
      ]
    },
    lessons: [
      {
        id: "toan7-c4-b1",
        lessonNumber: "Bài 12",
        title: "Tổng các góc trong một tam giác",
        summary: "Định lí tổng 3 góc bằng 180° và tính chất góc ngoài của tam giác.",
        coreConcepts: [
          {
            title: "Tổng ba góc & Góc ngoài tam giác",
            definition: "Tổng ba góc trong một tam giác luôn bằng $180^\\circ$.\nGóc ngoài của một tam giác là góc kề bù với một góc trong của tam giác đó. Số đo góc ngoài bằng tổng số đo hai góc trong không kề với nó.",
            formula: "\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ; \\quad \\widehat{A_{\\text{ngoài}}} = \\widehat{B} + \\widehat{C}",
            notes: "Trong tam giác vuông, hai góc nhọn phụ nhau (tổng bằng $90^\\circ$)."
          }
        ],
        sampleProblems: [
          {
            problem: "Cho tam giác ABC có $\\widehat{A} = 70^\\circ, \\widehat{B} = 50^\\circ$. Tính số đo góc ngoài tại đỉnh C.",
            solution: "Góc ngoài tại đỉnh C bằng tổng hai góc trong không kề:\n$\\widehat{C_{\\text{ngoài}}} = \\widehat{A} + \\widehat{B} = 70^\\circ + 50^\\circ = 120^\\circ$.",
            method: "Áp dụng định lí góc ngoài của tam giác."
          }
        ],
        commonTraps: "Cộng nhầm góc trong kề khi tính góc ngoài.",
        socraticPrompt: "Tại sao trong một tam giác không thể có nhiều hơn một góc tù?",
        relatedTheoremsId: "toan7-hk1-tong-ba-goc-tam-giac"
      },
      {
        id: "toan7-c4-b2",
        lessonNumber: "Bài 13, 14 & 15",
        title: "Các trường hợp bằng nhau của tam giác & Tam giác vuông",
        summary: "3 trường hợp bằng nhau cơ bản (c-c-c, c-g-c, g-c-g) và 4 trường hợp đặc biệt của tam giác vuông.",
        coreConcepts: [
          {
            title: "3 Trường hợp tam giác thường",
            definition: "1) c-c-c: Ba cạnh tương ứng bằng nhau.\n2) c-g-c: Hai cạnh và GÓC XEN GIỮA tương ứng bằng nhau.\n3) g-c-g: Một cạnh và HAI GÓC KỀ tương ứng bằng nhau.",
            formula: "\\Delta ABC = \\Delta A'B'C' \\implies \\text{các cạnh và góc tương ứng bằng nhau}",
            notes: "Bắt buộc góc phải xen giữa hai cạnh (với c-g-c) hoặc cạnh phải xen giữa hai góc (với g-c-g)."
          },
          {
            title: "Các trường hợp tam giác vuông",
            definition: "1) Hai cạnh góc vuông (tương đương c-g-c).\n2) Cạnh góc vuông - góc nhọn kề (tương đương g-c-g).\n3) Cạnh huyền - góc nhọn.\n4) Cạnh huyền - cạnh góc vuông.",
            formula: "\\text{Cạnh huyền - Cạnh góc vuông: } BC = B'C' \\text{ và } AB = A'B' \\implies \\Delta ABC = \\Delta A'B'C'",
            notes: "Trường hợp cạnh huyền - cạnh góc vuông là hệ quả rút ra từ định lí Pythagore."
          }
        ],
        sampleProblems: [
          {
            problem: "Cho $\\Delta ABC$ có $AB = AC$, M là trung điểm của BC. Chứng minh $\\Delta ABM = \\Delta ACM$.",
            solution: "Xét $\\Delta ABM$ và $\\Delta ACM$ có:\n- $AB = AC$ (giả thiết)\n- $BM = CM$ (M là trung điểm BC)\n- AM là cạnh chung\n$\\implies \\Delta ABM = \\Delta ACM$ (c-c-c).",
            method: "Chỉ ra 3 cặp cạnh bằng nhau để kết luận theo trường hợp c-c-c."
          }
        ],
        commonTraps: "Góc không xen giữa nhưng vẫn kết luận theo trường hợp c-g-c.",
        socraticPrompt: "Tại sao khi chứng minh theo trường hợp c-g-c, góc bằng nhau bắt buộc phải là góc xen giữa hai cạnh?",
        relatedTheoremsId: "toan7-hk1-tam-giac-bang-nhau-cgc"
      },
      {
        id: "toan7-c4-b3",
        lessonNumber: "Bài 16",
        title: "Tam giác cân & Đường trung trực của đoạn thẳng",
        summary: "Định nghĩa, tính chất tam giác cân, tam giác đều và tính chất đường trung trực.",
        coreConcepts: [
          {
            title: "Tam giác cân & Tam giác đều",
            definition: "Tam giác cân có hai cạnh bằng nhau $\\iff$ hai góc ở đáy bằng nhau.\nTam giác đều có ba cạnh bằng nhau $\\iff$ ba góc bằng nhau ($= 60^\\circ$).",
            formula: "\\Delta ABC \\text{ cân tại A} \\iff AB = AC \\iff \\widehat{B} = \\widehat{C} = \\frac{180^\\circ - \\widehat{A}}{2}",
            notes: "Tam giác cân có 1 góc bằng 60° là tam giác đều."
          },
          {
            title: "Đường trung trực",
            definition: "Đường thẳng vuông góc với đoạn thẳng tại trung điểm của nó gọi là đường trung trực của đoạn thẳng đó.\nTính chất: Điểm nằm trên đường trung trực thì cách đều hai đầu mút của đoạn thẳng.",
            formula: "M \\in d_{\\text{trung trực của } AB} \\iff MA = MB",
            notes: "Tập hợp các điểm cách đều hai đầu mút của một đoạn thẳng là đường trung trực của đoạn thẳng đó."
          }
        ],
        sampleProblems: [
          {
            problem: "Cho $\\Delta ABC$ cân tại A có $\\widehat{A} = 50^\\circ$. Tính số đo góc B và góc C.",
            solution: "Vì $\\Delta ABC$ cân tại A nên $\\widehat{B} = \\widehat{C}$.\nTa có: $\\widehat{B} = \\widehat{C} = \\frac{180^\\circ - 50^\\circ}{2} = 65^\\circ$.",
            method: "Áp dụng công thức tính góc ở đáy của tam giác cân."
          }
        ],
        commonTraps: "Nhầm công thức góc đáy $\\frac{180^\\circ - \\widehat{A}}{2}$ với góc ở đỉnh $180^\\circ - 2\\widehat{B}$.",
        socraticPrompt: "Làm thế nào để chứng minh một tam giác là tam giác đều? Có mấy cách?",
        relatedTheoremsId: "toan7-hk1-tam-giac-can"
      }
    ]
  },

  // =============================================================
  // TOÁN LỚP 7 - TẬP 2: CHƯƠNG VI: TỈ LỆ THỨC & ĐẠI LƯỢNG TỈ LỆ
  // =============================================================
  {
    id: "sgk7-tap2-chuong6",
    grade: 7,
    semester: 2,
    bookVolume: "Tập 2",
    chapterNumber: "Chương VI",
    chapterTitle: "Tỉ Lệ Thức & Đại Lượng Tỉ Lệ",
    category: "arithmetic",
    categoryName: "Số & Đại số",
    icon: "⚖️",
    badgeColor: "#f59e0b",
    description: "Tỉ lệ thức, tính chất dãy tỉ số bằng nhau, đại lượng tỉ lệ thuận, đại lượng tỉ lệ nghịch và bài toán phân chia tỉ lệ thực tế.",
    mindmap: {
      root: "Tỉ lệ thức & Đại lượng tỉ lệ",
      branches: [
        { name: "Tỉ lệ thức", items: ["Định nghĩa: a/b = c/d", "Tính chất cơ bản: a·d = b·c", "Hoán vị ngoại tỉ & trung tỉ"] },
        { name: "Dãy tỉ số bằng nhau", items: ["a/b = c/d = (a±c)/(b±d)", "a/b = c/d = e/f = (a+c+e)/(b+d+f)", "Phân chia theo tỉ lệ x : y : z = 2 : 3 : 5"] },
        { name: "Tỉ lệ thuận", items: ["Công thức: y = kx (k ≠ 0)", "Tính chất: y1/x1 = y2/x2 = k", "x tăng thì y tăng"] },
        { name: "Tỉ lệ nghịch", items: ["Công thức: y = a/x hay x·y = a (a ≠ 0)", "Tính chất: x1·y1 = x2·y2 = a", "x tăng thì y giảm"] }
      ]
    },
    lessons: [
      {
        id: "toan7-c6-b1",
        lessonNumber: "Bài 20 & 21",
        title: "Tỉ lệ thức & Tính chất của dãy tỉ số bằng nhau",
        summary: "Tính chất cơ bản của tỉ lệ thức và công thức cộng trừ tử/mẫu của dãy tỉ số bằng nhau.",
        coreConcepts: [
          {
            title: "Tính chất của tỉ lệ thức",
            definition: "Tỉ lệ thức là đẳng thức của hai tỉ số $\\frac{a}{b} = \\frac{c}{d}$.\nTính chất: Nếu $\\frac{a}{b} = \\frac{c}{d}$ thì $a \\cdot d = b \\cdot c$.",
            formula: "\\frac{a}{b} = \\frac{c}{d} \\iff a \\cdot d = b \\cdot c",
            notes: "Từ $ad = bc$ ($a,b,c,d \\neq 0$), ta lập được 4 tỉ lệ thức khác nhau."
          },
          {
            title: "Tính chất của dãy tỉ số bằng nhau",
            definition: "Từ $\\frac{a}{b} = \\frac{c}{d}$ suy ra $\\frac{a}{b} = \\frac{c}{d} = \\frac{a+c}{b+d} = \\frac{a-c}{b-d}$ ($b \\neq \\pm d$).",
            formula: "\\frac{a}{b} = \\frac{c}{d} = \\frac{e}{f} = \\frac{a+c+e}{b+d+f} = \\frac{a-c+e}{b-d+f}",
            notes: "Dấu ở mẫu số phải tương ứng chính xác với dấu ở tử số."
          }
        ],
        sampleProblems: [
          {
            problem: "Tìm hai số x và y biết: $\\frac{x}{3} = \\frac{y}{5}$ và $x + y = 32$.",
            solution: "Áp dụng tính chất dãy tỉ số bằng nhau:\n$\\frac{x}{3} = \\frac{y}{5} = \\frac{x+y}{3+5} = \\frac{32}{8} = 4$.\n$\\implies x = 3 \\cdot 4 = 12$; $y = 5 \\cdot 4 = 20$.",
            method: "Lập tỉ số bằng nhau kết hợp điều kiện tổng để tìm hệ số k."
          }
        ],
        commonTraps: "Ghi dấu ở tử là '+' nhưng ở mẫu lại là '-' dẫn đến tính sai toàn bộ.",
        socraticPrompt: "Nếu có $a : b : c = 2 : 3 : 5$ và $2a + b - c = 10$, làm thế nào để biến đổi dãy tỉ số áp dụng được tính chất?",
        relatedTheoremsId: "toan7-hk2-ti-le-thuc-day-ti-so"
      },
      {
        id: "toan7-c6-b2",
        lessonNumber: "Bài 22 & 23",
        title: "Đại lượng tỉ lệ thuận & Đại lượng tỉ lệ nghịch",
        summary: "Công thức liên hệ $y = kx$ và $y = a/x$, tính chất và các bài toán thực tế.",
        coreConcepts: [
          {
            title: "Tỉ lệ thuận vs Tỉ lệ nghịch",
            definition: "Tỉ lệ thuận: $y = k \\cdot x$ ($k \\neq 0$, k là hệ số tỉ lệ của y đối với x).\nTỉ lệ nghịch: $y = \\frac{a}{x}$ hay $x \\cdot y = a$ ($a \\neq 0$, a là hệ số tỉ lệ).",
            formula: "\\text{Thuận: } \\frac{y_1}{x_1} = \\frac{y_2}{x_2} = k; \\quad \\text{Nghịch: } x_1 y_1 = x_2 y_2 = a",
            notes: "Nếu y tỉ lệ thuận với x theo hệ số k thì x tỉ lệ thuận với y theo hệ số $1/k$."
          }
        ],
        sampleProblems: [
          {
            problem: "Cho biết 12 công nhân xây xong một ngôi nhà trong 30 ngày. Hỏi 15 công nhân (với cùng năng suất) xây xong ngôi nhà đó trong bao nhiêu ngày?",
            solution: "Vì số công nhân và số ngày hoàn thành là hai đại lượng tỉ lệ nghịch nên tích số người và số ngày không đổi:\n$12 \\cdot 30 = 15 \\cdot x \\implies x = \\frac{360}{15} = 24$ (ngày).",
            method: "Nhận biết bài toán tỉ lệ nghịch rồi áp dụng tích $x_1 y_1 = x_2 y_2$."
          }
        ],
        commonTraps: "Nhầm lẫn giữa bài toán tỉ lệ thuận (lập thương) và tỉ lệ nghịch (lập tích).",
        socraticPrompt: "Trong thực tế, đại lượng nào là tỉ lệ thuận và đại lượng nào là tỉ lệ nghịch? Cho ví dụ về vận tốc và thời gian trên cùng quãng đường?"
      }
    ]
  },

  // =============================================================
  // TOÁN LỚP 7 - TẬP 2: CHƯƠNG VII: BIỂU THỨC ĐẠI SỐ & ĐA THỨC MỘT BIẾN
  // =============================================================
  {
    id: "sgk7-tap2-chuong7",
    grade: 7,
    semester: 2,
    bookVolume: "Tập 2",
    chapterNumber: "Chương VII",
    chapterTitle: "Biểu Thức Đại Số & Đa Thức Một Biến",
    category: "arithmetic",
    categoryName: "Số & Đại số",
    icon: "🔤",
    badgeColor: "#4f46e5",
    description: "Biểu thức đại số, đa thức một biến, bậc, hệ số, sắp xếp đa thức, phép cộng, trừ, nhân, chia đa thức và tìm nghiệm của đa thức một biến.",
    mindmap: {
      root: "Đa thức một biến",
      branches: [
        { name: "Khái niệm", items: ["Đơn thức, đa thức một biến P(x)", "Bậc (số mũ lớn nhất của biến có hệ số ≠ 0)", "Hệ số cao nhất & Hệ số tự do", "Sắp xếp theo lũy thừa giảm dần"] },
        { name: "Cộng & Trừ đa thức", items: ["Cộng/trừ các đơn thức đồng dạng", "Đặt tính theo cột dọc hoặc nhóm hàng ngang"] },
        { name: "Nhân & Chia đa thức", items: ["Nhân đơn thức với đa thức", "Nhân đa thức với đa thức", "Chia đa thức cho đa thức (phép chia hết và có dư)"] },
        { name: "Nghiệm của đa thức", items: ["x = a là nghiệm ⇔ P(a) = 0", "Một đa thức bậc n có tối đa n nghiệm"] }
      ]
    },
    lessons: [
      {
        id: "toan7-c7-b1",
        lessonNumber: "Bài 24 & 25",
        title: "Biểu thức đại số & Đa thức một biến",
        summary: "Cách tính giá trị biểu thức, xác định bậc, hệ số cao nhất và hệ số tự do của đa thức một biến.",
        coreConcepts: [
          {
            title: "Đa thức một biến",
            definition: "Đa thức một biến là tổng của những đơn thức của cùng một biến. Kí hiệu: $P(x), Q(x), A(y)$...\nBậc của đa thức thu gọn (khác đa thức 0) là số mũ lớn nhất của biến trong đa thức đó.",
            formula: "P(x) = a_n x^n + a_{n-1} x^{n-1} + ... + a_1 x + a_0 \\quad (a_n \\neq 0)",
            notes: "$a_n$ là hệ số cao nhất, $a_0$ là hệ số tự do. Đa thức bậc 0 là một số thực khác 0."
          }
        ],
        sampleProblems: [
          {
            problem: "Cho $P(x) = 3x^4 - 2x^2 + 5x - 7 + 2x^2$. Thu gọn, tìm bậc và các hệ số của $P(x)$.",
            solution: "Thu gọn: $P(x) = 3x^4 + (-2x^2 + 2x^2) + 5x - 7 = 3x^4 + 5x - 7$.\n- Bậc của đa thức: 4 (số mũ lớn nhất).\n- Hệ số cao nhất: 3 (hệ số của $x^4$).\n- Hệ số tự do: $-7$.",
            method: "Nhóm các hạng tử có cùng số mũ rồi cộng trừ hệ số."
          }
        ],
        commonTraps: "Tìm bậc khi đa thức chưa thu gọn (ví dụ còn các hạng tử triệt tiêu nhau).",
        socraticPrompt: "Số 5 có phải là một đa thức không? Nếu có thì nó có bậc bằng bao nhiêu?",
        relatedTheoremsId: "toan7-hk2-da-thuc-mot-bien"
      },
      {
        id: "toan7-c7-b2",
        lessonNumber: "Bài 26, 27 & 28",
        title: "Cộng, trừ, nhân, chia đa thức một biến",
        summary: "Quy tắc cộng trừ đa thức theo hàng ngang / cột dọc, nhân đa thức và thuật toán chia đa thức.",
        coreConcepts: [
          {
            title: "Phép nhân và phép chia đa thức",
            definition: "Nhân đa thức với đa thức: Lấy mỗi hạng tử của đa thức này nhân với từng hạng tử của đa thức kia rồi cộng kết quả lại.\nPhép chia: $A(x) = B(x) \\cdot Q(x) + R(x)$, trong đó bậc của $R(x)$ nhỏ hơn bậc của $B(x)$.",
            formula: "(a+b)(c+d) = ac + ad + bc + bd; \\quad A = B \\cdot Q + R",
            notes: "Khi chia, nếu $R(x) = 0$ thì đó là phép chia hết."
          }
        ],
        sampleProblems: [
          {
            problem: "Thực hiện phép tính: $(2x - 3)(x^2 + 1)$.",
            solution: "$(2x - 3)(x^2 + 1) = 2x(x^2 + 1) - 3(x^2 + 1) = 2x^3 + 2x - 3x^2 - 3 = 2x^3 - 3x^2 + 2x - 3$.",
            method: "Nhân phân phối từng hạng tử rồi sắp xếp theo lũy thừa giảm dần."
          }
        ],
        commonTraps: "Quên đổi dấu khi trừ hai đa thức theo hàng ngang.",
        socraticPrompt: "Khi chia một đa thức cho một đa thức bậc 2, số dư có thể có bậc lớn nhất là bao nhiêu? Tại sao?"
      },
      {
        id: "toan7-c7-b3",
        lessonNumber: "Bài 29",
        title: "Nghiệm của đa thức một biến",
        summary: "Khái niệm nghiệm, cách kiểm tra và phương pháp tìm nghiệm của đa thức.",
        coreConcepts: [
          {
            title: "Định nghĩa nghiệm của đa thức",
            definition: "Nếu tại $x = a$, đa thức $P(x)$ có giá trị bằng 0 (tức là $P(a) = 0$) thì ta gọi $a$ (hoặc $x = a$) là một nghiệm của đa thức $P(x)$.",
            formula: "x = a \\text{ là nghiệm của } P(x) \\iff P(a) = 0",
            notes: "Một đa thức bậc n (khác đa thức 0) có không quá n nghiệm."
          }
        ],
        sampleProblems: [
          {
            problem: "Tìm nghiệm của đa thức $P(x) = 2x - 6$ và $Q(x) = x^2 - 4$.",
            solution: "1) Cho $P(x) = 0 \\implies 2x - 6 = 0 \\implies 2x = 6 \\implies x = 3$.\n2) Cho $Q(x) = 0 \\implies x^2 - 4 = 0 \\implies x^2 = 4 \\implies x = \\pm 2$.",
            method: "Cho đa thức bằng 0 rồi giải phương trình tìm x."
          }
        ],
        commonTraps: "Khi giải $x^2 = 4$, chỉ lấy nghiệm $x = 2$ mà quên mất nghiệm $x = -2$.",
        socraticPrompt: "Đa thức $x^2 + 1$ có nghiệm không? Vì sao một đa thức bậc 2 lại có thể vô nghiệm?",
        relatedTheoremsId: "toan7-hk2-da-thuc-mot-bien"
      }
    ]
  },

  // =============================================================
  // TOÁN LỚP 7 - TẬP 2: CHƯƠNG VIII & IX: HÌNH HỌC TAM GIÁC & HÌNH KHỐI
  // =============================================================
  {
    id: "sgk7-tap2-chuong9",
    grade: 7,
    semester: 2,
    bookVolume: "Tập 2",
    chapterNumber: "Chương IX & X",
    chapterTitle: "Các Đường Đồng Quy Trong Tam Giác & Hình Khối Thực Tiễn",
    category: "geometry",
    categoryName: "Hình học & Đo lường",
    icon: "🏛️",
    badgeColor: "#10b981",
    description: "Quan hệ góc - cạnh đối diện, bất đẳng thức tam giác, sự đồng quy của 3 đường trung tuyến (trọng tâm), 3 đường phân giác, 3 đường trung trực, 3 đường cao (trực tâm); Thể tích hình hộp chữ nhật, lập phương, lăng trụ đứng.",
    mindmap: {
      root: "Đường đồng quy & Hình khối",
      branches: [
        { name: "Quan hệ trong tam giác", items: ["Góc đối diện cạnh lớn hơn thì lớn hơn", "Đường vuông góc ngắn hơn đường xiên", "Bất đẳng thức: |b-c| < a < b+c"] },
        { name: "4 Điểm đồng quy", items: ["3 Trung tuyến ⇒ Trọng tâm G (AG = 2/3 AM)", "3 Phân giác ⇒ Tâm đường tròn nội tiếp (cách đều 3 cạnh)", "3 Trung trực ⇒ Tâm đường tròn ngoại tiếp (cách đều 3 đỉnh)", "3 Đường cao ⇒ Trực tâm H"] },
        { name: "Hình khối", items: ["Hình hộp chữ nhật & Lập phương (V = a·b·c, V = a³)", "Hình lăng trụ đứng (Sxq = Cđáy · h, V = Sđáy · h)"] }
      ]
    },
    lessons: [
      {
        id: "toan7-c9-b1",
        lessonNumber: "Bài 31 & 32",
        title: "Quan hệ giữa góc và cạnh đối diện. Bất đẳng thức tam giác",
        summary: "Cạnh đối diện góc lớn hơn thì lớn hơn; điều kiện tồn tại tam giác qua bất đẳng thức 3 cạnh.",
        coreConcepts: [
          {
            title: "Góc và cạnh đối diện trong tam giác",
            definition: "Trong một tam giác, góc đối diện với cạnh lớn hơn là góc lớn hơn. Ngược lại, cạnh đối diện với góc lớn hơn là cạnh lớn hơn.",
            formula: "BC > AC > AB \\iff \\widehat{A} > \\widehat{B} > \\widehat{C}",
            notes: "Cạnh lớn nhất đối diện với góc lớn nhất; trong tam giác vuông, cạnh huyền là cạnh lớn nhất."
          },
          {
            title: "Bất đẳng thức tam giác",
            definition: "Trong một tam giác, độ dài một cạnh luôn lớn hơn hiệu và nhỏ hơn tổng độ dài hai cạnh còn lại.",
            formula: "|b - c| < a < b + c",
            notes: "Muốn kiểm tra 3 đoạn thẳng có tạo thành tam giác hay không, chỉ cần so sánh độ dài cạnh lớn nhất với tổng 2 cạnh còn lại."
          }
        ],
        sampleProblems: [
          {
            problem: "Ba đoạn thẳng có độ dài 3cm, 4cm, 8cm có thể là ba cạnh của một tam giác không?",
            solution: "Ta thấy $3 + 4 = 7 < 8$ (tổng hai cạnh bé hơn cạnh thứ ba). Do đó 3 đoạn thẳng này KHÔNG THỂ tạo thành một tam giác.",
            method: "So sánh tổng 2 cạnh nhỏ với cạnh lớn nhất."
          }
        ],
        commonTraps: "Quên kiểm tra điều kiện bất đẳng thức tam giác khi giải bài toán tìm độ dài cạnh.",
        socraticPrompt: "Tại sao đường thẳng luôn là khoảng cách ngắn nhất giữa hai điểm? Điều này liên quan gì đến bất đẳng thức tam giác?",
        relatedTheoremsId: "toan7-hk2-bat-dang-thuc-tam-giac"
      },
      {
        id: "toan7-c9-b2",
        lessonNumber: "Bài 33, 34 & 35",
        title: "Sự đồng quy của các đường trong tam giác (Trọng tâm, Trực tâm, Tâm nội/ngoại tiếp)",
        summary: "Tính chất 4 điểm đồng quy quan trọng nhất trong hình học phẳng tam giác THCS.",
        coreConcepts: [
          {
            title: "Bốn đường đồng quy trong tam giác",
            definition: "1) Ba đường trung tuyến đồng quy tại TRỌNG TÂM $G$. Trọng tâm cách đỉnh một khoảng bằng $\\frac{2}{3}$ độ dài đường trung tuyến ($AG = \\frac{2}{3}AM$).\n2) Ba đường phân giác đồng quy tại một điểm CÁCH ĐỀU BA CẠNH (Tâm đường tròn nội tiếp).\n3) Ba đường trung trực đồng quy tại một điểm CÁCH ĐỀU BA ĐỈNH (Tâm đường tròn ngoại tiếp).\n4) Ba đường cao đồng quy tại TRỰC TÂM $H$.",
            formula: "AG = \\frac{2}{3} AM; \\quad GM = \\frac{1}{3} AM; \\quad AG = 2 GM",
            notes: "Trong tam giác đều, 4 điểm: Trọng tâm, Trực tâm, Tâm nội tiếp, Tâm ngoại tiếp TRÙNG NHAU."
          }
        ],
        sampleProblems: [
          {
            problem: "Cho tam giác ABC có đường trung tuyến $AM = 9\\text{cm}$, G là trọng tâm. Tính độ dài đoạn AG và GM.",
            solution: "Vì G là trọng tâm nên:\n$AG = \\frac{2}{3} AM = \\frac{2}{3} \\cdot 9 = 6\\text{cm}$.\n$GM = AM - AG = 9 - 6 = 3\\text{cm}$.",
            method: "Áp dụng tỉ lệ trọng tâm $2/3$ và $1/3$ đối với đường trung tuyến."
          }
        ],
        commonTraps: "Nhầm lẫn giữa tỉ lệ $AG/AM = 2/3$ và $AG/GM = 2/1$.",
        socraticPrompt: "Trong tam giác vuông, tâm đường tròn ngoại tiếp nằm ở đâu? Trực tâm nằm ở đâu?",
        relatedTheoremsId: "toan7-hk2-trong-tam-tam-giac"
      },
      {
        id: "toan7-c10-b1",
        lessonNumber: "Bài 37 & 38",
        title: "Hình khối thực tiễn: Lăng trụ đứng, Hình hộp chữ nhật & Thể tích",
        summary: "Công thức diện tích xung quanh và thể tích hình hộp chữ nhật, lập phương, hình lăng trụ đứng tam giác và tứ giác.",
        coreConcepts: [
          {
            title: "Công thức hình khối lăng trụ đứng",
            definition: "Diện tích xung quanh = Chu vi đáy × Chiều cao: $S_{xq} = C_{\\text{đáy}} \\cdot h$\nDiện tích toàn phần = Diện tích xung quanh + 2 × Diện tích đáy: $S_{tp} = S_{xq} + 2 S_{\\text{đáy}}$\nThể tích = Diện tích đáy × Chiều cao: $V = S_{\\text{đáy}} \\cdot h$",
            formula: "S_{xq} = C_{\\text{đáy}} \\cdot h; \\quad V = S_{\\text{đáy}} \\cdot h",
            notes: "Hình hộp chữ nhật: $V = a \\cdot b \\cdot c$; Hình lập phương: $V = a^3$."
          }
        ],
        sampleProblems: [
          {
            problem: "Một chiếc lều có dạng hình lăng trụ đứng tam giác, đáy là tam giác vuông có 2 cạnh góc vuông là 3m và 4m, chiều dài lều là 5m. Tính thể tích không khí bên trong lều.",
            solution: "Diện tích đáy tam giác vuông là: $S_{\\text{đáy}} = \\frac{1}{2} \\cdot 3 \\cdot 4 = 6\\text{ (m}^2\\text{)}$.\nThể tích lều: $V = S_{\\text{đáy}} \\cdot h = 6 \\cdot 5 = 30\\text{ (m}^3\\text{)}$.",
            method: "Tính diện tích mặt đáy tam giác vuông rồi nhân với chiều cao lăng trụ."
          }
        ],
        commonTraps: "Nhầm chiều cao của mặt đáy tam giác với chiều cao của hình lăng trụ đứng.",
        socraticPrompt: "Lăng trụ đứng tam giác và lăng trụ đứng tứ giác có điểm gì giống và khác nhau về cấu tạo các mặt bên?"
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.TEXTBOOK_CURRICULUM_DATA = TEXTBOOK_CURRICULUM_DATA;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TEXTBOOK_CURRICULUM_DATA };
}
