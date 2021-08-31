    $(function(){
        // 点击 “去注册账号的链接”
        $('#link_reg').on('click',function(){
            // 隐藏登录盒子
            $('.login-box').hide()
            // 显示注册盒子
            $('.reg-box').show()
        })


        // 点击“去登陆”的链接
        $('#link_login').on('click',function(){
            $('.reg-box').hide()
            $('.login-box').show()
        })

        // 从layUI 中获取 form对象
        var layer = layui.layer
        var form = layui.form
        // 通过form.verify()函数自定义校验规则
        form.verify({
            pwd: [
                // 自定义了一个名叫pwd 的校验规则
                /^[\S]{6,12}$/
                ,'密码必须6到12位，且不能出现空格'
              ] ,
            //   校验两次密码是否一致的规则
              repwd:function(value) {
                // 通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后再进行一次等于的判断 
                // 如果判断失败，则return一个提示错误的消息即可
                var pwd = $('.reg-box [name=password]').val()
                if(pwd!==value){
                    return '两次密码不一致！'
                }
              }
        })


        // 监听表单的注册时间
        $('#form_reg').on('submit',function(e){
            // 阻止默认的提交行为
            e.preventDefault()
            // 发起Ajax的POST请求
            var date = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
            $.post('/api/reguser',date,function(res){
            if(res.status!==0) {
            //   return console.log(res.message);
            return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            // 模拟人的点击行为
            $('#link_login').click()
            })
        })
        // 监听登陆提交事件
  // 监听登录表单的提交事件
  $('#form_login').submit(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
    })