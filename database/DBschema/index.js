let DBChanges = {
    version: 1,
    subVersion: 0,
    changes: []
}


DBChanges.changes.push(require('./Files.js'));   // FIles table creation
DBChanges.changes.push(require('./Folders.js'));   // Folders table creation
DBChanges.changes.push(require('./Users.js'));   // Users table creation
DBChanges.changes.push(require('./DefaultUser.js'));   // Default User creation


module.exports = DBChanges;

/*
    UPDATE :   Put a new unique ID in the ChabgeId property of every Schema object.
    CREATION : Create a new Schema in DBschema foler. 
               Add the new Schema object to the changes array.
               Add new chageId to schema object.
    DELETION : Only update the query property of the Schema object. 
               Put a DELETE query in the query property.
    INSTRUCTION : To insert a row in a table, create a new Schema object 
               with the same properties as the old one. Put a new unique ID in the 
               ChabgeId property of the new Schema object.
               Write yor INSERT query in the query : section.
               Dont forget to add the new Schema object to the changes array.
*/