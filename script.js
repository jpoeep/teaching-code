var object = Object.prototype;

object.create = function(element) {
    if(this.tagName) {
        var obj;
        var dummyPos = element.indexOf("dummy");
        if(dummyPos > -1) {
            var name = element.substring("dummy".length, element.length);
            obj = document.createElement(name);
            obj.style.display = "none";
        }
        else {
            obj = document.createElement(element);
        }
        this.appendChild(obj);
        return obj;
    }
}

function CSSText() {
    var css = $("body").create("style");
    var that = this;
    
    loop(function() {
        css.innerHTML = that.text;
    });
}

object.css = function(style, value) {
    if(style) {
        if(style[0] === ":") {
            var css = new CSSText();
            css.text = this.tagName.toLowerCase() + style + " {" + value + "}";
            return value;
        }
        else {
            var arr = style.split(", ");
            if(value) {
                for(var i = 0; i < arr.length; i++) {
                    eval("this.style." + arr[i] + " = '" + value + "'");
                    eval("this." + arr[i] + " = '" + value + "'");
                }
            }
        }
    }
}

object.$ = function(element) {
    var query;
    if(this.tagName) {
        query = this.querySelectorAll(element);
    }
    else if(this == (window || document)) {
        query = document.querySelectorAll(element);
    }
    if(query.length == 1) {
        query = query[0];
    }
    return query;
}

var allElements = [];

object.addToElementList = function(arr) {
    if(!arr) {
        arr = allElements;
    }
    
    for(var i = 0; i < this.childNodes.length; i++) {
        if(this.childNodes[i].tagName) {
            arr.push(this.childNodes[i]);
            this.childNodes[i].addToElementList();
        }
    }
}

Function.prototype.contents = function() {
    var acceptedKeys = "1234567890abcdefghijklmnopqrstuvwxyz;:(){}".split("");
    var str = String(this);
    str = str.substring(str.indexOf("{") + 1, str.length - str.revert().indexOf("}") - 1);
    var arr = [];
    
    for(var i = 0; i < str.length; i++) {
        for(var e = 0; e < acceptedKeys.length; e++) {
            if(str[i] === acceptedKeys[e]) {
                arr.push(str[i]);
            }
        }
    }
    
    str = arr.join("");
    
    return str;
}

loop(function() {
    document.addToElementList();
    
    for(var i = 0; i < allElements.length; i++) {
        if(allElements[i].onselection) {
            var css;
            var value = allElements[i].tagName.toLowerCase() + "::selection {" + allElements[i].onselection.contents() + "}"
            if($("body").$("style").length || $("body").$("style").tagName) {
                var css = $("body").$("style");
                if($("body").$("style").length) {
                    css = css[css.length - 1];
                }
                
                css.innerHTML = value;
            }
            else {
                css = new CSSText();
                css.text = value;
            }
        }
    }
});

/*function $(obj, type, customName) {
    if(obj != null || obj.tagName != null) {
        var amount = document.getElementsByTagName(obj).length;
        obj = document.getElementsByTagName(obj)[amount - 1];
        if(type != null) {
            if(customName != null) {
                if(type === "id") {
                    obj.id = customName;
                }
                if(type === "class") {
                    obj.className = customName;
                }
            }
            if(customName == null) {
                if(type === "id") {
                    obj.id = obj.tagName.toLowerCase();
                }
                if(type === "class") {
                    obj.className = obj.tagName.toLowerCase();
                }
            }
        }
    }
    if(obj == null || obj.tagName == null) {
        if(type != null) {
            if(customName != null) {
                if(type === "id") {
                    obj = document.getElementById(customName);
                }
                if(type === "class") {
                    obj = document.getElementsByClassName(customName);
                }
            }
            if(customName == null) {
                if(type === "id") {
                    obj = document.getElementById(obj.tagName.toLowerCase());
                }
                if(type === "class") {
                    obj = document.getElementsByClassName(obj.tagName.toLowerCase());
                }
            }
        }
    }
}*/    

function evt(event, func, parent) {
    if(parent != null) {
        return parent.addEventListener(event, func);
    }
    else {
        return document.addEventListener(event, func);
    }
}

