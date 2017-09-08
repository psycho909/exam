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
    }
});
require(["jquery","vue","components/pagetemplate"], function ($,Vue,pagetemplate) {
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