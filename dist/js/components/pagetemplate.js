define(["jquery","vue","chart","text!../../template/dataAnalysis.html","text!../../template/todayWeather.html"],function($,Vue,Chart,analysis,weather){
    return {
        analysisPage:{
            template:analysis,
            data:function(){
                return {
                    message:"Hello"
                }
            },
            mounted:function(){
                var ctx = document.getElementById("myChart").getContext('2d');
                var chart = new Chart(ctx,{
                    type: 'line',
                    data: {
                        labels: [2007,2008,2009,2010,2011,2012,2013],
                        datasets: [{
                            label: 'Men',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: [106898,103937,99492,87213,101943,118848,103120],
                            fill:false
                        },{
                            label: 'Female',
                            backgroundColor: 'rgb(100, 199, 132)',
                            borderColor: 'rgb(200, 199, 132)',
                            data: [97516,94796,91818,79673,94684,110633,95993],
                            fill:false
                        }]
                    },
                    options: {
                        elements: {
                            line: {
                                tension: 0
                            }
                        }
                    }
                });
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
                    $.ajax({
                        url:_this.weatherapi,
                        dataType:"json",
                        statusCode:{
                            200:function(res){
                                _this.status=200;
                                console.log(200)
                            },
                            404:function(res){
                                _this.status=404;
                                console.log(404)
                            }
                        },
                        beforeSend:function(){
                            $('.loading').show()
                        },
                        complete:function(){
                            $('.loading').hide()
                        },
                        success:function(res){
                            _this.weather=res;
                        },
                        error:function(){
                            console.log('error')
                        }
                    })
                }
            },
            mounted:function(){
                var _this=this;
                $.ajax({
                    url:_this.weatherapi,
                    dataType:"json",
                    statusCode:{
                        200:function(res){
                            _this.status=200;
                            console.log(200)
                        },
                        404:function(res){
                            _this.status=404;
                            console.log(404)
                        }
                    },
                    beforeSend:function(){
                        $('.loading').show()
                    },
                    complete:function(){
                        $('.loading').hide()
                    },
                    success:function(res){
                        _this.weather=res;
                    },
                    error:function(){
                        console.log('error')
                    }
                })
            },
            methods:{
                showweather:function(){
                    this.city=$(".city").val();
                    this.country=$(".country").val();
                    return this.weatherapi=`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=62bb3ecb2a47725a79e71aa487e5d05e`;
                    
                },
                convert:function(x){
                    return Math.round(x-273);
                }
            }
        }
    }
})