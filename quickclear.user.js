// ==UserScript==
// @name         Quick Profile Clear
// @version      1.0.0
// @description  Quickly clear all user fields to a pre-set set of fields
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

    var bioText = `Profile spam removed by moderator
    ` // Feel free to change


    function clearUser(message) {
      document.getElementById("displayName").value = "Profile Spam Account";
      document.getElementById("location").value = "Spam";
      document.getElementById("WebsiteUrl").value = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      document.getElementById("TwitterUrl").value = "";
      document.getElementById("GitHubUrl").value = "";
      localStorage.setItem("spammer" + document.location.host + userID);
      submitButton.click();
    }

    function generateRandomString(length) {
        const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%^&*-=_+';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }

    function sanityCheck() {
        // Get the current time (without seconds and without space)
        const neededCharacters = generateRandomString(Math.floor(Math.random() * 5) + 5); // Generate a random string with a length between 5 and 10

        // Prompt the user for input
        const userInput = prompt('Enter the characters: ' + neededCharacters);

        // Check if the input is correct
        if (userInput && userInput === neededCharacters) {
            return true;
        } else {
            alert('Sanity check failed. Please try again.');
            return false;
        }
    }


    var userIDRegex = /\/users\/edit\/(\d+)/g.exec(document.location);

    if (userIDRegex == null) {
        return; // e.g. flag summary page
    }
    var userID = userIDRegex[1];
    var moderatorLinkElement = $('a[data-se-mod-button-id=' + userID + ']');
    if (moderatorLinkElement.length == 0) { // Current user is not a moderator, or wrong tab - no action possible
        return;
    }
    var saveButton = document.getElementById("cancel")
    var destroyLink = document.createElement('a');

    let submitButtons = document.getElementsByClassName("flex--item s-btn s-btn__filled js-save-button");
    let submitButton = submitButtons[submitButtons.length - 1];
    destroyLink.setAttribute('class', 's-btn s-btn__filled');
    destroyLink.setAttribute('style', 'background-color: red;');
    destroyLink.appendChild(document.createTextNode('Clear User Fields'));
    destroyLink.onclick = function () {
        if (sanityCheck()) {
            clearUser()
        }
    }
    moderatorLinkElement.after(destroyLink);
})();
