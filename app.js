/**
 * HÀN BỐI THÁP: KẺ LỪA ĐẢO THẦN LINH
 * Web Application Logic, Interactive Systems & 20 Sceneries Archive
 */

// ==========================================================================
// 1. DATA: 20 EMPTY SCENERIES (BỐI CẢNH QUÁI ĐÀM KHÔNG CÓ NGƯỜI)
// ==========================================================================
const SCENES_DATA = [
    // --- MÙA 1: CÁC PHÓ BẢN SƠ TRUNG CẤP (Mg9IlgHE7zE) ---
    {
        id: "scene-1",
        number: 1,
        season: 1,
        titleVi: "Sạp Bói Toán Hẻm Cũ Của Hàn Bối Tháp",
        titleEn: "Han Beita's Old Alley Fortune-Telling Stall",
        videoRef: "Khởi đầu Mùa 1 (Mg9IlgHE7zE)",
        locationTag: "Thế Giới Thực • Hẻm Cũ",
        icon: "🏮",
        image: null,
        description: "Một góc hẻm cụt tường gạch ẩm mốc rêu phong, nền xi măng nứt toác đọng nước mưa. Chiếc bàn gỗ cũ kỹ bày la bàn bát quái bằng đồng han rỉ, vài xấp giấy bùa màu vàng vẽ chu sa đỏ dở dang, một chiếc ghế gấp rỗng. Ngọn đèn dầu bão treo trên thanh sắt rỉ sét hắt ánh sáng vàng leo lét lên bức tường loang lổ.",
        lightingAtmosphere: "Ánh vàng ấm của đèn dầu tương phản với màu xanh xám lạnh lẽo của đêm mưa hẻm phố. Không khí cô tịch, bí ẩn.",
        palette: ["#ca8a04", "#475569", "#78350f", "#0f172a"],
        aiPrompt: "Cinematic concept art of a narrow dead-end damp alleyway at rainy midnight, cracked concrete with water puddles reflecting faint light, weathered brick wall covered in dark green moss. An old rustic wooden table with a tarnished antique bronze Bagua compass, scattered yellow Taoist talismans with unfinished cinnabar red runes, an empty vintage folding chair, a flickering kerosene hurricane lantern hanging on rusty iron bracket casting warm eerie amber glow against decaying peeling walls. Highly atmospheric, dark moody film still, completely empty of people, photorealistic, 8k resolution, Unreal Engine 5."
    },
    {
        id: "scene-2",
        number: 2,
        season: 1,
        titleVi: "Không Gian Chờ Vô Hạn",
        titleEn: "Infinite White Void Lobby",
        videoRef: "Điểm trung chuyển Mùa 1 (Mg9IlgHE7zE)",
        locationTag: "Trạm Trung Chuyển • Hư Vô",
        icon: "🧊",
        image: null,
        description: "Không gian vô tận không thấy chân trời, mặt sàn phẳng bóng loáng như gương phản chiếu bầu trời màu xám bạc. Hàng trăm khối lập phương số khổng lồ phát ánh sáng huỳnh quang xanh lam nhạt lơ lửng không trọng lực. Ở giữa là một màn hình ba chiều khổng lồ hiển thị dòng chữ đếm ngược số 00:00:00 màu đỏ rực.",
        lightingAtmosphere: "Ánh sáng lạnh lẽo, vô trùng, tĩnh lặng tuyệt đối, huyền bí thời không.",
        palette: ["#06b6d4", "#e2e8f0", "#ef4444", "#090d16"],
        aiPrompt: "Concept art of an infinite boundless sterile void without horizon, mirror-like polished silver-grey reflective floor extending infinitely. Hundreds of colossal floating transparent digital data cubes glowing with faint bioluminescent cyan blue light, floating weightlessly in zero gravity. In the center floats a gigantic transparent holographic countdown display showing crimson red digits '00:00:00'. Extremely clean, eerie quiet, clinical lighting, architectural concept, empty of humans, 8k octane render."
    },
    {
        id: "scene-3",
        number: 3,
        season: 1,
        titleVi: "Sảnh Đón Tiếp Bệnh Viện Nửa Đêm",
        titleEn: "Midnight Hospital Reception",
        videoRef: "Phó bản 1 Mùa 1 (Mg9IlgHE7zE)",
        locationTag: "Bệnh Viện Ma • Đại Sảnh",
        icon: "🏥",
        image: null,
        description: "Đại sảnh bệnh viện hoang phế thời thập niên 90. Quầy tiếp tân bằng kính vỡ vụn dán chi chít các tờ nội quy y tế ố vàng rách nát. Dãy ghế chờ bằng sắt han rỉ, băng ca cứu thương lật nghiêng trơ bánh xe, dây truyền dịch lòng thòng. Dưới sàn gạch men vỡ là những vệt màu đen khô quắt. Đèn tuýp dài trên trần nhà chớp tắt liên hồi.",
        lightingAtmosphere: "Ánh sáng xanh lục nhợt nhạt pha lẫn vệt đèn tuýp chập chờn, không khí tử khí bao trùm.",
        palette: ["#10b981", "#1e293b", "#7f1d1d", "#022c22"],
        aiPrompt: "Dark abandoned 1990s hospital reception hall at midnight, shattered glass reception counter covered in peeling yellowed medical warning flyers and handwritten rule notes. Rusted metal waiting benches, an overturned vintage gurney with exposed wheels, dangling IV drip tubing, cracked checkerboard floor tiles stained with dry black residue. Long flickering fluorescent tube lights hanging from dilapidated ceiling casting eerie pale green reflections. Cinematic horror thriller environment, silent dread, no characters, photorealistic 8k."
    },
    {
        id: "scene-4",
        number: 4,
        season: 1,
        titleVi: "Phòng Mổ Bí Mật Số 7",
        titleEn: "Forbidden Operating Theater",
        videoRef: "Khu vực cấm Mùa 1 (Mg9IlgHE7zE)",
        locationTag: "Bệnh Viện Ma • Khu Cấm",
        icon: "🔬",
        image: null,
        description: "Đèn mổ tròn lớn nghiêng lệch một góc 45 độ, rọi chùm sáng trắng gắt gỏng xuống bàn phẫu thuật inox lạnh tanh. Xung quanh là khay để dao kéo phẫu thuật cong queo, các bình thủy tinh lớn chứa dung dịch ngâm nội tạng sủi bọt khí li ti. Tấm rèm y tế màu xanh xám rách tả tơi ngăn cách phòng khử trùng phía sau.",
        lightingAtmosphere: "Tông màu xanh mổ bệnh viện kết hợp ánh kim loại rỉ sét u uất, rợn gáy.",
        palette: ["#0284c7", "#64748b", "#334155", "#0369a1"],
        aiPrompt: "Eerie forbidden surgical operating theater inside an abandoned asylum, massive circular overhead surgical lamp tilted at 45 degrees beaming harsh cold white light onto an empty stainless steel operating table. Surrounded by twisted surgical instruments in metal trays, colossal glass specimen jars filled with murky bubbling formaldehyde preserving mutated organs, torn blue-grey medical curtains swaying gently. Decaying dark hospital atmosphere, rusty industrial horror, empty room, Unreal Engine 5, 8k."
    },
    {
        id: "scene-5",
        number: 5,
        season: 1,
        titleVi: "Hành Lang Chung Cư Tầng 4 - Phòng 404",
        titleEn: "Blood Apartment 4th Floor Corridor",
        videoRef: "Phó bản Chung Cư Huyết Tế (Mg9IlgHE7zE)",
        locationTag: "Chung Cư Quái Đàm • Phòng 404",
        icon: "🚪",
        image: null,
        description: "Hành lang hẹp dài hun hút không thấy điểm cuối. Dây điện chằng chịt thòng xuống từ trần nhà nứt nẻ. Cửa sắt phòng 404 màu xanh rêu bị dán kín các dải băng cảnh báo màu vàng và bùa niêm phong. Trên sàn trải tấm thảm hoa văn cổ xưa phủ lớp bụi đen dày đặc.",
        lightingAtmosphere: "Bóng tối đặc quánh, ánh sáng đỏ quạch hắt ra từ bóng đèn báo thoát hiểm cuối hành lang.",
        palette: ["#b91c1c", "#14532d", "#ca8a04", "#09090b"],
        aiPrompt: "An unsettling narrow endless apartment hallway with cracked peeling walls, exposed tangled electric wires hanging from the ceiling like cobwebs. Moss-green heavy iron door of apartment number 404 sealed shut with vibrant yellow warning hazard tape and ancient crimson talisman seals. Ancient ornate vintage carpet coated with thick black dust on the floor. Ominous dark crimson light spilling from an emergency exit sign at the corridor end. Atmospheric psychological horror, claustrophobic, empty scenery, 8k."
    },
    {
        id: "scene-6",
        number: 6,
        season: 1,
        titleVi: "Lớp Học Ban Đêm Trường Cấp Ba Bỏ Hoang",
        titleEn: "Midnight Cursed Classroom",
        videoRef: "Phó bản Giờ Giới Nghiêm (Mg9IlgHE7zE)",
        locationTag: "Trường Cấp Ba • Lớp Cấm",
        icon: "🏫",
        image: null,
        description: "Phòng học với các dãy bàn ghế gỗ xô lệch phủ mạng nhện. Tấm bảng đen ở bục giảng còn lưu lại công thức triệu hồi và các dòng chữ cấm bằng phấn đỏ chảy dài. Cửa sổ kính vỡ để gió lùa làm những tấm rèm trắng bay phần phật dưới ánh trăng rằm tròn vành vạnh bên ngoài.",
        lightingAtmosphere: "Ánh trăng xanh lam xuyên qua khung cửa sổ, tạo nên các vệt sáng cắt ngang phòng học u ám.",
        palette: ["#1d4ed8", "#dc2626", "#e0e7ff", "#0f172a"],
        aiPrompt: "Cursed abandoned high school classroom bathed in chilling blue moonlight pouring through broken tall windows, dusty wooden student desks and chairs askew covered in cobwebs. A massive blackboard at the front covered in red chalk occult summoning circles and dripping forbidden text rules. Torn white curtains billowing violently in the night wind under a gigantic full moon outside. Ghostly haunting atmosphere, dark anime aesthetic / photorealistic visual novel background, completely empty, 8k."
    },
    {
        id: "scene-7",
        number: 7,
        season: 1,
        titleVi: "Ga Tàu Điện Ngầm Tuyến Số 0",
        titleEn: "Abyssal Subway Station",
        videoRef: "Chuyến Tàu 3 Giờ Sáng (Mg9IlgHE7zE)",
        locationTag: "Tàu Ma Tuyến 0 • Sân Ga",
        icon: "🚇",
        image: null,
        description: "Sân ga ngầm ngập nước đen đến mắt cá chân. Bảng hiệu chỉ dẫn tuyến tàu nhấp nháy chữ đỏ kỳ dị. Các cột bê tông chịu lực bị nứt toác để lộ cốt thép xoắn vặn. Đường ray sắt gỉ sét kéo dài hun hút vào đường hầm tối tăm không một tia sáng.",
        lightingAtmosphere: "Ánh sáng neon đỏ lập lòe phản chiếu trên mặt nước tù đọng. U ám, ngột ngạt.",
        palette: ["#ef4444", "#334155", "#0284c7", "#05070c"],
        aiPrompt: "Flooded subterranean subway terminal with ankle-deep pitch black stagnant water, flickering distorted red neon departure signboard displaying glitching symbols. Cracked brutalist concrete support pillars with twisted rusted rebar exposed. Empty rusted iron train tracks stretching into an ominous pitch black tunnel where no light escapes. Deep red and sickly green reflections on water surface, eerie silent dread, empty station, cinematic concept art 8k."
    },
    {
        id: "scene-8",
        number: 8,
        season: 1,
        titleVi: "Lò Hỏa Táng Nhà Tang Lễ U Linh",
        titleEn: "Spectral Crematorium",
        videoRef: "Phó bản Giải Mã Thi Thể (Mg9IlgHE7zE)",
        locationTag: "Nhà Tang Lễ • Lò Phong Ấn",
        icon: "⚱️",
        image: null,
        description: "Căn phòng vuông vức lát đá hoa cương xám tro lạnh toát. Cửa lò hỏa táng bằng thép dày đúc nổi các phù văn cổ phong ấn, khe cửa lò le lói ánh lửa than âm ỉ. Trên bàn sắt đặt một chiếc chuông đồng nhỏ không người rung.",
        lightingAtmosphere: "Ánh lửa than đỏ cam lập lòe từ miệng lò hắt lên nền đá xám xịt.",
        palette: ["#ea580c", "#475569", "#7c2d12", "#0c0a09"],
        aiPrompt: "Monolithic crematorium chamber lined with cold ash-grey polished granite tiles. Heavy cast-steel incinerator vault door engraved with ancient sealing runes, glowing faintly from smoldering orange-red ember light leaking through the bottom seam. A pristine small antique bronze bell resting upon a cold steel autopsy table untouched. Deep dark shadows, flickering ember glow, macabre ritualistic silence, empty of living souls, 8k octane render."
    },
    {
        id: "scene-9",
        number: 9,
        season: 1,
        titleVi: "Sòng Bạc Tử Thần Hoàng Gia",
        titleEn: "The Death Casino",
        videoRef: "Ván Cược Tính Mạng (Mg9IlgHE7zE)",
        locationTag: "Sòng Bạc Hoàng Gia • Bàn Roulette",
        icon: "🎲",
        image: "assets/images/death_casino.jpg",
        description: "Đại sảnh sòng bạc phong cách Rococo sa đọa. Chiếc bàn cược Roulette mạ vàng khổng lồ đặt chính giữa tấm thảm đỏ nhung lộng lẫy. Hàng ngàn lá bài Tây và đồng chip phát sáng lơ lửng xung quanh chiếc đèn chùm pha lê khổng lồ rủ xuống từ vòm trần dát vàng nứt nẻ.",
        lightingAtmosphere: "Vàng kim lấp lánh hòa quyện với bóng tối ma mị, xa hoa nhưng ngập tràn tử khí.",
        palette: ["#d4af37", "#991b1b", "#059669", "#171004"],
        aiPrompt: "Atmospheric dark fantasy concept art of a decadent abandoned royal death casino, enormous golden roulette table on a luxurious crimson velvet carpet, thousands of glowing tarot cards and glowing poker chips floating mid-air, cracked ornate rococo gilded ceiling with a massive gothic crystal chandelier, eerie green and deep gold light reflections, mystical dark shadows, empty of people, photorealistic cinematic Unreal Engine 5 render, 8k."
    },
    {
        id: "scene-10",
        number: 10,
        season: 1,
        titleVi: "Đại Sảnh Khách Sạn Sương Mù",
        titleEn: "Mist Hotel Grand Foyer",
        videoRef: "Khách Sạn Quái Đàm (Mg9IlgHE7zE)",
        locationTag: "Khách Sạn Sương Mù • Tiền Sảnh",
        icon: "🏨",
        image: null,
        description: "Đại sảnh kiến trúc Gothic mục nát chìm trong làn sương mù xám đục dâng cao nửa thước. Cầu thang gỗ sồi uốn lượn đôi dẫn lên ban công tối om. Lò sưởi bằng đá thô cháy bập bùng ngọn lửa ma trơi màu xanh lam, quầy lễ tân trống không bày một cuốn sổ đăng ký mở sẵn trang giấy ố vàng.",
        lightingAtmosphere: "Sương khói lãng đãng mờ ảo dưới ánh lửa xanh lam huyền bí.",
        palette: ["#3b82f6", "#64748b", "#1e1b4b", "#020617"],
        aiPrompt: "Decaying Gothic hotel lobby shrouded in thick knee-high grey mist floating above rotten wooden parquet. Sweeping twin curved oak staircases leading up into shadowy dark balconies. Rough stone fireplace burning with an eerie spectral blue will-o'-the-wisp flame. Empty reception mahogany desk holding an open antique guest register with yellowed parchment pages. Dreamlike spooky atmosphere, mystical blue lighting, empty scenery, 8k resolution."
    },

    // --- MÙA 2: CÁC PHÓ BẢN CẤP THẦN & THỜI KHÔNG (KIRyZv9jUpc) ---
    {
        id: "scene-11",
        number: 11,
        season: 2,
        titleVi: "Đấu Trường Giác Đấu La Mã Đẫm Máu",
        titleEn: "Colosseum of the Damned",
        videoRef: "Mở màn Mùa 2 (KIRyZv9jUpc)",
        locationTag: "Đấu Trường La Mã • Cấm Cổ",
        icon: "⚔️",
        image: null,
        description: "Khán đài đá hình tròn khổng lồ xếp tầng ngàn năm phong hóa nứt nẻ dưới bầu trời vần vũ mây giông sấm sét đỏ. Bãi cát vàng trung tâm lún sâu lấm tấm những mảnh khiên giáp vỡ và giáo gãy cắm trơ trọi. Cổng vòm sắt đen dẫn vào chuồng ngục tối tăm thăm thẳm.",
        lightingAtmosphere: "Ánh hoàng hôn đỏ thẫm xé rách bởi những tia sét ma thuật tím.",
        palette: ["#991b1b", "#7c3aed", "#d97706", "#180608"],
        aiPrompt: "Colossal ancient Roman gladiator colosseum ruins under a raging apocalyptic blood-red storm sky torn by purple lightning strikes. Weathered crumbling stone tiers stretching upward, central deep golden sand arena littered with shattered iron shields and broken spears thrust into the ground. Dark iron-barred arched gates leading into abyssal underground beast cages. Epic dark fantasy battlefield, solemn desolate grandeur, empty of warriors, 8k cinematic concept art."
    },
    {
        id: "scene-12",
        number: 12,
        season: 2,
        titleVi: "Điện Thờ Thần Linh Phế Tích",
        titleEn: "Ruined Pantheon of Fallen Gods",
        videoRef: "Di Vật Cổ Đại (KIRyZv9jUpc)",
        locationTag: "Điện Thờ Hy Lạp • Phế Tích Thần",
        icon: "🏛️",
        image: null,
        description: "Quần thể đền thờ phong cách Hy Lạp cổ đại đổ nát. Những cột đá cẩm thạch khổng lồ gãy gập ngổn ngang quấn đầy dây leo đen khô héo. Bệ thờ thần ở trung tâm nứt toác bốc lên làn khói bạc linh thiêng tàn lụi. Những mảnh vỡ đá thiêng trôi nổi lơ lửng giữa không trung ngược trọng lực.",
        lightingAtmosphere: "Ánh hoàng hôn cam cháy rực chiếu xuyên qua các kẽ cột đá hoang tàn tráng lệ.",
        palette: ["#f59e0b", "#94a3b8", "#78350f", "#1e1b4b"],
        aiPrompt: "Magnificent crumbling ancient Greek pantheon temple ruins atop a solitary cliff at burning orange sunset. Colossal broken marble columns wrapped in withered black thorny vines. Central cracked altar emitting faint ethereal silver smoke curling upward. Giant holy stone fragments floating weightlessly in mid-air defying gravity. Golden hour dramatic god rays piercing through ruined stone pillars, majestic fallen divinity, empty concept art, 8k."
    },
    {
        id: "scene-13",
        number: 13,
        season: 2,
        titleVi: "Cung Điện Phán Xét Của Thần Linh",
        titleEn: "The Divine Judgment Court (Mốc 4365s)",
        videoRef: "Cao trào Mùa 2 - Mốc 4365s (KIRyZv9jUpc)",
        locationTag: "Tòa Án Tối Cao Thần Minh",
        icon: "⚖️",
        image: "assets/images/hero_divine_judgment.jpg",
        description: "Đại điện hình mái vòm vĩ đại với kiến trúc hắc thạch và vàng ròng. Một chiếc Ngai Vàng Phán Quyết khổng lồ chạm khắc vương miện mặt trời lơ lửng giữa không trung, xung quanh bao bọc bởi những khối pha lê đen obsidian sắc nhọn. Ngay phía trước ngai vàng là chiếc Cán Cân Công Lý bằng vàng ròng khổng lồ treo bằng xích thần lực trôi nổi bất động. Mặt sàn lát đá obsidian phản chiếu toàn bộ dải ngân hà tinh tú tím thẫm phía trên mái vòm kính.",
        lightingAtmosphere: "Sắc tím vũ trụ huyền bí đan xen với ánh vàng kim chói lọi của thần quyền, không gian trang nghiêm, vắng lặng tuyệt đối.",
        palette: ["#8b5cf6", "#d4af37", "#090514", "#3b0764"],
        aiPrompt: "Cinematic dark fantasy concept art of the Divine Judgment Court and Cosmic Void Throne, colossal floating golden scale of justice suspended by glowing chains, an imposing obsidian throne flanked by sharp crystals under a swirling starry purple cosmos and eclipsed black sun with silver corona, mystical gold runes glowing on a polished mirror obsidian floor, dramatic volumetric lighting, eerie mist, Unreal Engine 5 aesthetic, 8k resolution, photorealistic concept art, completely empty scenery."
    },
    {
        id: "scene-14",
        number: 14,
        season: 2,
        titleVi: "Mê Cung Bánh Răng Thời Gian",
        titleEn: "Chrono Gear Clockwork Labyrinth",
        videoRef: "Đảo Ngược Thời Gian (KIRyZv9jUpc)",
        locationTag: "Thời Không Vực • Bánh Răng Vô Tận",
        icon: "⚙️",
        image: null,
        description: "Không gian vô trọng lực ngập tràn hàng ngàn bánh răng cơ khí bằng đồng thau, đồng thiếc và sắt rỉ đang ăn khớp vào nhau ở mọi góc độ. Các quả lắc đồng hồ khổng lồ sứt mẻ treo lơ lửng trên các sợi xích sắt to lớn. Bụi tinh vân lấp lánh phản chiếu các ký tự phù văn thời gian phát sáng màu ngọc lam trên viền bánh răng.",
        lightingAtmosphere: "Ánh đồng thau ấm áp nổi bật trên nền tinh vân vũ trụ xanh đen sâu thẳm.",
        palette: ["#d97706", "#06b6d4", "#78350f", "#030712"],
        aiPrompt: "Zero-gravity cosmic steampunk expanse filled with thousands of interlocking giant mechanical clockwork gears made of brass, bronze, and rusted wrought iron. Massive chipped grandfather clock pendulums hanging from enormous chains. Shimmering cosmic stardust reflecting glowing cyan and turquoise temporal runes carved along the gear rims. Warm brass tones against infinite deep navy void, epic time-travel labyrinth, empty of characters, 8k render."
    },
    {
        id: "scene-15",
        number: 15,
        season: 2,
        titleVi: "Thư Viện Cấm Thuật Vô Tận",
        titleEn: "Forbidden Celestial Library",
        videoRef: "Khu Luật Sinh Tử Vũ Trụ (KIRyZv9jUpc)",
        locationTag: "Thư Viện Cấm • Vòng Xoắn Ốc",
        icon: "📚",
        image: null,
        description: "Dãy giá sách bằng gỗ mun cao vút chọc thẳng lên trần vòm vô tận, uốn lượn theo hình xoắn ốc Fibonacci. Hàng trăm cuốn sách cổ bìa da nạm đá quý tự động lơ lửng, lật trang xào xạc phát ra hào quang tím nhạt. Những chiếc thang trượt bằng đồng tự trôi nổi giữa các tầng sách.",
        lightingAtmosphere: "Bầu không khí huyền bí, tĩnh mịch như lắng đọng thời gian, ánh sáng tím huyền ảo.",
        palette: ["#a855f7", "#d4af37", "#1e1b4b", "#0b0416"],
        aiPrompt: "Infinite astronomical library with towering obsidian and ebony bookshelves spiraling endlessly upward in a Fibonacci curve toward a star-filled domed sky. Hundreds of ancient leather-bound grimoires encrusted with gemstones floating in mid-air, pages rustling automatically with faint bioluminescent violet aura. Ornate brass wheeled ladders floating between suspended book tiers. Sacred mystical atmosphere, frozen time, empty concept art, 8k resolution."
    },
    {
        id: "scene-16",
        number: 16,
        season: 2,
        titleVi: "Tứ Hợp Viện Bát Quái Cổ U Linh",
        titleEn: "Haunted Ancient Courtyard",
        videoRef: "Quy Tắc Dân Gian Cổ (KIRyZv9jUpc)",
        locationTag: "Tứ Hợp Viện • Bàn Thờ Tổ Tiên",
        icon: "🏮",
        image: null,
        description: "Sân viện tứ hợp viện phong kiến lát đá xanh phủ đầy lá phong đỏ khô héo. Mái ngói âm dương rêu phong rủ xuống những chiếc đèn lồng giấy đỏ phát ra ánh sáng đỏ nhờ nhờ. Gian chính mở toang cửa, lộ ra bàn thờ tổ tiên nghi ngút khói trầm hương và chiếc gương bát quái bằng đồng sáng loáng treo giữa xà ngang.",
        lightingAtmosphere: "Ánh sáng đèn lồng đỏ âm u rọi xuống sân đá tạo nên bầu không khí quái dị rợn tóc gáy.",
        palette: ["#b91c1c", "#15803d", "#d4af37", "#180507"],
        aiPrompt: "Traditional ancient Chinese Siheyuan quadrangle courtyard paved with damp mossy bluestones covered in fallen crimson maple leaves. Weathered grey curved tiled roofs with dangling red paper lanterns emitting a dim scarlet glow. Open central ancestral hall displaying a lacquered altar with swirling incense smoke and a gleaming polished bronze Bagua mirror hanging from the main wooden beam. Spooky folklore occult atmosphere, eerie silence, empty of living, 8k."
    },
    {
        id: "scene-17",
        number: 17,
        season: 2,
        titleVi: "Phòng Thí Nghiệm Nuôi Cấy Thần Tế Bào",
        titleEn: "Divine Mutation Bio-Chamber",
        videoRef: "Thần Nhân Tạo (KIRyZv9jUpc)",
        locationTag: "Phòng Sinh Hóa • Trụ Áp Lực",
        icon: "🧪",
        image: null,
        description: "Dãy trụ thủy tinh áp lực cao khổng lồ hình trụ chứa đầy chất lỏng huỳnh quang màu xanh ngọc bích phát sáng. Các ống dẫn kim loại và dây cáp chằng chịt như mạng nhện cắm xuống sàn sắt mắt cáo rỉ sét. Các màn hình điều khiển hiển thị sóng não dao động màu xanh lá cây trong căn phòng hoàn toàn vắng bóng người.",
        lightingAtmosphere: "Ánh sáng xanh lục ma mị rọi bóng các khối ống trụ thủy tinh khổng lồ xuống mặt sàn ướt sũng.",
        palette: ["#10b981", "#064e3b", "#38bdf8", "#022c22"],
        aiPrompt: "Futuristic occult bio-engineering laboratory, rows of massive high-pressure glass incubation cylinders filled with glowing fluorescent emerald-green nutrient fluid. Tangled industrial metallic conduits and thick cables spreading across rusted steel mesh catwalk flooring. Holographic monitor consoles displaying green fluctuating brainwave EEG patterns in an abandoned dimly lit facility. Cyberpunk cosmic horror, eerie sci-fi atmosphere, no humans, 8k octane render."
    },
    {
        id: "scene-18",
        number: 18,
        season: 2,
        titleVi: "Bờ Biển Cát Đen & Ngọn Hải Đăng Ma",
        titleEn: "Black Sand Beach & Ghost Lighthouse",
        videoRef: "Hải Đảo Sương Mù Cô Lập (KIRyZv9jUpc)",
        locationTag: "Đảo Hoang • Hải Đăng Đá Đen",
        icon: "🌊",
        image: null,
        description: "Bãi cát đen núi lửa trải dài bên bờ biển có những con sóng bạc đầu xô bờ dữ dội. Xác một con tàu buồm cổ thế kỷ 18 mắc cạn gãy đôi trơ khung xương gỗ mục nát. Trên mỏm đá nhô ra biển là ngọn hải đăng bằng đá đen cao vút, đỉnh tháp rọi một chùm sáng vàng chập chờn xuyên thủng màn sương đêm dày đặc.",
        lightingAtmosphere: "Đêm đen biển sâu, sóng gió rít gào cùng ánh đèn hải đăng quét qua màn sương quỷ quyệt.",
        palette: ["#f59e0b", "#334155", "#0f172a", "#020617"],
        aiPrompt: "Volcanic black sand beach beaten by violent white-capped churning ocean waves under a midnight tempest. The fractured wooden skeletal ribs of a stranded 18th-century pirate galleon half-submerged in wet dark sand. On a jagged black cliff stands a towering basalt ghost lighthouse, its peak casting a solitary pulsating amber beam cutting through impenetrable coastal fog. Bleak gothic coastal horror, desolate stormy grandeur, empty scenery, 8k."
    },
    {
        id: "scene-19",
        number: 19,
        season: 2,
        titleVi: "Cổng Trời Phong Ấn Vực Thẳm",
        titleEn: "Celestial Stargate of Sealing",
        videoRef: "Cửa Ải Thực Thể Tối Cao (KIRyZv9jUpc)",
        locationTag: "Cổng Không Gian • Xích Thần Lực",
        icon: "⛩️",
        image: null,
        description: "Cổng vòm đá chạm khắc các thiên sứ và quỷ dữ cổ đại trôi nổi giữa tầng mây bão sấm chớp cuồn cuộn. Chính giữa cổng là một vết rách không thời gian màu tím đen thăm thẳm, bị trói chặt bởi những sợi xích thần lực khổng lồ màu vàng kim phát sáng rực rỡ ghim vào các đảo đá bay xung quanh.",
        lightingAtmosphere: "Tương phản gay gắt giữa ánh vàng thiêng liêng của xích phong ấn và bóng tối đen tím của hố sâu hư không.",
        palette: ["#d4af37", "#9333ea", "#e11d48", "#11041b"],
        aiPrompt: "Monumental floating celestial stone archway carved with reliefs of weeping seraphim and ancient demons, suspended amidst tumultuous thunderclouds and crimson lightning. At the gate's epicenter lies a swirling tear in spacetime into an abyssal violet-black singularity, shackled by colossal radiant golden divine chains anchored into floating jagged rock islands. Epic cosmic fantasy confrontation ground, stark divine contrast, empty scenery, Unreal Engine 5, 8k."
    },
    {
        id: "scene-20",
        number: 20,
        season: 2,
        titleVi: "Ngai Vàng Vực Thẳm Hư Vô",
        titleEn: "The Void Throne of Deception",
        videoRef: "Điểm Kết Thúc Trò Chơi (KIRyZv9jUpc)",
        locationTag: "Đỉnh Kim Tự Tháp • Vũ Trụ Hư Vô",
        icon: "👑",
        image: null,
        description: "Đỉnh của một kim tự tháp lộn ngược bằng đá hắc thạch đen tuyền trôi nổi cô độc giữa vùng chân không vũ trụ tĩnh lặng. Một chiếc ghế đá nguyên khối đứng đơn độc giữa vòng tròn phù văn màu vàng nhạt vẽ trên mặt đá nhẵn bóng như gương. Phía sau ngai vàng là hình ảnh một mặt trời đen bị che khuất (nhật thực toàn phần) tỏa ra vầng hào quang bạc ma mị.",
        lightingAtmosphere: "Sự tĩnh lặng tuyệt đối của vũ trụ hư vô, hào quang nhật thực đen huyền bí và cô tịch.",
        palette: ["#94a3b8", "#d4af37", "#475569", "#000000"],
        aiPrompt: "The apex summit of a monolithic inverted black obsidian pyramid floating isolated in the silent vacuum of the deep cosmos. A single ancient throne carved from solid meteorite stone standing solitary inside a glowing golden runic circle on a mirror-smooth stone floor. Behind the throne looms a colossal total solar eclipse with a shimmering silver corona and cosmic purple nebula. Absolute existential silence, eerie supreme majesty, empty of mortals, 8k photorealistic concept art."
    }
];

