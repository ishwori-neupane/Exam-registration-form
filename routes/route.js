const express = require('express');
const router = express.Router();
const userController = require('../controlers/userControllers');
const selectSubject=require("../controlers/subjectSelect")

router.get("/",  userController.view );

router.get('/viewuser/:id', userController.viewall);

router.get('/adduser', userController.form);
router.post('/adduser', userController.create);

router.get('/delete/:id', userController.delete);

router.post('/edituser/:id', userController.update);
router.get('/edituser/:id', userController.edit);

router.get('/login', userController.loginGet)
router.post('/login', userController.login)

router.get("/logout", userController.logout)

router.post('/', userController.find);

router.get('/StudentDetails', selectSubject.Subjectsform);

router.get('/contact', selectSubject.Subjectsform);
router.get('/contact', selectSubject.SubjectSubmit);


router.post('/submitstudentdata', selectSubject.formsubmitfirst);
router.get('/submitstudentdata1', selectSubject.SubjectSubmit);

// router.post('/StudentDetails', selectSubject.Subjects); 


module.exports=router;