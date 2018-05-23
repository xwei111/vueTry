
const Situation = resolve => require(['components/member/Situation'], resolve)
const Basic = resolve => require(['components/member/Basic'], resolve)
const Contribution = resolve => require(['components/member/Contribution'], resolve)
const Active = resolve => require(['components/member/Active'], resolve)
const Vipdata = resolve => require(['components/member/Vipdata'], resolve)
const Vipgroup = resolve => require(['components/member/Vipgroup'], resolve)
const Integral = resolve => require(['components/member/Integral'], resolve)
const Grade = resolve => require(['components/member/Grade'], resolve)

const Members = resolve => require(['components/admin/Members'], resolve)
const Strategy = resolve => require(['components/admin/Strategy'], resolve)
const Commodity = resolve => require(['components/admin/Commodity'], resolve)

const Activity = resolve => require(['components/sale/Activity'], resolve)
const List = resolve => require(['components/sale/List'], resolve)

export const leftMenu={
	member:[{
		title:'会员概况',
		id:'1',
		icon:'el-icon-news',
		path:'/main/vipmanage/situation',
        name:'Situation',
        component:Situation
	},{
		title:'会员分析',
		id:'2',
		icon:'el-icon-picture',
		path:'/main/vipmanageM',
		child:[{
			title:'基本分析',
			id:'2-1',
			path:'/main/vipmanage/basic',
            name:'Basic',
            component:Basic
		},{
			title:'贡献分析',
			id:'2-2',
			path:'/main/vipmanage/contribution',
            name:'Contribution',
            component:Contribution
		},{
			title:'活跃分析',
			id:'2-3',
			path:'/main/vipmanage/active',
            name:'Active',
            component:Active
		}]
	},{
		title:'会员信息',
		id:'3',
		icon:'el-icon-date',
		path:'/main/vipmanage/vipdata',
        name:'Vipdata',
        component:Vipdata
	},{
		title:'会员分组',
		id:'4',
		icon:'el-icon-menu',
		path:'/main/vipmanage/vipgroup',
        name:'Vipgroup',
        component:Vipgroup
	},{
		title:'会员设置',
		id:'5',
		icon:'el-icon-setting',
		path:'/main/vipmanageS',
		child:[{
			title:'积分规则设置',
			id:'5-1',
			path:'/main/vipmanage/integral',
            name:'Integral',
            component:Integral
		},{
			title:'会员等级设置',
			id:'5-2',
			path:'/main/vipmanage/grade',
            name:'Grade',
            component:Grade
		}]
	}],
	admin:[{
		title:'会员标签库',
		id:'6',
		icon:'el-icon-message',
		path:'/main/admin/members',
        name:'Members',
        component:Members
	},{
		title:'营销策略库',
		id:'7',
		icon:'el-icon-goods',
		path:'/main/admin/strategy',
        name:'Strategy',
        component:Strategy
	},{
		title:'商品管理库',
		id:'8',
		icon:'el-icon-time',
		path:'/main/admin/commodity',
        name:'Commodity',
        component:Commodity
	}],
	sale:[{
		title:'发起活动',
		id:'9',
		icon:'el-icon-star-on',
		path:'/main/sale/activity',
		path:'/main/sale/activity',
        name:'Activity',
        component:Activity
	},{
		title:'活动列表',
		id:'10',
		icon:'el-icon-edit',
		path:'/main/sale/list',
        name:'List',
        component:List
	}],
}