// Tarot Deck Cards for Han Beita's Rule Deception
const TAROT_CARDS = [
    { name: "0. Kẻ Ngốc Hẻm Cũ (The Old Alley Fool)", rule: "Quy tắc 0: Không có món bùa nào là vô dụng nếu ngươi khiến kẻ khác tin vào nó bằng cả sinh mạng." },
    { name: "I. Pháp Sư Bẻ Luật (The Magician of Rules)", rule: "Quy tắc I: Khi luật của phó bản mâu thuẫn với sự thật, hãy sửa chính sự thật." },
    { name: "II. Nữ Tư Tế Gương Soi (The Soul High Priestess)", rule: "Quy tắc II: Quái vật nhìn vào mắt ngươi không đáng sợ bằng quái vật nhìn vào hình bóng ngươi qua gương." },
    { name: "X. Bánh Xe Định Mệnh (Wheel of Fortune)", rule: "Quy tắc X: Mặt ngửa hay sấp chỉ có giá trị khi đồng xu còn đang xoay trên không." },
    { name: "XII. Kẻ Bị Treo Đảo Ngược (The Hanged Deceiver)", rule: "Quy tắc XII: Điểm thiên phú F-Rank là lớp áo giáp dày nhất để kẻ thù hoàn toàn mất cảnh giác." },
    { name: "XIII. Tử Thần Bỏ Lò (Death at the Furnace)", rule: "Quy tắc XIII: Người chết không bao giờ nói dối, nhưng tro tàn của họ có thể viết lại quy tắc sống sót." },
    { name: "XV. Ác Ma Sòng Bạc (The Casino Devil)", rule: "Quy tắc XV: Nếu sòng bạc luôn thắng, hãy lừa nhà cái rằng chính hắn mới là con bạc." },
    { name: "XIX. Mặt Trời Đen Hư Vô (The Black Sun Eclipse)", rule: "Quy tắc XIX: Nơi bóng tối dày đặc nhất là nơi ngọn đèn dầu le lói của kẻ lừa đảo trở thành chân lý duy nhất." },
    { name: "XX. Phán Xét Thần Quyền (The Divine Judgment)", rule: "Quy tắc XX: Trước cán cân công lý của thần linh, kẻ nắm giữ lòng tin của khán giả sẽ nắm giữ sinh tử." },
    { name: "XXII. Kẻ Lừa Gạt Sư (The True God Deceiver)", rule: "Quy tắc XXII: Thần linh bất tử bởi vì họ được tin tưởng. Chỉ cần một vết nứt nghi ngờ, thần thánh cũng tan biến." }
];

