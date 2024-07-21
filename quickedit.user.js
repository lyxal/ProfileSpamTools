// ==UserScript==
// @name         Quickly go to edit user page
// @version      1.0.0
// @description  Go to a user's profile edit page quickly
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
    var userName = $(".fs-headline2").text().trim();
    var moderatorLinkElement = $('a[data-se-mod-button-id=' + userID + ']');
    if (moderatorLinkElement.length == 0) { // Current user is not a moderator, or wrong tab - no action possible
        return;
    }
    var goToEditLink = document.createElement('a');
    goToEditLink.setAttribute('class', 'grid--cell');
    goToEditLink.setAttribute('style', 'padding-right: 16px');
    goToEditLink.appendChild(document.createTextNode('Go to edit page'));
    goToEditLink.onclick = function () {
        // Open the edit profile link in a new tab
        const editProfileLink = "https://" + window.location.host + "/users/edit/" + userID;
        window.location = editProfileLink
    }
    moderatorLinkElement.after(goToEditLink);

})();
