/**
 * Created by yy on 2018/3/7.
 */
/*import Cookies from 'js-cookie'*/

export default {
  install (Vue, options) {
    Vue.prototype.dateTime = {
      year(dateTime){
        let date=new Date(dateTime*1000);
        var Y = date.getFullYear() ;
        return Y;
      },
      month(dateTime){
        let date=new Date(dateTime*1000);
        var M = date.getMonth()+1;
        if(M<10){M='0'+M;}
        return M;
      },
      day(dateTime){
        let date=new Date(dateTime*1000);
        var D = date.getDate() ;
        if(D<10){D='0'+D;}
        return D;
      },
      hour(dateTime){
        let date=new Date(dateTime*1000);
        var H=date.getHours();
        if(H<10){H='0'+H;}
        return H;
      },
      minute(dateTime){
        let date=new Date(dateTime*1000);
        var I=date.getMinutes();
        if(I<10){I='0'+I;}
        return I;
      },
      second(dateTime){
        let date=new Date(dateTime*1000);
        var S=date.getSeconds();
        if(S<10){S='0'+S;}
        return S;
      },
      ymdHis(dateTime){
        let date=new Date(dateTime*1000);
        var Y = date.getFullYear() ;
        var M = date.getMonth()+1;
        var D = date.getDate() ;
        var H=date.getHours();
        var I=date.getMinutes();
        var S=date.getSeconds();
        if(S<10){S='0'+S;}
        if(I<10){I='0'+I;}
        if(H<10){H='0'+H;}
        if(D<10){D='0'+D;}
        if(M<10){M='0'+M;}
        return Y+'-'+M+'-'+D+' '+H+':'+I+':'+S;
      },
      ymd(dateTime){
        let date=new Date(dateTime*1000);
        var Y = date.getFullYear() ;
        var M = date.getMonth()+1;
        var D = date.getDate() ;
        if(D<10){D='0'+D;}
        if(M<10){M='0'+M;}
        return Y+'-'+M+'-'+D;
      }
    }
    Vue.prototype.mainConfig = {
      // 主要 API 接口地址
      apiUrl: 'https://www.easy-mock.com/mock/5c74b366e4782d132ff56e22/vue',
      imgUrl: '',
      /*apiUrl:'http://dlsdyrmyy.yn4.chuanhai.net/api/web/v1',
      imgUrl:'http://dlsdyrmyy.yn4.chuanhai.net/frontend/web',*/
      // 获得HTTP设置头部
      httpConfig () {
        let heardsObj = {
          /*headers: {
            JOKE: 'dalishi!',
            Device: 'deviceunique'
          }*/
          headers: {}
        };
        return heardsObj
      }
    }
  }
}



// WEBPACK FOOTER //
// ./src/library/config/MainConfig.js
