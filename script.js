/*card flipping and storing code*/
var a=null;
var b=null;
var c=null;
var d=null;
$(document).ready(function(){
    $('.back').addClass('notFlipped');
    $('.back').click(function(){
        $(this).hide();
        if(a===null){
            a=$(this).prev().first().attr('src');
            console.log('first card clicked',a);
            c=$(this);
        } else {
            b = $(this).prev().first().attr('src');
            console.log('this is card 2',b);
            d = $(this);
            compare(a,b);
            a=null;
            b=null;
            console.log(a,b);
            c=null;
            d=null;
            console.log(c,d);
        }
    });
});

function compare(a,b){
    if(a==b){
        console.log('match');
        $(c).removeClass('notFlipped');
        $(d).removeClass('notFlipped');
    }else{
        console.log('no match');
        $('.notFlipped').show();
    }
}
