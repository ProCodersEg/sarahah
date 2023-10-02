*{
    padding: 0;
    margin: 0;
}




img, svg {
    max-width: 100%;
    display: inline-block;
    vertical-align: middle;
}

a {
    display: inline-block;
    color: #4460F1;
    text-decoration: none;
    -webkit-transition: all 25s;
    transition: all .25s;
}
a:hover{
    opacity: 1;
    color: #4460F1;
    text-decoration: none;
}

::-moz-selection {
    color: #fff;
    background: #4460F1
}

::selection {
    color: #fff;
    background: #3BD7A7
}

body::-webkit-scrollbar {
    width: 12px;
}
body::-webkit-scrollbar-track {
    background: rgba(3,3,3, 0.7);
}
body::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #4460F1;
}

strong{
    color: #0B9551;
}

html,
body{
    height: 100%;
    overflow-x: hidden;
    scroll-behavior: smooth;
}

body {
    position: relative;
    width: 100%;
    background: #ffffff;
    font-size: 15px;
    color: #211818;
    line-height: 1.6;
    letter-spacing: 1px;
    font-family: 'Open Sans', sans-serif;
}

h1,h2,h3,h4,h5,h6{
    padding: 0;
    margin: 0 0 10px;
    line-height: 1.3;
    letter-spacing: 1px;
    font-family: inherit;
    font-weight: 700;
}

h1{
    font-size: 40px;
}
h2{
    font-size: 30px;
}
h3{
    font-size: 24px;
}
h4{
    font-size: 20px;
}
h5, h6{
    font-size: 18px;
}

.no_padding{
    padding: 0!important;
}

.tap{
    position: relative;
    display: inline-block;
    padding: 0 20px;
    margin: 0 auto;
    text-decoration: none;
    border: 0;
    border-radius: 10px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    background: #3BD7A7;
    min-width: 200px;
    max-width: 400px;
    text-align: center;
    font-size: 14px;
    line-height: 48px;
    color: #ffffff;
    cursor: pointer;
    font-weight: 600;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    opacity: 1;
    overflow: hidden;
}
.tap:hover{
    background: #48c08a;
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

#char-count {
    font-size: 11px; /* Adjust the font size as needed */
    margin-left: 20px; /* Adjust the margin-top as needed */
	margin-right: 20px; /* Adjust the margin-top as needed */
	text-align: center;

}

 
  /* Add CSS styles for the loading spinner or text */
        #loading-dialog {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9999;
        }

        #loading-content {
            position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #333;
        font-size: 16px;
        font-weight: normal;
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        margin: 0 20px; /* Equal margin on the right and left */
        }

        .spinner-border {
            display: inline-block;
            width: 1.2rem;
            height: 1.2rem;
            vertical-align: text-bottom;
            border: 0.125em solid currentColor;
            border-right: 0.125em solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

.hide{
    display: none;
}

.container{
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 20px;
    padding-right: 20px;
    position: relative;
    z-index: 9;
}

.vh-100{
    min-height: 100vh;
}

.section{
    padding: 80px 0;
}
.section.vh-100{
    min-height: calc(100% - 120px);
}

.section-title{
    text-align: center;
    font-size: 16px;
    color: #888888;
    padding: 60px 0 60px 0;
}
.section-title h2{
    font-size: 48px;
    font-weight: 900;
    letter-spacing: 2px;
    color: #3BD7A7
}

.section.gray{
    background-color: #E4EAEE;
}

.white-box{
    font-size: 15px;
    max-width: 900px;
    margin: 0 auto 40px auto;
    padding: 60px;
    border-radius: 30px;
    background-color: #fff;
    -webkit-box-shadow: 0 15px 30px 0 rgba(28,9,80,.1);
    -moz-box-shadow: 0 15px 30px 0 rgba(28,9,80,.1);
    box-shadow: 0 15px 30px 0 rgba(28,9,80,.1);
}

#header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #ffffff;
    -webkit-box-shadow: 0 20px 30px 0 rgba(28,9,80,.05);
    -moz-box-shadow: 0 20px 30px 0 rgba(28,9,80,.05);
    box-shadow: 0 20px 30px 0 rgba(28,9,80,.05);
    -webkit-transition: all .25s ease-in-out;
    -moz-transition: all .25s ease-in-out;
    transition: all .25s ease-in-out;
}
#header_main{
    height: 80px;
}
#header_main > div:first-child{
    width: 30%;
}
#header_main > div:last-child{
    width: 70%;
}

