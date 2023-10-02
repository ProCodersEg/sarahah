.sf-modal{
    position: fixed;
    z-index: 10001;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    overflow-y: auto;
    background: rgba(0,0,0, 0.8);
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: fade 0.35s ease-out;
    animation: fade 0.35s ease-out;
}
.sf-modal.active{
    display: block;
}

.sf-modal-wrapper{
    position: relative;
    display: flex;
    width: 100%;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
}

.sf-modal-content{
    position: relative;
    display: none;
    max-width: 500px;
    min-width: 300px;
    margin: 50px auto;
}

.sf-modal.active .sf-modal-content {
    display: block;

    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: spaceInUp;
    animation-name: spaceInUp;
}

@media (max-width: 480px) {
    .sf-modal-content{
        min-width: 300px;
        width: 100%;
        padding: 0 20px;
    }
    .sf-modal .sf-modal-closer{
        right: 30px;
    }
}

.sf-modal-closer{
    font-size: 20px;
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    position: absolute;
    bottom: 100%;
    right: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    opacity: 0.7;
    cursor: pointer;
    -webkit-transition: all .15s linear;
    -moz-transition: all .15s linear;
    transition: all .15s linear;
}
.sf-modal-closer:hover{
    opacity: 1;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    transform: rotate(90deg);
}


