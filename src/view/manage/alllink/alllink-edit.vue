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
					<FormItem label="网站名称" prop="name">
						<Input v-model="formValidate.name" placeholder="请输入网站名称"></Input>
			        </FormItem>
					<FormItem label="栏目名称" prop="linename">
						<Input v-model="formValidate.linename" placeholder="请输入栏目名称"></Input>
			        </FormItem>
					<FormItem label="子链接地址" prop="url">
						<Input v-model="formValidate.url" placeholder="请输入栏目地址"></Input>
			        </FormItem>
					<FormItem label="网站指向地区" prop="area">
						<Input v-model="formValidate.area" placeholder="请输入所属地区"></Input>
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
    	name: 'alllink-edit',
        data () {
            return {
            	save_loading:false,
                formValidate: {
					sn: '',
					name: '',
					linename: '',
					url: '',
					area: '',
                },
                ruleValidate: {
					sn: [
						{ required: true, message: '序号不能为空', trigger: 'blur'  }
					],
					name: [
						{ required: true, message: '网站名称不能为空', trigger: 'blur'  }
					],
					linename: [
						{ required: true, message: '栏目名称不能为空', trigger: 'blur'  }
					],
					url: [
						{ required: true, message: '栏目地址不能为空', trigger: 'blur'  }
					],
					area: [
						{ required: true, message: '网站指向地区不能为空', trigger: 'blur'  }
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
		        	self.$axios.get('http://localhost:8001/corpora-server/allLink/singledata?id='+id, {}, {
				    	headers: {
				        	"Content-Type":"application/json;charset=utf-8"
				       	}
				    }).then(function(response) {
				  		self.formValidate.sn = response.data.sn.toString();//姓名
				  		self.formValidate.name = response.data.name;//姓名
				  		self.formValidate.linename = response.data.linename;//姓名
				  		self.formValidate.url = response.data.url;//姓名
				  		self.formValidate.area = response.data.area;//姓名
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
						param.append('url',self.formValidate.url);//姓名		
						param.append('area',self.formValidate.area);//姓名		
						console.log("保存的数据信息+++++++++++++++" + self.formValidate.url);				
						self.$axios.post('http://localhost:8001/corpora-server/allLink/save', param, {}
						).then(function(response) {
					    	self.save_loading = false;
				        	self.$router.push({
				                name: 'alllink-manage',
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
	            if(to.name=='alllink-edit' && to.query && to.query.refresh){
	            	delete to.query.refresh;
	            	this.handleInit();
	            }
	        }
	    }
    }
</script>