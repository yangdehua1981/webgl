export class MenuItem {
    constructor(idx, li, handler, container) {
        this.idx = idx;
        this.li = li;
        this.ul = null;
        this.container = container;
        this.handler = handler;
        if (li.firstElementChild.tagName.toLowerCase() === 'a')
            li.firstElementChild.addEventListener('click', (event) => { this.#onclick(event); });
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
            this.ul.style = "padding:0px;margin:0px;list-style-type:none;position: absolute;top: 100%;left:0px;display: none;";
            this.li.appendChild(this.ul);
        }

        let li = document.createElement("li");
        li.style = "padding:0px;margin:0px;";
        li.addEventListener('click', (event) => { this.#onitemclick(event); });
        this.ul.appendChild(li);

        let a = document.createElement("a");
        a.innerText = text;
        a.style = "padding:0px;background-color: #f0f0f0;text-decoration: none;color: #000;";
        a.href = href;
        li.appendChild(a);
        this.handler = null;
        return new MenuItem(this.ul.childElementCount - 1, li, handler, this);
    }
}
//
export class Menu {
    constructor(barid) {
        this.menubar = document.getElementById(barid);
        this.curitem = null;
    }
    create() {
        if (!this.menubar)
            return false;
        this.ul = document.createElement("ul");
        this.ul.className = "menu";
        this.ul.style = "list-style-type:none;padding:0px;margin:0px;";
        this.menubar.appendChild(this.ul);
        return true;
    }
    addItem(text, href, handler) {
        if (!this.ul)
            return false;
        let li = document.createElement("li");
        li.style = "position:relative;display:inline-block;padding-left:2px;padding-right:2px;margin:0px;border-right: 1px solid";

        this.ul.appendChild(li);

        let a = document.createElement("a");
        a.innerText = text;
        a.style = "display: block;padding: 0px;background-color: #f0f0f0;text-decoration: none;color: #000;";
        a.href = href;
        li.appendChild(a);

        return new MenuItem(this.ul.childElementCount - 1, li, handler, this);
    }

}
