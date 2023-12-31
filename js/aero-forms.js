document.addEventListener("DOMContentLoaded", function(event){
    'use strict'

    var password_trigger = document.querySelectorAll('.aero-password-trigger');

    if( password_trigger ){
        for( var i=0; i<password_trigger.length; i++ ){
            var el = password_trigger[i];

            el.onclick = function (e) {
                var parent_label  = e.target.parentNode,
                    password_input = parent_label.querySelector('input');

                e.target.classList.toggle('active');

                if( password_input ){
                    var type_attr = password_input.getAttribute('type');

                    if( type_attr === 'text'){
                        password_input.setAttribute('type', 'password');
                    }
                    else  if( type_attr === 'password'){
                        password_input.setAttribute('type', 'text');
                    }
                }
            }
        }
    }

    var SimpleModal = function(){
        var modal_triggers = document.querySelectorAll(".aero-modal"),
            modal_closers  = document.querySelectorAll(".aero-modal-close");

        if( modal_triggers.length ){
            for (var m=0; m<modal_triggers.length; m++){
                var trigger = modal_triggers[m];

                if( trigger ){
                    trigger.onclick = function (e) {
                        e.preventDefault();

                        var src,
                            data_src = e.target.getAttribute( "data-src" ),
                            href     = e.target.getAttribute( "href" );

                        if( src ){
                            src = data_src;
                        }
                        else{
                            src = href;
                        }

                        var targetModal = document.querySelector(src);
                        targetModal.classList.add("active");
                    }
                }
            }
        }

        if( modal_closers.length ){
            for (var c=0; c<modal_closers.length; c++){
                var closer = modal_closers[c];

                if( closer ){
                    closer.onclick = function (e) {
                        e.preventDefault();
                        e.target.closest(".sf-modal").classList.remove("active");
                    }
                }
            }
        }

        document.onclick = function (e) {
            if( e.target.classList.contains("sf-modal-wrapper") ){
                e.target.parentNode.classList.remove("active");
            }
        }
    };

    SimpleModal();

});