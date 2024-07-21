// ==UserScript==
// @name         Quick Destroy
// @version      1.0.2
// @description  Destroy a user that has been cleared using the Clear User Fields userscript
// @author       lyxal (https://github.com/lyxal) (https://stackexchange.com/users/12951433/lyxal?tab=accounts)
// @match       *://*.stackexchange.com/users/*
// @match       *://*.stackoverflow.com/users/*
// @match       *://stackoverflow.com/users/*
// @match       *://superuser.com/users/*
// @match       *://serverfault.com/users/*
// @match       *://askubuntu.com/users/*
// @match       *://stackapps.com/users/*
// @match       *://mathoverflow.net/users/*
// @exclude     *://stackexchange.com/users/*
// @exclude     *://chat.stackexchange.com/users/*
// @exclude     *://chat.stackoverflow.com/users/*
// @exclude     *://chat.meta.stackexchange.com/users/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    var userIDRegex = /\/users\/(\d+)\//g.exec(document.location);
    if (userIDRegex == null) {
        return; // e.g. flag summary page
    }
    var userID = userIDRegex[1];
    var moderatorLinkElement = $('a[data-se-mod-button-id=' + userID + ']');
    if (moderatorLinkElement.length == 0) { // Current user is not a moderator, or wrong tab - no action possible
        return;
    }
    if (localStorage.getItem("spammer" + document.location.host + userID)) {
        var destroyLink = document.createElement('a');
        destroyLink.setAttribute('class', 'grid--cell');
        destroyLink.setAttribute('style', 'padding-right: 16px');
        destroyLink.appendChild(document.createTextNode('Destroy this spammer for good'));
        destroyLink.onclick = function () {
            // Clear all sessions on all other sites purely to do a little trolling. No other reason.
            $.post({
                url: 'https://' + document.location.host + '/admin/users/' + userID + '/clear-sessions', data: 'fkey=' + window.localStorage["se:fkey"].split(",")[0],
                success: function (data) { console.log('sessions cleared') }, error: function (jqXHR, textStatus, errorThrown) { alert("could not clear sessions") }
            })
            $.post({
                url: 'https://' + document.location.host + '/admin/users/' + userID + '/destroy',
                data: 'annotation=&deleteReasonDetails=&mod-actions=destroy&destroyReason=This+user+was+created+to+post+spam+or+nonsense+and+has+no+other+positive+participation&destroyReasonDetails=&fkey=' + window.localStorage["se:fkey"].split(",")[0],
                success: function (data) {
                    // Reload page
                    window.location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    window.alert('An error occurred, please try again later.');
                    console.log('Error: ' + textStatus + ' ' + errorThrown);
                }
            });
        }
        moderatorLinkElement.after(destroyLink);
    }
})();
