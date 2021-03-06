// types.js文件
const _ = require('lodash')
module.exports = _.template(`
//--------------------------- 代码自动生成开始 ----------------------------------------------------------
/*! build time: <%=new Date().toLocaleString()%> */
/*! Author: yhli                                 */
/*! Email: liyahui360@163.com                    */
<%_.each(types, function(items, name){%>
// <%=name%>
  <%_.each(items, function(item){%>
     export const <%=item.name%> = '<%=item.name%>'
  <%})%>
<%})%>
//--------------------------- 代码自动生成结束 ----------------------------------------------------------
`)
