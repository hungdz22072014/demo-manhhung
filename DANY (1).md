# 📐 DÀN Ý DỰ ÁN: WEB APP "MATHMIND AI" - TRỢ LÝ ÔN THI & GHI NHỚ ĐỊNH LÝ TOÁN 6 - 7
*(Dành cho Bảng A - Cuộc thi AI Phục vụ học tập | Bộ sách Kết nối tri thức với cuộc sống)*

---

## I. TỔNG QUAN DỰ ÁN
* **Tên dự án (dự kiến):** **Vui học Toán** – Trợ lý AI Ôn thi & Rèn luyện Định lý Toán 6–7.
* **Đối tượng người dùng:** Học sinh THCS lớp 6 và lớp 7 (chương trình Toán - Kết nối tri thức).
* **Vấn đề thực tế:** 
  * Học sinh thường hay quên hoặc nhầm lẫn các định lý, tiên đề, tính chất hình học và công thức đại số quan trọng.
  * Khi ôn thi Giữa kì & Cuối kì (HK1, HK2), học sinh dễ quá tải, không biết mình đang hổng phần kiến thức hay định lý nào để bù đắp.
  * Các ứng dụng giải toán hiện tại thường giải bài trực tiếp (làm thay học sinh), không kích thích tư duy gợi mở.
* **Giải pháp của Web App:**
  * Cung cấp **"Trạm Ghi Nhớ & Kiểm Tra Định Lý Toán"** với thuật toán lặp lại ngắt quãng (Spaced Repetition) kết hợp AI đối thoại.
  * Hệ thống **Ôn luyện thi Giữa kì & Cuối kì 1, 2** theo chuẩn ma trận đề kiểm tra của bộ sách Kết nối tri thức.
  * **Trợ lý AI Gia sư Socratic:** Chỉ gợi mở định lý liên quan và hướng dẫn từng bước chứ không giải hộ bài toán.

---

## II. QUY TRÌNH AI CỐT LÕI (INPUT ➔ PROCESSING ➔ OUTPUT)
*(Trọng tâm đánh giá quan trọng nhất của Ban giám khảo cuộc thi)*

```mermaid
graph LR
    A["Dữ liệu đầu vào (Input)"] --> B["Khối xử lý AI (Processing)"]
    B --> C["Kết quả đầu ra (Output)"]
    
    subgraph A1["Input"]
        A11["Câu trả lời/phát biểu định lý của học sinh"]
        A12["Lịch sử làm bài thi & bài tập"]
        A13["Đề bài toán học sinh cần trợ giúp"]
    end
    
    subgraph B1["Processing"]
        B11["System Prompt: Gemini chỉ được trả lời dựa trên kho định lý SGK KNTT 6-7 (chèn sẵn trong prompt), không tự bịa kiến thức"]
        B12["Prompt so sánh: Đối chiếu câu trả lời học sinh với đáp án chuẩn, chấm đúng/thiếu ý"]
        B13["Leitner Box (thuật toán lặp lại ngắt quãng đơn giản): định lý sai bị đẩy về hộp "cần ôn nhiều", định lý đúng liên tiếp được đẩy sang hộp "đã thuộc""]
        B14["Prompt Socratic: Gia sư chỉ hỏi gợi mở, từ chối giải hộ bài"]
    end
    
    subgraph C1["Output"]
        C11["Đánh giá đúng/sai ngữ nghĩa + Nhận xét chi tiết"]
        C12["Đề thi ôn tập cá nhân hóa bù đúng điểm yếu"]
        C13["Gợi ý định lý cần dùng & lộ trình tư duy"]
    end
```

1. **Đầu vào (Input):**
   * Giọng nói hoặc văn bản học sinh phát biểu định lý/tính chất.
   * Lựa chọn cấp độ: Lớp 6 hoặc Lớp 7, Kì 1 hoặc Kì 2, Giữa kì hay Cuối kì.
   * Bài làm trắc nghiệm/tự luận của học sinh.
2. **Xử lý (Processing / AI Engine):**
   * **Kỹ nghệ câu lệnh (Prompt Engineering):** Không huấn luyện lại mô hình AI. Toàn bộ "trí tuệ" của trợ lý nằm ở một **System Prompt** được viết sẵn, trong đó chèn kèm danh sách định lý chuẩn theo SGK Toán 6-7 Kết nối tri thức. Ví dụ prompt: *"Bạn là gia sư Toán lớp 7. Dưới đây là danh sách các định lý trong SGK Kết nối tri thức: [dữ liệu định lý]. Bạn chỉ được phép nhận xét/gợi ý dựa trên danh sách này, tuyệt đối không tự bịa ra định lý hoặc công thức khác."* Cách làm này giải quyết trực tiếp rủi ro lớn nhất của AI tạo sinh là **"ảo giác" (Hallucination)** — AI tự bịa kiến thức sai.
   * **Đánh giá câu trả lời:** Học sinh trả lời bằng ngôn ngữ của riêng mình, AI (qua prompt) so sánh với đáp án chuẩn đã chèn sẵn để xác định câu trả lời đủ ý hay còn thiếu, không bắt học sinh học vẹt từng chữ.
   * **Ghi nhớ theo hộp Leitner (thuật toán thích ứng đơn giản, dễ cài đặt bằng JavaScript + LocalStorage):** Mỗi định lý được gán vào 1 trong 3 "hộp" — Hộp Đỏ (hay quên), Hộp Vàng (còn lúng túng), Hộp Xanh (đã thuộc). Trả lời sai → định lý bị đẩy về Hộp Đỏ và xuất hiện lại sớm hơn; trả lời đúng liên tiếp → định lý được đẩy dần sang Hộp Xanh và giãn cách thời gian ôn lại.
