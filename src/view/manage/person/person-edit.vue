<template>
    <Row>
    	<Col span="24">
	    	<Card>
	    		<p slot="title">
	                <Icon type="ios-alert"></Icon> 人民信息编辑
	            </p>
			    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
					<FormItem label="姓名" prop="name">
						<Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
			        </FormItem>
					<FormItem label="年龄" prop="age">
						<Input v-model="formValidate.age" placeholder="请输入年龄"></Input>
			        </FormItem>
					<FormItem label="工作" prop="work">
						<Input v-model="formValidate.work" placeholder="请输入工作"></Input>
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
    	name: 'person-edit',
        data () {
            return {
            	save_loading:false,
                formValidate: {
					name: ''
					,age: ''
					,work: ''
                },
                ruleValidate: {
					name: [
						{ required: true, message: '姓名不能为空', trigger: 'blur'  }
					]
					,
					age: [
						{ required: true, message: '年龄不能为空', trigger: 'blur'  }
					]
					,
					work: [
						{ required: true, message: '工作不能为空', trigger: 'blur'  }
					]
                }
            }
        },
        methods: {
        	handleInit (){
        		let self = this;
        		self.$Message.info('正在努力加载数据...');
	        	let personid = this.$route.query.id.toString();
	        	if(personid && personid.length>0){
		        	self.$axios.get('http://localhost:8001/corpora-server/person/singledata?personid='+personid, {}, {
				    	headers: {
				        	"Content-Type":"application/json;charset=utf-8"
				       	}
				    }).then(function(response) {
				  		self.formValidate.name = response.data.name;//姓名
				  		self.formValidate.age = response.data.age;//年龄
				  		self.formValidate.work = response.data.work;//工作
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
						param.append('name',self.formValidate.name);//姓名						
						param.append('age',self.formValidate.age);//年龄						
						param.append('work',self.formValidate.work);//工作  application/x-www-form-urlencoded
						self.$axios.post('http://localhost:8001/corpora-server/person/save', param, {}
						).then(function(response) {
					    	self.save_loading = false;
				        	self.$router.push({
				                name: 'person-manage',
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
	            if(to.name=='person-edit' && to.query && to.query.refresh){
	            	delete to.query.refresh;
	            	this.handleInit();
	            }
	        }
	    }
    }
</script>