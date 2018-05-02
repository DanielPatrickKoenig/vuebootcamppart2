Vue.component('bar-chart',{
    data:function(){
        return {
            chartid:"CHART_"+Math.random().toString().split(".").join("")+Math.random().toString().split(".").join("")+Math.random().toString().split(".").join(""),
            chartObject:undefined
        }
    },
    props:['chartdata','colors','textcolor','title'],
    template:`<div class="bar-chart">
        <div v-bind:id="chartid"></div>
    </div>`,
    watch:{
        chartdata:function(){
            var self = this;
            //setTimeout(function(){
            if(document.getElementById(self.$data.chartid) != undefined){
                var _legendData = [];
                var _xData = [];
                var _series = [];
                for(var c in this.chartdata){
                    _xData.push(c);
                    if(_legendData.length==0){
                        for(var leg in this.chartdata[c]){
                            _legendData.push(leg);
                            _series.push({name:leg,type:'bar',gap:0,label:'',data:[]});
                        }
                    }
                }

                for(var i = 0;i<_xData.length;i++){
                    for(var j = 0;j<_legendData.length;j++){
                       _series[j].data.push(this.chartdata[_xData[i]][_legendData[j]]); 
                    }
                }

                var option = {
                    title:{
                        text:this.title,
                        textStyle:{
                            color:this.textcolor
                        }
                    },
                    color: this.colors,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: _legendData,
                        textStyle:{color:this.textcolor}
                    },
                    textStyle:{
                        color:this.textcolor
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center'//,
                        // feature: {
                        //     mark: {show: true},
                        //     dataView: {show: true, readOnly: false},
                        //     magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        //     restore: {show: true},
                        //     saveAsImage: {show: true}
                        // }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            data: _xData
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: _series
                };
                
                
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
/*
var option = {
                    color: ['#003366', '#006699', '#4cabce', '#e5323e'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['Forest', 'Steppe', 'Desert', 'Wetland']
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            data: ['2012', '2013', '2014', '2015', '2016']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: 'Forest',
                            type: 'bar',
                            barGap: 0,
                            label: '',
                            data: [320, 332, 301, 334, 390]
                        },
                        {
                            name: 'Steppe',
                            type: 'bar',
                            label: '',
                            data: [220, 182, 191, 234, 290]
                        },
                        {
                            name: 'Desert',
                            type: 'bar',
                            label: '',
                            data: [150, 232, 201, 154, 190]
                        },
                        {
                            name: 'Wetland',
                            type: 'bar',
                            label: '',
                            data: [98, 77, 101, 99, 40]
                        }
                    ]
                };
*/