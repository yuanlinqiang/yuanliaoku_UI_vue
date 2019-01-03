<style scoped>
    .text-align-right {
    	text-align:right;
	}
	.margin-top-10 {
		margin-top:10px;
	}
	button {
		margin-right:5px;
	}
</style>
<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                	<p slot="title">
                        <Icon type="ios-alert"></Icon> 人民管理
                    </p>
                    <Row>
	                    <i-col span="12">
							<Button type="info" icon="md-add" @click="handleEdit('add')">新增</Button> 
					        <Button type="success" icon="ios-hammer"  @click="handleEdit('edit')">修改</Button> 
					        <Button type="error" icon="md-close" @click="handleDelete()">删除</Button> 
					        <Button type="primary" icon="ios-arrow-down" @click="handleExpexcel()">导出到Excel</Button> 
					        <Upload action="http://localhost:8001/corpora-server/address/impexcel" :before-upload="handleImpexcelBeforeUpload" :on-success="handleImpexcelSuccess"
								:format="['xls','xlsx','csv']" :max-size="4096" :on-format-error="handleImpexcelFormatError" :on-exceeded-size="handleImpexcelMaxSize"
		        				:show-upload-list="false" style="display:inline-block;width:58px;">
	        					<Button type="warning" icon="ios-arrow-up" :loading="impexcel_loading">从Excel导入</Button>
    						</Upload>
						</i-col>
	                    <i-col span="12" class="text-align-right">
							<Input v-model="table.keywords" placeholder="请输入搜索内容..." style="width: 200px" />
	                        <span @click="handleSearch(1)" style="margin: 0 10px;"><Button type="primary" icon="ios-search">搜索</Button></span> 
	                        <Button @click="handleCancel" icon="md-shuffle">清除</Button>
							<Button @click="handleDeleteAll()" icon="ios-close-circle-outline">删除所有数据</Button>
						</i-col>
                    </Row>
                    <Row class="margin-top-10">
	                    <Table stripe border ref="selection" :columns="columns" :data="data" :loading="table.loading" @on-selection-change="saveSelection" @on-sort-change="changeSort"></Table>
                    </Row>
                    <Row class="margin-top-10">
                    	<Page @on-change="changePage" @on-page-size-change="changePageSize" :current="page.current" :total="page.total" :page-size="page.pagesize" :page-size-opts="page.pagesizeopts" show-total show-elevator show-sizer></Page>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: 'person-manage',
    data () {
        return {
            delete_comfirm_loading:false,
            impexcel_loading:false,
        	table: {
        		loading:true,
        		selection:[],
        		keywords: ''
        	},
        	page: {
        		total: 100,
                current: 1,
                pagesize: 10,
                pagesizeopts: [10, 25, 50, 100],
                //原代码为  key: 'username', 但不符合通用规则,修改成id为key,如有需要可以改正
                key: 'id',
                order: 'desc' 
            },
            columns: [
				{
					key: 'id',
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					key: 'sn',
					title: '序号',
					width: 100,
					sortable: 'custom'
				},
				{
					key: 'name',
					title: '地点名称',
					sortable: 'custom'
				},
				{
					key: 'area',
					title: '网站指向地区',
					sortable: 'custom'
				},
				{
					key: 'datasource',
					title: '数据来源',
					sortable: 'custom'
				},
				{
					key: 'linename',
					title: '所属栏目',
					sortable: 'custom'
				},
				// {
				// 	key: 'islabel',
				// 	title: '是否标注',
				// 	sortable: 'custom'
				// },
				{
                        title: '是否标注',
                        key: 'islabel',
						 align: 'center',
                        render:(h,params)=>{
                          let tmpStr = "";
                          if(params.row.islabel=='是'){
                            tmpStr="是";
                          }else if(params.row.islabel=='否'){
                            tmpStr="否";
                          }
                          return h('span',{
                              style:{
                                 color: (params.row.islabel=='是')?"red":(params.row.islabel=='否'?"#0280ff":"yellow")
                              }
                          },tmpStr)
                        }
                    },
				{
					key: 'type',
					title: '分类',
					sortable: 'custom'
				},
				{
					key: 'createtime',
					title: '创建时间',
					sortable: 'custom'
				},
				{
					key: 'labeltime',
					title: '标注时间',
					sortable: 'custom'
				},
				{
					key: 'labeltor',
					title: '标注人',
					sortable: 'custom'
				},
				{
					key: 'remark',
					title: '备注',
					sortable: 'custom'
				},
			],
            data: []
        };
    },
    methods: {
		...mapMutations([
		'addTag'
		]),
     	saveSelection (selection){
        	this.table.selection = selection;
        },
     	handleDeleteAll (){
			let self = this;
			this.$Modal.confirm({
				loading:true,
				title:'数据删除操作确认',
				content:'<p>确认删除所有的地点名称？</p>',
				onOk: function(){
					let modal = this;
					let selection = self.table.selection;
					self.$axios.delete('http://localhost:8001/corpora-server/address/deleteAll', {}, {
						headers: {
							"Content-Type":"application/json;charset=utf-8"
						},
					}).then(function(response) {
						modal.remove();
						self.$Message.warning('数据删除成功!');
						self.handleSearch();
					}).catch( function(response) {
						console.log(response)
					});
				}
			});
        },
		
        handleSearch (topage) {
           	let self = this;
        	let pagesize = this.page.pagesize;
        	if(topage) this.page.current = topage;
        	let current = this.page.current-1;
        	let key = this.page.key;
        	let order = this.page.order;
        	let sort = key + ',' + order;//排序
        	if(order=='normal'){key = '';order = '';sort='';}
        	let keywords = this.table.keywords;
			this.table.loading = true;//loading效果
			self.$axios.get('http://localhost:8001/corpora-server/address/pagedata?page='+current+'&size='+pagesize+'&sort='+sort+'&keywords='+keywords, {}, {}
				).then(function(response) {
				console.log(response)
		    	self.table.loading = false;//取消loading效果
		        if(response.data.totalElements>0) {
		        	self.page.total = response.data.totalElements;
		        	self.data = response.data.content;
		        }else{
		        	self.page.total = 0;
		        	self.data = [];
		        }
		    }).catch( function(response) {
		       	console.log(response)
		    });
        },
        handleCancel () {
        	this.table.keywords = '';
            this.handleSearch();
        },
        handleEdit (type){
        	if(type=='add'){
				const route = {name: 'address-edit',query: {id: '',refresh:true}}
				this.addTag({route: route,type: 'push'})
				this.$router.push(route)
        	}else if(type=='edit'){
	        	let selection = this.table.selection;
	        	if(selection.length==0) this.$Message.warning('您尚未选择一行数据!');
	        	if(selection.length>1) this.$Message.warning('您选择了'+selection.length+'行数据，请取消选择其中的'+(selection.length-1)+'行!');
	            if(selection.length==1){
		            const route = {name: 'address-edit',query: {id: selection[0].id,refresh:true}}
					this.addTag({route: route,type: 'push'})
					this.$router.push(route)
	            }
        	}
        },
        handleSelectAll (status) {
            this.$refs.selection.selectAll(status);
        },
        changePage(current){
        	//if(!current) current=1;
        	this.page.current = current;
			this.handleSearch();
        },
        changePageSize(pagesize){
        	this.page.pagesize = pagesize;
			this.handleSearch();
        },
        changeSort(column){
	        this.page.key = column.key;
	        this.page.order = column.order;
        	this.handleSearch();
        },
        handleExpexcel(){
        	let key = this.page.key;
        	let order = this.page.order;
        	let sort = key + ',' + order;//排序
        	if(order=='normal'){key = '';order = '';}
        	let keywords = this.table.keywords;
        	window.location.href='http://localhost:8001/corpora-server/address/expexcel?sort='+sort+'&keywords='+keywords;
        },
        handleImpexcelSuccess(response, file){
        	this.impexcel_loading = false;
        	if(response.ok){
        		this.$Message.success('数据导入成功!');
	        	this.handleSearch();
        	}else{
		    	this.$Modal.error({title: '导入失败',content: response.msg});
        	}
        },
        handleImpexcelFormatError(file) {
            this.$Notice.warning({
                title: '文件类型有误',
                desc: '文件： ' + file.name + ' 格式有误, 请选择‘xls’，‘xlsx’或‘csv’格式的文件.'
            });
        },
        handleImpexcelMaxSize (file) {
            this.$Notice.warning({
                title: '文件过大',
                desc: '文件： ' + file.name + ' 过大, 上传文件最大不能超过 4M.'
            });
        },
        handleImpexcelBeforeUpload(){
        	this.impexcel_loading = true;
        },
        handleDelete(){
        	let self = this;
        	let selection = this.table.selection;
        	if(selection.length==0) this.$Message.warning('您尚未选择一行数据!');
        	if(selection.length>0){
        		this.$Modal.confirm({
        			loading:true,
        			title:'删除操作确认',
        			content:'<p>数据删除后不可恢复，要继续删除操作吗？</p>',
        			onOk: function(){
        				let modal = this;
			        	let selection = self.table.selection;
			        	let urlids = '',flag = '';
			        	for(let i=0;i<selection.length;i++){
			        		urlids += flag + selection[i].id;
			        		flag = ',';
			        	}
			        	self.$axios.delete('http://localhost:8001/corpora-server/address/delete?urlids='+urlids, {}, {
					    	headers: {
					        	"Content-Type":"application/json;charset=utf-8"
					       	},
					    }).then(function(response) {
					    	modal.remove();
					    	self.$Message.warning('删除成功!');
					        self.handleSearch();
					    }).catch( function(response) {
					       	console.log(response)
					    });
        			}
        		});
        	}
        }
    },
    mounted () {
        //分页会自动触发changePageSize方法 注释下面代码以防止重复刷新
		this.handleSearch();
    },
    watch: {
        '$route' (to) {
        	//监听强制刷新列表指令，表单保存后跳转到列表TAB页，列表自动刷新
            if(to.name=='address-manage' && to.query && to.query.refresh){
            	delete to.query.refresh;
            	this.handleSearch();
            }
        }
    }
};
</script>