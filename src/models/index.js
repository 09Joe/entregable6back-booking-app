const Hotel = require('./Hotel');
const City = require ('./City');
const Image = require('./Image');
const Booking = require('./Booking');
const User = require('./User');
const Review = require('./Review');



City.hasMany(Hotel);
Hotel.belongsTo(City);

// recuerda, antes del belongsTo es donde se forma la llave foranea en este caso hotel e Image

Hotel.hasMany(Image);
Image.belongsTo(Hotel);

Hotel.hasMany(Booking);
Booking.belongsTo(Hotel);

Booking.belongsTo(User);
User.hasMany(Booking);


Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Hotel);
Hotel.hasMany(Review);

