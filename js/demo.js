document.addEventListener("DOMContentLoaded", function(event){
    'use strict'

    var ms = document.querySelector('#menu-switcher');
    var hn = document.querySelector('#header .nav');

    if( ms ){
        ms.onclick = function (e) {
            ms.classList.toggle('active');
            if( hn ) hn.classList.toggle('active');
        }
    }


    var hnl = document.querySelectorAll('#header .nav li');

    if( hnl ){
        for( var h=0; h<hnl.length; h++ ){
            var menu_item = hnl[h];

            menu_item.onclick = function (e) {
                var ul = e.target.closest('ul'),
                    li = ul.querySelectorAll('li');

                if( li ){
                    for (var l=0; l<li.length; l++){
                        li[l].classList.remove('active');
                    }
                }

                e.target.parentNode.classList.add('active')

                if( window.innerWidth <= 992){
                    ms.classList.remove('active');
                    hn.classList.remove('active');
                }

            }
        }
    }

    var aero_forms = document.querySelectorAll('form.aero-form');

    if( aero_forms ){
        for( var f=0; f<aero_forms.length; f++ ){
            var form = aero_forms[f];

            form.onsubmit = function (e) {
                e.preventDefault();

                var the_form = e.target,
                    form_message = the_form.querySelector('.form-message');

                the_form.reset();

                if( form_message ){
                    form_message.classList.add('active');

                    setTimeout(function () {
                        form_message.classList.remove('active');
                    }, 3000);
                }
            }
        }
    }

});