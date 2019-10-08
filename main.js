{
    let $Btns = $('#btns>button');
    let length = $Btns.length;
    let current = 0; //当前的
    let $Imgs = $('#images>img');
    let imgWidth = $Imgs.width();

    makeFakeImgs(); //添加假的第一张和最后一张图片
    init(); // 初始化图片位置
    numBtns(); // 事件绑定

//5. 点击上一张/下一张 切换图片
    $(next).on('click', function () { // 下一张
        goToSlide(current + 1);
    });
    $(previous).on('click', function () { //上一张
        goToSlide(current - 1);
    });

// 6. 每过2秒，自动轮播切换图片
    let timer = setInterval(function () { // 自动轮播
        goToSlide(current + 1)
    }, 2000);


// 7.鼠标进入暂停轮播，移出继续轮播
    $(container).on('mouseenter', function () {
        window.clearInterval(timer)
    }).on('mouseleave', function () {
        timer = setInterval(function () { // 自动轮播
            goToSlide(current + 1)
        }, 2000)
    });


//1.点击不同的按钮，切换图片
// 1.2优化后
    function numBtns() {
        $Btns.on('click', function (e) {
            let $btn = $(e.currentTarget);
            let numBtnIndex = $btn.index();
            goToSlide(numBtnIndex);
        })
    }

    function goToSlide(index) { // 精髓，核心
        // console.log('current, index')
        // console.log(current, index)
        if (index > length - 1) {
            index = 0
        } else if (index < 0) {
            index = length - 1
        }
        if (current === length - 1 && index === 0) {
            console.log('最后到第一')
            $(images).css({transform: `translateX(${-(length + 1) * imgWidth}px)`})
                .one('transitionend', function () {
                    $(images).hide()
                        .offset()
                    $(images).css({transform: `translateX(${-(index + 1) * imgWidth}px)`}).show()
                })
        } else if (current === 0 && index === length - 1) {
            console.log('第一到最后')
            $(images).css({transform: `translateX(0px)`})
                .one('transitionend', function () {
                    $(images).hide()
                        .offset()
                    $(images).css({transform: `translateX(${-(index + 1) * imgWidth}px)`}).show()
                })
        } else {
            $(images).css({transform: `translateX(${-(index + 1) * imgWidth}px)`})
        }
        current = index;
    }


// 1.1 优化前
    /*$Btns.eq(0).on('click', function () {
            //4.实现无缝从第一张到最后一张
            if (current === 3) {
                console.log('最后到第一')
                $(images).css({transform: 'translateX(-1500px)'})
                    .one('transitionend', function () {
                        $(images).hide()
                            .offset()
                        $(images).css({transform: 'translateX(-300px)'}).show()
                    })
            } else {
                $(images).css({transform: 'translateX(-300px)'})
            }
            current = 0;
        });
        $Btns.eq(1).on('click', function () {
            $(images).css({transform: 'translateX(-600px)'})
            current = 1;
        });
        $Btns.eq(2).on('click', function () {
            $(images).css({transform: 'translateX(-900px)'})
            current = 2;
        });
        $Btns.eq(3).on('click', function () {
            //4.实现无缝从最后一张到第一张
            if (current === 0) {
                console.log('第一到最后')
                $(images).css({transform: 'translateX(0px)'})
                    .one('transitionend', function () {
                        $(images).hide()
                            .offset()
                        $(images).css({transform: 'translateX(-1200px)'}).show()
                    })
            } else {
                $(images).css({transform: 'translateX(-1200px)'})
            }
            current = 3;
        });*/


//2.如果当前显示第一张的时候，点击查看最后一张，或当前是最后一张，点击查看第一张，要求无缝切换，那么就需要在第一张前面复制最后一张，最后一张后面复制第一张。
    function makeFakeImgs() {
        $fristPic = $Imgs.eq(0).clone(true)
        $lastPic = $Imgs.eq($Imgs.length - 1).clone(true)

        $(images).append($fristPic)
        $(images).prepend($lastPic)
    }


//3.初始位置需要改css
    function init() {
        $(images).css({transform: 'translateX(-300px)'})
    }


}