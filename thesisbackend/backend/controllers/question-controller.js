const jimp = require('jimp');
const questionDB = require('../models/question');
const requireLogin = require('../middleware/auth-middleware');
const cloudinary = require('cloudinary');



class questionController {
    async postQuestion(req, res) {

        const { questionName, qsnPhoto } = req.body;
        console.log(req.body);
        if (!questionName) {
            res.status(400).send({ message: "You must enter the question" });
            return;
        }

        const myCloud = await cloudinary.v2.uploader.upload(
            qsnPhoto, {
            folder: "qna",
            // width: 150,
            crop: "scale"
        });

        try {
            await questionDB.create({
                questionName: questionName,
                postedBy: req.user,
                questionImage:myCloud.secure_url, //sensative
                
            }).then(() => {
                res.status(201).send({ message: "Question added successfully" });
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message });
        }
    }

    async allPost(req, res) {
        questionDB.find()
            .populate("postedBy","-password")
            .then(questions => {
                res.status(201).json({
                    "success": true,
                    "data": questions.reverse()
                })
            })
            .catch(err => {
                res.status(404).json({ message: err.message })
            })
    }

    // async qnaPage(req, res) {
    //     console.log(req.params.questionId)
    //     questionDB.findById(req.params.questionId)
    //         .populate("postedBy", "-password")
    //         .populate("answers.answeredBy", "_id fname lname answeredOn")
    //         .then(question => {
    //             res.status(201).json({ question })
    //         })
    //         .catch(err => {
    //             res.status(500).json({ message: err.message })
    //         })
    // }

    async qnaPage(req, res) {
        console.log(req.params.questionId)
        questionDB.findById(req.params.questionId)
            .populate("postedBy", "-password")
            .populate("answers.answeredBy", "_id fname lname answeredOn profile")
            .then(question => {
                res.status(201).json([question])
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }

    // delete question
    async deleteQuestion(req, res) {
        questionDB.findByIdAndDelete(req.params.questionId)
            .then(() => {
                res.status(201).json({ message: "Question deleted successfully" })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
}

module.exports = new questionController;