export class MenuItem {
    constructor(idx, li, handler, container) {
        this.idx = idx;
        this.li = li;
        this.ul = null;
        this.container = container;
        this.handler = handler;
        if (li.firstElementChild.tagName.toLowerCase() === 'a') {
            this.alink = li.firstElementChild;
            li.firstElementChild.addEventListener('click', (event) => { this.#onclick(event); });
        }
        this.li.addEventListener('mouseenter', (event) => { this.#onmouseenter(event); });
        this.li.addEventListener('mouseleave', (event) => { this.#onmouseleave(event); });
        this.li.style.backgroundColor = this.container.Settings.bkColor;
        this.li.style.borderColor = this.container.Settings.borderColor;

        this.alink.style.color = this.container.Settings.Color;
        this.alink.style.fontSize = this.container.Settings.fontsize;
    }
    #onmouseenter(event) {
        this.li.style.backgroundColor = this.container.Settings.overbkColor;
        this.alink.style.textDecoration = "underline";
        this.alink.style.textDecorationColor = this.container.Settings.txtDecorationColor;
    }
    #onmouseleave(event) {
        this.li.style.backgroundColor = this.container.Settings.bkColor;
        this.alink.style.textDecoration = "none";
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
    addSubItem(text, href, handler) {
        if (this.ul == null) {
            this.ul = document.createElement("ul");
            this.ul.className = "submenu";
            if (this.container.direction == Menu.Dir.HORZ)
                this.ul.style = "display:flex;align-items: center;padding:0px;margin:0px;list-style-type:none;position: absolute;top: 100%;left:0;display: none;border: 1px solid;border-radius: 3px;";
            else if (this.container.direction == Menu.Dir.VERT)
                this.ul.style = "padding:0px;margin:0px;list-style-type:none;position: absolute;top: 0;left:100%;display: none;border: 1px solid;border-radius: 3px;";
            this.ul.style.borderColor = this.container.Settings.borderColor;
            this.li.appendChild(this.ul);
        }

        let li = document.createElement("li");
        li.style.borderColor = this.container.Settings.borderColor;
        li.style = "padding:5px;margin:0px;border-bottom: 1px solid;";
        li.style.width = '80px';
        li.addEventListener('click', (event) => { this.#onitemclick(event); });
        this.ul.appendChild(li);

        let a = document.createElement("a");
        a.innerText = text;
        a.style = "padding:0px;text-decoration: none;text-align: center;";
        a.href = href;
        li.appendChild(a);
        this.handler = null;
        return new MenuItem(this.ul.childElementCount - 1, li, handler, this.container);
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
        subitemWidth: '100px',
        paddingH: '3px',
        paddingV: '3px'
    }
    #createli() {
        let li = document.createElement("li");
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
        if (this.direction == Menu.Dir.HORZ)
            a.style = "display: block;padding: 0px;;text-decoration: none;text-align: center;";
        else if (this.direction == Menu.Dir.VERT)
            a.style = "padding: 0px;text-decoration: none;text-align: center;";
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
    addItem(text, href, handler) {
        if (!this.ul)
            return false;
        let li = this.#createli();
        let a = this.#createa(text, href);
        li.appendChild(a);
        this.ul.appendChild(li);
        return new MenuItem(this.ul.childElementCount - 1, li, handler, this);
    }

}
