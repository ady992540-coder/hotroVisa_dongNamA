const fs = require('fs');
const path = require('path');

// 🔮 TRIZ 10: Hành động chuẩn bị (Bùa bảo vệ Node.js cũ)
if (typeof global.File === 'undefined') {
    global.File = class File { };
}

const cheerio = require('cheerio');

const sourceFile = path.join(__dirname, '..', 'Official Website of Thailand Electronic Visa.html');
const viewsDir = path.join(__dirname, 'views');
const componentsDir = path.join(viewsDir, 'components');

// Tạo thư mục nếu chưa có
if (!fs.existsSync(viewsDir)) fs.mkdirSync(viewsDir, { recursive: true });
if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });

console.log('🧙‍♂️ Đang dùng Đũa phép cắt xén Lâu đài...');

try {
    const html = fs.readFileSync(sourceFile, 'utf8');
    const $ = cheerio.load(html);

    // TRIZ 1 - Phân nhỏ
    const headContent = $('head').html() || '';
    const fixedHead = headContent.replace(/Official Website of Thailand Electronic Visa_files\//g, '_files/');

    const headerContent = $('header').html() || '<div class="header-placeholder">Header trống</div>';
    const fixedHeader = headerContent.replace(/Official Website of Thailand Electronic Visa_files\//g, '_files/');

    const footerContent = $('footer').html() || '<div class="footer-placeholder">Footer trống</div>';
    const fixedFooter = footerContent.replace(/Official Website of Thailand Electronic Visa_files\//g, '_files/');

    // Content còn lại, ta lấy body và bỏ header, footer
    const $body = $('body').clone();
    $body.find('header, footer').remove();
    const mainContent = $body.html().replace(/Official Website of Thailand Electronic Visa_files\//g, '_files/');

    // Ghi EJS
    fs.writeFileSync(path.join(componentsDir, 'head.ejs'), fixedHead);
    fs.writeFileSync(path.join(componentsDir, 'header.ejs'), fixedHeader);
    fs.writeFileSync(path.join(componentsDir, 'footer.ejs'), fixedFooter);

    // Tạo index.ejs lồng nhau (TRIZ 7)
    const indexEjs = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <%- include('components/head') %>
    <title><%= title %></title>
</head>
<body>
    <header>
        <%- include('components/header') %>
    </header>
    
    <main>
        <!-- TRIZ Động: Chèn thông báo động -->
        <div style="background: #ffd700; text-align: center; padding: 15px; font-weight: bold; font-family: sans-serif; border-bottom: 2px solid #ccc;">
            🏰 THÔNG BÁO TỪ HỆ THỐNG CLONE: <%= message %>
        </div>
        ${mainContent}
    </main>

    <footer>
        <%- include('components/footer') %>
    </footer>
</body>
</html>
  `;

    fs.writeFileSync(path.join(viewsDir, 'index.ejs'), indexEjs);
    console.log('✅ Đã tạo xong các khuôn mẫu EJS (header, footer, index) tại thư mục views/ !');

} catch (err) {
    console.error('❌ Lỗi ủ phép mổ xẻ HTML:', err.message);
}
