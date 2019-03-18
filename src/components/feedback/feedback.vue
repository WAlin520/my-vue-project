<template>
    <div class="feedback-contain">
        <header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<button id="submit" class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">发送</button>
			<h1 class="mui-title">问题反馈</h1>
		</header>
		<div class="mui-content">
			<div class="mui-content-padded">
				<div class="mui-inline">问题和意见</div>
				<a class="mui-pull-right mui-inline" href="#popover">
					快捷输入
					<span class="mui-icon mui-icon-arrowdown"></span>
				</a>
				<!--快捷输入具体内容，开发者可自己替换常用语-->
				<div id="popover" class="mui-popover">
					<div class="mui-popover-arrow"></div>
					<div class="mui-scroll-wrapper">
						<div class="mui-scroll">
							<ul class="mui-table-view">
								<!-- 仅流应用环境下显示 -->
								<li class="mui-table-view-cell stream">
									<a href="#">桌面快捷方式创建失败</a>
								</li>
								<li class="mui-table-view-cell"><a href="#">界面显示错乱</a></li>
								<li class="mui-table-view-cell"><a href="#">启动缓慢，卡出翔了</a></li>
								<li class="mui-table-view-cell"><a href="#">偶发性崩溃</a></li>
								<li class="mui-table-view-cell"><a href="#">UI无法直视，丑哭了</a></li>
							</ul>
						</div>
					</div>
				</div> 
			</div>
			<div class="row mui-input-row">
				<textarea id='question' class="mui-input-clear question" placeholder="请详细描述你的问题和意见..."></textarea>
			</div>
	        	<!-- <p>图片(选填,提供问题截图,总大小10M以下)</p>
			<div id='image-list' class="row image-list">
                <div class="image-item space">
                    <div class="image-close" id="img-1">X</div><div class="image-up"></div>
                    <div class="file" id="image-1"></div>
                </div>
            </div> -->
			<p>QQ/邮箱</p>
            <div class="mui-input-row">
                <input id='contact' type="text" class="mui-input-clear contact" placeholder="(选填,方便我们联系你 )" />
			</div>
			<div class="mui-content-padded">
				<div class="mui-inline">应用评分</div>
                    <div class="icons mui-inline" style="margin-left: 6px;">
                        <i data-index="1" class="mui-icon mui-icon-star"></i>
                        <i data-index="2" class="mui-icon mui-icon-star"></i>
                        <i data-index="3" class="mui-icon mui-icon-star"></i>
                        <i data-index="4" class="mui-icon mui-icon-star"></i>
                        <i data-index="5" class="mui-icon mui-icon-star"></i>
                    </div>
            </div><br /> 
        </div>
    </div>
</template>

<script>

import mui from '../../lib/mui/js/mui.min.js'
import  '../../lib/mui/css/feedback.css'
// import '../../lib/mui/js/feedback.js'



