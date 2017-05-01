lol.XHR.query = function(query, args, callback) {
    if (lol.SafeMode) return;
    var id = ++lol.XHR.id;
    lol.XHR.pool[id] = $.ajax({
        type: 'POST',
        url: '/ajax/query',
        data: {
            token: lol.XHR.token,
            q: lol.XHR.encode(query, args)
        },
        dataType: 'text',
        complete: function(xhr, t) {
            delete lol.XHR.pool[id]
        },
        success: function(data) {
            switch (data) {
                case '!TIMEOUT':
                    setTimeout(function() {
                        lol.XHR.query(query, args, callback)
                    }, 3000);
                    return;
                case '!ERROR':
                case '!EXPIRED':
                    lol.XHR.token = lol.Plugin.getToken()
                    setTimeout(function() {
                        lol.XHR.query(query, args, callback)
                    }, 100)
                    return;
            }
            if (callback) callback(data)
        },
        error: function(xhr, t, m) {
            if (xhr.status === 0) return;
            if (xhr.readyState === 0) return;
            lol.XHR.alert('!ERROR')
        }
    });
    return lol.XHR.pool[id]
};

lol.Plugin.getToken = function()
{
    var playerName = document.getElementById('user').children[1].children[0].firstChild.nodeValue
    playerName = playerName.replace(' ', '_')
    var key = lol.Plugin.config['multiTabPrefix'] + playerName
    var token = localStorage.getItem(key)
    return token
}

lol.Plugin.setToken = function()
{
    var playerName = document.getElementById('user').children[1].children[0].firstChild.nodeValue
    playerName = playerName.replace(' ', '_')
    key = lol.Plugin.config.multiTabPrefix + playerName
    localStorage.setItem(key, lol.XHR.token)
}

lol.Plugin.setToken()