form.aero-form{
    display: block;
    position: relative;
    padding: 25px 15px;
    border-radius: 10px;
    max-width: 400px;
    margin: 0 auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
form.aero-form.small-width {
   max-width: 400px;
}
form.aero-form.transparent{
    background: rgba(255,255,255, 0.5);
}
form.aero-form.form-shadow{
    box-shadow: rgba(68,96,241, 0.1) 0 15px 30px 5px;
}

form.aero-form.white{
    background: rgba(255,255,255, 1);
}

form.aero-form input[type=text],
form.aero-form input[type=password],
form.aero-form input[type=email],
form.aero-form input[type=date],
form.aero-form input[type=number],
form.aero-form input[type=text],
form.aero-form select,
form.aero-form textarea{
    display: block;
    width: 100%;
    border: 0;
    background-color: #E9EFF6;
    border-radius: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height: 48px;
    padding: 0 20px;
    margin: 0 0 5px;
}
form.aero-form textarea{
    padding: 20px;
    height: auto;
    min-height: 120px;
    resize: none;
}

form.aero-form input:focus,
form.aero-form select:focus,
form.aero-form textarea:focus{
    outline: none;
    background-color: #ffffff;
    box-shadow: rgba(68,96,241, 0.2) 0 5px 30px 0;
}

form.aero-form label{
    display: block;
    width: 100%;
    padding: 0;
    margin-bottom: 15px;
}

.aero-form-header{
    margin-bottom: 30px;
    text-align: center;
    padding: 0 20px;
    font-size: 14px;
}
.aero-form-header h2{
    margin-bottom: 10px!important;
}

.aero-form-submit{
    margin-top: 20px;
}

.aer-line{
    display: block;
    margin: 30px 0 20px 0;
    text-align: center;
    color: #888888;
    font-size: 12px;
    line-height: 1;
    position: relative;
}
.aer-line:before {
    content: '';
    display: block;
    position: absolute;
    z-index: 1;
    top: 50%;
    left:0;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(0,0,0, 0.15);
}
.aer-line > span {
    position: relative;
    z-index: 3;
    display: inline-block;
    padding: 2px 10px;
    background-color: #ffffff;
}

.aero-social-login-links{
    justify-content: space-between;
}
.aero-social-login-links > div{
    flex: 1;
}

a.social-btn{
    display: block;
    text-align: center;
    padding: 10px 15px;
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #DBE1E7;
}
a.social-btn:hover{
    border-color: transparent;
    box-shadow: rgba(68,96,241, 0.15) 0 8px 25px 5px;
}

a.social-btn img{
    display: inline-block;
    max-height: 30px;
}

.aero-password-label{
    position: relative;
}
.aero-password-trigger{
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    width: 50px;
    border: 0;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 16px;
    justify-content: center;
    user-select: none;
    cursor: pointer;
    opacity: 0.7;
}
.aero-password-trigger > *{
    pointer-events: none;
}
.aero-password-trigger.active,
.aero-password-trigger:hover{
    opacity: 1;
}

.aero-password-trigger svg,
.aero-password-trigger svg path{
    transition: all 0.2s ease-out;
}

.aero-password-trigger > svg:first-child{
    display: inline-block;
}
.aero-password-trigger > svg:last-child{
    display: none;
}

.aero-password-trigger.active > svg:first-child{
    display: none;
}
.aero-password-trigger.active > svg:last-child{
    display: inline-block;
}

.aero-recover-password{
    display: block;
    text-align: right;
    font-size: 12px;
    color: #888888;
    line-height: 1;
}

.form-message{
    display: none;
    position: relative;
    padding: 10px 20px;
    margin: 20px 0 0 0;
    color: #ffffff;
    background-color: #4460F1;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
    text-align: center;
    box-shadow: rgba(68,96,241, 0.15) 0 8px 25px 5px;
}
.form-message.success{
    background-color: #82B440;
}
.form-message.active{
    display: block;
}

.flex{
    display: flex;
}
.flex.middle{
    align-items: center;
}
.flex .container{
    width: 100%;
}
.flex.half > div{
    width: 50%;
}
.flex.spacing {
    margin-left: -8px;
    margin-right: -8px;
}
.flex.spacing > div{
    padding-left: 8px;
    padding-right: 8px;
}

.flex.reverse{
    flex-direction: row-reverse;
}

.text-center{
    text-align: center;
}

.full-width{
    width: 100%;
    max-width: 100%;
}

.hide{
    display: none;
}


.tap{
    position: relative;
    display: inline-block;
    padding: 0 20px;
    margin: 0 auto;
    text-decoration: none;
    border: 0;
    border-radius: 30px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    background: #4460F1;
    min-width: 200px;
    max-width: 400px;
    text-align: center;
    font-size: 15px;
    line-height: 48px;
    color: #ffffff;
    cursor: pointer;
    font-weight: 700;
    -webkit-transition: all .15s;
    -moz-transition: all .15s;
    -ms-transition: all .15s;
    -o-transition: all .15s;
    transition: all .15s;
    opacity: 1;
    overflow: hidden;
}
.tap:hover{
    background: #3BD7A7;
    color: #ffffff;
    text-decoration: none;
}

.tap:active{
    -webkit-transform: scale(0.97);
    -moz-transform: scale(0.97);
    transform: scale(0.97);
}

.tap svg{
    display: inline-block;
    vertical-align: middle;
    position: relative;
    top: -1px
}

#docs_tab .preview {
    border: 2px dashed rgba(0,0,0, 0.12);
    padding: 50px 0;
    margin-top: 15px;
}

@-webkit-keyframes fade {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes fade {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@-webkit-keyframes spaceInUp {
    0% {
        opacity: 0;
        -webkit-transform-origin: 50% 0%;
        transform-origin: 50% 0%;
        -webkit-transform: scale(0.2) translate(0%, -200%);
        transform: scale(0.2) translate(0%, -200%);
    }
    100% {
        opacity: 1;
        -webkit-transform-origin: 50% 0%;
        transform-origin: 50% 0%;
        -webkit-transform: scale(1) translate(0%, 0%);
        transform: scale(1) translate(0%, 0%); }
}

@keyframes spaceInUp {
    0% {
        opacity: 0;
        -webkit-transform-origin: 50% 0%;
        transform-origin: 50% 0%;
        -webkit-transform: scale(0.2) translate(0%, -200%);
        transform: scale(0.2) translate(0%, -200%);
    }
    100% {
        opacity: 1;
        -webkit-transform-origin: 50% 0%;
        transform-origin: 50% 0%;
        -webkit-transform: scale(1) translate(0%, 0%);
        transform: scale(1) translate(0%, 0%);
    }
}
