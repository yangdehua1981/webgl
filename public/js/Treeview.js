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
        event.stopPropagation();
        if (this.ischild) {
            if (!this.owner.selected) {
                this.owner.li.style.backgroundColor = '';
                if (this.owner.owner instanceof TreeNode) {
                    if (!this.owner.owner.selected)
                        this.owner.owner.li.style.backgroundColor = '';
                }
            }
        }
        if (!this.selected)
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
            this.li.style.paddingBottom = this.bextend ? '0px' : '2px';
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
        //li.style.marginBottom = '5px';
        li.style.paddingBottom = '2px';
        li.style.paddingTop = '2px';

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
            let childul = document.createElement("ul");
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
        itemHoverColor: 'rgba(4,57,94,0.3)',
    }
    constructor(parentid, ico, text) {
        this.parentid = parentid;
        this.rootico = ico;
        this.roottext = text;
        this.container = null;
        this.curNode = null;
        this.rootnode = null;
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
        if (this.rootnode)
            return ture;
        let rootnode = new TreeNode({ text: this.roottext }, this.rootico, this, this);
        if (rootnode.create()) {
            this.container.appendChild(rootnode.li);
            this.rootnode = rootnode;
            return true;
        }
        return false;
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
        this.#createroot();

        if (this.parentid) {
            var parent = document.getElementById(this.parentid);
            parent.appendChild(rootul);
        }
    }
    create() {
        this.#createul();
    }
    addNode(item, ico = null) {
        if (this.rootnode)
            return this.rootnode.addSubNode(item, ico);
        else
            return null;
    }
}