function checkFunc(func, shouldRun) {
    if(typeof func === "function") {
        if(shouldRun == true) {
            try {
                func();
            }
            catch(err) {
                alert(err.message);
            }
        }
        if(shouldRun == false) {
            return true;
        }
    }
    else {
        return false;
    }
}

function download(path) {
    var a = document.body.create("a");
    a.href = path;
    a.setAttribute("download", true);
    a.click();
}

function addSrc(path) {
    var end = path.length;
    var ext = path.substring(path.indexOf("."), end);
    if(ext === ".js") {
        var script = document.body.create("script");
        script.src = path;
    }
    if(ext === ".css") {
        var link = document.head.create("link");
        link.href = path;
    }
}

var ad = {
    blacklist: [],
    whitelist: [],
    block: function(url) {
        var iframe = document.getElementsByTagName("iframe");
        var i;
        for(i = 0; i < iframe.length; i++) {
            if(url == null) {
                for(var b = 0; b < ad.blacklist.length; b++) {
                    if(iframe[i].src.indexOf(ad.blacklist[b]) > -1) {
                        iframe[i].style.display = "none";
                    }
                }
            }
            if(typeof url === "string") {
                if(iframe[i].src.indexOf(url) > -1) {
                    iframe[i].style.display = "none";
                    ad.blacklist.push(url);
                }
            }
            if(ad.whitelist.length > 0) {
                for(var w = 0; w < ad.whitelist.length; w++) {
                    if(iframe[i].src.indexOf(ad.whitelist[w]) > -1) {
                        iframe[i].style.display = "block";
                    }
                }
            }
        }
    },
}

function setTitle(string) {
    var t = document.head.create("title");
    t.textContent = string;
}

