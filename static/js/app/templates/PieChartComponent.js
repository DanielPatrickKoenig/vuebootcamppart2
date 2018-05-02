// function generateRandomID(){
//     return "CHART_"+Math.random().toString().split(".").join("")+Math.random().toString().split(".").join("")+Math.random().toString().split(".").join("");
// }
Vue.component('pie-chart',{
    props:['chartdata','colors','textcolor','title','hovertitle'],
    template:'<div class="pie-chart"><div v-bind:id="chartid"></div><span></span></div>',
    data:function(){
        return {
            message:'sup dude',
            chartid:"CHART_"+Math.random().toString().split(".").join("")+Math.random().toString().split(".").join("")+Math.random().toString().split(".").join(""),
            chartObject:undefined
        }
    },
    watch:{
        chartdata:function(){
            var self = this;
            //setTimeout(function(){
            if(document.getElementById(self.$data.chartid) != undefined){
                
            
                var _data = [];
                var _values = [];
                var _keys = [];
                console.log(this.chartdata)
                for(var k in this.chartdata){
                    _keys.push(k);
                    _values.push(this.chartdata[k]);
                    _data.push({name:k,value:this.chartdata[k]});
                }
                
                var option = {
                    title:{
                        text:this.title,
                        textStyle:{
                            color:this.textcolor
                        },
                        x:'left'
                    },
                    color: this.colors,
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        y:'center',
                        data:_keys,
                        textStyle:{color:this.textcolor}
                    },
                    series: [
                        {
                            name:this.hovertitle,
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:_data
                        }
                    ]
                };
                console.log(self.$data.chartObject);

                
                self.$data.chartObject.setOption(option);
                //*/
            }
            //},300);s
        }
    },
    mounted:function(){this.$nextTick(function(){
            
            var self = this;
            
            self.$data.chartObject = echarts.init(document.getElementById(self.$data.chartid));
            


        })
        
    }    
    
})

export default {}