const Mock = require("mockjs");
const Random = Mock.Random;
//Random扩展
// Random.extend({
//   custLabel() {
//     var custLabels = ["自然人", "店主", "员工"];
//     return this.pick(custLabels);
//   }
// });

//客户列表
Mock.mock("/cust/list", "post", {
    code: 200,
    data: {
        total: 40,
        pageSize: 10,
        pageNum: 1,
        "list|10": [
            {
                "id|+1": 1,
                idNo: "@ID", //随机身份证号
                name: "@cname", //中文名
                phoneNo: /^1[385][1-9]\d{8}/, //手机号
                createDate: "@date", //创建日期
                "custLabel|1": ["自然人", "店主", "员工"], //用户标签
                "custSource|1": ["APP注册", "公众号注册", "H5注册"] //用户来源
            }
        ]
    }
});

//批量调额列表
Mock.mock("/batchAmt/list", "post", {
    code: 200,
    data: {
        total: 30,
        pageSize: 10,
        pageNum: 1,
        "list|10": [
            {
                "id|+1": 1,
                idNo: "@ID",
                name: "@cname",
                "proName|1": ["榕易贷", "轻松贷"],
                dotOrgan: "@region",
                cardNo: /^([1-9]{1})(\d{14}|\d{18})$/,
                beforeAmt: /^(2\d{3}|[3-9]{1}\d{3})$/,
                afterAmt: /^(2\d{3}|[3-9]{1}\d{3})$/,
                grantDate: "@date",
                importTime: "@dateTime",
                importNo: /[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}/
            }
        ]
    }
});
