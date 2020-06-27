const codes = {
    //是否
    whether: [{
        value: '01',
        text: '否'
    }, {
        value: '02',
        text: '是'
    }],
    //权限菜单类型
    resTypeId: [{
        value: '1',
        text: '业务类'
    }, {
        value: '2',
        text: '管理类'
    }],
    //权限菜单使用类型
    resOperTypeId: [{
        value: '1',
        text: '目录'
    }, {
        value: '2',
        text: '菜单'
    }, {
        value: '3',
        text: '按钮'
    }]
}
export default {
    //根据value获取对应的text
    getTextByCode(type, value) {
        if (!value) return "-";
        let stat = codes[type].every(item => {
            return item["value"] != value;
        })
        if (stat) {
            return '-';
        } else {
            return codes[type].filter(item => {
                return item["value"] == value;
            })[0]['text'];
        }
    },
    //select下拉框
    getSelectByCode(type) {
        return codes[type];
    }
}