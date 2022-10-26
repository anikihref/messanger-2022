# TODO

## Pages

#### Search page

- [ ] Create result item component
- [ ] Implement logic for searching (server)

#### Settings page

- [ ] Create settings Schema and add it for every user
- [ ] Show, hide etc. some components depending on settings 

#### User page

- [ ] Show user info
- [ ] Add last 3 chats component
- [ ] Add friend section 
    - [ ] Add modal with all friends

#### Auth pages

- [ ] Create login page
- [ ] Create registration page
- [ ] Create activation page

#### Not found page
- [ ] Create not found page

## WebSockets

- [x] Implement WebSockets via `ws` packcage
- [ ] Reimplement WebSockets via Socket.IO library.


## Chat

- [x] Message sending
- [x] Message smart fetching (returning from server only non-fetched messages and push them to message list)
- [ ] Pictures sending (handle data flowing to server and create fileService on server)
- [ ] Select chat when user chooses it

#### Additional 

- [ ] voice message sending
- [ ] youtube links previewer (preview image, video title)


## Themes

- [ ] Change main color theme
- [ ] Add dark color theme 


## Auth

Auth implemented using **JWT**

- [ ] Handle auth endpoint (server)
- [ ] Using bcrypt package hash passwords
- [ ] Create email account activation


## General

- [ ] Create withTooltip hoc
- [ ] Create modal component
- [x] Create navbar


# TOFIX

- [ ] Main layout chat list fetching (like messages)
- [ ] When message has many symbols it occurs error
- [x] Last message of chat doesn't show
- [x] Messages not fetching when changing chat
- [x] WebSocket sometimes does not return response to another client and sometimes return two of them
- [ ] If page renders already on chat page than no users get response
