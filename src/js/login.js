(function() {
    function $(id) {
        return document.getElementById(id);
    }

    function $on(dom, events, callback) {
        var eventArr = events.split(' ');
        eventArr.forEach(function(event) {
            dom.addEventListener(event, callback);
        });
    }

    var login = {
        validateAccount: function(account) {
            if (/[^a-zA-Z0-9]/g.test(account)) {
                return '账号由大小写字母和数字组成';
            }
            var accountLen = account.length;
            if (accountLen < 5 || accountLen > 15) {
                return '账号长度应在5-15个字符之间';
            }
            return '';
        },
        validatePassword: function(password) {
            var passwordLen = password.length;
            if (passwordLen < 5 || passwordLen > 15) {
                return '密码长度应在5-15个字符之间';
            }
            return '';
        },
        checkAccount: function() {
            var accountInput = $('account');
            var account = accountInput.value;
            var result = this.validateAccount(account);
            this.setTips('account-tip', result);
            if (result === '') {
                accountInput.className = 'success';
                return true;
            } else {
                accountInput.className = 'error';
                return false;
            }
        },
        checkPassword: function() {
            var passwordInput = $('password');
            var password = passwordInput.value;
            var result = this.validatePassword(password);
            this.setTips('pwd-tip', result);
            if (result === '') {
                passwordInput.className = 'success';
                return true;
            } else {
                passwordInput.className = 'error';
                return false;
            }
        },
        login: function() {
            if (!this.checkAccount() || !this.checkPassword()) {
                return false;
            }
            var password = $('password').value;
            var account = $('account').value;
            var lodingLayer = $('loading-layer');
            var loginResult = $('login-result');
            var _this = this;
            lodingLayer.style.display = 'block';
            loginResult.style.display = 'none';
            var beginTime = Date.now();
            $post('/api/login', {
                account: account,
                password: password
            }, function(res) {
                var endTime = Date.now();
                var wastTime = endTime - beginTime;
                if (wastTime < 500) {
                    setTimeout(function() {
                        _this.setLoginResult(res.message);
                    }, 500 - wastTime);
                } else {
                    _this.setLoginResult(res.message);
                }
                if (res.statusCode === 0) {
                    window.location = '/';
                }

            }, function() {
                _this.setLoginResult('网络错误请重试');
                lodingLayer.style.display = 'none';
            });
        },
        setTips: function(id, tip) {
            var tipDom = $(id);
            tipDom.innerText = tip;
        },
        setLoginResult: function(msg) {
            var lodingLayer = $('loading-layer');
            var loginResult = $('login-result');
            loginResult.innerText = msg;
            lodingLayer.style.display = 'none';
            loginResult.style.display = 'block';
        }
    };


    //输入时检查
    // $on(accountInput, 'keydown change blur keyup', function() {
    //     var account = accountInput.value;
    //     if (/[^a-zA-Z0-9]/g.test(account)) {
    //         accountInput.value = account.replace(/[^a-zA-Z0-9]/g, '');
    //     }
    // });
    var accountInput = $('account');
    accountInput.addEventListener('blur', login.checkAccount.bind(login));

    var passwordInput = $('password');
    passwordInput.addEventListener('blur', login.checkPassword.bind(login));

    var loginBtn = $('login-btn');
    loginBtn.addEventListener('click', login.login.bind(login));
})();

function $post(url, data, successFn, errorFn) {
    var xhr = new XMLHttpRequest();
    xhr.open('post', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(serialize(data));
    xhr.onreadystatechange = function() {
        if (xhr.status >= 200 && xhr.status < 300 && xhr.readyState === 4) {
            successFn(JSON.parse(xhr.responseText));
        }
        if (xhr.status >= 400) {
            errorFn();
        }
    };

    function serialize(data) {
        var serializeData = '';
        for (var i in data) {
            serializeData = serializeData + (serializeData.length > 0 ? '&' : '');
            serializeData = serializeData + i + '=' + data[i];
        }
        return serializeData;
    }
}