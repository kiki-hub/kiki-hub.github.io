// 分页插件

// 1.  总共可以分多少页？    总页数  = 数据的总数 / 每页显示多少条   总页数  =    100/10  =10
//     数据的总数  count
//     每页显示多少条  showNum

// 2.  根据总页数 生成对应的页码   默认显示第一页   页码 10   1-10       页码 100   1-100

// 3.  万一我的总页码(100)太大了    先让它默认展示 n个页码  (如果有多的重新计算页码的顺序)

//     默认显示多少页码   showPage




function Page(ele, option) {
    this.parent = document.querySelector(ele);
    this.options = { // 定死的   默认值
        count: 100,
        shownum: 10,
        showpage: 5,
        callback(index) {
            console.log(index);
        }
    }
    for (var key in option) { //遍历  option  {count:11}
        // key   =>  "count"
        this.options[key] = option[key]; // this.options["count"] = option["count"]
    }
    this.pageIndex = 1; //默认第一页为活跃状态
    this.init();
}
Page.prototype.createHLML = function() {
    // 上一页
    var that = this;
    var prev = document.createElement("span");
    prev.className = "prev";
    prev.innerHTML = "上一页";
    this.parent.appendChild(prev);
    prev.onclick = function() {
        that.pageIndex--;
        that.createPage();
        console.log(that.pageIndex);
    }


    this.pageBox = document.createElement("ul");
    this.pageBox.className = "pageBox";
    this.parent.appendChild(that.pageBox);

    var next = document.createElement("span");
    next.className = "next";
    next.innerHTML = "下一页";
    this.parent.appendChild(next);

    next.onclick = function() {
        that.pageIndex++;
        that.createPage();
        console.log(that.pageIndex);

    }
}


Page.prototype.init = function() {
    // 由于css样式的需要，我们要判断parent中是否有page这个类名
    var classStr = this.parent.className;
    var classList = classStr.split("");

    if (classList.length) {
        if (classList.indexOf("page") == -1) { //不存在就添加
            this.parent.className += " page";
        }
    } else {
        this.parent.className = "page";
    }

    console.log(this.options);
    this.createHLML();
    this.createPage();
}

Page.prototype.createPage = function() {
    var that = this;
    var allPage = Math.ceil(this.options.count / this.options.shownum);

    this.pageBox.innerHTML = "";
    // 页码的临界值判断
    if (this.pageIndex < 1) {
        this.pageIndex = 1;
    }
    if (this.pageIndex > allPage) {
        this.pageIndex = allPage;
    }

    var mid = Math.floor(this.options.showpage / 2);
    var start = 1;
    var end = 0;


    // 可能会不够， 也可能会超
    if (this.pageIndex < mid + 1) {
        start = 1;
        end = allPage > this.options.showpage ? this.options.showpage : allPage;
    } else if (this.pageIndex >= mid + 1 && this.pageIndex <= allPage - mid) {
        start = this.pageIndex - mid;
        end = this.pageIndex + mid;
        if (this.options.showpage % 2 == 0) {
            start += 1;
            // end -= 1;
        }
    } else {
        start = allPage - this.options.showpage + 1;
        end = allPage;
    }

    start = start < 1 ? 1 : start;

    for (let i = start; i <= end; i++) {
        let li = document.createElement("li");
        if (i == this.pageIndex) {
            li.className = "active";
        }
        li.innerText = i;
        li.onclick = function() {
            that.pageIndex = i;
            console.log(that.pageIndex);
            that.createPage();
        }
        this.pageBox.appendChild(li);
    }

    if (this.options.callback) {
        this.options.callback(this.pageIndex);
    }
}