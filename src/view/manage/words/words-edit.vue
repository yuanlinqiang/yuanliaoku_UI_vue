<template>
    <Row>
    	<Col span="24">
	    	<Card>
	    		<p slot="title">
	                <Icon type="ios-alert"></Icon> 数据爬取编辑
	            </p>
			    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
					<FormItem label="词性" prop="wordsnature">
						<Input v-model="formValidate.wordsnature" placeholder="请输入词性名称"></Input>
			        </FormItem>
					<FormItem label="词汇" prop="wordsname">
						<Input v-model="formValidate.wordsname" placeholder="请输入词汇名称"></Input>
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
    	name: 'words-edit',
        data () {
            return {
            	save_loading:false,
                formValidate: {
					wordsnature: '',
					wordsname: '',
				
                },
                ruleValidate: {
					wordsnature: [
						{ required: true, message: '词性不能为空', trigger: 'blur'  }
					],
					wordsname: [
						{ required: true, message: '词汇不能为空', trigger: 'blur'  }
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
		        	self.$axios.get('http://localhost:8001/corpora-server/words/singledata?id='+id, {}, {
				    	headers: {
				        	"Content-Type":"application/json;charset=utf-8"
				       	}
				    }).then(function(response) {
				  		self.formValidate.wordsnature = response.data.wordsnature.toString();//姓名
				  		self.formValidate.wordsname = response.data.wordsname;//姓名
				  		
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
						param.append('wordsnature',self.formValidate.wordsnature);//姓名		
						param.append('wordsname',self.formValidate.wordsname);//姓名		
					
						console.log("保存的数据信息+++++++++++++++" + self.formValidate.wordsnature);	
						console.log("保存的数据信息+++++++++++++++" + self.formValidate.wordsname);				
						self.$axios.post('http://localhost:8001/corpora-server/words/save', param, {}
						).then(function(response) {
					    	self.save_loading = false;
				        	self.$router.push({
				                name: 'words-manage',
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
	            if(to.name=='words-edit' && to.query && to.query.refresh){
	            	delete to.query.refresh;
	            	this.handleInit();
	            }
	        }
	    }
    }
</script>