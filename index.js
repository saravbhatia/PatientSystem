'use strict'

const express = require('express');
const app = express();
const Datastore = require('@google-cloud/datastore');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());



//import * as Datastore from "@google-cloud/datastore";



/*async function quickStart(){
    const projectID = 'patient-system-225005';
    
    const datastore = new Datastore({
        projectId: projectID,
      });

   // const query = datastore.query('Select * from Patient');
      const query = datastore.createQuery('Patient');

      datastore.runQuery(query).then(results => {
        // Task entities found.
        
        const Patients = results[0];
      
        console.log('Patients:');
        Patients.forEach(patient => console.log(patient));
      });*/
   

/*query.run((err, entities, info) => {
  // entities = An array of records.

  // Access the Key object for an entity.
  const firstEntityKey = entities[0][datastore.KEY];
  console.log(firstEntityKey);
});*/
 // The kind for the new entity
 /*const kind = 'Patient';
 // The name/ID for the new entity
 //const name = 'sampletask1';
 // The Cloud Datastore key for the new entity
 const taskKey = datastore.key([kind]);

 // Prepares the new entity
 const task = {
    key: taskKey,
   data: {
     LastName: 'Bhatia',
     FirstName: 'Sarav',
     DateOfBirth: new Date(1982,5,18),
     VisitDescription: 'needs good check'

   },
 };

 // Saves the entity
 await datastore.save(task);
 console.log(`Saved ${task.key.id}: ${task.data.LastName}`);*/
//}

//quickStart().catch(console.error);

//processing http requests

app.get('/',(req,res) => res.send('hello world!'));


app.get('/patientlist',function(req,res){
   
    var reqQuery = req.query
    console.log(reqQuery);

    const projectID = 'patient-system-225005';
    
    const datastore = new Datastore({
        projectId: projectID,
      });

   // const query = datastore.query('Select * from Patient');
      const query = datastore.createQuery('Patient');
      

      for (var key in reqQuery){query.filter(key,reqQuery[key])};

      datastore.runQuery(query).then(results => {
        // Task entities found.
        
        const Patients = results[0];
      
        //console.log('Patients:');
      //  Patients.forEach(patient => console.log(patient));
        console.log(Patients);
        res.send(Patients);
      });
   

})

app.get('/patientkey',function(req,res){

    const projectID = 'patient-system-225005';
    
    const datastore = new Datastore({
        projectId: projectID,
      });
      console.log(req.query);
      const kind = 'Task';
      var id = req.query['id'];
      const name = "sampletask1"
      console.log(id);
      const patientKey = datastore.key([kind,name]);
      var patients;
      datastore.get(patientKey).then(results => {patients = results; console.log(patients);res.send(patients);} );

     // console.log(patients);

     // res.send(patients);
})

app.post('/patient',function(req,res){

    console.log(req.body);
    res.end('yes');

    const projectID = 'patient-system-225005';
    
    const datastore = new Datastore({
        projectId: projectID,
      });


    const kind = 'Patient';
    const patientKey = datastore.key([kind]);

    // Prepares the new entity
    const patient = {
       key: patientKey,
      data: {
        LastName: req.body.LastName,
        FirstName: req.body.FirstName,
        PhoneNumber: req.body.PhoneNumber,
        VisitDescription: req.body.VisitDescription
   
      },
    };
   
    // Saves the entity
    datastore.save(patient);
    console.log(`Saved ${patient.key.id}: ${patient.data.LastName}`);

})

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
//starting server
const server = app.listen(process.env.PORT || 3000, () => {
    const port = server.address().port;
    console.log('listening on port ' + port);

    }
);

app.use(express.static('.'));