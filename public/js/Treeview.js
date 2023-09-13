import { getRandomColor } from "/js/color.js";
export class TreeNode {
    #dataitem;
    constructor(item, ico, owner, tree, ischild = false) {
        this.#dataitem = item;
        this.owner = owner;
        this.li = null;
        this.ul = null;
        this.ischild = ischild;
        this.haschildren = false;
        this.symbol = null;
        this.bextend = false;
        this.selected = false;
        this.tree = tree;
        this.ico = ico;
    }
    #mouseenter(event) {
        if (this.ischild) {
            if (!this.owner.selected) {
                this.owner.li.style.backgroundColor = '';
            }
        }
        this.li.style.backgroundColor = this.tree.Settings.itemHoverColor;
    }
    #mouseleave(event) {
        if (!this.selected) {
            this.li.style.backgroundColor = '';
        }
        event.stopPropagation();
    }
    #mouseclick(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.tree.curNode != this) {
            this.li.style.backgroundColor = this.tree.Settings.itemBkColor;
            this.selected = true;
            if (this.ischild) {
                this.owner.li.style.backgroundColor = '';
                this.owner.selected = false;
            }
            if (this.tree.curNode) {
                this.tree.curNode.li.style.backgroundColor = '';
                this.tree.curNode.selected = false;
            }
            this.tree.curNode = this;
        }
    }
    #mousedbclick(event) {
        if (this.haschildren) {
            let style = this.ul.style;
            this.bextend = !this.bextend;
            style.display = this.bextend ? 'block' : 'none';
            style.paddingLeft = this.bextend ? `${this.symbol.offsetWidth}px` : '0px';
            this.symbol.textContent = this.bextend ? '-' : '+';
        }
        event.preventDefault();
        event.stopPropagation();
    }
    #onsymbolclick(event) {
        this.#mousedbclick(event);
    }
    #onsymbolover(event) {
        this.symbol.style.cursor = 'pointer';
    }
    #createCollapsed() {
        if (this.symbol)
            return;
        const symbol = document.createElement('span');
        symbol.style.marginRight = '10px';
        symbol.style.paddingLeft = '4px';
        symbol.style.fontSize = '18px';
        symbol.style.color = 'red';
        symbol.style.visibility = 'hidden';
        symbol.textContent = '+';
        symbol.addEventListener('click', this.#onsymbolclick.bind(this));
        symbol.addEventListener('mouseover', this.#onsymbolover.bind(this));
        this.symbol = symbol;
        this.li.insertBefore(symbol, this.li.firstChild);
    }
    create() {
        if (this.li)
            return false;
        var li = document.createElement("li");
        this.li = li;
        li.className = "treeview-item";
        li.innerHTML = this.#dataitem.text;

        li.style.cursor = "default";
        li.style.caretColor = 'transparent';
        li.style.userSelect = 'none';
        li.style.paddingLeft = '0px';
        li.style.marginBottom = '5px';

        li.style.textAlign = 'center';
        li.style.color = this.tree.Settings.Color;
        li.style.textAlign = 'left';
        if (this.ico) {
            let img = document.createElement('img');
            img.src = this.ico;
            img.style.width = '16px';
            img.style.height = '16px';
            img.style.marginRight = '5px';
            this.li.insertBefore(img, this.li.firstChild);
        }
        this.#createCollapsed();
        li.addEventListener('mouseenter', this.#mouseenter.bind(this));
        li.addEventListener('mouseout', this.#mouseleave.bind(this));
        li.addEventListener('click', this.#mouseclick.bind(this));
        li.addEventListener("dblclick", this.#mousedbclick.bind(this));
        li.addEventListener("mouseover", this.#mouseenter.bind(this));
        return true;
    }
    addSubNode(item, ico = null) {
        if (this.ul == null) {
            var childul = document.createElement("ul");
            childul.style.listStyleType = "none";
            childul.style.display = "none";
            childul.style.left = "0px";
            childul.style.top = "100%";
            childul.style.borderLeft = "1px dashed";
            childul.style.borderLeftColor = getRandomColor();
            childul.style.backgroundColor = this.tree.Settings.bkColor;
            this.li.appendChild(childul);
            this.ul = childul;
        }

        let childnode = new TreeNode(item, ico, this, this.tree, true);
        if (childnode.create()) {
            this.ul.appendChild(childnode.li);
            this.symbol.style.visibility = "visible";
            this.haschildren = true;
            return childnode;
        }
        return null;
    }
}
export class Treeview {
    Settings = {
        Color: '#ffffff',
        bkColor: '#000000',
        itemBkColor: '#04395E',
        itemHoverColor: 'rgba(4,57,94,0.5)',
    }
    constructor(parentid, ico, text) {
        this.parentid = parentid;
        this.rootico = ico;
        this.roottext = text;
        this.container = null;
        this.curNode = null;
    }
    #onclick(event) {
        if (event.target == this.container) {
            if (this.curNode) {
                this.curNode.li.style.backgroundColor = "";
                this.curNode.selected = false;
            }
            this.curNode = null;
        }
    }
    #createroot() {
        if (this.rootico && this.roottext) {
            let span = document.createElement("span");
            //span.style.verticalAlign = "middle";
            span.style.textAlign = "center";
            span.style.color = this.Settings.Color;
            let img = document.createElement("img");
            img.src = this.rootico;
            img.style.width = "16px";
            img.style.height = "16px";
            img.style.paddingRight = "8px";
            span.appendChild(img);
            span.appendChild(document.createTextNode(this.roottext));
            let li = document.createElement("li");
            li.style.margin = "0px";
            li.style.paddingBottom = "5px";
            li.style.textAlign = 'left';
            li.style.caretColor = "transparent";
            li.appendChild(span);
            return li;
        }
        return null;
    }
    #createul() {
        var rootul = document.createElement("ul");
        rootul.className = "treeview";
        rootul.style.listStyleType = "none";
        rootul.style.margin = "0px";
        rootul.style.padding = "5px";
        rootul.style.boxSizing = "border-box";
        rootul.style.backgroundColor = this.Settings.bkColor;
        rootul.addEventListener("click", this.#onclick.bind(this));
        this.container = rootul;
        let rootli = this.#createroot();
        if (rootli) {
            rootul.appendChild(rootli);
        }
        if (this.parentid) {
            var parent = document.getElementById(this.parentid);
            parent.appendChild(rootul);
        }
    }
    create() {
        this.#createul();
    }
    addNode(item, ico = null) {
        let node = new TreeNode(item, ico, this, this);
        if (node.create()) {
            this.container.appendChild(node.li);
            return node;
        }
        return null;
    }
}