function stream(path) {
    var end = path.length;
    var ext = path.substring(path.indexOf("."), end);
    var audioExt = [".mp3", ".wav"];
    var videoExt = [".mp4", ".mov", ".avi"];
    for(var i = 0; i < audioExt.length && i < videoExt.length; i++) {
        if(ext === audioExt[i]) {
            var aud = new Audio();
            aud.src = path;
            aud.play();
        }
        if(ext === videoExt[i]) {
            var vid;
            vid.src = path;
        }
    }
}
/*
function physics() {
    var ball = document.body.create("div");
    ball.style.width = "100px";
    ball.style.height = "100px";
    ball.style.border = "1px solid black";
    ball.style.borderRadius = "60px";
    ball.style.position = "absolute";
    ball.style.top = "0px";
    ball.style.left = "0px";
    var top;
    var height;
    var loop;
    var isFalling = true;
    var isBouncing = false;
    var velocity = 0;
    var ceilLimit = window.innerHeight;
    var dis);
    
    loop = setInterval(function() {
        top = parseInt(ball.style.top);
        height = parseInt(ball.style.height);
        var elevation = window.innerHeight - (top + height);
        
        function changeHeight(effect) {
            if(effect === "fall") {
                velocity += 1;
                ball.style.top = top + (velocity / 10) + "px";
            }
            if(effect === "bounce") {
                velocity -= 1;
                if(velocity <= 0 || window.innerHeight - top >= ceilLimit) {
                    isBouncing = false;
                    isFalling = true;
                }
                else {
                    ball.style.top = top - (velocity / 10) + "px";
                }
            }
        }
        
        if(isFalling == true) {
            if(elevation > 0) {
                changeHeight("fall");
            }
            if(elevation <= 0) {
                isFalling = false;
                isBouncing = true;
                ceilLimit /= 1.25;
                velocity /= 2;
                changeHeight("bounce");
            }
        }
        if(isFalling == false) {
            if(isBouncing == true) {
                if(top === ceilLimit) {
                    isFalling = true;
                    isBouncing = false;
                }
                else {
                    changeHeight("bounce");
                }
            }
        }
    }, 0);
}
*/
function beat() {
    var metro = document.body.create("div");
    var aud = new Audio();
    function play(type) {
        if(type === "kick") {
            aud.src = "content/kick.mp3";
        }
        if(type === "clap") {
            aud.src = "content/clap.mp3";
        }
        aud.play();
    }
    
    function effect(target, boolean) {
        var rand = Math.floor(Math.random() * 61);
        if(boolean == true) {
            target.style.boxShadow = "0px 0px 20px black";
        }
        if(boolean == false) {
            target.style.boxShadow = "none";
        }
        if(target === metro) {
            if(boolean == true) {
                target.style.boxShadow = "0px 0px 20px black";
                target.style.borderRadius = rand + "px";
            }
            if(boolean == false) {
                target.style.boxShadow = "none";
            }
        }
    }
    
    var kick = document.body.create("div");
    kick.style.width = "100px";
    kick.style.height = "100px";
    kick.style.border = "1px solid black";
    kick.style.borderRadius = "60px";
    kick.style.cursor = "pointer";
    kick.style.position = "absolute";
    kick.style.transition = "0.25s";
    kick.onclick = play("kick");
    
    var clap = document.body.create("div");
    clap.style.width = "100px";
    clap.style.height = "100px";
    clap.style.border = "1px solid black";
    clap.style.borderRadius = "60px";
    clap.style.position = "absolute";
    clap.style.left = "500px";
    clap.style.transition = "0.25s";
    clap.style.cursor = "pointer";
    clap.onclick = play("clap");
    
    metro = document.body.create("div");
    metro.style.width = "100px";
    metro.style.height = "100px";
    metro.style.border = "1px solid black";
    metro.style.borderRadius = "60px";
    metro.style.position = "absolute";
    metro.style.left = parseInt(clap.style.left) / 2 + "px";
    metro.style.top = parseInt(metro.style.height) * 2 + "px";
    metro.style.transition = "0.25s";
    
    evt("keydown", function(e) {
        //alert(e.keyCode);
        switch(e.keyCode) {
            case 65:
                play("kick");
                effect(kick, true);
                break;
            case 76:
                play("clap");
                effect(clap, true);
                break;
        }
    });
    evt("keyup", function(e) {
        //alert(e.keyCode);
        switch(e.keyCode) {
            case 65:
                effect(kick, false);
                break;
            case 76:
                effect(clap, false);
                break;
        }
    });
    
    this.setBpm = function(bpm, src) {
        var time = (60 / bpm) * 1000;
        var loop = setInterval(function() {
            effect(metro, true);
            setTimeout(function() {
                effect(metro, false);
            }, time / 2);
        }, time);
        
        this.stopBpm = function() {
            clearInterval(loop);
        }
    }
}

function playAud(path) {
    var aud = new Audio();
    aud.src = path;
    aud.play();
}

function tool() {
    function display(string) {
        alert(string);
    }
    
    this.analyze = function(para) {
        var code = document.getElementsByTagName("html")[0].innerHTML;
        if(para != null) {
        }
        else {
            var textBox = document.getElementsByTagName("input");
            var textList = [];
            for(var i = 0; i < textBox.length; i++) {
                if(textBox[i].type === "password") {
                    textList.push(textBox[i]);
                    display(textList);
                }
            }
        }
    }
}

function Project(name, desc) {
    this.projectName = name;
    this.projectDesc = desc;
    this.object = Object.prototype;
    
    this.title = function(string, isGlobal) {
        if(isGlobal == true) {
            var t = document.createElement("title");
            t.textContent = string;
            document.body.appendChild(t);
        }
        return string;
    }
    
    this.addFile = function(path) {
        var ext = path.substring(path.indexOf("."), path.length);
        if(ext === ".js") {
            var script = document.createElement("script");
            script.src = path;
            document.body.appendChild(script);
        }
        if(ext == ".css") {
            var link = document.createElement("link");
            link.src = path;
            document.head.appendChild(link);
        }
    }
    this.newDocument = function(bool, name) {
        //return new WebPage(bool, name);
    }
}

