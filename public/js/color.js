// 将十六进制颜色值转换为RGBA格式
function hexToRGBA(hexColor) {
    var hex = hexColor.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return 'rgba(' + r + ', ' + g + ', ' + b + ', 1)';
}

// 调整RGBA格式颜色值的透明度分量
function adjustAlpha(rgbaColor, alpha) {
    var rgbaParts = rgbaColor.substring(rgbaColor.indexOf('(') + 1, rgbaColor.lastIndexOf(')')).split(',');
    var r = parseInt(rgbaParts[0].trim());
    var g = parseInt(rgbaParts[1].trim());
    var b = parseInt(rgbaParts[2].trim());
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
}

// 将RGBA格式颜色值转换为十六进制表示形式（仅当需要时使用）
function rgbaToHex(rgbaColor) {
    var rgbaParts = rgbaColor.substring(rgbaColor.indexOf('(') + 1, rgbaColor.lastIndexOf(')')).split(',');
    var r = parseInt(rgbaParts[0].trim()).toString(16).padStart(2, '0');
    var g = parseInt(rgbaParts[1].trim()).toString(16).padStart(2, '0');
    var b = parseInt(rgbaParts[2].trim()).toString(16).padStart(2, '0');
    return '#' + r + g + b;
}

export function getRandomColor() {
    // 生成三个随机的 0 到 255 之间的整数
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    // 将 RGB 值转换为十六进制表示
    var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);

    return color;
}