export default {
    name: "feedback",
    mounted(){
        // mui.init();
		// mui('.mui-scroll-wrapper').scroll(); 
		this.muiFeedback();
	// 	mui('.mui-popover').on('tap','li',function(e){
	// 		document.getElementById("question").value = document.getElementById("question").value + this.children[0].innerHTML;
	// 		mui('.mui-popover').popover('toggle')
	// 	});
	// 	//应用评分 
	// 	mui('.icons').on('tap','i',function(){
	//   	var index = parseInt(this.getAttribute("data-index"));
	//   	var parent = this.parentNode;
	//   	var children = parent.children;
	//   	if(this.classList.contains("mui-icon-star")){
	//   		for(var i=0;i<index;i++){
  	// 			children[i].classList.remove('mui-icon-star');
  	// 			children[i].classList.add('mui-icon-star-filled');
	//   		}
	//   	}else{
	//   		for (var i = index; i < 5; i++) {
	//   			children[i].classList.add('mui-icon-star')
	//   			children[i].classList.remove('mui-icon-star-filled')
	//   		}
	//   	}
	//   	starIndex = index;
	// });
	},
	methods:{
		muiFeedback(){
			var index = 1;
			var size = null;
			var imageIndexIdNum = 0;
			var starIndex = 0;
			var feedback = {
				question: document.getElementById('question'), 
				contact: document.getElementById('contact'), 
				imageList: document.getElementById('image-list'),
				submitBtn: document.getElementById('submit')
			};
			var url = 'https://service.dcloud.net.cn/feedback';
			feedback.files = [];
			feedback.uploader = null;  
			feedback.deviceInfo = null; 
			mui.plusReady(function() {
				//设备信息，无需修改
				feedback.deviceInfo = {
					appid: plus.runtime.appid, 
					imei: plus.device.imei, //设备标识
					images: feedback.files, //图片文件
					p: mui.os.android ? 'a' : 'i', //平台类型，i表示iOS平台，a表示Android平台。
					md: plus.device.model, //设备型号
					app_version: plus.runtime.version,
					plus_version: plus.runtime.innerVersion, //基座版本号
					os:  mui.os.version,
					net: ''+plus.networkinfo.getCurrentType()
				}
			});

			/**
			*提交成功之后，恢复表单项 
			*/
			feedback.clearForm = function() {
				feedback.question.value = '';
				feedback.contact.value = '';
				feedback.imageList.innerHTML = '';
				feedback.newPlaceholder();
				feedback.files = [];
				index = 0;
				size = 0;
				imageIndexIdNum = 0;
				starIndex = 0;
				//清除所有星标
				mui('.icons i').each(function (index,element) {
					if (element.classList.contains('mui-icon-star-filled')) {
						element.classList.add('mui-icon-star')
						element.classList.remove('mui-icon-star-filled')
					}
				})
			};
			feedback.getFileInputArray = function() {
				return [].slice.call(feedback.imageList.querySelectorAll('.file'));
			};
			feedback.addFile = function(path) {
				feedback.files.push({name:"images"+index,path:path,id:"img-"+index});
				index++;
			};


			/**
			* 初始化图片域占位
			*/
		/*	feedback.newPlaceholder = function() {
				var fileInputArray = feedback.getFileInputArray();
				if (fileInputArray &&
					fileInputArray.length > 0 &&
					fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
					return;
				};
				imageIndexIdNum++;
				var placeholder = document.createElement('div');
				placeholder.setAttribute('class', 'image-item space');
				var up = document.createElement("div");
				up.setAttribute('class','image-up')
				//删除图片
				var closeButton = document.createElement('div');
				closeButton.setAttribute('class', 'image-close');
				closeButton.innerHTML = 'X';
				closeButton.id = "img-"+index;
				//小X的点击事件
				closeButton.addEventListener('tap', function(event) {
					setTimeout(function() {
						for(var temp=0;temp<feedback.files.length;temp++){
							if(feedback.files[temp].id==closeButton.id){
								feedback.files.splice(temp,1);
							}
						}
						feedback.imageList.removeChild(placeholder);
					}, 0);
					return false;
				}, false);
				
			//
			var fileInput = document.createElement('div');
			fileInput.setAttribute('class', 'file');
			fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
			fileInput.addEventListener('tap', function(event) {
				var self = this;
				var index = (this.id).substr(-1);
				
				plus.gallery.pick(function(e) {
	//				console.log("event:"+e);
					var name = e.substr(e.lastIndexOf('/') + 1);
					console.log("name:"+name);
						
					plus.zip.compressImage({
						src: e,
						dst: '_doc/' + name,
						overwrite: true,
						quality: 50
					}, function(zip) {
						size += zip.size  
						console.log("filesize:"+zip.size+",totalsize:"+size);
						if (size > (10*1024*1024)) {
							return mui.toast('文件超大,请重新选择~');
						}
						if (!self.parentNode.classList.contains('space')) { //已有图片
							feedback.files.splice(index-1,1,{name:"images"+index,path:e});
						} else { //加号
							placeholder.classList.remove('space');
							feedback.addFile(zip.target);
							feedback.newPlaceholder();
						}
						up.classList.remove('image-up');
						placeholder.style.backgroundImage = 'url(' + zip.target + ')';
					}, function(zipe) {
						mui.toast('压缩失败！')
					});	
					}, function(e) {
						mui.toast(e.message);
					},{});
				}, false);
				placeholder.appendChild(closeButton);
				placeholder.appendChild(up);
				placeholder.appendChild(fileInput);
				feedback.imageList.appendChild(placeholder);
			};
			feedback.newPlaceholder();*/
			feedback.submitBtn.addEventListener('tap', function(event) {
				if (feedback.question.value == '' ||
					(feedback.contact.value != '' &&
						feedback.contact.value.search(/^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+)|([1-9]\d{4,9})$/) != 0)) {
					return mui.toast('信息填写不符合规范');
				}
				if (feedback.question.value.length > 200 || feedback.contact.value.length > 200) {
					return mui.toast('信息超长,请重新填写~')
				}
				//判断网络连接
				if(plus.networkinfo.getCurrentType()==plus.networkinfo.CONNECTION_NONE){
					return mui.toast("连接网络失败，请稍后再试");
				}
				feedback.send(mui.extend({}, feedback.deviceInfo, {
					content: feedback.question.value,
					contact: feedback.contact.value,
					images: feedback.files,
					score:''+starIndex
				})) 
			}, false)
			feedback.send = function(content) {
				feedback.uploader = plus.uploader.createUpload(url, {
					method: 'POST'
				}, function(upload, status) {
		//			plus.nativeUI.closeWaiting()
					console.log("upload cb:"+upload.responseText);
					if(status==200){
						var data = JSON.parse(upload.responseText);
						//上传成功，重置表单
						if (data.ret === 0 && data.desc === 'Success') {
		//					mui.toast('反馈成功~') 
							console.log("upload success");
		//					feedback.clearForm();
						}
					}else{
						console.log("upload fail");
					}
					
				});
				//添加上传数据
				mui.each(content, function(index, element) {
					if (index !== 'images') {
						console.log("addData:"+index+","+element);
		//				console.log(index);
						feedback.uploader.addData(index, element)
					} 
				});
				//添加上传文件
				mui.each(feedback.files, function(index, element) {
					var f = feedback.files[index];
					console.log("addFile:"+JSON.stringify(f));
					feedback.uploader.addFile(f.path, {
						key: f.name
					});
				});
				//开始上传任务
				feedback.uploader.start();
				mui.alert("感谢反馈，点击确定关闭","问题反馈","确定",function () {
					feedback.clearForm();
					mui.back();
				});
		//		plus.nativeUI.showWaiting();
			};
			

			//应用评分
			mui('.icons').on('tap','i',function(){
				var index = parseInt(this.getAttribute("data-index"));
				var parent = this.parentNode;
				var children = parent.children;
				if(this.classList.contains("mui-icon-star")){
					for(var i=0;i<index;i++){
						children[i].classList.remove('mui-icon-star');
						children[i].classList.add('mui-icon-star-filled');
					}
				}else{
					for (var i = index; i < 5; i++) {
						children[i].classList.add('mui-icon-star')
						children[i].classList.remove('mui-icon-star-filled')
					}
				}
				starIndex = index;
			});

			//选择快捷输入
			mui('.mui-popover').on('tap','li',function(e){
				document.getElementById("question").value = document.getElementById("question").value + this.children[0].innerHTML;
				mui('.mui-popover').popover('toggle')
			}) 
		}
	}
}
</script>

<style lang="less" scoped>
.mui-bar-nav {
    top: 40px;;
}
// *{
//     touch-action: pan-x;
// }

</style>