// Quotes for Coin Toss
const COIN_QUOTES = {
    truth: [
        "⚖️ SỰ THẬT: 'Lời nói dối hoàn hảo nhất chính là sự thật được tiết lộ đúng thời điểm.'",
        "⚖️ SỰ THẬT: 'Ngươi đã nhìn thấu quy tắc ẩn của tầng phó bản này.'",
        "⚖️ SỰ THẬT: 'Cán cân công lý nghiêng về phía kẻ kiên định không run rẩy.'",
        "⚖️ SỰ THẬT: 'Đối thủ đã tin vào sự thật mà ngươi bày ra trước mắt hắn.'"
    ],
    deception: [
        "👁️ LỪA GẠT: 'Khi thần linh chớp mắt, kẻ lừa gạt đã thay đổi toàn bộ luật chơi!'",
        "👁️ LỪA GẠT: 'F-Rank đánh lừa cả hội đồng giám sát. Kỹ năng 'Lấy Giả Làm Thật' kích hoạt thành công.'",
        "👁️ LỪA GẠT: 'Quy tắc quái đàm đã bị tráo đổi. Quái vật đang tuân theo quy tắc giả của ngươi!'",
        "👁️ LỪA GẠT: 'Sự dối trá trở thành hiện thực tuyệt đối trong phó bản tử thần!'"
    ]
};

