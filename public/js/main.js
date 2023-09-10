import { Menu, MenuItem } from "/js/menu.js";
import { TabPanel } from "/js/tabpanel.js";
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
menu.Settings.subitemWidth = '120px';
if (menu.create()) {
    const item = menu.addItem("文件", "#", 'F', null);
    item.addSubItem("新建", "#", 'N', onnew);
    item.addSubItem("保存", "#", 'S', onsave);
    item.addSubItem("打开", "#", 'O', onopen);
    menu.addItem("绘制", "#", 'D', ondraw);
    menu.addItem("设置", "#", null, null);
}
function saveBlobToFile(blob, filename) {
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}
function onnew() {
    // 保存文件
    alert('new');
}
function onsave() {
    // 保存文件
    alert('save');
}
function onopen() {
}
function ondraw() {
    alert('draw');
}

const tabPanel = new TabPanel("left-panel", TabPanel.Dir.LEFT);
tabPanel.Settings.bkColor = "#3c3c3c";
tabPanel.Settings.tabbkColor = "#1e1e1e";
tabPanel.Settings.tabWidth = "40px";
tabPanel.Create();
tabPanel.AddTabPage('', '图元');
tabPanel.AddTabPage('', '我的方案');