export default class UserDto {
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.email = user.email;
        this.friends = user.friends;
        this.name = user.name;
        this.phoneNumber = user.phoneNumber;
        this.activated = user.activated;
        this.status = user.status;
        this.avatar = user.avatar;
        this.bio = user.bio;
    }
};