// ==========================================================================
// 2. WEB AUDIO API SYNTHESIZER (AMBIENT SOUND & SFX)
// ==========================================================================
class OccultSoundscape {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.masterGain = null;
        this.oscillators = [];
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
            this.masterGain.connect(this.ctx.destination);
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleAmbient() {
        this.init();
        if (this.isPlaying) {
            this.stopAmbient();
            return false;
        } else {
            this.startAmbient();
            return true;
        }
    }

    startAmbient() {
        if (this.isPlaying) return;
        this.init();
        this.oscillators = [];

        // Dark atmospheric drone chords (E eerie occult frequency)
        const freqs = [41.2, 82.41, 123.47, 164.81]; // E1, E2, B2, E3
        
        freqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq + (Math.random() * 0.8 - 0.4), this.ctx.currentTime);

            // Subtle slow tremolo LFO
            const lfo = this.ctx.createOscillator();
            const lfoGain = this.ctx.createGain();
            lfo.frequency.setValueAtTime(0.08 + idx * 0.03, this.ctx.currentTime);
            lfoGain.gain.setValueAtTime(freq * 0.03, this.ctx.currentTime);
            lfo.connect(osc.frequency);
            lfo.start();

            gain.gain.setValueAtTime(0.015 / (idx + 1), this.ctx.currentTime);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start();

