var MailConfig = require('../config/email');
var hbs = require('nodemailer-express-handlebars');
var gmailTransport = MailConfig.GmailTransport;
router.get('/email/template', (req, res, next) => {
  MailConfig.ViewOption(gmailTransport,hbs);
  let HelperOptions = {
    from: '"Tariqul islam" <tariqul.islam.rony@gmail.com>',
    to: 'ishworineupane135@gmail.com',
    subject: 'Hellow world!',
    template: 'test',
    context: {
      name:"tariqul_islam",
      email: "tariqul.islam.rony@gmail.com",
      address: "52, Kadamtola Shubag dhaka"
    }
  };
  gmailTransport.sendMail(HelperOptions, (error,info) => {
    if(error) {
      console.log(error);
      res.json(error);
    }
    console.log("email is send");
    console.log(info);
    res.json(info)
  });
});
// let sendFormsForPatient = (id, files) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let patient = await patientService.getDetailPatient(id);
//             let doctor = await db.User.findOne({
//                 where: { id: patient.doctorId },
//                 attributes: [ 'name', 'avatar' ]
//             });
//             let name = removeAccents(patient.name).split(' ').join('').toLowerCase();
//             let phone = patient.phone.substring(0, 3);
//             let year = patient.year.substring(2, 4);
//             let password = `${name}-${phone}-${year}`;
//             let mz = new Minizip();
//             files.forEach((file) => {
//                 let fileSendToPatient = fs.readFileSync(file.path);
//                 mz.append(file.originalname, fileSendToPatient, { password: password });
//             });
//             let nameZip = `${Date.now()}-patientId-${id}.zip`;
//             let pathZip = `${PATH_ZIP}/${nameZip}`;
//             fs.writeFileSync(pathZip, new Buffer(mz.zip()));
//             let filename = `Information-invoice-${patient.dateBooking}.zip`;
//             let data = { doctor: doctor.name };
//             await mailer.sendEmailWithAttachment(patient.email, transMailRemedy.subject, transMailRemedy.template(data), filename, pathZip);
//             await patient.update({
//                 isSentForms: true
//             });

//             if (patient.ExtraInfo) {
//                 let image = JSON.parse(patient.ExtraInfo.sendForms);
//                 let count = 0;
//                 if (image) {
//                     count = Object.keys(image).length;
//                 } else {
//                     image = {};
//                 }

//                 files.forEach((x, index) => {
//                     image[count + index] = x.filename;
//                 });
//                 await patient.ExtraInfo.update({
//                     sendForms: JSON.stringify(image)
//                 });
//             }

//             resolve(patient);
//         } catch (e) {
//             reject(e);
//         }
//     });
// };