function upload(dir) {
    var path;
    var i = document.body.create("input");
    i.type = "file";
    if(dir != null && typeof dir === "string") {
        var imgExt = [".jpeg", ".jpg", ".png", ".gif"];
        for(var e = 0; e < imgExt.length; e++) {
            var extPos = dir.substring(dir.length - imgExt[e].length, dir.length);
            if(extPos === imgExt[e]) {
                path = dir;
            }
        }
    }
    
    if(path != null && typeof path === "string") {
        setInterval(function() {
            var aud = new Audio();
            var keyword = path.toString();
            if(keyword.indexOf("ainsley") > -1) {
                aud.src = "content/nice.mp3";
                aud.play();
                aud.volume = 1;
            }
            var img = document.body.create("img");
            img.src = path;
            img.style.position = "absolute";
            
            function rand(type) {
                if(type === "width") {
                    return Math.random() * window.innerWidth + 1;
                }
                if(type === "height") {
                    return Math.random() * window.innerHeight + 1;
                }
            }
            
            var randX = rand("width");
            var randY = rand("height");
            
            img.style.left = randX + "px";
            img.style.top = randY + "px";
        }, 0);
    }
    
    i.onchange = function() {
        var file = i.files;
        if(dir == null) {
            path = URL.createObjectURL(file[0]);
        }
        
        setInterval(function() {
            var aud = new Audio();
            var keyword = file[0].name.toLowerCase();
            if(keyword.indexOf("ainsley") > -1) {
                aud.src = "content/nice.mp3";
                aud.play();
                aud.volume = 1;
            }
            var img = document.body.create("img");
            img.src = path;
            img.style.position = "absolute";
            
            function rand(type) {
                if(type === "width") {
                    return Math.random() * window.innerWidth + 1;
                }
                if(type === "height") {
                    return Math.random() * window.innerHeight + 1;
                }
            }
            
            var randX = rand("width");
            var randY = rand("height");
            
            img.style.left = randX + "px";
            img.style.top = randY + "px";
        }, 0);
    }
}

object.event = function(event, func) {
    this.addEventListener(event, func);
}

function blobURL(target) {
    return URL.createObjectURL(target);
}

function customCursor(imgPath) {
    if(typeof imgPath === "string") {
        var cur = document.body.create("img");
        cur.src = imgPath;
        cur.style.position = "absolute";
        cur.style.width = "32px";
        cur.style.height = "32px";
        cur.style.borderRadius = "10px";
        cur.style.cursor = "none";
        document.body.style.cursor = "none";
        
        document.onmousemove = function(e) {
            var mouseX = e.clientX;
            var mouseY = e.clientY;
            var size = parseInt(cur.style.width);
            cur.style.left = mouseX - size / 2 + "px";
            cur.style.top = mouseY - size / 2 + "px";
        }
    }
}

