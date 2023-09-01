
const UserInfo = {
    data() {
        return {
            username: '',
            password: '',
            mail: '',
            mobile: '',
            blogin: false
        }
    },
    methods: {
        checkusername: function () {
            const regex = /^[a-zA-Z0-9_]{4,20}$/;
            let bsuc = regex.test(this.username);
            if (!bsuc)
                alert('用户名格式不正确:长度4-20个字符,不包含特殊字符');
            return bsuc;
        },
        checkpassword: function () {
            // 验证密码组成（示例：包含至少一个大写字母、一个小写字母和一个数字）
            var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}$/;
            let bsuc = regex.test(this.password);
            if (!bsuc)
                alert('密码格式不正确:长度6-20个字符，至少包含一个大写字母、一个小写字母和一个数字');
            return bsuc;
        },
        handlenameBlur: function () {
            return this.checkusername();
        },
        handlepasswordBlur: function () {
            return this.checkpassword();
        },
        login: function () {
            let bavaild = false;
            if (this.checkusername() && this.checkpassword()) {
                bavaild = true;
            }
            if (bavaild) {

                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                })
                    .then(response => {
                        this.blogin = response.ok;
                        return response.json();
                    })
                    .then(data => {
                        // 处理响应数据
                        if (!this.blogin)
                            alert('登录失败：' + data.error);
                        else {
                            alert('登录成功');
                            window.location.replace("/main.html");
                        }

                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },
        register: function () {
            let bavaild = false;
            if (this.checkusername() && this.checkpassword()) {
                bavaild = true;
            }
            if (bavaild) {

                fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                        mail: this.mail,
                        mobile: this.mobile
                    })
                })
                    .then(response => {
                        bavaild = response.ok;
                        return response.json();
                    })
                    .then(data => {
                        // 处理响应数据
                        if (!bavaild)
                            alert(data.error);
                        else {
                            alert(data.message);
                            window.location.replace("/");
                        }

                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },
        onSubmit: function (event) {
            if (event.target.id == 'userloginform')
                this.login();
            else if (event.target.id == 'userregform')
                this.register();
        }
    }
}
let userloginApp = Vue.createApp(UserInfo);
userloginApp.mount('#userlogin');

let userregApp = Vue.createApp(UserInfo);
userregApp.mount('#userreg');