            this.oscillators.push({ osc, gain, lfo });
        });

        this.isPlaying = true;
    }

    stopAmbient() {
        if (!this.isPlaying) return;
        this.oscillators.forEach(({ osc, lfo }) => {
            try {
                osc.stop();
                lfo.stop();
            } catch(e) {}
        });
        this.oscillators = [];
        this.isPlaying = false;
    }

    playCoinSound() {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(3200, now + 0.15);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.35);
    }

    playTarotSound() {
        this.init();
        const now = this.ctx.currentTime;
        const chord = [523.25, 659.25, 783.99, 1046.50]; // C Major ethereal chime

        chord.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + i * 0.05);

            gain.gain.setValueAtTime(0.08, now + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + i * 0.05);
            osc.stop(now + 0.85);
        });
    }

    playClickSound() {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.05);
    }
}

const audioSynth = new OccultSoundscape();

// ==========================================================================
// 3. AMBIENT PARTICLES CANVAS
// ==========================================================================
function initParticleCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(width > 768 ? 65 : 30, 80);

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.8 + 0.4,
            speedY: - (Math.random() * 0.45 + 0.15),
            speedX: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.6 + 0.2,
            gold: Math.random() > 0.4
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;

            if (p.y < 0) {
                p.y = height + 5;
                p.x = Math.random() * width;
            }
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.gold
                ? `rgba(212, 175, 55, ${p.opacity})`
                : `rgba(139, 92, 246, ${p.opacity * 0.8})`;
            ctx.fill();
        });

        requestAnimationFrame(render);
    }
    render();
}