#header .logo a{
    color: #000000;
    display: inline-block;
    padding: 20px 0;
}
#header .logo a:hover{
    color: #5C88F9;
}
#header .logo h1{
    font-size: 16px;
    padding: 0;
    margin: 0;
    line-height: 1;
    letter-spacing: 1px;
}

.nav ul{
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    width: 100%;
}
.nav ul > li{
    display: block;
    position: relative;
}
.nav ul > li a{
    display: block;
    padding: 5px;
    margin: 0 12px;
    color: #888888;
    font-weight: bold;
    font-size: 14px;
    letter-spacing: 1px;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease-out;
}
.nav ul > li a:hover,
.nav ul > li.active a{
    color: #4460F1;
    border-bottom-color: #4460F1;
}
.nav ul > li a.btn{
    padding: 0 30px;
    margin: 0 0 0 20px;
    border: 0;
    border-radius: 30px;
    line-height: 36px;
    color: #fff;
    font-size: 12px;
    background-color: #4460F1;
    position: relative;
    top: -2px;
    text-align: center;
}
.nav ul > li a.btn:hover{
    background-color: #3BD7A7
}

#header .nav ul{
    justify-content: flex-end;
}

.show{
    position: relative;
    font-size: 18px;
}
.show h2{
    font-size: 48px;
    font-weight: 900;
    margin-bottom: 40px;
}

#login-form{
    background: url(../images/1x/bg1.png) 54% 78% no-repeat;
    background-size: 500px;
}
#register-form{
    background: #E4EAEE url(../images/1x/bg2.png) 58% 90% no-repeat;
    background-size: 600px;
}
#reset-form{
    background: url(../images/1x/bg3.png) 43% 88% no-repeat;
    background-size: 500px;
}

#footer{
    background: url(../images/1x/bg4.png) 50% 100% no-repeat;
    background-size: 500px;
}


.copy{
    font-size: 13px;
    text-align: center;
    margin-top: 30px;
    color: #666666;
}

.intro-section .section-title{
    padding-top: 40px;
}

pre, code{
    font-size: 14px!important;
    max-height: 600px;
    overflow-y: auto;
}

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-track {
    background: #f2f2f2;
}
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0,0,0, 0.3);
}

pre{
    box-shadow: rgba(0,0,0, 0.15) 0 0 40px;
}

.grid{
    display: flex;
    align-items: center;
}
.grid > div:first-child{
    width: 160px;
    text-align: center;
}
.grid > div:last-child{
    width: calc(100% - 160px);
}

blockquote{
    margin: 30px 0;
    padding: 30px 20px;
    text-align: center;
    border-left: 4px solid #cccccc;
}

code[class*="language-"],
pre[class*="language-"] {
    color: black;
    background: none;
    text-shadow: 0 1px white;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
}

pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
    text-shadow: none;
    background: #b3d4fc;
}

pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
code[class*="language-"]::selection, code[class*="language-"] ::selection {
    text-shadow: none;
    background: #b3d4fc;
}

@media print {
    code[class*="language-"],
    pre[class*="language-"] {
        text-shadow: none;
    }
}

/* Code blocks */
pre[class*="language-"] {
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
    background: #f5f2f0;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
    padding: .1em;
    border-radius: .3em;
    white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
    color: slategray;
}

.token.punctuation {
    color: #999;
}

.token.namespace {
    opacity: .7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
    color: #905;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
    color: #690;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
    color: #9a6e3a;
    /* This background color was intended by the author of this theme. */
    background: hsla(0, 0%, 100%, .5);
}

.token.atrule,
.token.attr-value,
.token.keyword {
    color: #07a;
}

.token.function,
.token.class-name {
    color: #DD4A68;
}

.token.regex,
.token.important,
.token.variable {
    color: #e90;
}

.token.important,
.token.bold {
    font-weight: bold;
}
.token.italic {
    font-style: italic;
}

.token.entity {
    cursor: help;
}

pre[data-line] {
    position: relative;
    padding: 1em 0 1em 3em;
}

.line-highlight {
    position: absolute;
    left: 0;
    right: 0;
    padding: inherit 0;
    margin-top: 1em; /* Same as .prismâ€™s padding-top */

    background: hsla(24, 20%, 50%,.08);
    background: linear-gradient(to right, hsla(24, 20%, 50%,.1) 70%, hsla(24, 20%, 50%,0));

    pointer-events: none;

    line-height: inherit;
    white-space: pre;
}

@media print {
    .line-highlight {
        /*
         * This will prevent browsers from replacing the background color with white.
         * It's necessary because the element is layered on top of the displayed code.
         */
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
    }
}

