Vue.component("line-chart",{
    data:function(){
        return {
            chartid:"CHART_"+Math.random().toString().split(".").join("")+Math.random().toString().split(".").join("")+Math.random().toString().split(".").join(""),
            chartObject:undefined
        }
    },
    props:['chartdata'],
    template:`<div class="line-chart">
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
                    _legendData.push(c);
                    var _seriesData = [];
                    for(var n in this.chartdata[c]){
                        _seriesData.push(this.chartdata[c][n]);
                    }
                    _series.push({data:_seriesData,name:c,type:'line',stack:'A'});
                    if(_legendData.length==1){
                        for(var n in this.chartdata[_legendData[0]]){
                            _xData.push(n);
                        }
                    }
                    

                }
                
                // if(_legendData.length>0){
                //     for(var n in this.chartdata[_legendData[0]]){
                //         _xData.push(n);
                //     }
                // }
                
                var option = {
                    title: {
                        text: 'TITLE'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:_legendData
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: _xData
                    },
                    yAxis: {
                        type: 'value'
                    },
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