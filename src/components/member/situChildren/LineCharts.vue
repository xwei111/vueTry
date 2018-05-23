<template>
	<div id="myChartLine" :style="{width: '100%', height: '240px'}"></div>
</template>
<script>
	export default {
		name:"LineCharts",
		props:[
			'lineData'
		],
		created(){
			
		},
	    watch:{
	    	lineData(val,oldval){
	    		this.drawLine(val)
	    	}
	    },
		methods:{
			drawLine(data){
				let arryY=[];
		        let arryX=[];
		        if (data.length) {
		            for(var i=0;i<data.length;i++){
		                arryX.push(data[i].dt);
		                arryY.push(data[i].value)
		            }
		        }

		        // 基于准备好的dom，初始化echarts实例
		        let myChartLine = this.$echarts.init(document.getElementById('myChartLine'))
		        // 绘制图表
		        myChartLine.setOption({
		            tooltip: {
		                trigger: 'axis'
		            },
		            xAxis: {
		                type: 'category',
		                boundaryGap: false,
		                data: arryX.length ? arryX : []
		            },
		            yAxis: {
		                type: 'value'
		            },
		            series: [
		                {
		                    name:'',
		                    type:'line',
		                    stack: '总量',
		                    data:arryY.length ? arryY : []
		                }
		            ]
		        });
		    }
		}
	}
</script>
<style>
	
</style>