// ==========================================================================
// 4. SCENES RENDERING & FILTERING
// ==========================================================================
let currentFilter = 'all';
let currentSearch = '';

function renderScenes() {
    const grid = document.getElementById('scenes-grid');
    const countDisplay = document.getElementById('visible-count');
    if (!grid) return;

    // Filter scenes
    const filtered = SCENES_DATA.filter(scene => {
        const matchSeason =
            currentFilter === 'all' ||
            (currentFilter === 'season1' && scene.season === 1) ||
            (currentFilter === 'season2' && scene.season === 2);

        if (!matchSeason) return false;

        if (!currentSearch) return true;

        const term = currentSearch.toLowerCase().trim();
        return (
            scene.titleVi.toLowerCase().includes(term) ||
            scene.titleEn.toLowerCase().includes(term) ||
            scene.locationTag.toLowerCase().includes(term) ||
            scene.description.toLowerCase().includes(term) ||
            scene.lightingAtmosphere.toLowerCase().includes(term)
        );
    });

    if (countDisplay) {
        countDisplay.textContent = filtered.length;
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: #94a3b8;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🂠</div>
                <h3 style="font-family: var(--font-heading); color: var(--gold-light); margin-bottom: 0.5rem;">Không tìm thấy bối cảnh phù hợp</h3>
                <p>Thử tìm kiếm với từ khóa khác như "phòng mổ", "casino", "ngai vàng", "thần linh", "thời gian"...</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(scene => {
        const seasonBadgeClass = scene.season === 1 ? 'badge-s1' : 'badge-s2';
        const seasonText = scene.season === 1 ? 'Mùa 1: Quái Đàm' : 'Mùa 2: Cấp Thần';
        const formattedNum = scene.number < 10 ? `0${scene.number}` : scene.number;

        const mediaHtml = scene.image
            ? `<img src="${scene.image}" alt="${scene.titleVi}" class="card-img" loading="lazy">`
            : `
                <div class="card-media-placeholder">
                    <span class="placeholder-icon">${scene.icon}</span>
                    <span class="placeholder-tag">EMPTY SCENERY</span>
                </div>
            `;

        return `
            <article class="scene-card glass-panel" id="card-${scene.id}">
                <div class="card-media">
                    <span class="card-badge-season ${seasonBadgeClass}">${seasonText}</span>
                    <span class="card-index-tag">#${formattedNum}</span>
                    ${mediaHtml}
                </div>

                <div class="card-content">
                    <div class="card-titles">
                        <span class="card-location-badge">📍 ${scene.locationTag}</span>
                        <h3 class="scene-vi-title">${scene.titleVi}</h3>
                        <span class="scene-en-title">${scene.titleEn}</span>
                    </div>

                    <p class="scene-desc" title="${escapeHtml(scene.description)}">${scene.description}</p>

                    <div class="card-atmosphere-box">
                        <span class="atmosphere-label">Ánh Sáng & Bầu Không Khí</span>
                        <span>${scene.lightingAtmosphere}</span>
                    </div>

                    <div class="card-actions">
                        <button class="btn btn-card-copy" onclick="copyScenePrompt('${scene.id}')" title="Sao chép prompt Midjourney/AI">
                            <span>📋 Copy Prompt AI</span>
                        </button>
                        <button class="btn btn-card-view" onclick="openDioramaModal('${scene.id}')" title="Xem phân tích bối cảnh chi tiết">
                            <span>🔍 Toàn Cảnh</span>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ==========================================================================
// 5. COPY PROMPT & TOAST NOTIFICATION
// ==========================================================================
function copyScenePrompt(sceneId) {
    const scene = SCENES_DATA.find(s => s.id === sceneId);
    if (!scene) return;

    audioSynth.playClickSound();

    navigator.clipboard.writeText(scene.aiPrompt).then(() => {
        showToast(`Đã sao chép Prompt AI của [#${scene.number} ${scene.titleVi}]!`);
    }).catch(err => {
        console.error('Không thể copy:', err);
        showToast("Lỗi khi sao chép prompt!");
    });
}

function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('active');

    if (window.toastTimeout) clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
        toast.classList.remove('active');
    }, 3200);
}

