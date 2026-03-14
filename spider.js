const fs = require('fs');
const path = require('path');

// 🔮 TRIZ 10: Hành động chuẩn bị (Bùa bảo vệ Node.js cũ)
if (typeof global.File === 'undefined') {
    global.File = class File { };
}

const cheerio = require('cheerio');

const sourceFile = path.join(__dirname, '..', 'Official Website of Thailand Electronic Visa.html');

console.log('🕷️ Nhện máy (Spider) đang tự động gom link ảnh bị gãy...');

try {
    const html = fs.readFileSync(sourceFile, 'utf8');
    const $ = cheerio.load(html);

    // Hash Set chống lặp (TRIZ 24 - Trung gian bộ nhớ)
    const resourceSet = new Set();

    $('img, script, link').each((i, el) => {
        const src = $(el).attr('src') || $(el).attr('href');
        if (src && src.includes('Official Website of Thailand Electronic Visa_files')) {
            const decSrc = decodeURIComponent(src); // Giải mã URL có khoảng trắng (%20)
            resourceSet.add(decSrc);
        }
    });

    console.log(`🏰 Lâu đài gốc có tổng cộng ${resourceSet.size} tài nguyên tĩnh.`);

    // Kiểm tra tài nguyên có tồn tại không
    let missing = 0;
    resourceSet.forEach(res => {
        // res: "Official Website of Thailand Electronic Visa_files/style.css"
        const filepath = path.join(__dirname, '..', res);
        if (!fs.existsSync(filepath)) {
            console.log(`  ❌ Mất gạch: ${res} (Dự phòng TRIZ 11: Có thể dùng axios để tải lại link sống)`);
            missing++;
        }
    });

    if (missing === 0) {
        console.log('✅ Chúc mừng! Không có viên gạch nào bị thiếu trong kho Lâu đài.');
    }

} catch (err) {
    console.error('❌ Lỗi nhện quét:', err.message);
}
