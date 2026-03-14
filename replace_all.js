const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'views', 'index.ejs');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Regex: Match any url starting with http or https, containing "thaievisa" and ending before a quote, apostrophe, or space.
    // Example matched: https://www.thaievisa.go.th/ or http://thaievisa.com/login
    const regex = /https?:\/\/[^"'\s<>]*thaievisa[^"'\s<>]*/gi;
    
    // Count matches to log
    const matches = content.match(regex);
    const count = matches ? matches.length : 0;
    
    if (count > 0) {
        content = content.replace(regex, 'https://t.me/travelagency9');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Đã vung đũa phép thanh tẩy thành công ${count} đường link chứa chữ "thaievisa"!`);
    } else {
        console.log(`🪄 Không tìm thấy đường link nào chứa chữ "thaievisa" để thay thế nữa. Lâu đài đã sạch!`);
    }

    // Tự sát sau khi thực hiện xong nhiệm vụ (TRIZ 34: Phân hủy và phục hồi)
    fs.unlinkSync(__filename);

} catch (error) {
    console.error("❌ Lỗi khi thanh tẩy Lâu Đài:", error);
}
