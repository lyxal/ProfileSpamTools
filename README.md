# ProfileSpamTools
Some profile spam clearing tools to help moderators on StackExchange sites

## YOU'LL NEED TO BE A MODERATOR ON A STACKEXCHANGE SITE TO BE ABLE TO USE THESE

## [`quickedit`](https://github.com/lyxal/ProfileSpamTools/blob/main/quickedit.user.js)

This userscript simply adds a button to a user's profile page to quickly get to the edit profile page.

![image](https://github.com/user-attachments/assets/be71dab6-2b5b-454b-aa08-79cb47b99cd8)

## [`quickclear`](https://github.com/lyxal/ProfileSpamTools/blob/main/quickclear.user.js)

This userscript adds a red button that allows you to empty all fields of a profile spammer, and potentially leave a fun/explanatory/notice message in the profile bio.

![image](https://github.com/user-attachments/assets/eb6fdac7-4ad3-45e7-b1d3-b42c694d7d58)

Note that before clearing the fields, the script will ask you to enter a string of randomly generated characters:

![image](https://github.com/user-attachments/assets/8aab69fe-1723-4b4f-84c8-a46310fef9a4)

(the string changes every time, it obviously won't be that exact one)

This is to ensure you don't accidentally wipe fields of a user.

After ccompleting the sanity check, the fields are saved, and the profile is saved to all network sites.

## [`quickDestroy`](https://github.com/lyxal/ProfileSpamTools/blob/main/quickdestroy.user.js)

**REQUIRES QUICK EDIT**

When a user has had their profile fields cleared with the quickclear script, a button labelled "destroy this spammer for good" will appear:

![image](https://github.com/user-attachments/assets/251a0484-8f0a-469d-bf08-c12943578cd2)

This button will destroy the account as if you went through the mod menu manually. To be clear, _this button only shows once you've evaluated the user to be a profile spammer and you've clicked the clear all fields button_.

The script shows the button based on a localstorage value set by the quickclear script. In future, this may be done using `GM.setvalue()`/`GM.getvalue()`, but I haven't experimented with those yet (I don't make userscripts very often).
