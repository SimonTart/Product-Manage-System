import React from 'react';
import reqwest from 'reqwest';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

import areIntlLocalesSupported from 'intl-locales-supported';

var echarts = require('echarts');

if (areIntlLocalesSupported('zh')) {
    var DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
    require('intl/locale-data/jsonp/zh');
    var DateTimeFormat = IntlPolyfill.DateTimeFormat;
}

const birthdayTitle = { marginTop: 15 };



export default React.createClass({
    getInitialState: function () {
        let beginDate = new Date();
        beginDate.setFullYear(beginDate.getFullYear() - 1);
        beginDate.setHours(0);
        beginDate.setMinutes(0);
        beginDate.setSeconds(0);
        return {
            beginDate: beginDate,
            endDate: new Date()
        }
    },
    formatDate: function (date) {
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    },
    componentDidMount: function () {
        let myChart = echarts.init(document.getElementById('report'));
        this.myChart = myChart;
        this.loadData();
    },
    loadData: function () {
        let myChart = this.myChart;
        reqwest({
            url: '/api/report/sale/income/line',
            method: 'get',
            data: {
                beginDate: this.state.beginDate.toString(),
                endDate: this.state.endDate.toString()
            },
            type: 'json'
        }).then((res) => {
            // 绘制图表
            myChart.setOption({
                title: { text: '商品销售量柱状图' },
                tooltip: {
                    trigger: 'item'
                },
                toolbox: {
                    show: true,
                    feature: {
                        magicType: { show: true, type: ['line', 'bar'] },
                    }
                },
                xAxis: {
                    data: res.dates
                },
                yAxis: [{
                    type: 'value',
                    name: '销售总量'
                }],
                series: [{
                    name: '销量',
                    type: 'line',
                    data: res.incomes
                }],
                dataZoom: [
                    {
                        show: true,
                        start: 0,
                        end: 100,
                        handleSize: 8
                    },
                    {
                        type: 'inside',
                        start: 0,
                        end: 100
                    },
                    {
                        show: true,
                        yAxisIndex: 0,
                        filterMode: 'empty',
                        width: 12,
                        height: '70%',
                        handleSize: 8,
                        showDataShadow: false,
                        left: '93%'
                    }
                ],
            });
        }).fail((err) => {
            console.error(err);
        })
    },
    handleBeginDateChange: function (e, date) {
        console.log(date);
        this.setState({
            beginDate: date
        });
        this.loadData();
    },
    handleEndDateChange: function (e, date) {
        this.setState({
            endDate: date
        });
        this.loadData();
    },
    render: function () {
        let blockStyle = {
            width: '100%',
            height: 500
        }
        return (
            <div>
                <DatePicker
                    autoOk={true}
                    style={{ display: 'inline-block' }}
                    floatingLabelText="起始日期："
                    maxDate={this.state.endDate }
                    defaultDate={this.state.beginDate}
                    DateTimeFormat={DateTimeFormat}
                    formatDate={this.formatDate}
                    locale="zh"
                    onChange={this.handleBeginDateChange}
                    />
                <DatePicker
                    autoOk={true}
                    style={{ display: 'inline-block', marginLeft: 30 }}
                    floatingLabelText="截至日期："
                    defaultDate={this.state.endDate}
                    DateTimeFormat={DateTimeFormat}
                    minDate={this.state.beginDate}
                    maxDate={new Date() }
                    formatDate={this.formatDate}
                    locale="zh"
                    onChange={this.handleEndDateChange}
                    />
                <div style={blockStyle} id="report">
                </div>
            </div>
        );
    }
});