.line-highlight:before,
.line-highlight[data-end]:after {
    content: attr(data-start);
    position: absolute;
    top: .4em;
    left: .6em;
    min-width: 1em;
    padding: 0 .5em;
    background-color: hsla(24, 20%, 50%,.4);
    color: hsl(24, 20%, 95%);
    font: bold 65%/1.5 sans-serif;
    text-align: center;
    vertical-align: .3em;
    border-radius: 999px;
    text-shadow: none;
    box-shadow: 0 1px white;
}

.line-highlight[data-end]:after {
    content: attr(data-end);
    top: auto;
    bottom: .4em;
}

.line-numbers .line-highlight:before,
.line-numbers .line-highlight:after {
    content: none;
}

pre[id].linkable-line-numbers span.line-numbers-rows {
    pointer-events: all;
}
pre[id].linkable-line-numbers span.line-numbers-rows > span:before {
    cursor: pointer;
}
pre[id].linkable-line-numbers span.line-numbers-rows > span:hover:before {
    background-color: rgba(128, 128, 128, .2);
}

pre[class*="language-"].line-numbers {
    position: relative;
    padding-left: 3.8em;
    counter-reset: linenumber;
}

pre[class*="language-"].line-numbers > code {
    position: relative;
    white-space: inherit;
}

.line-numbers .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 0;
    font-size: 100%;
    left: -3.8em;
    width: 3em; /* works for line-numbers below 1000 lines */
    letter-spacing: -1px;
    border-right: 1px solid #999;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

}

.line-numbers-rows > span {
    display: block;
    counter-increment: linenumber;
}

.line-numbers-rows > span:before {
    content: counter(linenumber);
    color: #999;
    display: block;
    padding-right: 0.8em;
    text-align: right;
}

.cta{
    margin-top: 30px;
}

.content.left {
    text-align: left;
}


.docs {
    margin: 60px auto;
    font-size: 18px;
}
.content {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

#wrapper {
    position: relative;
    padding-bottom: 60px;
}

.content h2,
.content h2,
.content h2{
    margin-top: 20px;
    margin-bottom: 15px;
}

pre{
    margin: 30px 0!important;
}

.content ul{
    margin-bottom: 30px;
}


.content h1,
.content h2,
.content h3,
.content h4,
.content h5,
.content h6,
.content p{
    margin-bottom: 20px;
}

.mt30{margin-top: 30px;}
.mt40{margin-top: 40px;}
.mt50{margin-top: 50px;}

.menu-switcher{
    position: relative;
    float: right;
    display: none;
}

.logo img{
    max-height: 60px;
    border-radius: 50%;
}

#help .logo{
    margin-bottom: 15px;
}
#help .logo img{
    max-height: 80px;
}



/*Media*/
@media (max-width: 1200px) {
    .nav ul > li a{
        font-size: 12px;
        margin: 0 10px;
    }
}

@media (max-width: 992px) {
    #header_main{
        height: 60px;
    }

    .menu-switcher{
        display: inline-block;
    }

    #header .nav{
        position: fixed;
        z-index: 1000;
        top: 60px;
        right: -400px;
        width: 280px;
        height: calc(100% - 60px);
        background-color: #fff;
        padding: 20px 30px;
        box-shadow: 0 20px 30px 0 rgba(28,9,80, 0.1);
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
    }
    #header .nav.active{
        right: 0;
    }

    #header .nav ul{
        display: flex;
        flex-wrap: wrap;
    }
    #header .nav ul > li{
        display: block;
        width: 100%;
        position: relative;
    }
    #header .nav ul > li > a{
        padding: 10px 5px;
        margin: 0 0 10px 0;
        font-size: 15px;
    }

    #header .nav ul > li a.btn{
        margin-top: 30px;
        padding: 5px 20px;
    }

    .show {
        font-size: 16px;
        text-align: center;
        margin-bottom: 40px;
        padding-top: 30px;
    }
    .show h2{
        font-size: 40px;
    }

    .section-title {
        font-size: 15px;
        padding-top: 0;
        padding-bottom: 50px;
    }
    .section-title h2{
        font-size: 36px;
    }

    .white-box{
        padding: 30px;
    }
    .white-box h2{
        font-size: 24px;
    }


    .tap{
        font-size: 13px;
        letter-spacing: 1px;
    }
	


    .flex{
        flex-wrap: wrap;
    }
    .flex.half > div{
        width: 100%;
    }
}

@media (max-width: 480px) {
    .show h2{
        font-size: 36px;
    }

    #header_main > div:first-child{
        width: 50%;
    }
    #header_main > div:last-child{
        width: 50%;
    }
}