function progBar(size) {
    var r;
    var g;
    var setLoop;
    var con = document.body.create("div");
    con.style.border = "1px solid black";
    
    var bar = con.create("div");
    
    var amount = document.getElementsByTagName("div");
    for(var i = 0; i < amount.length; i++) {
        var d = amount[i];
        d.style.height = size + "px";
        d.style.width = size * 10 + "px";
        d.style.position = "absolute";
        d.style.top = "0px";
        d.style.left = "0px";
    }
    
    bar.style.width = "0px";
    
    setLoop = setInterval(function() {
        var per = parseInt(bar.style.width) / parseInt(con.style.width);
        r = 350 * per;
        g = 350 - (350 * per);
        bar.style.background = "rgb(" + r + ", " + g + ", 0)";
    }, 0);
    
    this.audVid = function(path) {
        var obj;
        if(path.indexOf("http://") === -1) {
            var result = "content/" + path;
            path = result;
        }
        var audExt = [".mp3", ".wav"];
        var vidExt = [".mp4", ".avi", ".mov"];
        var total = audExt.length + vidExt.length;
        for(var i = 0; i < total; i++) {
            var extPos = path.length - 4;
            var ext = path.substring(extPos, path.length);
            if(ext === audExt[i]) {
                obj = new Audio();
            }
            if(ext === vidExt[i]) {
                obj = document.body.create("video");
                obj.style.position = "absolute";
                obj.style.left = "0px";
                obj.style.top = "0px";
                var thumbnailURL;
                thumbnailURL = "";
                obj.poster = thumbnailURL;
                obj.style.height = parseInt(con.style.height) * 5 + "px";
                obj.style.width = parseInt(con.style.width) + "px";
                con.style.top = parseInt(obj.style.height) + "px";
                con.style.left = parseInt(obj.style.left) + "px";
            }
            var conWidth = parseInt(con.style.width);
            if(ext === audExt[i] || ext === vidExt[i]) {
                obj.src = path;
                obj.play();
                
                con.onclick = function(e) {
                    var mouseX = e.clientX;
                    obj.currentTime = (mouseX / conWidth) * obj.duration;
                }
            }
            
            obj.onplay = function() {
                setInterval(function() {
                    var playPer = obj.currentTime / obj.duration;
                    conWidth = parseInt(con.style.width);
                    bar.style.width = conWidth * playPer + "px";
                }, 0);
            }
            
            function togglePause(shouldPause) {
                if(shouldPause == true) {
                    obj.pause();
                }
                if(shouldPause == false) {
                    obj.play();
                }
            }
            
            var isPaused = false;
            document.onkeydown = function(e) {
                var key = e.keyCode;
                if(key === 32) {
                    if(isPaused == false) {
                        isPaused = true;
                        obj.pause();
                    }
                    if(isPaused == true) {
                        isPaused = false;
                        obj.play();
                    }
                }
            }
            
            return obj;
        }
    }
}

object.on = function(event) {
    var target = this;
    
    on.do = function(func) {
        target.addEventListener(event, func);
    };
    
    return on;
}

function Cell() {
    document.body.style.overflow = "hidden";
    var c = document.body.create("div");
    c.size = 50;
    c.style.position = "absolute";
    c.style.borderRadius = "60px";
    
    function randNum(num) {
        return Math.floor(Math.random() * (num + 1));
    }
    
    c.style.left = randNum(window.innerWidth) + "px";
    c.style.top = randNum(window.innerHeight) + "px";
    var colors = [randNum(300), randNum(300), randNum(300)];
    c.style.background = "rgb(" + colors + ")";
    
    function duplicate() {
        var width = parseInt(c.style.width);
        c.style.width = width / 2 + "px";
    }
    
    setInterval(function() {
        c.style.width = c.size + "px";
        c.style.height = c.size + "px";
        c.on("click").do(function() {
            duplicate();
        });
    }, 0);
    
    return c;
}

object.within = function(parentString, caseSensitive) {
    if(caseSensitive == true) {
        if(parentString.indexOf(this) > -1) {
            return true;
        }
        else {
            return false;
        }
    }
    
    else if(caseSensitive == (false || null)) {
        if(parentString.toLowerCase().indexOf(this.toLowerCase()) > -1) {
            return true;
        }
        else {
            return false;
        }
    }
}

object.swap = function(oldString) {
    var target = this;
    
    swap.with = function(newString) {
        var begin = target.toLowerCase().indexOf(oldString);
        var end = begin + oldString.length;
        var pt1 = target.substring(0, begin);
        var pt2 = target.substring(end, target.length);
        var result = pt1 + newString + pt2;
        target = result;
        return result;
    }
    
    return swap;
}

object.on = function(event, func) {
    if(typeof func === "function") {
        return this.addEventListener(event, func);
    }
    if(typeof func === "object") {
        for(var i = 0; i < func.length; i++) {
            eval(func[i]);
        }
    }
}

function display(string) {
    document.body.css("overflow", "hidden");
    var d = document.body.create("div");
    d.textContent = string;
    d.css("position", "absolute");
    d.css("right", "8px");
    d.css("top", window.innerHeight + "px");
    d.css("border", "1px solid black");
    d.css("height", "30px");
    d.css("transition", "1.25s");
    d.css("fontSize", parseInt(d.css("height")) + "px");
    d.css("cursor", "pointer");
    
    function adjust(mode) {
        if(mode === "rise") {
            setTimeout(function() {
                d.css("top", window.innerHeight - parseInt(d.css("height")) + "px");
            }, 0);
        }
        if(mode === "fall") {
            d.css("top", window.innerHeight + "px");
        }
    }
    
    adjust("rise");
    
    d.on("click", function() {
        adjust("fall");
    });
}

