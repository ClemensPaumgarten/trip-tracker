# Trip Tracker

Trip Tracker is a simple blog system I wrote to track [my trip](https://south-america.clemens.rocks) through South America.

You can add the most important stops of your trip and add stories and images to certain locations. As the main component of this blog is a map your followers can easily track you and experience the stories you share at certain places.

## Structure

The blog is structured in three pages

#### /map

The map is the main component where the followers can track the trip and navigate to each blog


![](https://firebasestorage.googleapis.com/v0/b/travel-diary-58ffc.appspot.com/o/doc%2Fmap.png?alt=media&token=4132c253-9486-4fb7-824b-82138a3cb272)

#### /blog

The blog page is used for the blog entries


![](https://firebasestorage.googleapis.com/v0/b/travel-diary-58ffc.appspot.com/o/doc%2Fblog.png?alt=media&token=61b01f10-d682-4588-aea9-a6e25152cbfb)

#### /manage

With the manage page you can delete, update and add blog entries and images to your locations. Only authenticated users can access this page.

![](https://firebasestorage.googleapis.com/v0/b/travel-diary-58ffc.appspot.com/o/doc%2Fcms.png?alt=media&token=cdeff6a9-1849-4495-9071-1a12d8540a7b)

## Technical Stuff

### Frontend

The frontend is built in React with Redux. For styling Sass and CSS-Modules is used.

### Backend

The backend is written in node using express. The data is stored in a mongodb.

Authentication and image hosting is done by firebase services.

## Licence

The project is published under the MIT licence.

