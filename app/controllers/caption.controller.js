const db = require('../models');
const Photo = db.photo;
const Caption = db.caption;
const Vote = db.vote;

const getPhotoCaptions = (req, res) => {
    Photo.findByPk(req.params.photoId)
    .then(photo => {
        if(!photo){
            res.status(404).json({
                message: "Photo does not exist!"
            })
        }
        photo.getCaptions()
        .then(captions => {
            res.status(200).json({
                captions: captions,
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        })
    })
}

const addNewCaption = (req, res) => {
    const captionBody = req.query.captionBody;
    const photoId = req.params.photoId;
    const userId = req.headers["user-id"];

    Photo.findByPk(photoId)
    .then(photo => {
        if(!photo){
            res.status(403).json({
                message: "Cannot add caption to a non-existant photo"
            })
        }
        Caption.create({
            body: captionBody,
            photoId: photoId,
            userId: userId
        })
        .then(caption => {
            res.status(201).json({
                caption: caption,
                photo: photo
            })
        })
        .catch( err => {
            res.status(500).json({
                message: err.message
            })
        })

    })

}

const updateCaption = (req, res) => {

    Caption.findByPk(req.params.captionId)
    .then( caption => {
        if(!caption){
            res.status(404).json({
                message: "Caption not found!"
            })
        }
        caption.update({
            body: req.query.captionBody
        })
        .then(caption =>{
            res.status(201).json({
                caption: caption
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
}

const deleteCaption = (req, res) => {
    Caption.findByPk(req.params.captionId)
    .then(caption => {
        if(!caption){
            res.status(404).json({
                message: "Invalid Caption Id"
            })
        }
        caption.destroy({
            truncate: true
        })
        .then(() => {
            res.status(200).json({
                message: "Caption successfully deleted!!"
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
}

const voteForCaption = (req, res) => {
    const userId = req.cookies.userId
    const captionId = req.params.captionId

    Caption.findByPk(captionId)
    .then(caption => {
        caption.getVotes()
        .then(votes => {
            for(i=0; i<votes.length; i++){
                if(votes[i].userId == userId){
                    res.status(403).json({
                        message: "User already voted for this caption!"
                    })
                }
            }
            Vote.create({
                userId: userId,
                captionId: captionId
            })
            .then(vote => {
                let newVotes = caption.totalVotes + 1;
                caption.update({
                    totalVotes: newVotes
                })
                .then(caption => {
                    res.status(201).json({
                        message: "Vote added successfully!",
                        caption: caption,
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: err.message
                    })
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })

        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
}

const unVoteCaption = (req, res) => {
    const userId = req.cookies.userId
    const captionId = req.params.captionId
    Caption.findByPk(captionId)
    .then(caption => {
        caption.getVotes()
        .then(votes => {
            let vote = null;
            for(i=0; i<votes.length; i++){
                if(votes[i].userId == userId){
                    vote = votes[i]
                }
            }
            if(vote != null){
                vote.destroy({
                    truncate: true
                })
                .then(()=> {
                    caption.decrement('totalVotes')
                    .then(caption => {
                        res.status(201).json({
                            message: "Caption unvoted successfully!",
                            caption: caption,
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: err.message
                        })
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: err.message
                    })
                })
            }
            else{
                res.status(403).json({
                    message: "User did not vote for this caption!"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
        
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
}

module.exports = {
    getPhotoCaptions,
    addNewCaption,
    updateCaption,
    deleteCaption,
    voteForCaption,
    unVoteCaption
}