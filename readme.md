Live API URL -  https://assign-mentor-hdew.onrender.com

API comments are given below:-

Mentor route -   ("/API/mentor")
Student route -  ("/API/student")

1. get all mentors -  get("/")    
2. get all students -  get("/") 
3. Create a new mentor -  post("/create") 
4. Create a new Student -  post("/create") 
5. assign a student to mentor -  (put("/assign/:id") 
6. assign or change mentor for particular student -  (put("/AssignorChange/:id") 
7. show all students for particular mentor  -   (get("/:id") 
8. show the previously assigned mentor for a particular student -  (get('/previousMentor/:id') 
