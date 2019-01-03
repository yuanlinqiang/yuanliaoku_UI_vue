<template>
    <Row>
    	<Col span="24">
	    	<Card>
	    		<p slot="title">
	                <Icon type="ios-alert"></Icon> 数据爬取编辑
	            </p>
			    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
					<FormItem label="序号" prop="sn">
						<Input v-model="formValidate.sn" placeholder="请输入序号"></Input>
			        </FormItem>
					<FormItem label="人物名称" prop="name">
						<Input v-model="formValidate.name" placeholder="请输入人物名称"></Input>
			        </FormItem>
					<FormItem label="网站指向地区" prop="area">
						<Input v-model="formValidate.linename" placeholder="请输入所属地区"></Input>
			        </FormItem>
					<FormItem label="数据来源" prop="datasource">
						<Input v-model="formValidate.datasource" placeholder="请输入数据来源"></Input>
			        </FormItem>
					<FormItem label="所属栏目" prop="linename">
						<Input v-model="formValidate.linename" placeholder="请输入所属栏目"></Input>
			        </FormItem>
					<FormItem label="是否标注" prop="islabel">
						<Input v-model="formValidate.islabel" placeholder="请输入是否标注"></Input>
			        </FormItem>
					<FormItem label="分类" prop="type">
						<Input v-model="formValidate.type" placeholder="分类"></Input>
			        </FormItem>
					<FormItem label="标注人" prop="labeltor">
						<Input v-model="formValidate.labeltor" placeholder="请输入标注人"></Input>
			        </FormItem>
					<FormItem label="备注" prop="remark">
						<Input v-model="formValidate.remark" placeholder="请输入备注"></Input>
			        </FormItem>
					
					<FormItem>
			            <Button type="primary" @click="handleSubmit('formValidate')" :loading="save_loading">保存</Button>
			            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
			        </FormItem>
		        </Form>
	        </Card>
        </Col>
    </Row>
</template>
<script>
	import axios from 'axios'
    export default {
    	name: 'address-edit',
        data () {
            return {
            	save_loading:false,
                formValidate: {
					sn: '',
					name: '',
					linename: '',
					area: '',
					datasource: '',
					islabel: '',
					type: '',
					labeltor: '',
					remark: '',
				
                },
                ruleValidate: {
					sn: [
						{ required: false, message: '序号不能为空', trigger: 'blur'  }
					],
					name: [
						{ required: false, message: '网站名称不能为空', trigger: 'blur'  }
					],
					linename: [
						{ required: false, message: '栏目名称不能为空', trigger: 'blur'  }
					],
					area: [
						{ required: false, message: '网站指向地区', trigger: 'blur'  }
					],
					datasource: [
						{ required: false, message: '数据来源不能为空', trigger: 'blur'  }
					],
					islabel: [
						{ required: false, message: '是否标注不能为空', trigger: 'blur'  }
					],
					type: [
						{ required: false, message: '分类不能为空', trigger: 'blur'  }
					],
					labeltor: [
						{ required: false, message: '标注人不能为空', trigger: 'blur'  }
					],
					remark: [
						{ required: false, message: '备注不能为空', trigger: 'blur'  }
					],

                }
            }
        },
        methods: {
        	handleInit (){
        		let self = this;
        		self.$Message.info('正在努力加载数据...');
	        	let id = this.$route.query.id.toString();
	        	if(id && id.length>0){
		        	self.$axios.get('http://localhost:8001/corpora-server/address/singledata?id='+id, {}, {
				    	headers: {
				        	"Content-Type":"application/json;charset=utf-8"
				       	}
				    }).then(function(response) {
				  		self.formValidate.sn = response.data.sn.toString();//姓名
				  		self.formValidate.name = response.data.name;//姓名
				  		self.formValidate.linename = response.data.linename;//姓名
				  		self.formValidate.area = response.data.area;//姓名
				  		self.formValidate.datasource = response.data.datasource;//姓名
				  		self.formValidate.islabel = response.data.islabel;//姓名
				  		self.formValidate.type = response.data.type;//姓名
				  		self.formValidate.labeltor = response.data.labeltor;//姓名
				  		self.formValidate.remark = response.data.remark;//姓名
				  		
				    	self.$Message.success('数据加载成功！');
				    }).catch( function(response) {
				    	self.$Message.error('数据加载失败，情与管理员联系！');
				       	console.log(response)
				    });
	        	}
        	},
            handleSubmit (name) {
            	let self = this;
            	this.save_loading = true;
                this.$refs[name].validate((valid) => {
                    if (valid) {
						let param = new FormData(); //创建form对象
						if(self.$route.query.id) param.append('id',self.$route.query.id.toString());//ID
						param.append('sn',self.formValidate.sn);//姓名		
						param.append('name',self.formValidate.name);//姓名		
						param.append('linename',self.formValidate.linename);//姓名	
						param.append('area',self.formValidate.area);//姓名	
						param.append('datasource',self.formValidate.datasource);//姓名	
						param.append('islabel',self.formValidate.islabel);//姓名	
						param.append('type',self.formValidate.type);//姓名	
						param.append('labeltor',self.formValidate.labeltor);//姓名	
						param.append('remark',self.formValidate.remark);//姓名	
						console.log("保存的数据信息+++++++++++++++" + self.formValidate.url);				
						self.$axios.post('http://localhost:8001/corpora-server/address/save', param, {}
						).then(function(response) {
					    	self.save_loading = false;
				        	self.$router.push({
				                name: 'address-manage',
				                query: {refresh:true}
				            });
					    }).catch( function(response) {
					    	self.$Message.error('保存失败，请检查输入内容!');
					       	console.log(response)
					    });
                    } else {
                    	self.save_loading = false;
                        self.$Message.error('内容验证不通过，请检查输入内容!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
			}
        },
	    mounted () {
	    	this.handleInit();
	    },
	    watch: {
	        '$route' (to) {
	            if(to.name=='address-edit' && to.query && to.query.refresh){
	            	delete to.query.refresh;
	            	this.handleInit();
	            }
	        }
	    }
    }
</script>