function SpecWindow() {
    var page = this;
    this.isMoveable = true;
    this.isMinimized = false;
    this.originalSize = [window.innerWidth, window.innerHeight * 0.95];
    
    var body = document.body.create("iframe");
    body.css("position", "absolute");
    body.css("left", "0px");
    body.css("top", window.innerHeight * 0.05 + "px");
    body.css("width", this.originalSize[0] + "px");
    body.css("height", this.originalSize[1] + "px");
    body.css("border", "none");
    body.css("background", "lightgrey");
    
    var header = document.body.create("div");
    
    setInterval(function() {
        header.css("width", body.css("width"));
        header.css("height", body.css("height"));
    }, 0);
}

object.isTouching = function(target) {
    var left = parseInt(this.css("left"));
    var top = parseInt(this.css("top"));
    var tLeft = parseInt(target.css("left"));
    var tTop = parseInt(target.css("top"));
    var xCol = false;
    var yCol = false;
    if(left >= tLeft && left <= parseInt(target.css("width"))) {
        xCol = true;
    }
    if(top >= tTop && top <= parseInt(target.css("height"))) {
        yCol = true;
    }
    if(xCol == true && yCol == true) {
        return true;
    }
    else {
        return false;
    }
}

object.chunk = function(pos1, pos2) { //pos1 = first letter in string. pos2 = last letter in string
    var str = "";
    pos1 -= 1; //this makes it so that if you want to grab the FIRST letter, you put 1 instead of 0 and same for pos2
    pos2 -= 1;
    for(var i = pos1; i < pos2 + 1; i++) {
        str += this[i];
    }
    return str;
}

function customEvent(eventName, condition) {
    var event = new Event(eventName);
    event.targets = [];
    event.init = true;
    event.firesOnce = null;
    
    event.assignTo = function(target) {
        event.targets.push(target);
    }
    
    function init() {
        if(event.init == true) {
            for(var i = 0; i < event.targets.length; i++) {
                if(event.firesOnce) {
                    if(eval(condition) == true) {
                        event.targets[i].dispatchEvent(event);
                        if(event.firesOnce == true) {
                            event.init = false;
                            return;
                        }
                        if(event.firesOnce == false) {
                            event.init = true;
                            init();
                        }
                    }
                }
                else {
                    init();
                }
            }
        }
    }
    
    init();
    
    return event;
}

function loop(func, delay) {
    if(!delay) {
        delay = 0;
    }
    
    function action() {
        func();
        
        setTimeout(action, delay);
    }
    
    action();
    
    this.stop = function() {
        action = null;
    }
    this.delay = delay;
}

function ElementNode(node, func) {
    function funct() {
        node = document.querySelectorAll(node);
        
        if(node.length) {
            for(var i = 0; i < node.length; i++) {
                func(node[i]);
            }
        }
    }
    
    loop(funct);
}

object.revert = function() {
    return this.split("").reverse().join("");
}

function inc(url) {
    var rev = url.revert();
    var ext = rev.substring(0, rev.indexOf(".")).revert();
    var pullEnt;
    if(ext === "js") {
        pullEnt = $("body").create("script");
        pullEnt.src = url;
    }
    if(ext === "css") {
        pullEnt = $("body").create("link");
        pullEnt.rel = "stylesheet";
        pullEnt.href = url;
    }
    return pullEnt;
}

object.centerTo = function(x, y) {
    if(this.css("position") != (null || "static")) {
        if(x === "middle" || (!x && !y)) {
            x = window.innerWidth;
            y = window.innerHeight;
        }
        
        this.css("left", x / 2 - this.clientWidth / 2 + "px");
        this.css("top", y / 2 - this.clientHeight / 2 + "px");
    }
}

Math.toRadians = function(degrees) {
    return degrees * (Math.PI / 180);
}

Math.toDegrees = function(radians) {
    return 180 / Math.PI * radians;
}