// ==========================================================================
// 6. DIORAMA / CINEMATIC INSPECTION MODAL
// ==========================================================================
function openDioramaModal(sceneId) {
    const scene = SCENES_DATA.find(s => s.id === sceneId);
    if (!scene) return;

    audioSynth.playTarotSound();

    const modal = document.getElementById('diorama-modal');
    const body = document.getElementById('modal-body');
    if (!modal || !body) return;

    const formattedNum = scene.number < 10 ? `0${scene.number}` : scene.number;
    const mediaBanner = scene.image
        ? `<div class="modal-media-banner"><img src="${scene.image}" alt="${scene.titleVi}"></div>`
        : `
            <div class="modal-media-banner" style="display:flex; flex-direction:column; align-items:center; justify-content:center; background: radial-gradient(circle, #1a1e2e, #06070a);">
                <span style="font-size: 4.5rem; color: var(--gold-primary);">${scene.icon}</span>
                <span style="font-family: var(--font-heading); font-size: 0.9rem; color: var(--gold-light); margin-top: 0.5rem; letter-spacing: 0.15em;">CONCEPT ART WORK IN PROGRESS</span>
            </div>
        `;

    body.innerHTML = `
        ${mediaBanner}

        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
                <span class="card-location-badge">📍 ${scene.locationTag} • ${scene.videoRef}</span>
                <span class="card-index-tag">BỐI CẢNH #${formattedNum} / 20</span>
            </div>
            <h2 style="font-family: var(--font-heading-epic); font-size: 1.8rem; color: var(--gold-light);">${scene.titleVi}</h2>
            <h4 style="font-family: var(--font-body); font-size: 1rem; color: var(--text-muted); font-style: italic;">${scene.titleEn}</h4>
        </div>

        <div class="mechanic-box">
            <strong>Mô Tả Không Gian (Hoàn Toàn Không Có Người):</strong><br>
            ${scene.description}
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
            <div class="card-atmosphere-box">
                <span class="atmosphere-label">Ánh Sáng & Khí Quyển</span>
                <span style="color: #e2e8f0;">${scene.lightingAtmosphere}</span>
            </div>
            <div class="card-atmosphere-box">
                <span class="atmosphere-label">Màu Sắc Chủ Đạo</span>
                <div style="display: flex; gap: 0.5rem; margin-top: 0.4rem;">
                    ${scene.palette.map(c => `
                        <div style="width: 24px; height: 24px; border-radius: 4px; background: ${c}; border: 1px solid rgba(255,255,255,0.2);" title="${c}"></div>
                    `).join('')}
                </div>
            </div>
        </div>

        <div class="modal-prompt-box">
            <div class="prompt-box-header">
                <span class="prompt-box-title">⚡ PROMPT AI MIDJOURNEY / STABLE DIFFUSION 8K</span>
                <button class="btn btn-primary" style="padding: 0.4rem 1rem; font-size: 0.75rem;" onclick="copyScenePrompt('${scene.id}')">
                    <span>📋 Copy Prompt</span>
                </button>
            </div>
            <div class="modal-prompt-content">${scene.aiPrompt}</div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDioramaModal() {
    const modal = document.getElementById('diorama-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================================================
// 7. INTERACTIVE FATE COIN & TAROT DRAW
// ==========================================================================
let isCoinFlipping = false;
let currentRotation = 0;

function setupFateCoin() {
    const btn = document.getElementById('btn-flip-coin');
    const coin = document.getElementById('fate-coin');
    const resultText = document.getElementById('coin-result-text');
    if (!btn || !coin || !resultText) return;

    btn.addEventListener('click', () => {
        if (isCoinFlipping) return;
        isCoinFlipping = true;

        audioSynth.playCoinSound();

        const isTruth = Math.random() > 0.5;
        // Calculate new rotation: multiple of 360 deg + 0 for front (truth) or 180 for back (deception)
        const spins = 5; // 5 full 360 loops
        const targetFace = isTruth ? 0 : 180;
        currentRotation += spins * 360 + targetFace;

        coin.style.setProperty('--flip-end-angle', `${currentRotation}deg`);
        coin.classList.remove('flipping');
        void coin.offsetWidth; // force reflow
        coin.classList.add('flipping');

        resultText.textContent = "Đồng xu đang xoay trong không trung định mệnh...";

        setTimeout(() => {
            isCoinFlipping = false;
            const quoteList = isTruth ? COIN_QUOTES.truth : COIN_QUOTES.deception;
            const quote = quoteList[Math.floor(Math.random() * quoteList.length)];
            resultText.textContent = quote;
        }, 1600);
    });
}

function setupTarotDraw() {
    const btn = document.getElementById('btn-draw-tarot');
    const cardEl = document.getElementById('interactive-tarot-card');
    const cardName = document.getElementById('tarot-card-name');
    const cardRule = document.getElementById('tarot-card-rule');
    if (!btn || !cardEl || !cardName || !cardRule) return;

    function draw() {
        audioSynth.playTarotSound();
        cardEl.classList.remove('drawing');
        void cardEl.offsetWidth;
        cardEl.classList.add('drawing');

        const card = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
        cardName.textContent = card.name;
        cardRule.textContent = card.rule;
    }

    btn.addEventListener('click', draw);
    cardEl.addEventListener('click', draw);
}

// ==========================================================================
// 8. EXPORT ALL PROMPTS (.TXT)
// ==========================================================================
function setupExportPrompts() {
    const btn = document.getElementById('btn-export-all-prompts');
    if (!btn) return;

    btn.addEventListener('click', () => {
        audioSynth.playClickSound();

        let fileContent = `================================================================================\n`;
        fileContent += `HỒ SƠ NHÂN VẬT & 20 BỐI CẢNH ĐẮC GIÁ - HÀN BỐI THÁP (MÙA 1 & MÙA 2)\n`;
        fileContent += `Bộ Prompt AI Midjourney / Stable Diffusion / DALL-E (Empty Sceneries 8K)\n`;
        fileContent += `Tác giả: hungdz22072014\n`;
        fileContent += `================================================================================\n\n`;

        SCENES_DATA.forEach(s => {
            fileContent += `[BỐI CẢNH #${s.number}] - ${s.titleVi} (${s.titleEn})\n`;
            fileContent += `Mùa: ${s.season === 1 ? 'Mùa 1 (Mg9IlgHE7zE)' : 'Mùa 2 (KIRyZv9jUpc)'}\n`;
            fileContent += `Vị trí: ${s.locationTag}\n`;
            fileContent += `Mô tả: ${s.description}\n`;
            fileContent += `Ánh sáng: ${s.lightingAtmosphere}\n`;
            fileContent += `PROMPT AI:\n${s.aiPrompt}\n\n`;
            fileContent += `--------------------------------------------------------------------------------\n\n`;
        });

        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Han_Boi_Thap_20_Scenes_AI_Prompts.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast("Đã tải xuống toàn bộ 20 Prompt AI thành công!");
    });
}

