define(["text!../../template/dataAnalysis.html","text!../../template/todayWeather.html"],function(analysis,weather){
    return {
        analysisPage:{
            template:analysis,
            data:function(){
                return {
                    message:"Hello"
                }
            }
        },
        weatherPage:{
            template:weather,
            methods:{
                convert:function(x){
                    return Math.round(x-273);
                }
            },
            data:function(){
                return {
                    weather:[],
                    weatherapi:"http://api.openweathermap.org/data/2.5/weather?q=Taipei,TW&appid=62bb3ecb2a47725a79e71aa487e5d05e",
                    city:"",
                    country:"",
                    status:0
                }
            },
            watch:{
                weatherapi:function(val){
                    var _this=this;
                    fetch(_this.weatherapi).then(function(res){
                        _this.status=res.status;
                        return res.json();
                    }).then(function(datas){
                        _this.weather=datas;
                    }).catch(function(err){
                        console.log(err)
                    })
                }
            },
            mounted:function(){
                var _this=this;
                fetch(this.weatherapi).then(function(res){
                    _this.status=res.status;
                    console.log(_this.status)
                    return res.json();
                }).then(function(datas){
                    _this.weather=datas;
                    console.log(datas)
                }).catch(function(err){
                    console.log(err)
                })
            },
            methods:{
                showweather:function(){
                    this.city=$(".city").val();
                    this.country=$(".country").val();
                    return this.weatherapi=`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=62bb3ecb2a47725a79e71aa487e5d05e`;
                    
                },
                convert:function(v){
                    return Math.round(v-237);
                }
            }
        }
    }
})