3. **Đầu ra (Output):**
   * Điểm số ghi nhớ định lý, phản hồi lỗi sai cụ thể (ví dụ: *"Bạn đã thiếu điều kiện hai đường thẳng phân biệt"*).
   * Bộ đề ôn thi Giữa kì/Cuối kì được thiết kế chung cho tất cả học sinh để đánh giá trọn vẹn kiến thức,từ kết quả bài thi,hệ thống sẽ gợi ý các định lý học sinh cần ôn lại, hoặc kiến thức cần củng cố.
   * Báo cáo phân tích năng lực: Bản đồ mạng lưới các định lý đã nắm vững vs. định lý cần ôn lại, kèm theo đó là bài tập củng cố cho từng định lý.

---

## III. NỘI DUNG KIẾN THỨC BÁM SÁT SÁCH "KẾT NỐI TRI THỨC"

### 1. Khung chương trình Toán Lớp 6 (KNTT)
* **Học kì 1:**
  * *Số học:* Tập hợp các số tự nhiên, tính chất chia hết (dấu hiệu chia hết cho 2, 3, 5, 9, số nguyên tố, ƯCLN, BCNN). Số nguyên (quy tắc cộng trừ nhân chia số nguyên, quy tắc dấu ngoặc).
  * *Hình học trực quan:* Tam giác đều, hình vuông, lục giác đều, hình chữ nhật, hình thoi, hình bình hành, hình thang cân (tính chất cạnh, góc, đường chéo, chu vi, diện tích).
* **Học kì 2:**
  * *Số học:* Phân số (tính chất cơ bản, quy đồng, các phép tính phân số, bài toán về phân số). Số thập phân và phần trăm.
  * *Hình học phẳng:* Điểm, đường thẳng, tia, đoạn thẳng, độ dài đoạn thẳng, góc và số đo góc.

### 2. Khung chương trình Toán Lớp 7 (KNTT) - *Rất nhiều định lý quan trọng!*
* **Học kì 1:**
  * *Đại số:* Số hữu tỉ (quy tắc cộng, trừ, nhân, chia, lũy thừa). Số thực và căn bậc hai số học.
  * *Hình học trực quan & phẳng:* 
    * Góc ở vị trí đặc biệt (đối đỉnh, kề bù).
    * Tia phân giác của một góc.
    * Hai đường thẳng song song và dấu hiệu nhận biết.
    * **Định lý và chứng minh định lý:** Giả thiết - Kết luận, tiên đề Euclid về đường thẳng song song.
    * **Tổng ba góc trong tam giác.**
    * **Các trường hợp bằng nhau của hai tam giác:** c-c-c, c-g-c, g-c-g và các trường hợp bằng nhau của tam giác vuông.
* **Học kì 2:**
  * *Đại số:* Tỉ lệ thức và dãy tỉ số bằng nhau. Đại lượng tỉ lệ thuận, đại lượng tỉ lệ nghịch. Biểu thức đại số và đa thức một biến.
  * *Hình học:*
    * Quan hệ giữa góc và cạnh đối diện trong tam giác, bất đẳng thức tam giác.
    * Sự đồng quy của các đường trung tuyến, phân giác, trung trực, đường cao trong tam giác.

---

## IV. CÁC PHÂN HỆ CHỨC NĂNG CỦA WEB APP

### Phân hệ 1: "Trạm Thử Thách & Ghi Nhớ Định Lý" (Khắc phục hay quên)
* **Flashcard Định lý thông minh:** Mặt trước là tên định lý/hình vẽ minh họa; mặt sau là phát biểu, công thức, giả thiết - kết luận.
* **Thử thách "Điền vào chỗ trống":** Học sinh điền từ khóa hoặc công thức còn thiếu trong định lý.
* **Thử thách "Vấn đáp cùng AI":**
  * AI hỏi: *"Em hãy nêu dấu hiệu nhận biết hai đường thẳng song song?"*
  * Học sinh gõ hoặc nói câu trả lời.
  * AI phân tích xem câu trả lời có đủ ý không (hai góc so le trong bằng nhau, đồng vị bằng nhau...), chấm điểm và giải thích.
* **Thư viện Định lý bỏ túi:** Bộ tra cứu nhanh có hình ảnh trực quan, tìm kiếm theo tên hoặc từ khóa.

