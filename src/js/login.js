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
        checkPassword: function(){
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
        setTips: function(id, tip) {
            var tipDom = $(id);
            tipDom.innerText = tip;
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

})();
