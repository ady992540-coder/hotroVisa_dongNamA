const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Cấu hình EJS làm Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// TRIZ 24: Trung gian - Phục vụ file tĩnh từ thư mục public
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
// Ánh xạ trực tiếp thư mục chứa tài nguyên gốc để không vỡ layout
app.use('/_files', express.static(path.join(__dirname, 'Official Website of Thailand Electronic Visa_files')));
// TRIZ 17: Chuyển sang chiều khác (Tạo Cánh Cửa Không Gian ảo cho Ảnh Mèo)
app.use('/static/media', express.static(path.join(__dirname, 'Official Website of Thailand Electronic Visa_files')));

// Route trang chủ
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Lâu Đài Mới - Thailand E-Visa Clone',
        message: 'Chào mừng đến với hệ thống Clone tự động!'
    });
});

app.listen(PORT, () => {
    console.log(`🏰 Nụ cười bác gác cổng báo: Máy chủ EJS lắng nghe ở http://localhost:${PORT}`);
});
