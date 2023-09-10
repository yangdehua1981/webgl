export class Tabpage {
    constructor(title, index, owner) {
        this.title = title;
        this.index = index;
        this.owner = owner;
    }
    #onmouseenter(event) {
        if (this.owner && (!this.owner.curtab || (this.owner.curtab && this.owner.curtab != this))) {
            this.tab.style.backgroundColor = this.owner.Settings.tabbkColor;
            this.tab.style.opacity = 0.8;
        }
    }
    #onmouseleave(event) {
        if (this.owner && (!this.owner.curtab || (this.owner.curtab && this.owner.curtab != this))) {
            this.tab.style.backgroundColor = "";
            this.tab.style.opacity = 1;
        }
    }
    #onmouseclick(event) {
        if (this.owner && this.owner.curtab && this.owner.curtab != this) {
            let curtab = this.owner.curtab;
            curtab.section.style.display = "none";
            let curstyle = curtab.tab.style;
            curstyle.backgroundColor = "";
            curstyle.borderBottom = '0px';
            curstyle.borderLeft = '0px';
            curstyle.borderRight = '0px';
            curstyle.borderTop = '0px';
            if (this.owner.direct == TabPanel.Dir.RIGHT)
                curstyle.marginLeft = '0px';
            curstyle.opacity = 1;
        }
        this.owner.curtab = this;
        this.section.style.display = "block";
        let style = this.tab.style;
        style.opacity = 1;
        if (this.owner.direct == TabPanel.Dir.TOP)
            this.owner.topstyle(style);
        else if (this.owner.direct == TabPanel.Dir.BOTTOM)
            this.owner.bottomstyle(style);
        else if (this.owner.direct == TabPanel.Dir.LEFT)
            this.owner.leftstyle(style);
        else if (this.owner.direct == TabPanel.Dir.RIGHT)
            this.owner.rightstyle(style);
    }
    #createtab() {
        this.tab = document.createElement("li");
        let tab = this.tab;
        tab.className = "tab";
        let style = tab.style;
        style.overflowWrap = 'break-word';
        style.wordBreak = 'break-all';
        style.padding = '0px';
        style.margin = '0px';
        style.color = this.owner.Settings.Color;
        style.fontSize = "12px";
        tab.innerHTML = this.title;
        if (this.owner.direct == TabPanel.Dir.TOP || this.owner.direct == TabPanel.Dir.BOTTOM) {
            if (this.owner.direct == TabPanel.Dir.TOP) {
                style.borderTopLeftRadius = "5px";
                style.borderTopRightRadius = "5px";
                style.paddingTop = "3px";
            }
            else if (this.owner.direct == TabPanel.Dir.BOTTOM) {
                style.borderBottomLeftRadius = "5px";
                style.borderBottomRightRadius = "5px";
                style.paddingTop = "2px";
            }
            style.minWidth = '60px';
            style.height = this.owner.Settings.tabHeight;
            style.display = "inline-block";
        }
        else if (this.owner.direct == TabPanel.Dir.LEFT || this.owner.direct == TabPanel.Dir.RIGHT) {
            style.display = "flex";
            style.alignItems = "center";
            style.justifyContent = "center";
            style.width = this.owner.Settings.tabWidth;
            style.minHeight = '40px';
            if (this.owner.direct == TabPanel.Dir.LEFT) {
                style.borderTopLeftRadius = "5px";
                style.borderBottomLeftRadius = "5px";
            }
            else if (this.owner.direct == TabPanel.Dir.RIGHT) {
                style.borderTopRightRadius = "5px";
                style.borderBottomRightRadius = "5px";
            }
        }
        style.textAlign = "center";
        style.caretColor = "transparent";
        tab.addEventListener("mouseenter", this.#onmouseenter.bind(this));
        tab.addEventListener("mouseleave", this.#onmouseleave.bind(this));
        tab.addEventListener("click", this.#onmouseclick.bind(this));
    }
    #createpage() {
        this.section = document.createElement("section");
        let sec = this.section;
        let style = sec.style;
        style.position = "absolute";
        style.width = "100%";
        style.top = '0';
        style.bottom = '0';
        style.display = "none";
        style.backgroundColor = this.owner.Settings.tabbkColor;
        sec.innerHTML = `${this.index}`;
    }
    Create() {
        this.#createtab();
        this.#createpage();
    }
}
export class TabPanel {
    static Dir = {
        TOP: 'top',
        BOTTOM: 'bottom',
        LEFT: 'left',
        RIGHT: 'right'
    }
    Settings = {
        bkColor: "rgba(255,255,255,0)",
        tabbkColor: '#31a6e7',
        tabBorderColor: '#ccc',
        Color: '#ffffff',
        tabWidth: '40px',
        tabHeight: '20px',
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
        style.width = "100%";
        style.height = "100%";
        style.padding = "4px";
        style.margin = "0px";
        style.display = "flex";
        style.boxSizing = "border-box";
        if (this.direct === TabPanel.Dir.TOP)
            style.flexDirection = "column";
        else if (this.direct === TabPanel.Dir.BOTTOM)
            style.flexDirection = "column-reverse";
        else if (this.direct === TabPanel.Dir.LEFT)
            style.flexDirection = "row";
        else if (this.direct === TabPanel.Dir.RIGHT)
            style.flexDirection = "row-reverse";
        style.alignItems = "stretch";
    }
    #createmainul() {
        this.mainul = document.createElement("ul");
        let style = this.mainul.style;
        style.listStyleType = "none";
        style.padding = "0px";
        style.margin = "0px";
        style.boxSizing = "border-box";
        style.backgroudColor = this.Settings.bkColor;
        if (this.direct === TabPanel.Dir.TOP) {
            style.paddingLeft = "10px";
            style.display = "flex";
            style.borderBottom = `1px solid ${this.Settings.tabBorderColor}`;
            style.height = this.Settings.tabHeight;
        }
        else if (this.direct === TabPanel.Dir.BOTTOM) {
            style.paddingLeft = "10px";
            style.borderTop = `1px solid ${this.Settings.tabBorderColor}`;
            style.display = "flex";
            style.height = this.Settings.tabHeight;
        }
        else if (this.direct === TabPanel.Dir.LEFT) {
            style.paddingTop = "10px";
            style.borderRight = `1px solid ${this.Settings.tabBorderColor}`;
            style.width = this.Settings.tabWidth;
        }
        else if (this.direct === TabPanel.Dir.RIGHT) {
            style.paddingTop = "10px";
            style.borderLeft = `1px solid ${this.Settings.tabBorderColor}`;
            style.width = this.Settings.tabWidth;
        }
    }
    #createcontent() {
        this.content = document.createElement("div");
        this.content.className = "panelcontainer";
        let style = this.content.style;
        style.margin = "0px";
        style.height = "100%";
        if (this.direct === TabPanel.Dir.TOP) {
            style.borderLeft = `1px solid ${this.Settings.tabBorderColor}`;
            style.borderRight = `1px solid ${this.Settings.tabBorderColor}`;
            style.borderBottom = `1px solid ${this.Settings.tabBorderColor}`;
        }
        else if (this.direct === TabPanel.Dir.BOTTOM) {
            style.borderLeft = `1px solid ${this.Settings.tabBorderColor}`;
            style.borderRight = `1px solid ${this.Settings.tabBorderColor}`;
            style.borderTop = `1px solid ${this.Settings.tabBorderColor}`;
        }
        else if (this.direct === TabPanel.Dir.LEFT) {
            style.borderRight = `1px solid ${this.Settings.tabBorderColor}`;
            style.borderBottom = `1px solid ${this.Settings.tabBorderColor}`;
            style.borderTop = `1px solid ${this.Settings.tabBorderColor}`;
        }
        else if (this.direct === TabPanel.Dir.RIGHT) {
            style.borderLeft = `1px solid ${this.Settings.tabBorderColor}`;
            style.borderBottom = `1px solid ${this.Settings.tabBorderColor}`;
            style.borderTop = `1px solid ${this.Settings.tabBorderColor}`;
        }

        style.flexGrow = "1";
        style.overflowY = "auto";
        style.position = 'relative';
    }
    topstyle(style) {
        style.backgroundColor = this.Settings.tabbkColor;
        style.borderBottom = `1px solid ${this.Settings.tabbkColor}`;
        style.borderLeft = `1px solid ${this.Settings.tabBorderColor}`;
        style.borderRight = `1px solid ${this.Settings.tabBorderColor}`;
        style.borderTop = `1px solid ${this.Settings.tabBorderColor}`;
    }
    bottomstyle(style) {
        style.backgroundColor = this.Settings.tabbkColor;

        style.marginTop = "-1px";
        style.borderTop = `1px solid ${this.Settings.tabbkColor}`;
        style.borderLeft = `1px solid ${this.Settings.tabBorderColor}`;
        style.borderRight = `1px solid ${this.Settings.tabBorderColor}`;
        style.borderBottom = `1px solid ${this.Settings.tabBorderColor}`;
    }
    leftstyle(style) {
        style.backgroundColor = this.Settings.tabbkColor;
        style.borderRight = `1px solid ${this.Settings.tabbkColor}`;
        style.borderLeft = `1px solid ${this.Settings.tabBorderColor}`;
        style.borderTop = `1px solid ${this.Settings.tabBorderColor}`;
        style.borderBottom = `1px solid ${this.Settings.tabBorderColor}`;
    }
    rightstyle(style) {
        style.backgroundColor = this.Settings.tabbkColor;
        style.marginLeft = "-1px";
        style.borderLeft = `1px solid ${this.Settings.tabbkColor}`;
        style.borderRight = `1px solid ${this.Settings.tabBorderColor}`;
        style.borderTop = `1px solid ${this.Settings.tabBorderColor}`;
        style.borderBottom = `1px solid ${this.Settings.tabBorderColor}`;
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
        if (this.tabcount == 0) {
            tabpage.section.style.display = "block";
            let style = tabpage.tab.style;
            if (this.direct === TabPanel.Dir.TOP)
                this.topstyle(style);
            else if (this.direct === TabPanel.Dir.BOTTOM)
                this.bottomstyle(style);
            else if (this.direct === TabPanel.Dir.LEFT)
                this.leftstyle(style);
            else if (this.direct === TabPanel.Dir.RIGHT)
                this.rightstyle(style);
            this.curtab = tabpage;
        }
        this.tabcount++;
        return tabpage;
    }
}