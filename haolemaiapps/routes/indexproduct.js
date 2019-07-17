/**
 * Created by web on 2019/6/15.
 */
//引入模块11111111111111111
const express=require('express');
//express创建首页产品路由  product首页路由  看能不能改为index
var index=express.Router();
//引入连接池
var pool=require('../pool/pool.js');

   //获取首页传回数据，首页轮播图  导航产品轮播图11111111111111111111555555
      index.get("/",(req,res)=>{
            var sql=`SELECT * FROM wy_index_carousel where seq_recommended!=0 ORDER BY seq_recommended`;
        pool.query(sql,[],(err,result)=>{
            if(err){
            console.log(err);
            res.send({code:0});
        }else{
            res.send(result);
        }
        })
        })

      //首页品牌制造商   可以写在上面一次性请求1111111111111
        index.get("/brand",(req,res)=>{
            var j=req.query.j
            console.log(j);
            var sql=`SELECT * FROM index_shangpin where amount=?`;
        pool.query(sql,[j],(err,result)=>{
            if(err){
            console.log(err);
            res.send({code:0});
        }else{
            res.send(result);
           
        }
        })
        })
    //分类商品主页列表
        index.get("/fenlei",(req,res)=>{
           var j=req.query.j;
            var sql="SELECT * FROM index_fenlei where biaoji=?";
            pool.query(sql,[j],(err,result)=>{
                if(err){
                   // console.log(err);
                    res.send({code:0});
                }else{
                    res.send(result);
                  // console.log(result);
                }
            })
        })
    //商品列表，分页显示
        index.get("/commlist",(req,res)=>{
            var pno =req.query.pno;
            var ps=req.query.pageSize;
            //设置默认值
            if(!pno){pno=1}
            if(!ps){ps=4}
            //第一个sql语句，当前语句
            var obj={code:1,msg:"查询成功"}
            var sql="SELECT id,paixu,biaoji,img_url,title1,title2,price1,price2 FROM shangpin_list LIMIT ?,?";
            var off=(pno-1)*ps;
            ps=parseInt(ps);//转换成整数
            pool.query(sql,[off,ps],(err,result)=>{
                if(err) throw err;
                obj.data=result;//强行赋值
                var sql="SELECT count(*) AS c FROM shangpin_list";
                pool.query(sql,(err,result)=>{
                    if(err) throw err;
                    //查询得到的是result[{c:?}]
                    var pc=Math.ceil(result[0].c/ps);//计算当页内容
                    obj.pc=pc;
                    res.send(obj);
                    console.log(pc);
                })
            })
        })


//lalalalalala
//导出首页数据路由   /index
module.exports=index;