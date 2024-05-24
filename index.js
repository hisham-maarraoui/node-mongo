
// I worked on this code as part of a coding bootcamp curriculum. I followed along with the instructions 
// (i.e. followed/copied instructions from the course/instructors and didn't design everything from scratch myself) while
//  writing code in this project/file. Moreover, I  acknowledge receiving support from and/or working/collaborating
//   with instructors/classmates, generally as is expected from being a participant in the coding bootcamp.


const { MongoClient } = require('mongodb-legacy');
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbName = 'nucampsite';

MongoClient.connect(url, {}, (err, client) => {
    assert.strictEqual(err, undefined);

    console.log('Connected correctly to server');

    const db = client.db(dbName);

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, undefined);

        console.log('Dropped Collection:', result);

        dboper.insertDocument(db, { name: 'Breadcrumb Trail Campground', description: 'Test' },
                'campsites', result => {
                console.log('Insert Document:', result.ops);

                dboper.findDocuments(db, 'campsites', docs => {
                    console.log('Found Documents:', docs);

                    dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                        { description: "Updated Test Description" }, 'campsites',
                        result => {
                            console.log('Updated Document Count:', result.nModifiedCount);

                            dboper.findDocuments(db, 'campsites', docs => {
                                console.log('Found Documents:', docs);
                            
                            dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                'campsites', result => {
                                    console.log("Deleted Document Count:", result.deletedCount);

                                    client.close();
                                }
                            );
                        });
                    }
                );
            });
        });
    });

});
