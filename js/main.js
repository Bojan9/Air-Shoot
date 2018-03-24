/*global $, document, setInterval */
$(function () {

    $('.level1').hide();
    $('.level1End').hide();
    $('.level2').hide();
    $('.end').hide();
    var timer = 0;
    var score = 0;

    $(".wrap__start").on("click", function(){
        $(".level1").show();
        $(".splash").hide();
        $(".level1").css("cursor", "none");

    //    $(".wrap").on("mouseenter", function () {
    //        console.log("vleze");
    //    }).on("mouseleave", function () {
    //        console.log("izleze");
    //    })

    $(".wrap").mousemove(function (event) {
        var relX = event.pageX - $(this).offset().left;
        var relY = event.pageY - $(this).offset().top;
        // console.log(relBoxCoords);

        //        $(".airplane").css({
        //            "top": relY + "px",
        //            "left": relX + "px",
        //        })

        document.getElementsByClassName('airplane')[0].style = "transform: translate(" + relX + "px," + relY + "px )";
    });

    $(".wrap").on("click", function (event) {
        var relX = event.pageX - $(this).offset().left;
        var relY = event.pageY - $(this).offset().top;
        //        var element = "<div class='bullet' style='transform: translate("+(relX+20)+"px,"+relY+"px )'></div>";
        var element = "<div class='bullet' style='top:" + relY + "px;left:" + (relX + 20) + "px'></div>";
        $(this).append(element);
    })

        var currentBlocksAmmount = $(".block").length;

    var mainInterval = setInterval(function () {
        var bullets = $(".bullet");
        var blocks = $(".block");
        if (bullets.length) {
            for (var i = 0; i < bullets.length; i++) {
                var newTop = parseInt($(bullets[i]).css("top")) - 10;
                //console.log(newTop);
                if (newTop < 0) {
                    $(bullets[i]).remove();
                } else {
                    $(bullets[i]).css("top", newTop);
                    for (var j = 0; j < blocks.length; j++) {
                        var blockTop = $(blocks[j]).position().top;
                        var blockHeight = $(blocks[j]).height();
                        var blockLeft = $(blocks[j]).position().left;
                        var blockWidth = $(blocks[j]).width();
                        var buletWidth = $(bullets[i]).width();
                        var buletLeft =$(bullets[i]).position().left;
                        if ((newTop < (blockTop + blockHeight)) && (buletLeft + buletWidth > blockLeft && buletLeft < (blockLeft + blockWidth))) {
                            $(blocks[j]).remove();
                            var scoreElement = $(".wrap__mapScore");
                            score++;
                            scoreElement.text(score);
                            if(score==currentBlocksAmmount){
                                alert("You win!")
                                clearInterval(mainInterval);
                                clearInterval(timeInterval);
                                $(".wrap").off("click");
                                $(".bullet").remove();
                                $('.level1').hide();
                                $('.level1End').show();
                            }
                            $(bullets[i]).remove();
                        }
                    }
                }
            }
        }
        var bgPositionY = (parseInt($(".wrap").css("background-position-y")));
        $(".wrap").css("background-position-y", bgPositionY -20);
    }, 100);

        var timeInterval = setInterval(function(){
            var time = $(".wrap__mapTime");
            timer++;
            time.text(timer);
        }, 1000)

    })



})
