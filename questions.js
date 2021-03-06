jQuery(document).ready(function ($) {


    $('#etik button').click(function () {
        $('#steps span').css('opacity', 1);
        $(this).parent().hide();
        $('#question-text').text('Обращались раньше в нашу фирму ?');
        $('#happ').fadeIn('slow', 'swing');
        $('#steps .stOne').addClass('active');

    });

    $('#happ input').on('change', function () {
        $(this).parents('#happ').hide();
        $('#question-text').text('Выберите размер:');
        $('#chSize').fadeIn('slow', 'swing');
        $('#steps .stTwo').addClass('active');

    });

    $('#personNext').click(function () {
        $('#steps .stThree').addClass('active');
        $(this).parent().hide();
        $('#question-text').text('Нужна ли вам доставка ?');
        $('#personDelivery').fadeIn(300, 'swing');
    });

    $('#personDelivery input').on('change',function () {
        $('#steps .stFour').addClass('active');
        $(this).parents('#personDelivery').hide();
        $('#question-text').html("Нужна ли печать на данных этикетках ? \n (укажите количество цветов)").css('text-align','center');
        $('#personPrint').fadeIn('slow', 'swing');


    });
    $('#personPrint input').on('change',function () {
        $('#steps .stFive').addClass('active');
        $(this).parents('#personPrint').hide();
        $('#question-text').text('Укажите свое имя и телефон.');
        $('#personData').fadeIn('slow', 'swing');
    });



    $('#personaForm').on('submit', function (e) {

        e.preventDefault();
        var form = $(this),
            inf = {
                'name': form.find("input[name=personName]").val(),
                'phone': form.find("input[name=personPhone]").val(),
                'size': getString($("#etikSize").val()),
                'happ' : $('#happ input:checked').val(),
                'delivery' : $('#personDelivery input:checked').val(),
                'colors' : $('#personPrint input:checked').val()
            };
        $.post('questions.php', {data: inf}).done(function (data) {
            form.parent().hide();
            $('#question-text').hide();
            $('#steps .stSix').addClass('active');
            $('#successData').fadeIn('slow', 'swing');
            console.log(data);
        })
    });
    $('#consult').click(function () {
        $('.front').css('transform', 'rotateX(180deg)');
        $('.back').css('transform', 'rotateX(360deg)');
    });

    $('#checkSize').on('change', function () {
        var size = $('#etikSize');
        if (this.checked) {
            simple_tooltip("select", "tooltip");
            size.attr('multiple', true).attr('size', 2)
        } else {
            $('select').off();
            size.removeAttr('multiple').removeAttr('size');
        }

    });

    function getString(inp) {
        if (typeof (inp) === 'object') return inp.join("\n");
        return inp;
    }



});
function simple_tooltip(target_items, name){
    $(target_items).each(function(i){
        $("body").append("<div class='"+name+"' id='"+name+i+"'><p>Чтобы выбрать несколько размеров удерживайте <strong style=''>ctrl</strong></p></div>");
        var my_tooltip = $("#"+name+i);

        $(this).hover(function(kmouse){
            my_tooltip.css({opacity:1, display:"none",left:kmouse.pageX-320, top:kmouse.pageY-70}).fadeIn(400);
        },function () {
            my_tooltip.fadeOut(200);
        })
    });
}