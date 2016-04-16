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
                return '账号格式不正确';
            }
            var accountLen = account.length;
            if (accountLen < 5 || account > 15) {
                return '账号长度应在5-15个字符之间';
            }
            return '';
        },
        settTips: function(tip) {

        }
    };

    var accountInput = $('account');
    //输入时检查
    $on(accountInput, 'keydown change blur keyup', function() {
        var account = accountInput.value;
        if (/[^a-zA-Z0-9]/g.test(account)) {
            accountInput.value = account.replace(/[^a-zA-Z0-9]/g, '');
        }
    });

    accountInput.addEventListener('blur', function() {
        var account = accountInput.value;
        var result = login.validateAccount(account);
        login.setTips(id, result);
    });



})();
