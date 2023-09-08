export class Tabpage {
    constructor(title, index, owner) {
        this.title = title;
        this.index = index;
        this.owner = owner;
    }
    #onmouseenter(event) {
        this.tab.style.backgroundColor = "rgba(56,78,32,0.5)";
    }
    #onmouseleave(event) {
        this.tab.style.backgroundColor = "";
    }
    #onmouseclick(event) {
        if (this.owner && this.owner.curtab && this.owner.curtab != this)
            this.owner.curtab.section.style.display = "none";
        this.owner.curtab = this;
        this.section.style.display = "block";
    }
    #createtab() {
        this.tab = document.createElement("li");
        let tab = this.tab;
        tab.className = "tab";
        tab.innerHTML = this.title;
        tab.style.paddingLeft = "4px";
        tab.style.paddingRight = "4px";
        tab.style.display = "inline-block";
        tab.style.textAlign = "center";
        tab.style.caretColor = "transparent";
        tab.addEventListener("mouseenter", this.#onmouseenter.bind(this));
        tab.addEventListener("mouseleave", this.#onmouseleave.bind(this));
        tab.addEventListener("click", this.#onmouseclick.bind(this));
    }
    #createpage() {
        this.section = document.createElement("section");
        let sec = this.section;
        sec.style.position = "absolute";
        sec.style.width = "100%";
        sec.style.top = '0';
        sec.style.bottom = '0';
        sec.style.display = "none";
        sec.style.backgroundColor = "#ddeeff";
        sec.innerHTML = `${this.index}`;
    }
    Create() {
        this.#createtab();
        this.#createpage();
    }
}
export class TabPanel {
    static Dir = {
        UP: 'up',
        DOWN: 'down',
        LEFT: 'left',
        RIGHT: 'right'
    }
    constructor(parentid, dir) {
        this.parentid = parentid;
        this.direct = dir;
        this.tabcount = 0;
        this.curtab = null;
    }
    #createmaindiv() {
        this.maindiv = document.createElement("div");
        this.maindiv.className = "tab-panel";
        let style = this.maindiv.style;
        style.backgroundColor = "#cceedd";
        style.width = "100%";
        style.height = "100%";
        style.padding = "4px";
        style.margin = "0px";
        style.display = "flex";
        style.flexDirection = "column";
        style.alignItems = "stretch";
    }
    #createmainul() {
        this.mainul = document.createElement("ul");
        this.mainul.style.listStyleType = "none";
        this.mainul.style.padding = "0px";
        this.mainul.style.margin = "0px";
        if (this.direct === TabPanel.Dir.UP) {
            this.mainul.style.display = "flex";
        }
        else if (this.direct === TabPanel.Dir.DOWN) {
            this.mainul.style.display = "flex";
        }
    }
    #createcontent() {
        this.content = document.createElement("div");
        this.content.className = "panelcontainer";
        this.content.style.margin = "0px";
        this.content.style.height = "100%";
        this.content.style.backgroundColor = "#FFffff";
        this.content.style.border = "1px solid #000000";

        this.content.style.flexGrow = "1";
        this.content.style.overflowY = "auto";
        this.content.style.position = 'relative';
    }
    Create() {
        let container = document.getElementById(this.parentid);
        this.#createmaindiv();
        container.appendChild(this.maindiv);
        this.#createmainul();
        this.maindiv.appendChild(this.mainul);
        this.#createcontent();
        this.maindiv.appendChild(this.content);
    }
    AddTabPage(id, name) {
        let tabpage = new Tabpage(name, this.tabcount, this);
        tabpage.Create();
        this.mainul.appendChild(tabpage.tab);
        this.content.appendChild(tabpage.section);
        this.tabcount++;
        return tabpage;
    }
}