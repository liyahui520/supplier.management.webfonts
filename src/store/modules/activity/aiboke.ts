import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import AiBoKe from '../../entities/activity/aiboke'
import api from '@/lib/api'

interface AiBoKeState extends ListState<AiBoKe>{ 
    AiBoKeData:any,
    aibokeInfo:AiBoKe,
    score: 0,
    cardList: any
}
class AiBoKeModule extends ListModule<AiBoKeState,any,AiBoKe>{
    state= {
        totalCount:0,
        currentPage:1,
        pageSize:10,
        score: 0,
        cardList: new Array(),
        list: new Array(),
        loading:false
    }
    actions={
       /**
       * 获取爱波克活动数据
       * @param context 
       * @param payload 
       */
        async GetAiBokeAitivity(context:ActionContext<AiBoKeState,any>,payload:any) {
            let respose = await api.AiBoKe.GetAiBokeAitivity(payload); 
            context.state.list=(respose as any).data.result;
            return (respose as any).data.result;
        },
        /**
         * 获取爱波克活动列表
         * @param context 
         * @param payload 
         */
        async GetProduct(context:ActionContext<AiBoKeState,any>,payload:any) {
            let respose = await api.AiBoKe.GetProduct(payload);
            context.state.score = (respose as any).data.result.score;
            (respose as any).data.result.products.forEach((v, k) => {
                v['num'] = 0
            });
            context.state.cardList=(respose as any).data.result.products;
            
        },
        /**
         * 获取爱波克活动列表
         * @param context 
         * @param payload 
         */
        async PayActity(context:ActionContext<AiBoKeState,any>,payload:any) {
            await api.AiBoKe.PayActity(payload); 
            let respose = await api.AiBoKe.GetAiBokeAitivity(payload); 
            context.state.list=(respose as any).data.result;
            let respose1 = await api.AiBoKe.GetProduct(payload);
            context.state.score = (respose1 as any).data.result.score;
            (respose1 as any).data.result.products.forEach((v, k) => {
                v['num'] = 0
            });
            context.state.cardList=(respose1 as any).data.result.products;
        },
        /**
       * 获取爱波克列表数据
       * @param context 
       * @param payload 
       */
      async GetAiBoKePageList(context:ActionContext<AiBoKeState,any>,payload:any) {
        let respose = await api.AiBoKe.GetAiBoKePageList(payload); 
        context.state.loading=true;
        context.state.list=(respose as any).data.result.result;
        context.state.loading=false;
        context.state.totalCount=(respose as any).data.result.totalCount;
    },
    /**
       * 更新爱波克活动信息
       * @param context 
       * @param payload 
       */
    async UpdateAiBoKeInfo(context:ActionContext<AiBoKeState,any>,payload:any) {
        await api.AiBoKe.UpdateAiBoKeInfo(payload); 
    },
    /**
       * 获取爱波克详细信息
       * @param context 
       * @param payload 
       */
      async GetAiBoKeInfoById(context:ActionContext<AiBoKeState,any>,payload:any) {
        let respose = await api.AiBoKe.GetAiBoKeInfoById(payload); 
        var info= (respose as any).data.result;
        return info;
    },
    /**
       * 删除爱波克基本信息
       * @param context 
       * @param payload 
       */
      async DeleteAiBoKeActivity(context:ActionContext<AiBoKeState,any>,payload:any) {
        await api.AiBoKe.DeleteAiBoKeActivity(payload); 
    }
    };
    mutations={
        //设置当前页
        setCurrentPage(state:AiBoKeState,page:number){
            state.currentPage=page;
        },
        //设置页容量
        setPageSize(state:AiBoKeState,pagesize:number){
            state.pageSize=pagesize;
        }
    }
}
const aiBoKeModule=new AiBoKeModule();
export default aiBoKeModule;