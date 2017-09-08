require.config({
    baseUrl: "./js",
    shim:{
        "vue":{
            exports:"Vue"
        }
    },
    paths: {
        "jquery": "./lib/jquery-3.1.1.min",
        "vue": "./lib/vue.min",
        "text":"./lib/text",
        "chart":"https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min"
    }
});
require(["jquery","vue","components/pagetemplate","chart"], function ($,Vue,pagetemplate,Chart) {
    new Vue({
        el:"#app",
        components:{
            analysisPage:pagetemplate.analysisPage,
            weatherPage:pagetemplate.weatherPage
        },
        mounted:function(){

        },
        data:{
            message:"Data Analysis"
        },
        methods:{
            selectItem:function(){
                var _index=$(event.target).index();
                $(".pages").eq(_index).addClass("active").siblings().removeClass("active");
            }
        }
    })
});