# Restaurant Reservation App

My Restaurant Reservation App was my final capstone project for my Software Engineering Immersion course through Thinkful. The app features functions that allow restaurant employees to create reservations, seat tables, create new tables, search reservations by phone number, and delete reservations.

## Screenshots

### Dashboard:
The dashboard of the application functions as a home page where the user can view a list of reservations for the current date along with a list of tables the restaurant currently has. The reservation list includes buttons on either side of the table that allow you to view the previous day's or next day's reservations and also feature a seat, edit, and cancel button next to each reservation. The dashboard also features a sidebar that navigates to other pages of the application as well.

![Screen Shot 2022-04-07 at 4 25 04 PM](https://user-images.githubusercontent.com/92840656/162335354-be6a4872-01d0-467f-885e-5b3f190a478e.png)


### Search:
When the user clicks the Search button from the side bar, they will be transported to the Search Page. The Search Page allows the user to input a phone number to retreive a list of reservations for a guest that is associated with the input phone number. The search will bring up a list of future, current, or past reservations the phone number is associated with. The user will also have the option to edit or cancel the reservation from this page.

![Screen Shot 2022-04-07 at 4 28 33 PM](https://user-images.githubusercontent.com/92840656/162335658-c46fd82c-c003-4dbb-8599-ccaf206de829.png)


### New Resrvation
The New Reservation Page features a form the user will need to fill out in order to create a new reservation for a future date an time. Once all necessary information is filled on the form, the user will press submit, and the reservation will then appear on the dashboard for the date that was filled on the form. If the user chooses not to create a new reservation, they may click the "cancel" button which will take the user back to the previous page.

![Screen Shot 2022-04-07 at 4 53 03 PM](https://user-images.githubusercontent.com/92840656/162337521-492fd74e-6d40-485b-aef8-b9358c5dbcfc.png)


### New Table
The New Table Page lets the user create a new table for the restaurant. The user will need to type in a table name and a capacity for the table in order to submit the table into the list of tables which is featured on the dashboard. If the user chooses not to create a new table, they may click the "cancel" button which will take the user back to the previous page.

![Screen Shot 2022-04-07 at 4 54 24 PM](https://user-images.githubusercontent.com/92840656/162337591-89846c8a-112d-49bb-9d8d-55178ef4c578.png)

### Seat
Clicking the "Seat" button will take the user to a different page where they will choose which table they would like to seat the reservation to. The user will the "Select A Table" drop-down menu to select a table from the list of tables. The user will need to choose a table that has the appropriate capacity for the reservation's party or they will not be able to seat the reservation. 

Once the user has chose a table, they will click the "submit" button which will take the user back to the dashboard. Since the reservation has now been seated, the "seat" button will no longer be shown. The selected table for the reservation will also show as "occupied" on the tables list on the dashboard and will now include a "Finish" button next the table. remove the "seat" button from the  The user may click "cancel" if they no longer want to seat this reservation, which will take them back to the dashboard.

![Screen Shot 2022-04-07 at 5 00 58 PM](https://user-images.githubusercontent.com/92840656/162338139-bddc25ef-6d34-49c1-8eb1-88e434d458e3.png)

![Screen Shot 2022-04-07 at 5 16 19 PM](https://user-images.githubusercontent.com/92840656/162339303-8d463a31-30eb-4fe7-bf21-37a6cdaefe71.png)

### Edit
Clicking the "Edit" button next to a reservation allows the user to edit a preexisting reservation. The user will be brought to the "Edit Reservation" page where the reservation form will be prefilled with the current reservation's information. There, the user will have the option to change any information for the reservation. When the user is done editing the reservation, they may click the "Submit" button to submit any changes which will then be shown on the dashboard's reservation list. If the user chooses not to edit the reservation, they may click the "cancel" button which will take them back to the dashboard.

![Screen Shot 2022-04-08 at 1 15 32 PM](https://user-images.githubusercontent.com/92840656/162521992-b3f4a88b-5138-417c-80b6-811c714bb78b.png)

### Cancel
Clicking the "Cancel" button next to a reservation will give the user the option to cancel the reservation. 

![Screen Shot 2022-04-08 at 1 28 14 PM](https://user-images.githubusercontent.com/92840656/162525606-07eb9589-cbb1-477e-84fd-c42a592f8757.png)

When clicked, a pop-up alert will be shown to display the following message:

![Screen Shot 2022-04-08 at 1 20 14 PM](https://user-images.githubusercontent.com/92840656/162523897-8ee56df3-9019-4f1e-8aeb-f08bdd201d7f.png)

If the user clicks "Ok", the reservation will be removed from the reservation list. If the user clicks "Cancel" the pop-up alert will disappear.

### Finish
When a reservation is sat at a table, the table on the table list will update it's availability to "Occupied" and will also have a "Finish" button next to it. 

![Screen Shot 2022-04-08 at 1 27 28 PM](https://user-images.githubusercontent.com/92840656/162525541-bca9a8dd-95df-46cf-9ffa-cb4464ffa52a.png)


When the the "Finish" button is clicked, the following pop-up alert will appear:

![Screen Shot 2022-04-08 at 1 25 55 PM](https://user-images.githubusercontent.com/92840656/162525342-1dfb2508-9c61-4e36-b9fc-50794b0dec12.png)

If the user clicks "Ok" the page will refresh and the table from the list will update it's availability to "Free". If the user clicks "cancel" on the pop-up alert, the alert will disappear and no changes will be made.



## Technology

**Built With:**
- React and React Hooks
- Express.js
- Node.js
- PostgreSQL and ElephantSQL
- Twitter Bootstrap