### Phân hệ 2: "Phòng Luyện Thi Giữa Kì & Cuối Kì (HK1 - HK2)"
* **Bộ chọn cấp độ:** Lớp 6 / Lớp 7 $\rightarrow$ Học kì 1 / Học kì 2 $\rightarrow$ Thi Giữa kì / Thi Cuối kì.
* **Chế độ thi linh hoạt:**
  * *Chế độ Luyện tập:* Không giới hạn thời gian, làm xong câu nào có lời giải và nhắc lại định lý liên quan câu đó ngay.
  * *Chế độ Thi thử bấm giờ:* Giả lập đúng 60 phút hoặc 90 phút theo ma trận chuẩn của Bộ GD&ĐT (70% trắc nghiệm + 30% tự luận hoặc 100% trắc nghiệm khách quan).
* **Tạo đề thi tùy biến bằng AI:** Tự động tạo thêm các câu hỏi xoay quanh các định lý mà học sinh làm sai ở lần thi trước.

### Phân hệ 3: "Gia sư AI Đồng Hành (Socratic Tutor)"
* Học sinh chụp ảnh hoặc nhập bài toán chưa làm được.
* AI không giải bài ngay mà hỏi ngược lại: *"Để giải bài này, em cần áp dụng định lý nào về tổng các góc của tam giác nhỉ?"*.
* Dẫn dắt học sinh từng bước từ Giả thiết $\rightarrow$ Vận dụng định lý $\rightarrow$ Kết luận.

### Phân hệ 4: "Bảng Điều Khiển & Nhật Ký Tiến Bộ"
* **Bản đồ định lý:** Hiển thị màu sắc (Xanh: đã thuộc làu; Vàng: còn lúng túng; Đỏ: hay quên).
* Thống kê số đề thi đã hoàn thành, điểm số cải thiện qua từng tuần.
* Huy hiệu vinh danh (Gamification): "Bậc thầy Định lý Tam giác", "Chiến binh Số nguyên", "Thần tốc Hình học".

---

## V. CÔNG NGHỆ TRIỂN KHAI DỰ KIẾN (WEB APP)

*(Nguyên tắc chọn công nghệ: dùng công cụ đơn giản, có sẵn, miễn phí — vừa sức học sinh THCS tự làm, vừa đủ an toàn để demo thật, không cần đội ngũ kỹ sư phần mềm.)*

* **Giao diện (Frontend):**
  * HTML5, CSS3 hiện đại (giao diện tươi sáng, thân thiện với học sinh THCS, hiển thị tốt trên máy tính & điện thoại).
  * Hiển thị công thức Toán: Thư viện **KaTeX** hoặc **MathJax** (gõ phân số, căn bậc hai, ký hiệu góc chuẩn).
* **Nhận diện giọng nói (Input):** Dùng **Web Speech API** — tính năng nhận diện giọng nói có sẵn, miễn phí, tích hợp thẳng trong trình duyệt Chrome/Edge. Chỉ cần vài dòng JavaScript để chuyển giọng nói học sinh thành văn bản, không cần gọi thêm dịch vụ AI riêng cho việc này.
* **Lưu trữ dữ liệu (Database):** Dùng **LocalStorage** của trình duyệt để lưu lịch sử làm bài, điểm số, trạng thái các hộp Leitner. Nhờ vậy ứng dụng không cần tài khoản, không cần máy chủ cơ sở dữ liệu, học sinh mở web là dùng được ngay, đồng thời bảo vệ quyền riêng tư (không có dữ liệu cá nhân nào rời khỏi máy). *Giới hạn cần nêu rõ: dữ liệu chỉ lưu theo từng trình duyệt/thiết bị, chưa đồng bộ nhiều máy — đây là hướng phát triển tiếp theo (Phần VI, trang 8).*
* **Trí tuệ nhân tạo (AI Engine) — Gemini API được kiểm soát chặt bằng Prompt Engineering:**
  * Gọi **Gemini API**, không huấn luyện lại mô hình. "Trí tuệ" của gia sư AI nằm ở System Prompt có chèn sẵn nội dung định lý SGK Kết nối tri thức, buộc AI chỉ trả lời trong phạm vi đó (xem chi tiết Phần II).
  * **Bảo mật API Key bằng Vercel Serverless Functions (backend tối giản, miễn phí):** Trình duyệt của học sinh (frontend) không gọi thẳng Gemini API, mà gọi lên một hàm nhỏ chạy trên Vercel; hàm này mới là nơi giữ API Key và gọi tiếp sang Gemini. Nhờ vậy API Key không bao giờ lộ ra ngoài trình duyệt, trong khi code vẫn rất gọn, một học sinh có thể tự viết và hiểu được toàn bộ.
  * Thời gian phản hồi phụ thuộc mạng và độ dài prompt, mục tiêu vận hành mượt trong điều kiện demo thực tế (không cam kết một con số cứng, sẽ đo đạc thật trong Phần "Kết quả thử nghiệm").

---

