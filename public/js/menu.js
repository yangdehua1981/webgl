export class MenuItem {
    constructor(idx, li, shortcutkey, handler, container) {
        this.idx = idx;
        this.li = li;
        this.ul = null;
        this.shortcutkey = shortcutkey;
        this.container = container;
        this.handler = handler;
        this.#init();
    }
    #init() {
        if (this.li.firstElementChild.tagName.toLowerCase() === 'a') {
            this.alink = this.li.firstElementChild;
            this.alink.addEventListener('click', (event) => { this.#onclick(event); });
            //this.alink.addEventListener('focus', (event) => { this.#onfocus(event); });
            //this.alink.addEventListener('blur', (event) => { this.#onblur(event); });
            if (this.shortcutkey != null) {
                document.addEventListener('keydown', (event) => { this.#onkeydown(event); });
            }
        }
        this.li.addEventListener('mouseenter', (event) => { this.#onmouseenter(event); });
        this.li.addEventListener('mouseleave', (event) => { this.#onmouseleave(event); });
        this.li.style.backgroundColor = this.container.Settings.bkColor;
        this.li.style.borderColor = this.container.Settings.borderColor;

        this.alink.style.color = this.container.Settings.Color;
        this.alink.style.fontSize = this.container.Settings.fontsize;
    }
    #onfocus(event) {
        this.#onmouseenter(event);
    }
    #onblur(event) {
        this.#onmouseleave(event);
    }
    #onmouseenter(event) {
        this.li.style.backgroundColor = this.container.Settings.overbkColor;
        const astyle = this.alink.style;
        astyle.textDecoration = "underline";
        astyle.textDecorationColor = this.container.Settings.txtDecorationColor;
        astyle.borderBottom = "1px solid " + this.container.Settings.txtDecorationColor;
        astyle.fontWeight = "bold";
    }
    #onmouseleave(event) {
        this.li.style.backgroundColor = this.container.Settings.bkColor;
        const astyle = this.alink.style;
        astyle.textDecoration = "none";
        astyle.borderBottom = "none";
        astyle.fontWeight = "normal";
        if (this.container.curitem != null && this.ul != null) {
            this.container.curitem.ul.style.display = "none";
        }
    }
    #onkeydown(event) {
        if (this.shortcutkey != null) {
            if (event.shiftKey && event.key === this.shortcutkey) {
                this.alink.focus();
                event.stopPropagation();
                event.stopImmediatePropagation();
                this.#onclick(event);
            }
        }
    }
    #onclick(event) {
        if (this.container.curitem != this && this.container.curitem != null) {
            this.container.curitem.ul.style.display = "none";
        }
        if (this.ul) {
            let style = this.ul.style;
            if (style.display == "block") {
                style.display = "none";
                this.container.curitem = null;
            }
            else {
                style.display = "block";
                this.container.curitem = this;
            }
        }
        else if (this.handler != null) {
            this.handler(event);
        }
    }
    showSubMenu(bshow) {
        if (this.ul) {
            let style = this.ul.style;
            style.display == bshow ? "block" : "none";
        }
    }
    #onitemclick(event) {
        if (this.ul) {
            this.ul.style.display = "none";
            this.container.curitem = null;
        }
    }
    #createul() {
        if (this.ul == null) {
            this.ul = document.createElement("ul");
            this.ul.className = "submenu";
            this.ul.style = "padding:0px;margin:0px;list-style-type:none;position:absolute;display:none;border:1px solid;border-radius:3px;";
            if (this.container.direction == Menu.Dir.HORZ) {
                this.ul.style.top = '100%';
                this.ul.style.left = '0';
            } else if (this.container.direction == Menu.Dir.VERT) {
                this.ul.style.top = '0%';
                this.ul.style.left = '100';
            }
            this.ul.style.zIndex = '999999';
            this.ul.style.borderColor = this.container.Settings.borderColor;
            this.li.appendChild(this.ul);
        }
    }
    #createli() {
        let li = document.createElement("li");
        li.className = "menu-item";
        li.style = "margin:0px;border-bottom: 1px solid;";
        li.style.borderColor = this.container.Settings.borderColor;
        li.style.width = this.container.Settings.subitemWidth;
        li.style.paddingLeft = this.container.Settings.paddingH;
        li.style.paddingRight = this.container.Settings.paddingH;
        li.style.paddingTop = this.container.Settings.paddingV;
        li.style.paddingBottom = this.container.Settings.paddingV;
        li.addEventListener('click', (event) => { this.#onitemclick(event); });
        return li;
    }
    #creata(text, href) {
        let a = document.createElement("a");
        a.innerText = text;
        a.style = "padding:0px;text-decoration:none;text-align:center;outline:none;caret-color:transparent;";
        a.href = href;
        return a;
    }
    addSubItem(text, href, shortcutkey, handler) {
        this.#createul();
        let li = this.#createli();
        if (shortcutkey != null)
            text += "   Shift+" + shortcutkey;
        let a = this.#creata(text, href);
        li.appendChild(a);
        this.ul.appendChild(li);
        this.handler = null;
        return new MenuItem(this.ul.childElementCount - 1, li, shortcutkey, handler, this.container);
    }
}
//
export class Menu {
    static Dir = {
        HORZ: 'horizontal',
        VERT: 'vertical'
    }
    Settings = {
        Color: '#ffffff',
        bkColor: '#31a6e7',
        overbkColor: '#000909',
        txtDecorationColor: '#0000ff',
        borderColor: '#ccc',
        fontsize: '14px',
        itemWidth: '60px',
        subitemWidth: '80px',
        paddingH: '3px',
        paddingV: '3px'
    }
    #createli() {
        let li = document.createElement("li");
        li.className = "menu-item";
        li.style = "position:relative;margin:0px;";
        li.style.paddingLeft = this.Settings.paddingH;
        li.style.paddingRight = this.Settings.paddingH;
        li.style.paddingTop = this.Settings.paddingV;
        li.style.paddingBottom = this.Settings.paddingV;
        li.style.width = this.Settings.itemWidth;
        if (this.direction == Menu.Dir.HORZ) {
            li.style.display = "inline-block";
            li.style.borderRight = "1px solid";
        }
        else if (this.direction == Menu.Dir.VERT) {
            li.style.display = "block";
            li.style.borderBottom = "1px solid";
        }
        return li;
    }
    #createa(text, href) {
        let a = document.createElement("a");
        a.innerText = text;
        a.style = "padding:0px;text-decoration:none;text-align:center;outline:none;caret-color:transparent;";
        if (this.direction == Menu.Dir.HORZ)
            a.style.display = "block";
        a.href = href;
        return a;
    }
    constructor(barid, direction = Menu.Dir.HORZ) {
        this.menubar = document.getElementById(barid);
        this.curitem = null;
        this.direction = direction;
    }
    create() {
        if (!this.menubar)
            return false;
        this.ul = document.createElement("ul");
        this.ul.className = "menu";
        this.ul.style = "list-style-type:none;padding:0px;margin:0px;text-align: center;";
        if (this.direction == Menu.Dir.HORZ) {
            this.ul.style.display = "flex";
            this.ul.style.alignItems = "center";
        }
        this.menubar.appendChild(this.ul);
        return true;
    }
    addItem(text, href, shortcutkey, handler) {
        if (!this.ul)
            return false;
        let li = this.#createli();
        if (shortcutkey != null)
            text += "(" + shortcutkey + ")";
        let a = this.#createa(text, href);
        li.appendChild(a);
        this.ul.appendChild(li);
        return new MenuItem(this.ul.childElementCount - 1, li, shortcutkey, handler, this);
    }

}
