import NoSleep from "./NoSleep.js/index.js"

const noSleep = new NoSleep()

document.addEventListener('click', function enableNoSleep() {
    document.removeEventListener('click', enableNoSleep, false);
    noSleep.enable();
}, false);

const DATE = {}
// 获取时间元素
const TimeElements = {
    hour: document.querySelector("#hour"),
    minute: document.querySelector("#minute"),
    second: document.querySelector("#second")
}
// 处理单位数字
function numZeroAdder(num) {
    let str = String(num)
    if (str.length == 1) {
        return "0" + str
    } else {
        return str
    }
}
// 时与分切换时添加类
function numChanger() {
    if (DATE.second == "59") {
        TimeElements.minute.classList.add("changing")
        setTimeout(() => {
            TimeElements.minute.classList.remove("changing") 
        }, 1000)
    }
    if (DATE.minute == "59" && DATE.second == "59") {
        TimeElements.hour.classList.add("changing")
        setTimeout(() => {
            TimeElements.hour.classList.remove("changing") 
        }, 1000)
    }
}
// 每秒更新时刻
setInterval(() => {
    const date = new Date()
    DATE.hour = numZeroAdder(date.getHours())
    DATE.minute = numZeroAdder(date.getMinutes())
    DATE.second = numZeroAdder(date.getSeconds())
    // 更新 dom 元素
    for (let ele in TimeElements) {
        TimeElements[ele].innerText = DATE[ele]
    }

    numChanger()
}, 1000)


const outer = document.querySelector("#outer")
// 进入界面时，读取系统主题偏好
const themeMedia = window.matchMedia("(prefers-color-scheme: light)")
if (themeMedia.matches) {
    outer.classList.add("light")
} else {
    outer.classList.add("dark")
}
// 切换颜色主题函数
document.querySelector("#changer").onclick = () => {
    let originTheme = outer.classList[0]
    outer.classList.remove(outer.classList[0])
    if (originTheme == "light") {
        outer.classList.add("dark")
    } else {
        outer.classList.add("light")
    }
}