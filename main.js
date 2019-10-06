{
    let n;
    let imgL = $('#images > img').length;
    init();


    setInterval(() => {
        makeLeave(getImage(n))
            .one('transitionend', (e) => {
                makeEnter($(e.currentTarget))
            })
        makeCurrent(getImage(n + 1))
        n += 1;
    }, 2000);

    // 封装函数

    function getImage(arg) { //获取图片
        return $(`#images > img:nth-child(${f(arg)})`)
    }

    function makeCurrent($event) {
        $event.removeClass('enter leave').addClass('current')
        return $event
    }

    function makeLeave($event) {
        $event.removeClass('current enter').addClass('leave')
        return $event
    }

    function makeEnter($event) {
        $event.removeClass('leave current').addClass('enter')
        return $event
    }

    function f(x) {
        if (x > imgL) {
            x = x % imgL;
            if (x === 0) {
                x = imgL
            }
        }
        return x; // x 一直为 1，2，3，4
    }

    function init() {
        n = 1;
        $(`#images > img:nth-child(${n})`).addClass('current')
            .siblings().addClass('enter')
    }
}