// ==========================================================================
// 9. EVENT LISTENERS & INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Ambient Particle Canvas
    initParticleCanvas();

    // 2. Initial Render of Scenes
    renderScenes();

    // 3. Filter Tabs Setup
    const filterTabs = document.querySelectorAll('.tab-btn');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            audioSynth.playClickSound();
            filterTabs.forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentFilter = e.currentTarget.getAttribute('data-filter');
            renderScenes();
        });
    });

    // 4. Search Input Setup
    const searchInput = document.getElementById('scene-search-input');
    const clearSearchBtn = document.getElementById('clear-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            if (clearSearchBtn) {
                if (currentSearch.length > 0) {
                    clearSearchBtn.classList.add('visible');
                } else {
                    clearSearchBtn.classList.remove('visible');
                }
            }
            renderScenes();
        });
    }
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                currentSearch = '';
                clearSearchBtn.classList.remove('visible');
                renderScenes();
            }
        });
    }

    // 5. Setup Audio Toggle Button
    const audioToggleBtn = document.getElementById('btn-audio-toggle');
    const audioIcon = document.getElementById('audio-icon');
    const audioLabel = document.getElementById('audio-label');
    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            const isPlaying = audioSynth.toggleAmbient();
            if (isPlaying) {
                audioToggleBtn.classList.add('active');
                if (audioIcon) audioIcon.textContent = '🔊';
                if (audioLabel) audioLabel.textContent = 'Đang Phát Khí Quyển';
                showToast("Đã bật âm thanh khí quyển quái đàm!");
            } else {
                audioToggleBtn.classList.remove('active');
                if (audioIcon) audioIcon.textContent = '🔇';
                if (audioLabel) audioLabel.textContent = 'Âm Khí Quyển';
                showToast("Đã tắt âm thanh khí quyển.");
            }
        });
    }

    // 6. Interactive Fate Coin & Tarot
    setupFateCoin();
    setupTarotDraw();

    // 7. Export Prompts
    setupExportPrompts();

    // 8. Modal Close Events
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modal = document.getElementById('diorama-modal');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDioramaModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeDioramaModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDioramaModal();
    });

    // 9. Smooth Active Nav Spy
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});
