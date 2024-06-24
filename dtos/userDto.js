class UserDto {
  constructor(user) {
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.city = user.city;
    this.age = user.age;
    this.zipcode = user.zipcode;
    this.deleted = user.deleted;
  }
}

module.exports = UserDto;
