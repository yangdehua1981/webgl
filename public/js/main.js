import { Menu, MenuItem } from "/js/menu.js";
import { TabPanel } from "/js/tabpanel.js";
import { } from "/js/FileSaver.js";
import { ListBox } from "/js/listbox.js";
import { Treeview, TreeNode } from "/js/Treeview.js";
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

const tabPanel = new TabPanel("left-panel", TabPanel.Location.BOTTOM);
tabPanel.Settings.bkColor = "#3c3c3c";
tabPanel.Settings.tabbkColor = "#1e1e1e";
tabPanel.Settings.tabWidth = "40px";
tabPanel.Create();
let tab = tabPanel.AddTab('', '图元');
let listbox = new ListBox();
if (listbox.Create()) {
    listbox.AddItem({ text: 'item1', img: '/img/bk.jpg' });
    listbox.AddItem({ text: 'item2', img: '/img/bk.jpg' });
    listbox.AddItem({ text: 'item3', img: '/img/bk.jpg' });
    listbox.AddItem({ text: 'item4', img: '/img/bk.jpg' });
    listbox.AddItem({ text: 'item5', img: '/img/bk.jpg' });
    listbox.AddItem({ text: 'item6', img: '/img/bk.jpg' });
    listbox.AddItem({ text: 'item7', img: '/img/bk.jpg' });
    tab.BindPage(listbox);
}

let tree = new Treeview(null, '/img/msc.png', '我的方案');
tree.Settings.bkColor = "#1e1e1e";
tree.create();

let node = tree.addNode({ text: "2023/9/1" }, '/img/rl.png');
node.addSubNode({ text: "方案1" }, '/img/sc.png');
node.addSubNode({ text: "方案2" }, '/img/sc.png');
node.addSubNode({ text: "方案3" }, '/img/sc.png');
node = tree.addNode({ text: "2023/9/2" }, '/img/rl.png');
node.addSubNode({ text: "方案11" }, '/img/sc.png');
node.addSubNode({ text: "方案21" }, '/img/sc.png');
let subnode = node.addSubNode({ text: "方案31" }, '/img/sc.png');
subnode.addSubNode({ text: "方案31" }, '/img/sc.png');
subnode.addSubNode({ text: "方案31" }, '/img/sc.png');
node.addSubNode({ text: "方案13" }, '/img/sc.png');
node.addSubNode({ text: "方案24" }, '/img/sc.png');
node.addSubNode({ text: "方案35" }, '/img/sc.png');
tab = tabPanel.AddTab('', '我的方案');
tab.BindPage(tree);

onsizechange();
window.onresize = onsizechange;
let cranvas = document.getElementById("drawer");
cranvas.addEventListener("resize", onsizechange);

function onsizechange(event) {
    let drawer = document.getElementById("drawer");
    let rightpanel = document.getElementById("right-panel");
    if (
        drawer.clientWidth < rightpanel.clientWidth &&
        drawer.clientHeight < rightpanel.clientHeight
    ) {
        rightpanel.style.justifyContent = "center";
        rightpanel.style.display = "flex";
        rightpanel.style.alignItems = "center";
    }
}
