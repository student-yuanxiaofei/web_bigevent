// 注意每次调用 $.get() 或 $.post() 或 $.ajax() 的时候 会先调用这个函数ajaxPrefilter  
// 在这个函数中，我们可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
    console.log(options.url);
    // 再发起真正的Ajax请求之前，统一拼接请求的根路径 
    options.url='http://api-breakingnews-web.itheima.net'+options.url
})