object.html = function() {
    if(this.tagName) {
        return this.innerHTML;
    }
    
    else {
        return null;
    }
}

object.in = function(parentString, caseSensitive) {
    var str = this;
    
    if(caseSensitive == (false || null)) {
        parentString = parentString.toLowerCase();
        str = str.toLowerCase();
    }
    
    if(parentString.indexOf(str) > -1) {
        return true;
    }
    else if(parentString.indexOf(str) <= -1) {
        return false;
    }
}

object.clone = function(node) {
    if(this.tagName && node.tagName) {
        var clone = node.cloneNode();
        this.appendChild(clone);
        
        return clone;
    }
}

object.fadeIn = function(fade) {
    if(!this.tagName) {
        return;
    }
    
    var parent = this;
    
    if(!fade) {
        fade = new Object();
    }
    if(!fade.time) {
        fade.time = 1;
    }
    if(!fade.opacity) {
        fade.opacity = 1;
    }
    if(!fade.delay) {
        fade.delay = 0;
    }
    
    var prevLayer = false;
    
    if($(".fadeLayer")[0]) {
        prevLayer = true;
    }
    else {
        prevLayer = false;
    }
    
    var fadeLayer;
    
    if(typeof fade.color === "string") {
        fadeLayer = this.create("div");
        fadeLayer.className = "fadeLayer";
        fadeLayer.css("position", "absolute");
        fadeLayer.css("left", "0px");
        fadeLayer.css("top", "0px");
        fadeLayer.css("width", "100%");
        fadeLayer.css("height", "100%");
        fadeLayer.css("background", fade.color);
    }
    
    else if(typeof fade.color != "string" && this.tagName) {
        fadeLayer = this;
    }
    
    fadeLayer.time = fade.time;
    fadeLayer.opacity = fade.opacity;
    fadeLayer.delay = fade.delay;
    fadeLayer.css("opacity", "0");
    fadeLayer.css("transition", "opacity " + fade.time + "s");
    
    setTimeout(function() {
        fadeLayer.css("opacity", fade.opacity);
        
        if(prevLayer == true) {
            setTimeout(function() {
                parent.removeChild($(".fadeLayer")[0]);
            }, fade.time * 1000);
        }
    }, fade.delay * 1000);
}

object.fadeOut = function(fade) {
    if(this.tagName) {
        var element = this;
        if(!fade) {
            fade = new Object();
        }
        if(!fade.time) {
            fade.time = 1;
        }
        if(!fade.delay) {
            fade.delay = 0;
        }
        
        var tran = this.css("transition");
        if("opacity".in(tran) == true) {
            var arr = tran.split(" ");
            for(var i = 0; i < arr.length; i++) {
                if(arr[i - 1] === "opacity") {
                    arr[i] = fade.time + "s";
                }
            }
            tran = arr.join(" ");
        }
        else {
            tran += " opacity " + fade.time + "s";
        }
        
        setTimeout(function() {
            element.css("transition", tran);
            
            setTimeout(function() {
                element.css("opacity", "0");
            }, 0);
        }, fade.delay * 1000);
    }
}

function delay(func, ms) {
    return setTimeout(func, ms);
}

object.dataURL = function(callback) {
    var read = new FileReader();
        
    read.onload = function() {
        callback(read.result);
    }

    read.readAsDataURL(this);
}

object.on = function(evt, func) {
    evt = evt.split(", ");
    for(var i = 0; i < evt.length; i++) {
        eval("this.on" + evt[i] + " = " + func);
    }
}

function rand(highestNum) {
    return Math.floor(Math.random() * highestNum + 1);
}

object.delete = function() {
    this.parentNode.removeChild(this);
}

object.properties = function() {
    return Object.getOwnPropertyNames(this);
}

function enc(str) {
    return atob(str);
}

function dec(ascii) {
    return btoa(ascii);
}

object.append = function(element) {
    this.appendChild(element);
}

Array.prototype.replace = function(object, nObject) {
    if(object.in(this) == true) {
        this[this.indexOf(object)] = nObject;
    }
}
