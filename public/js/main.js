import { Menu, MenuItem } from "/js/menu.js";
import { } from "/js/FileSaver.js";
document.addEventListener('keydown', function (event) {
    // 检测组合键 Ctrl + Shift + A  event.ctrlKey && 
    if (event.shiftKey && event.key === 'F') {

    }
});

const menu = new Menu("menbar");
menu.Settings.bkColor = "#3c3c3c";
menu.Settings.borderColor = "#8a8888";
menu.Settings.bkColorHover = "#444444";
if (menu.create()) {
    const item = menu.addItem("文件", "#", 'F', null);
    item.addSubItem("新建", "#", null);
    item.addSubItem("保存", "#", onsave);
    item.addSubItem("打开", "#", null);
    menu.addItem("绘制", "#", 'D', ondraw);
    menu.addItem("设置", "#", null, null);
}
function saveBlobToFile(blob, filename) {
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}
function onsave() {
    // 保存文件

}
function ondraw() {
    alert('draw');
}